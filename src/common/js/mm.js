import axios from 'axios'
import swal from 'sweetalert'
export function validate(value, type) {
  // value = value.trim()
  if (type === 'require') {
    return !!value
  }
  if (type === 'phone') {
    return /^1\d{10}$/.test(value)
  }
  if (type === 'email') {
    return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value)
  }
}

export function doLogin() {
  window.location.href = '/#/login?redirect=' + encodeURIComponent(window.location.href)
}

export function doLogout() {
  getAxios({
    url: '/user/logout.do'
  }, (res) => {
    console.log(res)
    window.location.href = '/home'
  })
}

export function goHome() {
  window.location.href = '/home'
}

export function getAxios(params, bc, er) {
  axios({
    method: params.type || 'post',
    url: params.url || '',
    data: params.data || '',
    transformRequest(obj) {
      var str = []
      for (let p in obj) {
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
      }
      return str.join('&')
    }
  }).then(bc).catch((error) => {
    alert(error)
    window.location.href = '/#/home'
  })
}

export function transformData(obj) {
  var str = []
  for (let p in obj) {
    str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
  }
  return str.join('&')
}
// Sweetalert封装
export function Salert(msg, type) {
  /* eslint-disable */
  swal({
    icon: type,
    text: msg,
    timer: 1000
  }).then(
      function () {},
      // handling the promise rejection
      function (dismiss) {
        if (dismiss === 'timer') {
            console.log('I was closed by the timer')
        }
      }
  )
}
