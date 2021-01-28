<template>
  <div class="SelfPopup">
    <van-popup
      v-model="showPopup"
      :position="position"
    >
      <van-form
        :ref="formRef"
        :show-error="false"
        v-bind="$attrs"
        v-on="$listeners"
      >
        <div class="top">
          <van-cell-group>
            <slot />
          </van-cell-group>
        </div>
        <div class="bottom">
          <van-button block plain type="primary" size="normal" native-type="button" @click="onReset">
            重置
          </van-button>
          <van-button v-preventreclick block type="primary" size="normal" native-type="submit">
            查询
          </van-button>
        </div>
      </van-form>
    </van-popup>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'SelfPopup'
})

export default class extends Vue {
  @Prop({ default: false }) private show!: boolean;
  @Prop({ default: 'right' }) private position!: string;
  @Prop({ default: 'form' }) private formRef!: string;

  get showPopup() {
    return this.show
  }
  set showPopup(val) {
    this.$emit('update:show', val)
  }

  private onReset() {
    this.$emit('reset', this.$refs[this.formRef])
  }
  private onSubmit() {
    this.$emit('submit', this.$refs[this.formRef])
  }
}
</script>
<style lang="less" scoped>
.SelfPopup .van-form{
  display: flex;
  flex-direction: column;
  height: 100%;
}
.SelfPopup .top{
  flex: 1;
  overflow: auto;
}
.SelfPopup .bottom{
  padding: 10px 8px;
  display: flex;
  background-color: #fff;
}
.SelfPopup .van-button + .van-button{
  margin-left: 5px;
}
</style>
<style scoped>
.SelfPopup >>> .van-popup{
  width: 80%;
  height: 100vh;
  box-sizing: border-box;
}
</style>
