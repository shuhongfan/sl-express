import db from '@/utils/localstorage'
export default {
  namespaced: true,
  state: {
    enums: db.get('ENUMS')
  },
  mutations: {
    setEnums(state, val) {
      db.save('ENUMS', val)
      state.enums = val
    }
  }
}
