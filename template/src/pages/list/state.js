const customState = {
  namespaced: true,
  state: {
    test: 1
  },
  mutations: {
    sameFn () {
      alert('list页面mutations被触发')
    }
  }
}

export { customState as module }
