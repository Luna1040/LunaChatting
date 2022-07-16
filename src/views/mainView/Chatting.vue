<template>
  <div>
    <p v-if="userInfo.collection.length !== 0">日期过滤器{{ userInfo.collection[0].AddTime | countDate }}</p>
    <Input v-model="chatBoxData" />
    <Button theme="primary" @click="sendMessage">发送</Button>
    <ul>
      <li @click="currentChattingUser = i.id" v-for="i in currentOnlineUser" :class="{ active: currentChattingUser === i.id }">{{ i.userName }}</li>
    </ul>
  </div>
</template>

<script>
import { chat, publicApi } from '../../assets/js/Luna-GetData/url'

const ws = new WebSocket('ws://192.168.0.100:3001')

export default {
  name: 'Chatting',
  data() {
    return {
      chatBoxData: '',
      userInfo: {
        id: 111,
        userName: 'Emify',
        userIcon: 'http://192.168.0.100:3000/res/userIcons/userIcon.jpg',
        userSign: 'Life is Strange',
        customSetting: {
          inkMode: true,
          targetChatColor: '#ff9200',
          targetChatFontColor: '#ffffff',
          myChatColor: '#EB7290',
          myChatFontColor: '#FFFFFF',
          chattingBackgroundColor: '#FFFFFF',
          fontsize: '16px',
          alertMusic: 'http://192.168.0.100:3000/audio/Diamond.wav'
        },
        collection: [
          {
            type: 'image',
            content: 'http://192.168.0.100:3000/res/userIcons/2.PoliceDetail.jpg',
            AddTime: 1472048779952,
            from: '222'
          },
          {
            type: 'text',
            content: '123456',
            AddTime: 1472048788952,
            from: '222'
          },
          {
            type: 'audio',
            content: 'http://192.168.0.100:3000/audio/Diamond.wav',
            AddTime: 1472048798952,
            from: '222'
          },
          {
            type: 'video',
            content: 'http://192.168.0.100:3000/audio/Diamond.wav',
            AddTime: 1472048808952,
            from: '222'
          },
          {
            type: 'file',
            content: 'http://192.168.0.100:3000/audio/Diamond.wav',
            AddTime: 1472048808952,
            from: '222'
          }
        ]
      },
      chatListAll: [
        {
          id: '111_222',
          chatList: [
            {
              id: '111',
              type: 'text',
              content: '第一句话',
              timeStamp: 1472048808952
            },
            {
              id: '222',
              type: 'text',
              content: '我的第一句话',
              timeStamp: 1472049808952
            },
            {
              id: '111',
              type: 'image',
              content: 'http://192.168.0.100:3000/res/userIcons/userIcon.jpg',
              timeStamp: 1472058808952
            },
            {
              id: '111',
              type: 'audio',
              content: 'http://192.168.0.100:3000/audio/Diamond.wav',
              timeStamp: 1472059808952
            },
            {
              id: '111',
              type: 'video',
              content: 'http://192.168.0.100:3000/audio/Diamond.wav',
              timeStamp: 1472060808952
            },
            {
              id: '111',
              type: 'file',
              content: 'http://192.168.0.100:3000/audio/Diamond.wav',
              timeStamp: 1472061808952
            }
          ]
        },
        {
          id: '222_333',
          chatList: [
            {
              id: '333',
              type: 'text',
              content: '第一句话',
              timeStamp: 1472048808952
            },
            {
              id: '222',
              type: 'text',
              content: '我的第一句话',
              timeStamp: 1472049808952
            },
            {
              id: '222',
              type: 'image',
              content: 'http://192.168.0.100:3000/res/userIcons/userIcon.jpg',
              timeStamp: 1472058808952
            },
            {
              id: '111',
              type: 'audio',
              content: 'http://192.168.0.100:3000/audio/Diamond.wav',
              timeStamp: 1472059808952
            },
            {
              id: '111',
              type: 'video',
              content: 'http://192.168.0.100:3000/audio/Diamond.wav',
              timeStamp: 1472060808952
            },
            {
              id: '111',
              type: 'file',
              content: 'http://192.168.0.100:3000/audio/Diamond.wav',
              timeStamp: 1472061808952
            }
          ]
        }
      ],
      currentOnlineUser: [
        {
          id: '111',
          userName: 'Luna',
          userIcon: 'https://v.api.aa1.cn/api/api-tx/index.php?wpon=aosijur75fi5huyty5f'
        },
        {
          id: '222',
          userName: 'Emify',
          userIcon: 'https://v.api.aa1.cn/api/api-tx/index.php?wpon=aosijur75fi5huyty5f'
        },
        {
          id: '333',
          userName: '花神',
          userIcon: 'https://v.api.aa1.cn/api/api-tx/index.php?wpon=aosijur75fi5huyty5f'
        },
        {
          id: '444',
          userName: '依芈',
          userIcon: 'https://v.api.aa1.cn/api/api-tx/index.php?wpon=aosijur75fi5huyty5f'
        }
      ],
      currentChattingUser: ''
    }
  },
  created() {
    this.userInfo = this.getLocal('userInfo')
    this.getCurrentOnlineUser()
    this.initWebSocket()
    // this.getAllChatList()
  },
  filters: {
    countDate(value) {
      let time = new Date(value)
      let str = time.toLocaleDateString().replace(/\//g, '-') + ' ' + time.toTimeString().substr(0, 8)
      return str
    }
  },
  methods: {
    //Alert Music(Reading User Custom Profile)
    playAlertSound() {
      new Audio(this.userInfo.customSetting.alertMusic).play()
    },
    //Get Online User
    getCurrentOnlineUser() {
      this.getData(publicApi.online, {
        id: this.userInfo.id,
        userName: this.userInfo.userName,
        userIcon: 'https://v.api.aa1.cn/api/api-tx/index.php?wpon=aosijur75fi5huyty5f',
        userSign: 'userSign'
      }).then((res) => {
        if (res.success) {
          this.currentOnlineUser = res.data.currentOnlineUser
        }
      })
    },
    //WebSocket Module
    initWebSocket() {
      if (window.WebSocket) {
        ws.onopen = function (e) {
          console.log('Connect Success')
        }
        ws.onclose = function (e) {
          console.log('服务器关闭')
        }
        ws.onerror = function () {
          console.log('连接出错')
        }
        // 接收服务器的消息
        ws.onmessage = (e) => {
          let data = JSON.parse(e.data)
          if (data.WSType === 'message') {
          } else if (data.WSType === 'onlineUser') {
            this.currentOnlineUser = data.currentOnlineUser
          }
        }
      }
    },
    getAllChatList() {
      let params = {
        id: this.userInfo.id
      }
      this.getData(chat.getAllMessage, params)
    },
    countMyContacts() {},
    sendMessage() {
      let msg = {
        chatId: this.currentChattingUser,
        id: this.userInfo.id,
        type: 'text',
        myself: true,
        content: this.chatBoxData,
        timeStamp: Date.now()
      }
      this.getData(chat.sendMessage, msg).then((res) => {
        if (res.success) {
          this.currentChatListFinal.push(msg)
        } else {
          this.$Message.success({ content: 'Unknow error, please refresh the page or contact the administrator' })
        }
      })
    }
  }
}
</script>

<style scoped>
.myself {
  background: red;
}
.active {
  background: red;
}
</style>
