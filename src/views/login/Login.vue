<template>
  <div class="login-page">
    <div class="login-box">
      <h1>登录</h1>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input type="password" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item :label="'密\xa0\xa0\xa0\xa0码'" prop="password">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="captchacode">
          <el-input v-model.number="ruleForm.captchacode"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      ruleForm: {
        username: '',
        password: '',
        captchacode: ''
      },
      rules: {
        username: [{ required: true, message: '用户名不能为空！', trigger: 'blur' }],
        password: [{ required: true, message: '密码不能为空！', trigger: 'blur' }],
        captchacode: [{ required: true, message: '验证码不能为空！', trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm () {}
  }
}
</script>

<style lang="less" scoped>
.login-page {
  position: relative;
  width: 100%;
  height: 100%;
  background: url("../../assets/images/loginBg.jpg") center top no-repeat;

  .login-box {
    width: 400px;
    background: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    padding-right: 30px;
    padding-top: 20px;
    border-radius: 20px;

    h1 {
      text-align: center;
      margin-bottom: 20px;
      padding-left: 40px;
      font-size: 20px;
    }
  }
}
</style>
