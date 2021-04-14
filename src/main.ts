import { app, BrowserWindow } from 'electron';

function createWindow() {
  const window = new BrowserWindow({
    width: 800,
    height: 600
  });

  window.loadFile('public/index.html');
  window.webContents.openDevTools();
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
