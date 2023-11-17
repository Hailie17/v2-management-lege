<template>
  <div class="login-page">
    <div class="login-box">
      <h1>登录</h1>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item :label="'密\xa0\xa0\xa0\xa0码'" prop="password">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="captchacode">
          <div class="captcha-box">
            <el-input v-model.number="ruleForm.captchacode"></el-input>
            <img height=40 :src="captchaSrc" alt="" @click="getCaptchaCode">
          </div>
        </el-form-item>
        <el-form-item id="login-btn-box">
          <el-button class="login-btn" type="primary" @click="submitForm('ruleForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { validateUsername } from '@/utils/validate'
import { getCaptchaCodeApi } from '@/request/api'
export default {
  data () {
    return {
      ruleForm: {
        username: '',
        password: '',
        captchacode: ''
      },
      rules: {
        username: [{ required: true, message: '用户名不能为空！', trigger: 'blur' }, { validator: validateUsername, trigger: 'blur' }],
        password: [{ required: true, message: '密码不能为空！', trigger: 'blur' }],
        captchacode: [{ required: true, message: '验证码不能为空！', trigger: 'blur' }]
      },
      captchaSrc: ''
    }
  },
  created () {
    this.getCaptchaCode()
  },
  methods: {

    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          this.$message({
            message: '请输入正确的信息后再进行提交',
            type: 'warning'
          })
          console.log('error submit!!')
          return false
        }
      })
    },
    getCaptchaCode () {
      getCaptchaCodeApi().then((res) => {
        if (res.data.code === 200) {
          this.captchaSrc = 'data:image/gif;base64,' + res.data.img
        }
      })
    }
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

    .captcha-box {
      display: flex;
      img {
        margin-left: 20px;
      }
    }

    .login-btn {
      width: 100%;
    }
    /* element ui 样式穿透 */
    :deep #login-btn-box .el-form-item__content {
      margin-left: 40px !important;
    }
  }
}
</style>
