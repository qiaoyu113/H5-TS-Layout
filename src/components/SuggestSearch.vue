<template>
  <div class="SuggestContainer">
    <van-popup
      v-bind="$attrs"
      round
      position="bottom"
      :style="{ height: '90%',width: '100%' }"
      @opened="() => {
        $emit('opened')
      }"
      @click-overlay="closed"
    >
      <van-search
        v-model="keyWord"
        show-action
        :placeholder="placeholder ? placeholder : '请输入搜索关键词'"
        @cancel="onCancel"
        @input="onSearch"
      ></van-search>
      <template v-if="custom">
        <div v-if="isCellClick" class="wrapper">
          <template v-if="options.length > 0">
            <van-cell v-for="item in options" :key="item[props.value]" :title="titleFunc(item).title" @click="handleItemClick(item)">
              <template #right-icon>
                <van-icon v-if="item[pickerKey] === selectItem[pickerKey]" name="success" size="20px" />
              </template>
              <template #label>
                <span v-if="titleFunc(item).desc">{{ titleFunc(item).desc }}</span>
              </template>
            </van-cell>
          </template>
          <div v-else class="noData">
            {{ noData }}
          </div>
        </div>
        <div v-else class="wrapper">
          <template v-if="options.length> 0" class="content">
            <van-cell
              v-for="item in options"
              :key="item[props.value]"
              center
              :title="titleFunc(item).title"
              @click="() => {
                selectItem = item
              }"
            >
              <template #right-icon>
                <van-icon v-if="item[pickerKey] === selectItem[pickerKey]" name="success" size="20px" />
              </template>
              <template #label>
                <span v-if="titleFunc(item).desc">{{ titleFunc(item).desc }}</span>
              </template>
            </van-cell>
          </template>
          <div v-else class="noData">
            {{ noData }}
          </div>
          <div class="btns">
            <van-button
              @click="handleCancelClick"
            >
              取消
            </van-button>
            <van-button type="primary" @click="handleItemClick(selectItem)">
              提交
            </van-button>
          </div>
        </div>
      </template>
      <div v-else class="wrapper">
        <div v-if="options.length > 0">
          <van-cell v-for="item in options" :key="item[props.value]" @click="handleItemClick(item)">
            {{ item[props.label] }}
          </van-cell>
        </div>
        <div v-else class="noData">
          {{ noData }}
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script lang="ts">
import { debounce } from '@/utils/index'
import { Component, Prop, Vue } from 'vue-property-decorator'
@Component({
  name: 'SuggestSearch'
})
export default class extends Vue {
  @Prop({ default: () => [], required: true }) private options!: any;
  @Prop({ default: '' }) private type!: string;
  @Prop({ default: () => ({
    value: 'value',
    label: 'label'
  }) }) private props!: any;
  @Prop({ default: '' }) private placeholder!: string;
  @Prop({ default: true }) private isCellClick!: boolean;
  @Prop({ default: 'value' }) private pickerKey!: string;
  @Prop({ default: () => () => {} }) private titleFunc!: Function;
  @Prop({ default: false }) private custom!: boolean;
  @Prop({ default: '请选择' }) private tipMsg!: string;
  @Prop({ default: '暂无数据' }) private noData!: string;

  private keyWord = '';
  private selectItem = {};
  /**
   * input发生变化
   */
  private onSearch() {
    debounce(() => {
      this.$emit('keyWordValue', this.keyWord)
    }, 200)
  }
  /**
   * 点击取消
   */
  private onCancel() {
    this.closed()
  }
  /**
   * 点击每一项
   */
  private handleItemClick(item: any) {
    if (this.type) {
      item.type = this.type
    }
    if (item[this.props.value]) {
      this.$emit('finish', item)
      this.closed()
    } else {
      this.$toast.fail(this.tipMsg)
    }
  }
  /**
   * 关闭popup
   */
  private closed() {
    this.keyWord = ''
    this.$emit('closed')
  }
  // 取消
  private handleCancelClick() {
    this.selectItem = {}
    this.closed()
  }

  beforeDestroy() {
    this.selectItem = {}
  }
}
</script>

<style lang='less' scoped>
.SuggestContainer {
  .wrapper {
    padding-bottom: 20px;
    box-sizing: border-box;
    position: relative;
    height: calc(100% - 54px);
    .content {
      overflow-y: auto;
      height:calc(100% - 50px);
    }
    .btns {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 20px;
      display: flex;
      justify-content: space-around;
      button {
        width:48%;
      }
    }
  }
  .noData {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    font-size: 16px;
    color: #666;
  }
}

</style>
