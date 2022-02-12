const { ipcRenderer, clipboard } = require('electron')

const { TA_ACCOUNT, TA_PASSWD, COURSE_ID } = process.env

window.addEventListener('DOMContentLoaded', () => {
  switch (location.pathname) {
    case '/':
      location.replace(`course/view.php?id=${COURSE_ID}`)
      break
    case '/login/':
      document.getElementById('username').value = TA_ACCOUNT
      document.getElementById('password').value = TA_PASSWD
      setTimeout(() => document.getElementsByTagName('form')[0].submit(), 200)
      break
    case '/course/view.php':
      [...document.getElementsByClassName('instancename')].forEach((element => element.innerText === '點名' && element.click()))
      break
    case '/mod/attendance/take.php':
      document.getElementsByTagName('form')[1].submit()
      break
    case '/mod/attendance/signin_attendance.php':
      const { uidQueue } = localStorage
      const btnElement = document.getElementById('id_send')
      const inputElement = document.getElementById('id_cardno')
      let inQueue = !!uidQueue

      document.getElementsByTagName('form')[0].addEventListener('submit', () => inQueue = true)

      ipcRenderer.on('uid', (_, uid) => {
        clipboard.writeText(uid)
        if (inQueue) {
          localStorage.uidQueue += uid
        } else {
          inputElement.value = uid
          btnElement.click()
        }
      })

      if (uidQueue) {
        uid = uidQueue.slice(0, 10)
        inputElement.value = uid
        btnElement.click()
        localStorage.uidQueue = uidQueue.slice(10)
      }
      break
    default:
      break
  }
})
