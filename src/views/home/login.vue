<template>
  <div class="login">
    <div class="login-wrap card">
      <h2>欢迎使用~</h2>
      <h3>后台管理平台</h3>
      <el-form
        ref="loginForm"
        :model="loginData"
        class="user-form"
        :rules="loginRules"
      >
        <el-form-item prop="username">
          <el-input
            v-model="loginData.username"
            type="text"
            clearable
            prefix-icon="el-icon-user-solid"
            placeholder="请输入用户名"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginData.password"
            type="password"
            clearable
            placeholder="请输入登录密码"
            prefix-icon="el-icon-lock"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            style="width: 100%"
            :loading="loading"
            @click="login"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      redirect: null,
      loading: false,
      loginData: {
        username: 'admin',
        password: '123456'
      },
      loginRules: {
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '输入登录密码',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {
    indexPath() {
      return this.$store.getters.indexPath
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        const arr = route.fullPath.split('redirect=')
        if (arr.length === 2) {
          this.redirect = this.$utf8to16(arr[1])
        }
      },
      immediate: true
    }
  },
  mounted() {
    // 监听回车键
    document.onkeydown = (e) => {
      const keyCode = window.event.keyCode
      if (keyCode === 13) {
        this.login()
      }
    }
  },
  methods: {
    login() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true
          this.$store
            .dispatch('user/login', this.loginData)
            .then(() => {
              this.loading = false
              this.$emit('loginSuccess')
              this.$router.push({
                path: this.redirect || this.indexPath
              })
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          return false
        }
      })
    },
    register() {
      this.$emit('register')
    },
    resetPwd() {
      this.$emit('resetPwd')
    }
  }
}
</script>

<style scoped lang="scss">
.login {
  padding-top: 120px;
}

.login-wrap {
  width: 440px;
  margin: 0 auto;
  padding: 20px 50px;
}

h2 {
  font-size: 24px;
  font-weight: normal;
  color: $fontColor;
  line-height: 1.8;
}

h3 {
  font-size: 16px;
  font-weight: normal;
  color: $fontColor;
  margin-bottom: 20px;
}

.tips {
  line-height: 1;
  font-size: 12px;
  position: relative;
  top: -10px;

  span {
    cursor: pointer;
  }

  &.tips1 {
    font-size: 14px;
    text-align: center;
    margin-top: 63px;

    span {
      color: $mainColor;
    }
  }
}
</style>
