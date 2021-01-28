<template>
  <div class="mycenter">
    <van-nav-bar title="个人中心" />
    <div class="cell-top">
      <van-cell title="修改密码" is-link @click="toResetPwd" />
    </div>
    <div
      style="padding: 30px; box-sizing: border-box"
    >
      <van-button
        style="margin-top: 40%"
        color="linear-gradient(to right, #ff6034, #ee0a24)"
        block
        @click="removeLocal"
      >
        退出登陆
      </van-button>
    </div>
    <footer-tabbar />
  </div>
</template>
<script>
import { Tabbar, TabbarItem, Toast, Tab, Tabs } from 'vant'
import FooterTabbar from '@/components/FooterTabbar'
export default {
  name: 'MyCenter',
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Toast.name]: Toast,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    FooterTabbar
  },
  data() {
    return {

    }
  },
  mounted() {
  },
  methods: {
    removeLocal() {
      this.$store.commit('user/SETRESETPWD', false)
      localStorage.clear()
      this.$router.replace({
        name: 'login'
      })
    },
    toResetPwd() {
      this.$router.replace({
        name: 'ResetPwd'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.mycenter {
  width: 100%;
}
.cell-top{
  margin-top: 20px;
  border-top:1px solid #e4e4e4;
  border-bottom:1px solid #e4e4e4;
  color: #333;
  font-weight: 600;
  font-size: 22px;
}
</style>
