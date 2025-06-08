import { app, BrowserWindow, nativeTheme, ipcMain } from 'electron';
import path from 'path';
import os from 'os';
import fs from 'fs';
import { fileURLToPath } from 'node:url';
import mqtt from 'mqtt';

// needed in case process is undefined under Linux
const platform = process.platform || os.platform();
const currentDir = fileURLToPath(new URL('.', import.meta.url));

// Clean up DevTools Extensions if needed (only if file exists)
try {
  if (platform === 'win32' && nativeTheme.shouldUseDarkColors === true) {
    const devToolsPath = path.join(app.getPath('userData'), 'DevTools Extensions');
    if (fs.existsSync(devToolsPath)) {
      fs.unlinkSync(devToolsPath);
    }
  }
} catch {
  // Silently ignore - this is just cleanup
}

let mainWindow;
let mqttClient;

/**
 * Initial window options
 */
function createWindow() {
  mainWindow = new BrowserWindow({
    icon: path.resolve(currentDir, 'icons/icon.png'), // tray icon
    width: 1000,
    height: 600,
    autoHideMenuBar: true,
    useContentSize: true,
    webPreferences: {
      contextIsolation: true,
      // More info: https://v2.quasar.dev/quasar-cli-vite/developing-electron-apps/electron-preload-script
      preload: path.resolve(
        currentDir,
        path.join(
          process.env.QUASAR_ELECTRON_PRELOAD_FOLDER,
          'electron-preload' + process.env.QUASAR_ELECTRON_PRELOAD_EXTENSION,
        ),
      ),
    },
  });

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    import('electron').then(({ shell }) => shell.openExternal(url));
    return { action: 'deny' };
  });

  mainWindow.loadURL(process.env.APP_URL);

  if (process.env.DEBUGGING) {
    // if on DEV or Production with debug enabled
    mainWindow.webContents.openDevTools();
  } else {
    // we're on production; no access to devtools pls
    mainWindow.webContents.on('devtools-opened', () => {
      mainWindow.webContents.closeDevTools();
    });
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// MQTT IPC handlers
ipcMain.handle('mqtt-connect', async (event, payload) => {
  return new Promise((resolve) => {
    try {
      if (mqttClient) {
        mqttClient.end();
      }

      mqttClient = mqtt.connect(payload.url, {
        username: payload.username,
        password: payload.password,
        rejectUnauthorized: false,
        connectTimeout: 5000, // 5 second timeout
      });

      mqttClient.on('message', (topic, message) => {
        event.sender.send('mqtt-message', topic, message.toString());
      });

      mqttClient.on('connect', () => {
        event.sender.send('mqtt-status', { connected: true });
        mqttClient.subscribe('#');
        resolve({ success: true });
      });

      mqttClient.on('error', (error) => {
        console.error('MQTT error:', error);
        event.sender.send('mqtt-status', { error: error.message });
        resolve({ success: false, error: error.message });
      });

      mqttClient.on('close', () => {
        event.sender.send('mqtt-status', { connected: false });
      });

      mqttClient.on('end', () => {
        event.sender.send('mqtt-status', { connected: false });
      });

      // Handle connection timeout
      setTimeout(() => {
        if (mqttClient && !mqttClient.connected) {
          event.sender.send('mqtt-status', { error: 'Connection timeout' });
          resolve({ success: false, error: 'Connection timeout' });
        }
      }, 6000);
    } catch (error) {
      console.error('MQTT connect error:', error);
      resolve({ success: false, error: error.message });
    }
  });
});

ipcMain.handle('mqtt-disconnect', async () => {
  if (mqttClient) {
    mqttClient.end();
    mqttClient = null;
  }
  return { success: true };
});

ipcMain.handle('mqtt-publish', async (event, topic, message, options) => {
  if (mqttClient) {
    mqttClient.publish(topic, message, options);
    return { success: true };
  }
  return { success: false, error: 'Not connected' };
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
