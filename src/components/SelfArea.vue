<template>
  <div class="selfAreaContainer" :class="border ? 'van-hairline--bottom':''">
    <van-field
      :value="label"
      readonly
      colon
      clickable
      v-bind="$attrs"
      @click="showPickerFn"
    />
    <van-popup v-model="showPicker" position="bottom">
      <van-area
        :value="getSelectCode"
        :area-list="areaList"
        :columns-placeholder="['请选择', '请选择', '请选择']"
        @confirm="onConfirm"
        @cancel="showPicker = false"
      />
    </van-popup>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'

import { GetAllAreaCode } from '@/api/common'

@Component({
  name: 'SelfArea'
})

export default class extends Vue {
  @Prop({ default: () => ({}), required: true }) private form!: any;
  @Prop({ default: '', required: true }) private pickerKey!: string;
  @Prop({ default: false }) private isComputed!: boolean;
  @Prop({ default: false }) private border!: boolean;
  @Prop({
    default: () => ({
      provinceAreaName: 'provinceAreaName',
      cityAreaName: 'cityAreaName',
      countyAreaName: 'countyAreaName'
    })
  }) private props!: Record<string, never>;

  private showPicker = false;
  private label = '';
  private columns = [];
  private areaList = {};
  private isEcho = true;

  @Watch('isComputed')
  onChangeValue(val: unknown) {
    if (val && this.isEcho) {
      this.getLabel()
    }
  }

  get getSelectCode() {
    if (this.form[this.pickerKey].length > 2) {
      return this.form[this.pickerKey][2] + ''
    } else if (this.form[this.pickerKey].length > 1) {
      return this.form[this.pickerKey][1] + ''
    } else if (this.form[this.pickerKey].length > 0) {
      return this.form[this.pickerKey][0] + ''
    }
    return ''
  }
  private async init() {
    try {
      const { data: res } = await GetAllAreaCode()
      this.areaList = res
    } catch (err) {
      console.log(`get all area code fail:${err}`)
    } finally {
      //
    }
  }
  // 获取label
  private async getLabel() {
    this.label = `${this.form[this.props.provinceAreaName]}/${this.form[this.props.cityAreaName]}/${this.form[this.props.countyAreaName]}`
  }
  // 打开picker
  private showPickerFn() {
    this.$emit('changelabel', this.pickerKey)
    this.showPicker = true
  }
  // 点击确定
  private onConfirm(obj: any) {
    this.form[this.pickerKey] = obj.map((item: any) => item && item.code).filter((item: any) => item)
    const label = obj.map((item: any) => item && item.name).filter((item: any) => item)
    this.label = label.join('/')
    this.showPicker = false
    this.isEcho = false
  }
  mounted() {
    this.init()
  }
}

</script>

