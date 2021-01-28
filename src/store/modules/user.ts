/* eslint-disable @typescript-eslint/no-unused-vars */
// import { login, getInfo } from 'api/user'
import { loginByAccount } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
// import router from '@/router'

const LOGIN = 'LOGIN'// 获取用户信息
const SetUserData = 'SetUserData'// 获取用户信息
const LOGOUT = 'LOGOUT'// 退出登录、清除用户数据
const USER_DATA = 'userDate'// 用户数据
const SETRESETPWD = 'SETRESETPWD'

export default {
  namespaced: true,
  state: {
    token: getToken() || '',
    user: JSON.parse((localStorage as any).getItem(USER_DATA) || null),
    loginStatus: localStorage.getItem('LoginStatusKey') || 0,
    resetPassword: false
  },
  mutations: {
    [LOGIN](state: { token: any }, data: { token: any }) {
      const userToken = data.token
      state.token = userToken
      setToken(userToken)
    },

    [SetUserData](state: { user: { stringPermissions?: any } }, userData = {}) {
      state.user = userData
      localStorage.setItem(USER_DATA, JSON.stringify(userData))
      localStorage.setItem('permission', state.user.stringPermissions)
    },
    [LOGOUT](state: { user: null; token: null }) {
      state.user = null
      state.token = null
      removeToken()
      localStorage.removeItem(USER_DATA)
      resetRouter()
    },
    [SETRESETPWD](state: { resetPassword: any }, status: any) {
      state.resetPassword = status
    }

  },
  actions: {
    async login(state: { commit: (arg0: string, arg1: any) => void }, data: { $loading: (arg0: boolean) => void; loginWay: string; loginForm: { account: any; password: any }; $fail: (arg0: any) => void; $route: { query: { redirect: string } }; $router: { replace: (arg0: { path: any }) => void } }) {
      try {
        data.$loading(true)
        let res: any = {}
        // 账号登录
        if (data.loginWay === 'account') {
          const { data: response } = await loginByAccount({
            username: data.loginForm.account,
            password: data.loginForm.password
          })

          res = response
        }
        if (res.success) {
          if (!res.data.token) {
            data.$loading(false)
            return data.$fail(res.data.msg)
          }
          state.commit(LOGIN, res.data)
          state.commit(SetUserData, res.data)
          state.commit(SETRESETPWD, res.data.isWeakPwd)
          // return
          if (!res.data.isWeakPwd) {
            setTimeout(() => {
              const redirect = data.$route.query.redirect || '/'
              data.$router.replace({
                path: redirect
              })
            }, 20)
          }
        } else {
          data.$loading(false)
          data.$fail(res.errorMsg)
        }
      } catch (error) {
        console.log(`login error:${error}`)
      } finally {
        data.$loading(false)
      }
    },
    // get user info
    getInfo() {
      return new Promise((resolve, reject) => {
        // getInfo(state.token).then(response => {
        //   const { data } = response

        //   if (!data) {
        //     // eslint-disable-next-line
        //     reject('Verification failed, please Login again.')
        //   }
        // commit(SetUserData, 'wt_admin')
        resolve('data')
        // }).catch(error => {
        //   reject(error)
        // })
      })
    }
  },
  getters: {
    token(state: { token: any }) {
      return state.token
    },
    user(state: { user: any }) {
      return state.user
    },
    getReset(state: { resetPassword: any }) {
      return state.resetPassword
    }
  }
}
