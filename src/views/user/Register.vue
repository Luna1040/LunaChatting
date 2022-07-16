<template>
  <div class="register">
    <div class="logoArea">
      <img src="../../assets/icons/Logo.svg" alt="" />
      <p>Powered by Luna Garden</p>
      <p>Designed by Luna</p>
    </div>
    <div class="mainArea">
      <h1>Luna Chatting</h1>
      <span>Register</span>
      <Form ref="form" style="margin: 0 auto" background="rgba(0,0,0,0)" label-color="#000" border="0" :shadow="false" :form="form" label-position="top" :label-width="220"></Form>
      <Button theme="primary" style="margin: 0 auto" @click="registerSubmit" :loading="loading">Sign Up</Button>
      <p>
        Already have an account?
        <router-link to="/login">Sign in</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { login, publicApi } from '@/assets/js/Luna-GetData/url'

export default {
  name: 'Register',
  data() {
    return {
      form: [],
      registerFormData: {
        company: '_1040657022X',
        userName: '',
        password: '',
        userIcon: '',
        userSign: '',
        customSetting: {},
        collection: []
      },
      loading: false
    }
  },
  created() {
    this.form = [
      {
        title: 'User Name',
        validate: 'userName',
        validateOnChange: true,
        required: true,
        emptyWarning: 'User Name cannot be empty',
        description: 'This is your name for login and other people will see and call you, you can change it at any time',
        validateMethods: [
          {
            type: 'length',
            max: 20,
            maxErrText: 'User Name cannot longer than 20 chara',
            min: 4,
            minErrText: 'User Name cannot lesser than 4 chara'
          },
          {
            type: 'noChara',
            errText: 'User Name cannot contain special letters'
          }
        ],
        render: (h, params) => {
          return h('Input', {
            props: {
              value: this.registerFormData.userName,
              theme: this.theme,
              background: 'rgba(255,255,255,0.3)',
              validateOnChange: params.validateOnChange,
              validateMethods: params.validateMethods,
              width: '100%'
            },
            on: {
              input: (event) => {
                this.registerFormData.userName = event
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
        emptyWarning: 'Password cannot be empty',
        description: 'Password is the safety of your account',
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
              value: this.registerFormData.password,
              theme: this.theme,
              type: 'password',
              validateOnChange: params.validateOnChange,
              validateMethods: params.validateMethods,
              width: '100%',
              background: 'rgba(255,255,255,0.3)'
            },
            on: {
              input: (event) => {
                this.registerFormData.password = event
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
    registerSubmit() {
      if (this.$refs.form.examine(this.registerFormData)) {
        // Error
        this.$Message.error({ content: '请检查填写错误项！' })
        return
      }
      this.loading = true
      const params = JSON.parse(JSON.stringify(this.registerFormData))
      params.id = this.uuidGet()
      params.password = this.encrypt(params.password)
      params.timeStamp = new Date().getTime()
      this.getData(login.registerConfirm, params)
        .then((res) => {
          if (res.success) {
            this.$Message.success({ content: 'Register Success!' })
            localStorage.setItem('userInfo', JSON.stringify(res.data))
            this.getData(publicApi.online, { id: res.data.id, userName: res.data.userName }).then((res) => {
              if (res.success) {
                this.$router.push('/')
              }
            })
          } else {
            if (res.code === 1) {
              this.$Message.error({ content: "this.$t('lang.register.alert1')" })
            } else if (res.code === 2) {
              this.$Message.error({ content: "this.$t('lang.register.alert2')" })
            } else if (res.code === 3) {
              this.$Message.error({ content: "this.$t('lang.register.alert3')" })
            } else if (res.code === 5) {
              this.$Message.error({ content: "this.$t('lang.register.alert5')" })
            } else if (res.code === 6) {
              this.$Message.error({ content: "this.$t('lang.register.alert6')" })
            } else if (res.code === 19) {
              this.$Message.error({ content: "this.$t('lang.register.alert19')" })
            } else if (res.code === 20) {
              this.$Message.error({ content: "this.$t('lang.register.alert20')" })
            } else {
              this.$Message.error({ content: "this.$t('lang.unknownError')" })
            }
          }
          this.loading = false
        })
        .catch((err) => {
          this.$Message.error({ content: err })
          this.loading = false
        })
    }
  }
}
</script>

<style scoped lang="scss">
.register {
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
