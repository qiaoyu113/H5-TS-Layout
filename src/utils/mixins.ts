import { mapState } from 'vuex'
export const addCach: any = {
  data() {
    return {
      originComponent: ''
    }
  },
  beforeRouteEnter(to: any, from: { meta: { keepAlive: any } }, next: (arg0: (vm: any) => void) => void) {
    next((vm: { originComponent: any }) => {
      if (from.meta.keepAlive) { vm.originComponent = from }
    })
  },
  beforeRouteLeave(to: { name: any; meta: { isCach: boolean } }, from: any, next: () => void) {
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
      cachedViews: (state: any) => state['cached-views'].cachedViews
    })
  }
}
