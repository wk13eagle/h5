const customState = {
  namespaced: true,
  state: {
    test: 2
  },
  mutations: {
    sameFn () {
      alert('info页面mutations被触发')
    }
  }
}

export { customState as module }
