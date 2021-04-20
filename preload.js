const { ipcRenderer, clipboard } = require('electron')

window.addEventListener('DOMContentLoaded', () => {
  switch (location.pathname) {
    case '/':
      location.replace('my')
      break
    case '/course/view.php':
      document.getElementsByClassName('activityinstance')[1].children[0].click()
      break
    case '/mod/attendance/take.php':
      document.getElementsByTagName('form')[1].submit()
      break
    case '/mod/attendance/signin_attendance.php':
      let inQueue
      const btnElement = document.getElementById('id_send')
      const inputElement = document.getElementById('id_cardno')

      document.getElementsByTagName('form')[0].addEventListener('submit', () => inQueue = true)

      ipcRenderer.on('uid', (_, uid) => {
        clipboard.writeText(uid)
        if (!inQueue) {
          inputElement.value = uid
          btnElement.click()
        } else {
          localStorage.uidQueue += uid
        }
      })

      if (localStorage.uidQueue) {
        const { uidQueue } = localStorage
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
