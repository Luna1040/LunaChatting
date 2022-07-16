<template>
  <div class="login">
    <div class="logoArea">
      <img src="../../assets/icons/Logo.svg" alt="" />
      <p>Powered by Luna Garden</p>
      <p>Designed by Luna</p>
    </div>
    <div class="mainArea">
      <h1>Luna Chatting</h1>
      <span>Login</span>
      <Form ref="form" style="margin: 0 auto; padding-bottom: 0" background="rgba(0,0,0,0)" label-color="#000" border="0" :shadow="false" :form="form" label-position="top" :label-width="220"></Form>
      <Button theme="primary" :font-size="18" style="margin: 0 auto" @click="loginSubmit">Sign In</Button>
      <p>
        Don’t have an account?
        <router-link to="/register">Sign up</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { login, publicApi } from '@/assets/js/Luna-GetData/url'

export default {
  name: 'Login',
  data() {
    return {
      loginFormData: {
        userName: '',
        password: '',
        company: '_1040657022X'
      },
      form: []
    }
  },
  created() {
    this.form = [
      {
        title: 'User Name',
        validate: 'userName',
        validateOnChange: true,
        required: true,
        emptyWarning: '123',
        // description: this.logLang.userNameDesc,
        validateMethods: [
          {
            type: 'length',
            max: 20,
            maxErrText: '123',
            min: 4,
            minErrText: '123'
          }
        ],
        render: (h, params) => {
          return h('Input', {
            props: {
              value: this.loginFormData.userName,
              background: 'rgba(255,255,255,0.3)',
              validateOnChange: params.validateOnChange,
              validateMethods: params.validateMethods,
              width: '100%'
            },
            on: {
              input: (event) => {
                this.loginFormData.userName = event
              },
              onValidate: (value) => {
                params.data.errStatus = value.errStatus
                params.data.errText = value.errText
              }
            }
          })
        },
        errStatus: false,
        errText: ''
      },
      {
        title: 'Password',
        validate: 'password',
        validateOnChange: true,
        required: true,
        emptyWarning: '123',
        description: '123',
        validateMethods: [
          {
            type: 'length',
            max: 24,
            maxErrText: '123',
            min: 6,
            minErrText: '123'
          },
          {
            type: 'noChinese',
            errText: '123'
          },
          {
            type: 'noChineseChara',
            errText: '123'
          }
        ],
        render: (h, params) => {
          return h('Input', {
            props: {
              value: this.loginFormData.password,
              type: 'password',
              validateOnChange: params.validateOnChange,
              validateMethods: params.validateMethods,
              width: '100%',
              background: 'rgba(255,255,255,0.3)'
            },
            on: {
              input: (event) => {
                this.loginFormData.password = event
              },
              'keyup.enter': (event) => {
                this.loginConfirm()
              },
              onValidate: (value) => {
                params.data.errStatus = value.errStatus
                params.data.errText = value.errText
              }
            }
          })
        },
        errStatus: false,
        errText: ''
      }
    ]
  },
  methods: {
    loginSubmit() {
      const params = JSON.parse(JSON.stringify(this.loginFormData))
      params.password = this.encrypt(params.password)
      this.getData(login.loginConfirm, params).then((res) => {
        if (res.success) {
          res.data.timeStamp = new Date().getTime()
          this.$Message.success({ content: 'Login Success' })
          this.setLocal('userInfo', res.data)
          this.getData(publicApi.online, { id: res.data.id, userName: res.data.userName, userIcon: 'https://v.api.aa1.cn/api/api-tx/index.php?wpon=aosijur75fi5huyty5f', userSign: 'userSign' }).then((res) => {
            if (res.success) {
              this.$router.push('/')
            }
          })
        } else {
          if (res.code === 1) {
            this.$Message.error({ content: "this.$t('lang.login.alert1')" })
          } else if (res.code === 2) {
            this.$Message.error({ content: "this.$t('lang.login.alert2')" })
          } else if (res.code === 3) {
            this.$Message.error({ content: "this.$t('lang.login.alert3')" })
          } else if (res.code === 4) {
            this.$Message.error({ content: "this.$t('lang.login.alert4')" })
          } else if (res.code === 6) {
            this.$Message.error({ content: "this.$t('lang.login.alert6')" })
          } else {
            this.$Message.error({ content: "this.$t('lang.unknownError')" })
          }
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.login {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logoArea {
  position: absolute;
  bottom: 32px;
  right: 32px;
  text-align: center;
  z-index: -1;
}

.mainArea {
  text-align: center;

  h1 {
    font-size: 48px;
  }

  > p {
    font-size: 16px;
    margin-top: 12px;
  }

  .lunaForm {
    width: 480px !important;
  }

  .lunaButton {
    width: 430px !important;
  }
}

@media only screen and(max-width: 400px) {
  .logoArea {
    position: absolute;
    top: 32px;
    right: 0;
    text-align: center;
    width: 100%;
  }
  .mainArea {
    .lunaForm {
      width: 300px !important;
    }

    .lunaButton {
      width: 250px !important;
    }
  }
}
</style>
