import { app, BrowserWindow } from 'electron';

function createWindow() {
  const window = new BrowserWindow({
    width: 1366,
    height: 768
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
