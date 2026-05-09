import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { exec } from 'child_process'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * msc-cruises Standalone Master Config
 * Merged for maximum stability on Node.js v24 / Vite 7 / Windows
 */

// --- SCENE EDITOR PLUGIN LOGIC ---
const sceneEditorPlugin = () => {
  const setupMiddlewares = (server) => {
    server.middlewares.use('/api/save-config', async (req, res) => {
      if (req.method !== 'POST') { 
        res.statusCode = 405; 
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Method Not Allowed' })); 
        return; 
      }
      let body = '';
      req.on('data', chunk => { body += chunk.toString(); });
      req.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          const { companyId, experienceId, objects } = parsed;
          
          // Resolve correct manifest path
          let manifestFile = 'config_truth.json'; // Default legacy
          if (companyId === '25-hours-copenhagen') manifestFile = '25hours_indre.json';
          else if (companyId === 'msc-europa') manifestFile = 'msc_europa.json';
          else if (companyId === 'msc-cruises') manifestFile = 'config_truth.json';

          const truthPath = path.resolve(__dirname, './src/data', manifestFile);
          console.log(`[Vite Editor] Saving to: ${manifestFile} (Company: ${companyId})`);

          if (!fs.existsSync(truthPath)) {
             throw new Error(`Manifest file not found: ${manifestFile}`);
          }

          let masterTruth = JSON.parse(fs.readFileSync(truthPath, 'utf-8'));
          console.log(`[Vite Editor] Target Experience: ${experienceId}`);

          // Support for Whitelabel Manifest Structure (challenge_configuration.experiences)
          if (masterTruth.challenge_configuration && Array.isArray(masterTruth.challenge_configuration.experiences)) {
              const exp = masterTruth.challenge_configuration.experiences.find(e => e.exp_id === experienceId);
              if (exp) {
                  console.log(`[Vite Editor] Found experience in challenge_configuration: ${exp.name}`);
                  if (!exp.backpack_icons) exp.backpack_icons = [];
                  
                  objects.forEach(obj => {
                      if (obj.id === 'camera') {
                          console.log(`[Vite Editor] Updating camera for ${exp.name}`);
                          exp.startPos = obj.pos;
                          exp.startRot = obj.rot;
                      } else {
                          const iconIdx = exp.backpack_icons.findIndex(i => i.id === obj.id);
                          if (iconIdx !== -1) {
                              console.log(`[Vite Editor] Updating icon: ${obj.id}`);
                              exp.backpack_icons[iconIdx].coordinates = { x: obj.pos[0], y: obj.pos[1], z: obj.pos[2] };
                              if (obj.rot) {
                                  exp.backpack_icons[iconIdx].rotation = { x: obj.rot[0], y: obj.rot[1], z: obj.rot[2] };
                              }
                          }
                      }
                  });
              } else {
                  console.warn(`[Vite Editor] Experience ${experienceId} not found in challenge_configuration.experiences`);
              }
          } 
          
          // Support for Legacy Structure (experiences[id])
          if (masterTruth.experiences && masterTruth.experiences[experienceId]) {
              const exp = masterTruth.experiences[experienceId];
              console.log(`[Vite Editor] Updating legacy experience: ${experienceId}`);
              objects.forEach(obj => {
                  if (obj.id === 'camera') {
                      exp.startPos = obj.pos;
                      exp.startRot = obj.rot;
                  } else if (obj.id.startsWith('item') || obj.id.includes('-')) {
                      if (!exp.items) exp.items = [];
                      const itemIdx = exp.items.findIndex(i => i.id === obj.id);
                      if (itemIdx !== -1) {
                          exp.items[itemIdx].position = obj.pos;
                          exp.items[itemIdx].rotation = obj.rot;
                      }
                  } else if (obj.id.startsWith('special-')) {
                      if (!exp.coin) exp.coin = {};
                      exp.coin.position = obj.pos;
                      exp.coin.rotation = obj.rot;
                  }
              });
          }

          console.log(`[Vite Editor] Writing changes to ${manifestFile}...`);
          fs.writeFileSync(truthPath, JSON.stringify(masterTruth, null, 4), 'utf-8');
          res.statusCode = 200; res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ success: true }));
        } catch (e) { 
          console.error("!!! SAVE ERROR !!!", e);
          res.statusCode = 500; 
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: e.message, stack: e.stack })); 
        }
      });
    });
    server.middlewares.use('/api/git-sync', async (req, res) => {
      exec('git add . && git commit -m "UI: Master Truth Sync" && git push', (error) => {
        res.setHeader('Content-Type', 'application/json');
        if (error) { 
          res.statusCode = 500; 
          res.end(JSON.stringify({ error: error.message })); 
          return; 
        }
        res.statusCode = 200; 
        res.end(JSON.stringify({ success: true }));
      });
    });
  };

  return {
    name: 'scene-editor-plugin',
    configureServer: setupMiddlewares,
    configurePreviewServer: setupMiddlewares
  };
};

