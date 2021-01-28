<template>
  <div class="selfPickerContainer" :class="border ? 'van-hairline--bottom':''">
    <van-field
      :value="label"
      readonly
      colon
      clickable
      v-bind="$attrs"
      @click="() => { !readOnly && showPickerFn() }"
    />
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        ref="picker"
        :value-key="value"
        show-toolbar
        :columns="columns"
        @confirm="onConfirm"
        @cancel="showPicker = false"
      />
    </van-popup>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'
@Component({
  name: 'SelfPicker'
})
export default class extends Vue {
  @Prop({ default: () => ({}), required: true }) private form!: any;
  @Prop({ default: () => [], required: true }) private columns!: any[];
  @Prop({ default: '', required: true }) private pickerKey!: string;
  @Prop({ default: 'text', required: true }) private value!: string;
  @Prop({ default: false }) private isComputed!: [boolean, string, number];
  @Prop({ default: true }) private border!: boolean;
  @Prop({ default: false }) private readOnly!: boolean;
  @Prop({ default: () => ({
    label: 'label',
    value: 'value'
  }) }) private props!: any;

  private showPicker = false;
  private index = 0;
  private isFirst = false;
  private label = '';

  @Watch('isComputed')
  onChangeValue(val: unknown) {
    if (val) {
      this.getLabel()
    }
  }
  // 回显第一次获取label和索引index
  private getLabel() {
    let index = this.columns.findIndex((item: any) => item[this.props.value] === this.form[this.pickerKey])
    if (index === -1) {
      index = 0
      this.label = ''
    } else {
      this.index = index
      this.isFirst = true
      this.label = this.columns[index][this.props.label]
    }
  }
  // 打开picker
  private showPickerFn() {
    this.$emit('changelabel', this.pickerKey)
    this.showPicker = true
    if (this.isFirst) { // 第一次回显
      setTimeout(() => {
        (this.$refs.picker as any).setIndexes([this.index])
        this.isFirst = false
      }, 20)
    }
  }
  // 点击确定
  private onConfirm(obj: any, index: number) {
    this.$emit('changevalue')
    this.form[this.pickerKey] = obj[this.props.value]
    this.index = index
    this.showPicker = false
    setTimeout(() => {
      this.label = obj[this.props.label]
    }, 20)
  }
  private resetLabel() {
    this.label = ''
  }
}
</script>

