import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'
import store from '@/store'

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface ITagsViewState {
  cachedViews: (string | undefined)[];
}

@Module({ dynamic: true, store, name: 'tagsView' })
class TagsView extends VuexModule implements ITagsViewState {
  public cachedViews: (string | undefined)[] = []

  @Mutation
  private ADD_CACHED_VIEW(view: any) {
    if (this.cachedViews.includes(view.name)) return
    if (!view.meta.noCache) {
      this.cachedViews.push(view.name)
    }
  }

  @Mutation
  private DEL_CACHED_VIEW(view: any) {
    for (const [i, v] of this.cachedViews.entries()) {
      if (v === view.name) {
        this.cachedViews.splice(i, 1)
        break
      }
    }
  }

  @Mutation
  private DEL_OTHERS_CACHED_VIEWS(view: any) {
    for (const [i, v] of this.cachedViews.entries()) {
      if (v === view.name) {
        this.cachedViews = this.cachedViews.slice(i, i + 1)
        break
      }
    }
  }

  @Mutation
  private DEL_ALL_CACHED_VIEWS() {
    this.cachedViews = []
  }

  @Action
  public addView(view: any) {
    this.ADD_CACHED_VIEW(view)
  }

  @Action
  public delView(view: any) {
    this.DEL_CACHED_VIEW(view)
  }

  @Action
  public delCachedView(view: any) {
    this.DEL_CACHED_VIEW(view)
  }

  @Action
  public delOthersViews(view: any) {
    this.DEL_OTHERS_CACHED_VIEWS(view)
  }

  @Action
  public delAllViews() {
    this.DEL_ALL_CACHED_VIEWS()
  }

  @Action
  public delAllCachedViews() {
    this.DEL_ALL_CACHED_VIEWS()
  }
}

export const TagsViewModule = getModule(TagsView)