// --- VOICEOVER PLUGIN LOGIC ---
const voiceoverPlugin = () => {
  const setupMiddlewares = (server) => {
    server.middlewares.use('/api/save-audio', async (req, res) => {
      if (req.method !== 'POST') { res.statusCode = 405; res.end('Method Not Allowed'); return; }
      let body = '';
      req.on('data', chunk => { body += chunk.toString(); });
      req.on('end', () => {
        try {
          const { companyId, audioKey, audioData } = JSON.parse(body);
          const audioDir = path.resolve(__dirname, './public/audio');
          if (!fs.existsSync(audioDir)) fs.mkdirSync(audioDir, { recursive: true });
          const fileName = `${companyId}_${audioKey}_${Date.now()}.wav`;
          const filePath = path.join(audioDir, fileName);
          fs.writeFileSync(filePath, audioData.replace(/^data:audio\/\w+;base64,/, ""), 'base64');
          const manifestPath = path.resolve(__dirname, './src/data/voiceoverManifest.json');
          const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
          if (!manifest[companyId]) manifest[companyId] = {};
          manifest[companyId][audioKey] = `/audio/${fileName}`;
          fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf-8');
          res.statusCode = 200; 
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ success: true, path: `/audio/${fileName}` }));
        } catch (e) { 
          res.statusCode = 500; 
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: e.message })); 
        }
      });
    });
  };

  return {
    name: 'voiceover-plugin',
    configureServer: setupMiddlewares,
    configurePreviewServer: setupMiddlewares
  };
};

// --- FULL MANIFEST SAVE PLUGIN LOGIC ---
const manifestSavePlugin = () => {
  const setupMiddlewares = (server) => {
    server.middlewares.use('/api/save-full-manifest', async (req, res) => {
      if (req.method !== 'POST') { res.statusCode = 405; res.end('Method Not Allowed'); return; }
      let body = '';
      req.on('data', chunk => { body += chunk.toString(); });
      req.on('end', () => {
        try {
          const { companyId, manifestData } = JSON.parse(body);
          
          // Map slug/id to actual filename
          let manifestFile = 'config_truth.json';
          if (companyId === '25-hours-copenhagen') manifestFile = '25hours_indre.json';
          else if (companyId === 'msc-europa') manifestFile = 'msc_europa.json';
          
          const filePath = path.resolve(__dirname, './src/data', manifestFile);
          console.log(`[Vite Manifest] Overwriting: ${manifestFile}`);
          
          fs.writeFileSync(filePath, JSON.stringify(manifestData, null, 4), 'utf-8');
          
          res.statusCode = 200; 
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ success: true, message: `Successfully saved to ${manifestFile}` }));
        } catch (e) { 
          res.statusCode = 500; 
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: e.message })); 
        }
      });
    });
  };

  return {
    name: 'manifest-save-plugin',
    configureServer: setupMiddlewares,
    configurePreviewServer: setupMiddlewares
  };
};

export default defineConfig({
  plugins: [react(), sceneEditorPlugin(), voiceoverPlugin(), manifestSavePlugin()],
  server: {
    allowedHosts: true,
    headers: {
    }
  },
  preview: {
    allowedHosts: true,
  },
  build: {
    chunkSizeWarningLimit: 2000,
    assetsInlineLimit: 0 
  },
  resolve: {
    alias: {
      react: 'react',
      'react-dom': 'react-dom'
    }
  }
})
