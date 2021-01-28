<template>
  <div class="bss">
    <transition :name="transitionName">
      <keep-alive v-if="$route.meta.keepAlive">
        <router-view :class="showFooter ? 'padding router' : 'router'"></router-view>
      </keep-alive>
      <router-view v-else :class="showFooter ? 'padding router' : 'router'"></router-view>
    </transition>
    <BssFooter v-if="showFooter" />
  </div>
</template>

<script>

import defaultSetting from '@/settings'
import BssFooter from '@/components/BssFooter'
export default {
  name: 'Layout',
  components: {
    BssFooter
  },
  data() {
    return {
      showFooter: true
    }
  },
  computed: {
    transitionName() {
      if (defaultSetting.needPageTrans) {
        return this.$store.state.direction
      }
      return ''
    }
  },
  mounted() {
    const { showFooter } = this.$route.meta
    this.setShowFooter(showFooter)
  },
  methods: {
    setShowFooter(showFooter) {
      this.showFooter = !!showFooter
    }
  }
}
</script>

<style lang="scss">
@import "../../style/bss.scss";
.padding{
  padding-bottom: 50px;
  box-sizing: border-box;
}
</style>
