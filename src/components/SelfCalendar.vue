<template>
  <div class="selfCalendarContainer" :class="border ? 'van-hairline--bottom':''">
    <van-field
      :value="label"
      readonly
      colon
      clickable
      v-bind="$attrs"
      @click="showPickerFn"
    />
    <van-calendar v-model="showPicker" :min-date="minTime" :default-date="form[pickerKey]" type="range" :allow-same-day="true" @confirm="onConfirm" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'

import { parseTime } from '@/utils/index'
@Component({
  name: 'SelfCalendar'
})
export default class extends Vue {
  @Prop({ default: () => ({}), required: true }) private form!: any;
  @Prop({ default: '', required: true }) private pickerKey!: string;
  @Prop({ default: false }) private isComputed!: boolean;
  @Prop({ default: false }) private border!: boolean;
  @Prop({ default: () => new Date() }) private minDate!: Date;

  private showPicker = false;
  private label = '';
  private minTime = new Date();

  @Watch('isComputed')
  onChangeValue(val: boolean) {
    if (val) {
      this.getLabel()
    }
  }
  @Watch('minDate')
  setMinTime(val: Date) {
    if (val) {
      this.minTime = val
    }
  }

  // 获取label
  private getLabel() {
    this.label = `${parseTime(this.form[this.pickerKey][0], '{y}/{m}/{d}')}-${parseTime(this.form[this.pickerKey][1], '{y}/{m}/{d}')}`
  }
  // 打开picker
  private showPickerFn() {
    this.showPicker = true
  }
  // 点击确定
  private onConfirm(obj: any) {
    const startName = `${obj[0].getFullYear()}/${obj[0].getMonth() + 1}/${obj[0].getDate()}`
    obj[0] = new Date(obj[0].setHours(0, 0, 0))
    obj[1] = new Date(obj[1].setHours(23, 59, 59))
    const endName = `${obj[1].getFullYear()}/${obj[1].getMonth() + 1}/${obj[1].getDate()}`
    this.label = `${startName}-${endName}`
    this.form[this.pickerKey] = obj
    this.showPicker = false
  }
}

</script>

