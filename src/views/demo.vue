<template>
  <div class="Demo">
    <h2>NavBar 导航</h2>
    <van-sticky :offset-top="0">
      <van-nav-bar title="标题标题" left-text="返回" right-text="按钮" left-arrow>
        <template #right>
          <div style="margin-right : 10px; color: #fff;font-size: 12px;">
            按钮
          </div>
          <div style="color: #fff; font-size: 12px;">
            更换加盟经理
          </div>
        </template>
      </van-nav-bar>
    </van-sticky>
    <h2>cell</h2>
    <van-cell is-link @click="showPopup">
      展示弹出层
    </van-cell>
    <br>
    <van-cell-group>
      <van-field v-model="value" label="文本" placeholder="请输入用户名" />
    </van-cell-group>
    <h2>按钮样式：</h2>
    <van-button block type="primary">
      提交
    </van-button>
    <br>
    <van-button plain block type="primary">
      重置
    </van-button>
    <br>
    <van-button block type="default">
      复制线路
    </van-button>
    <h2>tab</h2>
    <van-tabs v-model="active">
      <van-tab>
        <template #title>
          标签 1
        </template>
        内容 1
      </van-tab>
      <van-tab>
        <template #title>
          标签 1<div class="van-info">
            99+
          </div>
        </template>
        内容 1
      </van-tab>
      <van-tab>
        <template #title>
          标签 2<div class="van-info">
            99+
          </div>
        </template>
        内容 2
      </van-tab>
      <van-tab>
        <template #title>
          标签 3<div class="van-info">
            99+
          </div>
        </template>
        内容 3
      </van-tab>
      <van-tab>
        <template #title>
          标签 4<div class="van-info">
            99+
          </div>
        </template>
        内容 4
      </van-tab>
    </van-tabs>
    <h2>搜索框</h2>
    <van-search v-model="value" show-action placeholder="请输入搜索关键词">
      <template #action>
        <div class="search">
          筛选
        </div>
      </template>
    </van-search>
    <br>
    <van-search v-model="value" show-action placeholder="请输入搜索关键词">
      <template #action>
        <div>
          搜索
        </div>
      </template>
    </van-search>
    <h2>Collapse 折叠面板</h2>
    <van-collapse v-model="activeNames">
      <van-collapse-item title="标题1" name="1">
        内容
      </van-collapse-item>
      <van-collapse-item title="标题2" name="2">
        内容
      </van-collapse-item>
      <van-collapse-item title="标题3" name="3" disabled>
        内容
      </van-collapse-item>
    </van-collapse>
    <h2>suggest</h2>
    <van-field
      v-model="driverId"
      readonly
      name="username"
      label="司机名"
      placeholder="用户名"
      :rules="[{required: true, message: '请填写用户名'}]"
      @click="suggestShow = true"
    />
    <van-popup
      v-model="suggestShow"
      round
      position="bottom"
      :style="{ height: '90%',width: '100%' }"
    >
      <van-search
        v-model="searchValue"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @input="onSearch"
      ></van-search>
      <div>
        <van-cell v-for="item in 50" :key="item">
          {{ `测试哦` + item }}
        </van-cell>
      </div>
    </van-popup>
    <SelfPopup
      ref="container"
      :show.sync="show"
      form-ref="form"
      @submit="onSubmit"
      @reset="onReset"
    >
      <van-field
        v-model="ruleForm.username"
        name="username"
        label="用户名"
        placeholder="用户名"
        :rules="[{required: true, message: '请填写用户名'}]"
      />
      <van-field
        v-model="ruleForm.password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[{required: true, message: '请填写密码'}]"
      />
      <van-field
        v-model="ruleForm.username"
        name="username"
        label="用户名"
        placeholder="用户名"
        :rules="[{required: true, message: '请填写用户名'}]"
      />
      <van-field
        v-model="ruleForm.password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[{required: true, message: '请填写密码'}]"
      />
      <van-field
        v-model="ruleForm.username"
        name="username"
        label="用户名"
        placeholder="用户名"
        :rules="[{required: true, message: '请填写用户名'}]"
      />
      <van-field
        v-model="ruleForm.password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[{required: true, message: '请填写密码'}]"
      />
      <van-field
        v-model="ruleForm.username"
        name="username"
        label="用户名"
        placeholder="用户名"
        :rules="[{required: true, message: '请填写用户名'}]"
      />
      <van-field
        v-model="ruleForm.password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[{required: true, message: '请填写密码'}]"
      />
      <van-field
        v-model="ruleForm.username"
        name="username"
        label="用户名"
        placeholder="用户名"
        :rules="[{required: true, message: '请填写用户名'}]"
      />
      <van-field
        v-model="ruleForm.password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[{required: true, message: '请填写密码'}]"
      />
      <van-field
        v-model="ruleForm.username"
        name="username"
        label="用户名"
        placeholder="用户名"
        :rules="[{required: true, message: '请填写用户名'}]"
      />
      <van-field
        v-model="ruleForm.password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[{required: true, message: '请填写密码'}]"
      />
      <van-field
        v-model="ruleForm.username"
        name="username"
        label="用户名"
        placeholder="用户名"
        :rules="[{required: true, message: '请填写用户名'}]"
      />
      <van-field
        v-model="ruleForm.password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[{required: true, message: '请填写密码'}]"
      />
      <van-field
        v-model="ruleForm.username"
        name="username"
        label="用户名"
        placeholder="用户名"
        :rules="[{required: true, message: '请填写用户名'}]"
      />
      <van-field
        v-model="ruleForm.password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[{required: true, message: '请填写密码'}]"
      />
      <van-field
        v-model="ruleForm.username"
        name="username"
        label="用户名"
        placeholder="用户名"
        :rules="[{required: true, message: '请填写用户名'}]"
      />
      <van-field
        v-model="ruleForm.password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[{required: true, message: '请填写密码'}]"
      />
    </SelfPopup>

    <van-button type="primary" block @click="showModal=true">
      点击
    </van-button>
    <Suggest
      v-model="showModal"
      :options="options"
      type="selectName"
      @keyWordValue="handleSearchChange"
      @finish="handleValueClick"
      @closed="showModal=false"
    />
  </div>
