const { app, BrowserWindow } = require('electron')
const path = require('path')
const { NFC } = require('nfc-pcsc')

let win

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadURL('https://moodle.ncku.edu.tw/login/index.php')

  win.webContents.on('new-window', (event, url) => {
    event.preventDefault()
    win.loadURL(url)
  })
}

function initNFC() {
  const nfc = new NFC()

  nfc.on('reader', reader => {
    reader.on('card', card => {
      win.show()
      win.webContents.send(
        'uid',
        parseInt(card.uid
          .match(/.{1,2}/g)
          .reverse()
          .join(''), 16)
          .toString()
          .padStart(10, 0)
      )
    })
  })
}

app.whenReady().then(() => {
  createWindow()
  initNFC()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
