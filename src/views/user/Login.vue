<template>
  <div>
    <h1>Login</h1>
    <Form ref="form" style="margin: 0 auto" background="rgba(0,0,0,0)" label-color="#000" border="0" :shadow="false" :form="form" :width="552" label-position="top" :label-width="220"></Form>
    <Button theme="primary" :width="502" style="margin: 0 auto" @click="loginSubmit">Sign In</Button>
  </div>
</template>

<script>
import { login } from '@/assets/js/Luna-GetData/url'
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
                console.log(event)
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
          this.$Message.success({ content: 'Login Success' })
          this.$router.push('/')
        } else {
          if (res.code === 1) {
            this.$Message.error({ content: this.$t('lang.login.alert1') })
          } else if (res.code === 2) {
            this.$Message.error({ content: this.$t('lang.login.alert2') })
          } else if (res.code === 3) {
            this.$Message.error({ content: this.$t('lang.login.alert3') })
          } else if (res.code === 4) {
            this.$Message.error({ content: this.$t('lang.login.alert4') })
          } else if (res.code === 6) {
            this.$Message.error({ content: this.$t('lang.login.alert6') })
          } else {
            this.$Message.error({ content: this.$t('lang.unknownError') })
          }
        }
      })
    }
  }
}
</script>

<style scoped></style>
