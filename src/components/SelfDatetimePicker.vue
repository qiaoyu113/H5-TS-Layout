<template>
  <div class="selfDatetimePickerContainer" :class="border ? 'van-hairline--bottom':''">
    <van-field
      :value="label"
      readonly
      colon
      clickable
      v-bind="$attrs"
      @click="showPickerFn"
    />
    <van-popup v-model="showPicker" position="bottom">
      <van-datetime-picker
        v-model="form[pickerKey]"
        type="date"
        title="选择年月日"
        :min-date="minTime"
        :max-date="maxTime"
        @confirm="onConfirm"
        @cancel="showPicker = false"
      />
    </van-popup>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'

import { parseTime } from '@/utils/index'

@Component({
  name: 'SelfDatetimePicker'
})

export default class extends Vue {
  @Prop({ default: () => ({}), required: true }) private form!: any;
  @Prop({ default: '', required: true }) private pickerKey!: string;
  @Prop({ default: false }) private isComputed!: boolean;
  @Prop({ default: false }) private border!: boolean;
  @Prop({ default: () => new Date() }) private minDate!: Date;
  @Prop({ default: () => new Date(2125, 12, 31) }) private maxDate!: Date;

  private showPicker = false;
  private label = '';
  private minTime = new Date();
  private maxTime = new Date(2125, 12, 31);

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
  @Watch('maxDate')
  setMaxTime(val: Date) {
    if (val) {
      this.maxTime = val
    }
  }

  // 获取label
  private getLabel() {
    this.label = `${parseTime(this.form[this.pickerKey], '{y}/{m}/{d}')}`
  }
  // 打开picker
  private showPickerFn() {
    this.showPicker = true
  }
  // 点击确定
  private onConfirm(obj: any) {
    this.label = `${obj.getFullYear()}/${obj.getMonth() + 1}/${obj.getDate()}`
    this.form[this.pickerKey] = obj
    this.showPicker = false
  }
}
</script>

