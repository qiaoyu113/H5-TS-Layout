// 相关文档 https://vuex.vuejs.org/zh/api/#subscribeaction
const NAMESPACE = '@@loading'

function shouldEffect({ type }: any, includes: string | any[], excludes: string | any[]) {
  if (includes.length === 0 && excludes.length === 0) {
    return true
  }

  if (includes.length > 0) {
    return includes.indexOf(type) > -1
  }

  return excludes.length > 0 && excludes.indexOf(type) === -1
}

const createLoadingPlugin = ({
  namespace = NAMESPACE,
  includes = [],
  excludes = []
} = {}) => {
  return (store: { state: { [x: string]: any }; registerModule: (arg0: string, arg1: { namespaced: boolean; state: { global: boolean; effects: {} }; mutations: { SHOW(state: any, { payload }: { payload: any }): void; HIDE(state: any, { payload }: { payload: any }): void } }) => void; subscribeAction: (arg0: { before: (action: any) => void; after: (action: any) => void }) => void; commit: (arg0: { type: string; payload: any }) => void }) => {
    if (store.state[namespace]) {
      throw new Error(
        `createLoadingPlugin: ${namespace} exited in current store`
      )
    }

    store.registerModule(namespace, {
      namespaced: true,
      state: {
        global: false,
        effects: {

        }
      },
      mutations: {
        SHOW(state: { global: boolean; effects: any }, { payload }: any) {
          state.global = true
          state.effects = {
            ...state.effects,
            [payload]: true
          }
        },
        HIDE(state: { global: boolean; effects: any }, { payload }: any) {
          state.global = false
          state.effects = {
            ...state.effects,
            [payload]: false
          }
        }
      }
    })

    store.subscribeAction({
      before: (action: { type: any }) => {
        // console.log(`before action ${action.type}`)
        if (shouldEffect(action, includes, excludes)) {
          store.commit({ type: namespace + '/SHOW', payload: action.type })
        }
      },
      after: (action: { type: any }) => {
        // console.log(`after action ${action.type}`)
        if (shouldEffect(action, includes, excludes)) {
          store.commit({ type: namespace + '/HIDE', payload: action.type })
        }
      }
    })
  }
}

export default createLoadingPlugin
