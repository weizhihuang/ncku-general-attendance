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
      ipcRenderer.on("uid", (_, uid) => {
        clipboard.writeText(uid)
        document.getElementById('id_cardno').value = uid
        document.getElementsByTagName('form')[0].submit()
      })
      break
    default:
      break
  }
})
