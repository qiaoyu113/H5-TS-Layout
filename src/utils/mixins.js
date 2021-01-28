import { mapState } from 'vuex'
export const addCach = {
  data() {
    return {
      originComponent: ''
    }
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (from.meta.keepAlive) { vm.originComponent = from }
    })
  },
  beforeRouteLeave(to, from, next) {
    // if (this.originComponent.name === to.name && this.cachedViews.includes(to.name)) {
    if (this.cachedViews.includes(to.name)) {
      to.meta.isCach = true
    } else {
      if (this.originComponent && this.originComponent.meta) {
        this.originComponent.meta.isCach = false
      }
    }
    next()
  },
  computed: {
    ...mapState({
      cachedViews: (state) => state['cached-views'].cachedViews
    })
  }
}
