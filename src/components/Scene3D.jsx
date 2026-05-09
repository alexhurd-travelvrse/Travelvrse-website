import React, { useRef, Suspense } from 'react';
import { Environment, useTexture, Billboard, Text, Float, TransformControls, useGLTF, Html, OrbitControls } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { usePlayerControls } from '../hooks/usePlayerControls';
import { useManualRaycaster } from '../hooks/useManualRaycaster';
import { useGame } from '../context/GameContext';
import { useInfluencer } from '../context/InfluencerContext';

import SparkModel from './SparkModel';
import LumaModel from './LumaModel';
import { BarCoasterLeadGen } from './BarCoasterLeadGen';
import Confetti from './Confetti';
import BackpackMarker from './BackpackMarker';

// Helper component to wrap objects for Editor Mode
const TransformWrapper = ({ id, activeId, isEditorActive, handleTransform, setLookLocked, mode = "translate", children }) => {
    if (isEditorActive && activeId === id) {
        return (
            <TransformControls 
                mode={mode} 
                onMouseDown={() => setLookLocked(true)}
                onMouseUp={(e) => {
                    setLookLocked(false);
                    handleTransform(id, e);
                }}
            >
                {children}
            </TransformControls>
        );
    }
    return <>{children}</>;
};

const DynamicModel = ({ config, modelScale, onSplatLoad }) => {
    const path = config.splatUrl || "/models/1.splat";
    const modelRotation = React.useMemo(() => config.modelRotation || [0, 0, 0], [config.modelRotation]);

    console.log('%c[DynamicModel] Rendering with path:', 'color: #ff00ff; font-weight: bold;', path);

    try {
        return (
            <SparkModel
                url={path}
                scale={modelScale}
                rotation={modelRotation}
                position={[0, 0, 0]}
                onLoad={onSplatLoad}
            />
        );
    } catch (error) {
        console.error('[DynamicModel] Error rendering model:', error);
        return null;
    }
};

