<template>
  <div class="login">
    <div
      class="logo"
    />
    <van-form ref="loginForm" :show-error="false" class="form" @submit="onSubmit">
      <template v-if="loginWay === 'account'">
        <van-field
          v-model="loginForm.account"
          name="validatorAccount"
          placeholder="请输入账号"
          :rules="[
            { required: true, message: '请输入账号' },
            { validator: validatorAccount, message: '请输入正确的账号' }
          ]"
        >
          <div slot="left-icon">
            <img src="./imgs/phone.svg" alt="" class="phoneIcon">
          </div>
        </van-field>
        <van-field
          v-model="loginForm.password"
          left-icon="smile-o"
          type="password"
          name="validatorPassword"
          placeholder="密码"
          :rules="[
            { required: true, message: '请输入密码' },
            { validator: validatorPassword, message: '请输入正确的密码' }
          ]"
        >
          <div slot="left-icon">
            <img src="./imgs/lock.png" alt="" class="lockIcon">
          </div>
        </van-field>
      </template>
      <template v-else>
        <van-field
          v-model="loginForm.phone"
          left-icon="smile-o"
          placeholder="请输入手机号"
          :rules="[
            { required: true, message: '请输入手机号' },
            {pattern:phonePattern, message: '请输入正确的手机号'}
          ]"
        >
          <div slot="left-icon">
            <img src="./imgs/phone.svg" alt="" class="phoneIcon">
          </div>
        </van-field>
        <van-field
          v-model="loginForm.code"
          left-icon="smile-o"
          name="validatorCode"
          placeholder="验证码"
          :rules="[
            { required: true, message: '请输入验证码' },
            { validator: validatorCode, message: '请输入正确的验证码' },
          ]"
        >
          <div slot="left-icon">
            <img src="./imgs/lock.png" alt="" class="lockIcon">
          </div>
          <div slot="right-icon" class="code" @click="handleGetCodeClick">
            {{ isSendCode ? `${count} s` :'获取验证码' }}
          </div>
        </van-field>
      </template>

      <van-button v-preventreclick type="info" block class="loginBtn" color="#2F448A">
        登录
      </van-button>
      <!-- <span class="loginWay" @click="handleChangeLoginWay">{{ loginWay === 'account' ? '使用手机登陆' :'使用账号登陆' }}</span> -->
    </van-form>
    <div class="domain-text">
      <p>©2014-2020 北京云鸟科技有限公司 版权所有</p>
      <p>京ICP备<a href="https://beian.miit.gov.cn/">16001633号-1</a></p>
    </div>
    <van-popup class="login-pop" :close-on-click-overlay="false" round :value="isShowPop">
      <p>提示</p>
      <p>您的登录密码过于简单，具有安全隐患，需要重新设置登录密码</p>
      <van-button type="info" class="resetPwd" block @click="resetPwd">
        确定
      </van-button>
    </van-popup>
  </div>
</template>
<script>
import { Form, Field, Icon, Button } from 'vant'
import { phoneRegExp } from '@/utils/index'
export default {
  name: 'Login',
  components: {
    [Form.name]: Form,
    [Field.name]: Field,
    [Icon.name]: Icon,
    [Button.name]: Button

  },
  data() {
    return {
      loginForm: {
        account: '', // 账号
        password: '', // 密码
        phone: '', // 手机号
        code: '' // 手机验证码
      },
      loginWay: 'account', // 登录方式
      isSendCode: false, // 发送验证码是否正在倒计时
      count: 60 // 倒计时的秒数
    }
  },
  computed: {
    isShowPop() {
      return this.$store.getters['user/getReset']
    }
  },
  mounted() {
    this.phonePattern = phoneRegExp
  },
  beforeDestroy() {
    this.clearTimer()
  },
  methods: {
    /**
     * 登录
     */
    async onSubmit() {
      this.$store.dispatch('user/login', this)
    },
    /**
     * 切换登录方式
     */
    handleChangeLoginWay() {
      this.$refs.loginForm.resetValidation()
      if (this.loginWay === 'account') {
        this.loginWay = 'code'
      } else {
        this.loginWay = 'account'
      }
    },
    /**
     *获取验证码
     */
    handleGetCodeClick() {
      // 正在倒计时或者手机号不合法
      if (this.isSendCode || !phoneRegExp.test(this.loginForm.phone)) {
        return false
      } else {
        // 调方法获取手机验证码
        this.getPhoneCode()
      }
    },
    /**
     * 获取手机验证码
     */
    getPhoneCode() {
      try {
        this.isSendCode = true
        this.timer = setInterval(() => {
          if (this.count > 1) {
            this.count--
          } else {
            this.clearTimer()
          }
        }, 1000)
      } catch (err) {
        this.clearTimer()
      }
    },
    /**
     * 清除定时器
     */
    clearTimer() {
      clearInterval(this.timer)
      this.timer = null
      this.count = 60
      this.isSendCode = false
    },
    /**
     * 手机验证码校验
     */
    validatorCode(val) {
      return val.length === 4
    },
    /**
     * 校验密码
     */
    validatorPassword(val) {
      if (val) return true
    },
    /**
     * 校验账号
     */
    validatorAccount(val) {
      const isTrue = /\d{8,11}/.test(val)
      return isTrue
      // if (phoneRegExp.test(val)) {
      //   return true
      // }
      // return false
    },
    // 强制跳转
    resetPwd() {
      this.$router.push({
        name: 'ResetPwd',
        params: {
          isLogin: true
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.login {
  font-family: PingFangSC-Regular;
  width: 100%;
  height: 100vh;
  -webkit-background-size: cover;
  background-size: cover;
  overflow: hidden;
  .logo {
    width: 100%;
    height: 28vh;
    background: url("https://qizhiniao-dev.oss-cn-beijing.aliyuncs.com/img/a6ce085a5d6e425295ab487097e9cd3a")
      no-repeat;
    -webkit-background-size: cover;
    background-size: cover;
  }
  .form {
    margin:37.5px;
    .loginBtn {
     margin-top:55.5px;
     button {
       color:#D4DAE9;
     }
    }
    .loginWay {
      display: inline-block;
      margin-top:6.5px;
      font-size: 11px;
      color: #838A9D;
    }
    .code {
      font-size: 13px;
      color: #649CEE;
    }
    .phoneIcon {
      width: 10px;
      height:15px;
      vertical-align: middle;
    }
    .lockIcon {
     object-fit: contain;
      width: 12px;
      height:15px;
      vertical-align: middle;
    }
  }
  .login-pop{
    width: 70%;
    height: 30%;
    padding: 10px 8px;
    display: flex;
    flex-wrap:wrap ;
    align-items: center;
    justify-content: center;
    & p:first-child {
      font-size: 18px;
      font-weight: 700;

    }
    p{
      text-align: center;
      color:#333;
      font-size:15px;
      margin: 0;
    }
    .resetPwd{
      width: 60%;
    }
  }
  .domain-text{
    width: 100%;
    text-align: center;
    color:#999;
    position: fixed;
    bottom: 20px;
    a{
      color:#999;
    }
  }
}
</style>

<style scoped>
  .login >>> .van-cell::after {
    border-color: #2F448A;
  }
</style>
