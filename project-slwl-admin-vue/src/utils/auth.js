import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'
const urlKey = 'tms_url'
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}
export function setUrl(url) {
  return Cookies.set(urlKey, url)
}
export function getUrl() {
  return Cookies.get(urlKey)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