const Scene3D = ({ 
    experienceId, 
    isInteractionActive, 
    isEditorMode, 
    activeEditorObject, 
    isStarted = false, 
    isItemsAllowed: isItemsAllowedProp = false,
    isOrbAllowed: isOrbAllowedProp = false,
    itemsViewed = [],
    isModalOpen = false,
    editorObjects = []
}) => {
    const { camera, gl } = useThree();
    const { publicConfig } = useInfluencer();
    const { backpack, challenges, getTotalCoins } = useGame();
    
    const roomConfig = publicConfig?.experiences?.[experienceId] || {};
    
    // Standardize: Convert degrees from roomConfig (truth) to radians for 3D engine
    const toRad = (arr) => arr ? arr.map(d => d * (Math.PI / 180)) : arr;
    
    // Create a normalized config where all rotations are radians
    const config = React.useMemo(() => {
        const merged = { ...roomConfig };
        
        // Ensure defaults for critical fields
        merged.startPos = roomConfig.startPos || [0, 2, 5];
        merged.startRot = toRad(roomConfig.startRot || [0, 0, 0]);
        merged.splatUrl = roomConfig.splatUrl || "/models/1.splat";
        
        if (roomConfig.coin?.rotation) merged.coinRotation = toRad(roomConfig.coin.rotation);
        
        return merged;
    }, [roomConfig]);

    const [showConfetti, setShowConfetti] = React.useState(false);
    const [isSplatLoaded, setIsSplatLoaded] = React.useState(false);
    
    const isItemsAllowed = isItemsAllowedProp;
    const isOrbAllowed = isOrbAllowedProp;

    // Reset load state when changing rooms
    React.useEffect(() => {
        setIsSplatLoaded(false);
    }, [experienceId]);

    // Listen for confetti
    React.useEffect(() => {
        const handleConfetti = () => {
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 5000); 
        };
        window.addEventListener('trigger-confetti', handleConfetti);
        return () => window.removeEventListener('trigger-confetti', handleConfetti);
    }, []);

    const startPos = React.useMemo(() => config.startPos || [0, 2, 5], [config.startPos]);
    const startRot = React.useMemo(() => config.startRot || [0, 0, 0], [config.startRot]);
    const boundaries = config.boundaries || [];

    const [localPositions, setLocalPositions] = React.useState({});
    const [localRotations, setLocalRotations] = React.useState({});
    const [sessionPlaced, setSessionPlaced] = React.useState({}); // Tracks which objects were placed this session
    const [editorMode, setEditorMode] = React.useState('translate');
    const [isLookLocked, setIsLookLocked] = React.useState(false);

    usePlayerControls(startPos, startRot, boundaries, !isLookLocked);
    
    // Sync editorObjects from props (Live Preview)
    React.useEffect(() => {
        if (editorObjects && editorObjects.length > 0) {
            const posMap = {};
            const rotMap = {};
            editorObjects.forEach(obj => {
                if (obj.pos) posMap[obj.id] = obj.pos;
                if (obj.rot) {
                    // MSC MASTER RULE: Ensure rotation is an array before mapping
                    const rotArray = Array.isArray(obj.rot) ? obj.rot : [obj.rot.x || 0, obj.rot.y || 0, obj.rot.z || 0];
                    rotMap[obj.id] = rotArray.map(v => v * (Math.PI / 180));
                }
            });
            setLocalPositions(prev => ({ ...prev, ...posMap }));
            setLocalRotations(prev => ({ ...prev, ...rotMap }));
        }
    }, [editorObjects]);

    // Handle Editor Events
    React.useEffect(() => {
        const handleManualUpdate = (e) => {
            const { id, pos, rot } = e.detail;
            if (pos) setLocalPositions(prev => ({ ...prev, [id]: pos }));
            if (rot) setLocalRotations(prev => ({ ...prev, [id]: rot.map(v => v * (Math.PI / 180)) }));
        };
        const handleModeChange = (e) => setEditorMode(e.detail.mode);
        
        const handleUseCameraPos = (e) => {
            const { id } = e.detail;
            console.log(`[Scene3D] Received placement request for: ${id}`);
            
            // Get current camera position and direction ONLY at this instant
            const currentPos = new THREE.Vector3().copy(camera.position);
            const currentQuat = new THREE.Quaternion().copy(camera.quaternion);

            // Calculate forward offset (2.5m for better visibility)
            const forward = new THREE.Vector3(0, 0, -1);
            forward.applyQuaternion(currentQuat);
            forward.multiplyScalar(2.5);

            const p = [
                currentPos.x + forward.x,
                currentPos.y + forward.y,
                currentPos.z + forward.z
            ];
            
            const r = camera.rotation.toArray().slice(0, 3).map(v => v * (180/Math.PI));

            if (id === 'camera') {
                 console.log(`[Scene3D] Capturing Camera Start Position:`, p);
                 const camP = [currentPos.x, currentPos.y, currentPos.z];
                 window.dispatchEvent(new CustomEvent('scene-editor-manual-sync', { detail: { id, pos: camP, rot: r } }));
            } else {
                console.log(`[Scene3D] Summoning object ${id} to:`, p);
                // Update local state IMMEDIATELY to prevent frame-lag
                setLocalPositions(prev => ({ ...prev, [id]: p }));
                setSessionPlaced(prev => ({ ...prev, [id]: true })); // Mark as session-placed
                // Sync to parent
                window.dispatchEvent(new CustomEvent('scene-editor-manual-sync', { detail: { id, pos: p } }));
            }
        };

        window.addEventListener('scene-editor-manual-update', handleManualUpdate);
        window.addEventListener('scene-editor-mode-change', handleModeChange);
        window.addEventListener('scene-editor-use-camera-pos', handleUseCameraPos);
        return () => {
            window.removeEventListener('scene-editor-manual-update', handleManualUpdate);
            window.removeEventListener('scene-editor-mode-change', handleModeChange);
            window.removeEventListener('scene-editor-use-camera-pos', handleUseCameraPos);
        };
    }, [camera, localPositions, sessionPlaced]);

    const handleTransform = (id, e) => {
        const obj = e.target.object;
        if (editorMode === 'translate') {
            const p = [obj.position.x, obj.position.y, obj.position.z];
            setLocalPositions(prev => ({ ...prev, [id]: p }));
            window.dispatchEvent(new CustomEvent('scene-editor-manual-sync', { detail: { id, pos: p } }));
        } else if (editorMode === 'rotate') {
            const r = [obj.rotation.x, obj.rotation.y, obj.rotation.z];
            setLocalRotations(prev => ({ ...prev, [id]: r }));
            const degs = r.map(v => v * (180/Math.PI));
            window.dispatchEvent(new CustomEvent('scene-editor-manual-sync', { detail: { id, rot: degs } }));
        }
    };

    return (
        <group>
            <ambientLight intensity={1.0} />
            <hemisphereLight intensity={2.0} />
            
            <DynamicModel 
                config={config} 
                modelScale={config.scale || 1} 
                onSplatLoad={() => {
                    setIsSplatLoaded(true);
                    window.dispatchEvent(new CustomEvent('msc-splat-loaded'));
                }} 
            />

            {/* Normal Navigation active even in Editor Mode for identical sensitivity */}
            
            {isItemsAllowed && (roomConfig.backpack_icons || roomConfig.items)?.map((item, idx) => {
                const isCollected = backpack.some(b => b.id === item.id);
                // Support both whitelabel coordinates and legacy position array
                const rawPos = item.coordinates ? [item.coordinates.x, item.coordinates.y, item.coordinates.z] : item.position;
                
                // MSC MASTER RULE: Objects are hidden on load in Scene Editor.
                // They only appear once they have been 'placed' in the current session.
                const finalVisibility = isEditorMode ? !!sessionPlaced[item.id] : true;

                if (!finalVisibility) return null;

                return (
                    <TransformWrapper 
                        key={item.id} 
                        id={item.id} 
                        activeId={activeEditorObject} 
                        isEditorActive={isEditorMode} 
                        handleTransform={handleTransform}
                        setLookLocked={setIsLookLocked}
                        mode={editorMode}
                    >
                        <BackpackMarker 
                            id={item.id}
                            experienceId={experienceId}
                            pos={localPositions[item.id] || rawPos}
                            size={0.4}
                            isCollected={isCollected}
                            type={item.type}
                            isStarted={isStarted}
                            isModalOpen={isModalOpen}
                            discoveryMode={item.discoveryMode || 'instant'}
                            isActivity={item.content_type === 'activity'}
                            audioUrl={item.collectible?.type === 'mp3' ? item.collectible.url : null}
                            onClick={() => {
                                if (isEditorMode) return;
                                console.log("[Scene3D] INTERACTION: Marker clicked ->", item.id);
                                if (item.id === 'lucky-coaster') {
                                    console.log("[Scene3D] Dispatched 'trigger-coaster-flip'");
                                    window.dispatchEvent(new CustomEvent('trigger-coaster-flip', { detail: { id: 'lucky-coaster' } }));
                                    return;
                                }
                                window.dispatchEvent(new CustomEvent('object-clicked', { 
                                    detail: { 
                                        name: 'ActivityObject', 
                                        experienceId,
                                        itemId: item.id,
                                        itemIndex: idx
                                    } 
                                }));
                            }}
                        />
                    </TransformWrapper>
                );
            })}

            {/* Lucky Coaster Activation */}
            {(experienceId === '2' || experienceId === '3' || experienceId === '5') && (
                <BarCoasterLeadGen 
                    experienceId={experienceId}
                    position={localPositions['lucky-coaster'] || [0.8, 1.05, -1.5]} 
                    rotation={localRotations['lucky-coaster'] || [0, 0, 0]}
                />
            )}

            {showConfetti && <Confetti />}
        </group>
    );
};

export default Scene3D;