</template>

<script>
import SelfPopup from '@/components/SelfPopup'
import Suggest from '@/components/SuggestSearch.vue'
export default {
  components: {
    SelfPopup,
    Suggest
  },
  data() {
    return {
      driverId: '',
      searchValue: '',
      suggestShow: false,
      activeNames: ['1'],
      show: false,
      active: 2,
      value: '',
      ruleForm: {
        username: '123',
        password: ''
      },
      popup: '',
      showModal: false,
      options: [
        {
          label: 'tom',
          value: 1
        },
        {
          label: 'jack',
          value: 2
        },
        {
          label: 'lily',
          value: 3
        }
      ]
    }
  },
  mounted() {
    // console.log(this.$refs)
    this.popup = this.$refs.popup
  },
  methods: {
    showPopup() {
      this.show = true
    },
    onSubmit(value) {
      console.log('submit', value)
    },
    onReset(form) {
      console.log(form)
      console.log('reset')
    },
    onSearch() {
      if (this.searchValue) {
        console.log(this.searchValue)
      }
    },
    onCancel() {
      this.suggestShow = false
    },

    /**
     * 模糊查询
     */
    handleSearchChange(value) {
      console.log('这里面接口请求模糊查询:', value)
    },
    /**
     *点击某一项
     */
    handleValueClick(obj) {
      console.log('xxx:', obj)
    }
  }
}
</script>

<style lang="less" scoped>
.Demo {
  box-sizing: border-box;
  background-color: #f7f8fa;
  .search {
    position: relative;
    padding-right: 20px;
    &::after {
      position: absolute;
      top: 50%;
      right: 5px;
      margin-top: -5px;
      border: 3px solid;
      border-color: transparent transparent #3c4353 #3c4353;
      -webkit-transform: rotate(-45deg);
      transform: rotate(-45deg);
      opacity: 1;
      content: '';
    }
  }
}
</style>
