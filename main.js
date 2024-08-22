const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

// Start the Express server
// const server = require('./backend/server');

async function createWindow() {
  const isDev = await import('electron-is-dev').then((module) => module.default);

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
    autoHideMenuBar: true,
  });

  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, 'build', 'index.html')}`
  );

  mainWindow.on('closed', () => (mainWindow = null));
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
