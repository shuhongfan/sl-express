import db from '@/utils/localstorage'
import Cookies from 'js-cookie'
export default {
  namespaced: true,
  state: {
    accessToken: Cookies.get('ACCESS_TOKEN'),
    refreshToken: Cookies.get('REFRESH_TOKEN'),
    token: Cookies.get('TOKEN'),
    tenant: Cookies.get('TENANT'),
    expireTime: Cookies.get('EXPIRE_TIME', 0),
    user: db.get('USER'),
    permissions: db.get('PERMISSIONS') || [],
    routes: db.get('USER_ROUTER') || []
  },
  mutations: {
    setTenant(state, val) {
      Cookies.set('TENANT', val)
      state.accessToken = val
    },
    setAccessToken(state, val) {
      db.save('ACCESS_TOKEN', val)
      state.accessToken = val
    },
    setRefreshToken(state, val) {
      Cookies.set('REFRESH_TOKEN', val)
      state.refreshToken = val
    },
    setToken(state, val) {
      Cookies.set('TOKEN', val)
      state.token = val
    },
    setExpireTime(state, val) {
      Cookies.set('EXPIRE_TIME', val)
      state.expireTime = val
    },
    setUser(state, val) {
      db.save('USER', val)
      state.user = val
    },
    setPermissions(state, val) {
      db.save('PERMISSIONS', val)
      state.permissions = val
    },
    setRoutes(state, val) {
      db.save('USER_ROUTER', val)
      state.routes = val
    }
  }
}
