<template>
  <div>
    <h1>LunaChatting</h1>
    <Button theme="primary" @click="sendMessage('User1')">Send User1 Message</Button>
    <Button theme="primary" @click="sendMessage('User2')">Send User2 Message</Button>
    <Button theme="primary" @click="sendMessage('User3')">Send User3 Message</Button>
    <Button theme="primary" @click="sendMyMessage()">Send My Message</Button>
    <ul>
      <li v-for="i in userList" :key="'user' + i.id" @click="changeChattingUser(i.id)">
        {{ i.name }}
        <span v-show="i.unread !== 0">{{ i.unread }}</span>
      </li>
    </ul>
    <div class="chattingViewer">
      <h1 v-if="currentChatListFinal.length === 0">You Have no message yet.</h1>
      <ul>
        <li :class="{ myself: i.myself }" v-for="(i, index) in currentChatListFinal" :key="index">{{ i.content }}</li>
      </ul>
    </div>
    <p>Online user</p>
    <ul>
      <li v-for="i in onlineUser">{{ i.name }}</li>
    </ul>
  </div>
</template>

<script>
!(function () {
  // 添加事件监听
  document.addEventListener('visibilitychange', function () {
    let pageVisibility = document.visibilityState
    // 页面变为不可见时触发
    if (pageVisibility == 'hidden') {
      document.title = '主人，你去哪儿了？'
    }
    // 页面变为可见时触发
    if (pageVisibility == 'visible') {
      console.log(this.userInfo)
      document.title = '主人，你终于回来了？'
    }
  })
})()

import { chat, publicApi } from '../../assets/js/Luna-GetData/url'
const ws = new WebSocket('ws://localhost:3001')

export default {
  name: 'Chatting',
  data() {
    return {
      userInfo: {},
      onlineUser: [],
      userList: [
        { name: 'User1', id: 'User1', unread: 0 },
        { name: 'User2', id: 'User2', unread: 0 },
        { name: 'User3', id: 'User3', unread: 0 }
      ],
      currentChatList: {
        User1_62c3c28873784d62c4f10a44: [
          {
            type: 'text',
            content: 'I love Luna Garden so much1',
            unread: true,
            timeStamp: 1657106528519
          },
          {
            type: 'text',
            content: 'I love Luna Garden so much2',
            unread: false,
            timeStamp: 1657106528530
          },
          {
            type: 'text',
            content: 'I love Luna Garden so much3',
            unread: false,
            timeStamp: 1657106528531
          },
          {
            type: 'text',
            content: 'I love Luna Garden so much4',
            unread: true,
            timeStamp: 1657106528542
          },
          {
            type: 'text',
            content: 'I love Luna1',
            myself: true,
            timeStamp: 1657106528519
          },
          {
            type: 'text',
            content: 'I love Luna2',
            myself: true,
            timeStamp: 1657106528520
          },
          {
            type: 'text',
            content: 'I love Luna3',
            myself: true,
            timeStamp: 1657106528531
          },
          {
            type: 'text',
            content: 'I love Luna4',
            myself: true,
            timeStamp: 1657106528532
          }
        ],
        User2_62c3c28873784d62c4f10a44: [
          {
            type: 'text',
            content: 'User2 I love Luna Garden so much1',
            unread: false,
            timeStamp: 1657106528519
          },
          {
            type: 'text',
            content: 'User2 I love Luna Garden so much2',
            unread: false,
            timeStamp: 1657106528530
          },
          {
            type: 'text',
            content: 'User2 I love Luna Garden so much3',
            unread: false,
            timeStamp: 1657106528531
          },
          {
            type: 'text',
            content: 'User2 I love Luna Garden so much4',
            unread: true,
            timeStamp: 1657106528542
          },
          {
            type: 'text',
            content: 'I love Luna1 User2',
            myself: true,
            timeStamp: 1657106528519
          },
          {
            type: 'text',
            content: 'I love Luna2 User2',
            myself: true,
            timeStamp: 1657106528520
          },
          {
            type: 'text',
            content: 'I love Luna3 User2',
            myself: true,
            timeStamp: 1657106528531
          },
          {
            type: 'text',
            content: 'I love Luna4 User2',
            myself: true,
            timeStamp: 1657106528532
          }
        ],
        User3_62c3c28873784d62c4f10a44: [
          {
            type: 'text',
            content: 'User3 I love Luna Garden so much1',
            unread: false,
            timeStamp: 1657106528519
          },
          {
            type: 'text',
            content: 'User3 I love Luna Garden so much2',
            unread: false,
            timeStamp: 1657106528530
          },
          {
            type: 'text',
            content: 'User3 I love Luna Garden so much3',
            unread: false,
            timeStamp: 1657106528531
          },
          {
            type: 'text',
            content: 'User3 I love Luna Garden so much4',
            unread: true,
            timeStamp: 1657106528542
          },
          {
            type: 'text',
            content: 'I love Luna1 User3',
            myself: true,
            timeStamp: 1657106528519
          },
          {
            type: 'text',
            content: 'I love Luna2 User3',
            myself: true,
            timeStamp: 1657106528520
          },
          {
            type: 'text',
            content: 'I love Luna3 User3',
            myself: true,
            timeStamp: 1657106528531
          },
          {
            type: 'text',
            content: 'I love Luna4 User3',
            myself: true,
            timeStamp: 1657106528532
          }
        ]
      },
      currentChatListFinal: [],
      currentChattingUser: ''
    }
  },
  created() {
    this.userInfo = this.getLocal('userInfo')
    this.currentChattingUser = this.userList[0].id
    this.changeChattingUser(this.currentChattingUser)
  },
  mounted() {
    if (window.Notification) {
      // 支持
      this.isAllowNotify()
    } else {
      this.$Message.error({ content: 'Your browser is not support desktop notification, you cannot receive the new message alert.' })
    }
    this.initWebSocket()
  },
  watch: {
    testFocus() {
      let pageVisibility = document.visibilityState
      if (pageVisibility === 'hidden') {
        this.getData(publicApi.offline, { _id: this.userInfo._id, userName: this.userInfo.userName }).then((res) => {
          res.currentOnlineUser = []
          if (res.success) {
            this.onlineUser = res.data.currentOnlineUser
          }
        })
      }
      // 页面变为可见时触发
      if (pageVisibility === 'visible') {
        this.getData(publicApi.online, { _id: this.userInfo._id, userName: this.userInfo.userName }).then((res) => {
          res.currentOnlineUser = []
          if (res.success) {
            this.onlineUser = res.data.currentOnlineUser
          }
        })
      }
    }
  },
  methods: {
    changeChattingUser(id) {
      if (this.currentChatList[id + '_' + this.userInfo._id] !== undefined) {
        this.currentChatListFinal = this.currentChatList[id + '_' + this.userInfo._id].sort(function (a, b) {
          return a.timeStamp - b.timeStamp
        })
        this.currentChattingUser = id
        this.countUnread()
        this.clearCurrentUnread(id)
      }
    },
    sendMessage(id) {
      const newId = id + '_' + this.userInfo._id
      let msg = {
        id: newId,
        type: 'text',
        content: 'New Message from' + id + 'I love Luna Garden so much1',
        unread: true,
        timeStamp: Date.now()
      }
      this.getData(chat.sendMessage, msg).then((res) => {
        if (res.success) {
          if (this.currentChatList[newId]) {
            if (id === this.currentChattingUser) {
              //当前用户为活跃用户
              msg.unread = false
            } else {
              this.sendNotification(msg)
            }
            this.currentChatList[newId].push(msg)
            this.countUnread()
          } else {
            this.currentChatList[newId] = []
            this.currentChatList[newId].push(msg)
          }
        }
      })
    },
    sendMyMessage() {
      let msg = {
        id: this.currentChattingUser + '_' + this.userInfo._id,
        type: 'text',
        myself: true,
        content: 'New Message from' + this.userInfo._id + 'I love Luna Garden so much1',
        timeStamp: Date.now()
      }
      this.getData(chat.sendMessage, msg).then((res) => {
        if (res.success) {
          this.currentChatListFinal.push(msg)
        } else {
          this.$Message.success({ content: 'Unknow error, please refresh the page or contact the administrator' })
        }
      })
    },
    countUnread() {
      for (let i = 0; i < this.userList.length; i++) {
        if (this.userList[i].id !== this.currentChattingUser) {
          let count = 0
          for (let a = 0; a < this.currentChatList[this.userList[i].id + '_' + this.userInfo._id].length; a++) {
            if (this.currentChatList[this.userList[i].id + '_' + this.userInfo._id][a].unread) {
              count++
              this.userList[i].unread = count
            }
          }
        }
      }
    },
    clearCurrentUnread(id) {
      for (let i = 0; i < this.userList.length; i++) {
        if (this.userList[i].id === id) {
          this.userList[i].unread = 0
        }
      }
      for (let i = 0; i < this.currentChatList[id + '_' + this.userInfo._id].length; i++) {
        this.currentChatList[id + '_' + this.userInfo._id][i].unread = false
      }
    },
    //桌面通知模块
    isAllowNotify() {
      if (window.Notification && Notification.permission !== 'denied') {
        Notification.requestPermission(function (status) {
          //若status非granted，则为拒绝通知，保存至线上用户信息，同时更新vueX状态
          if (status === 'granted') {
          } else {
            this.$Message.error({ content: 'You have block the desktop notification, you cannot receive the new message alert.' })
          }
        })
      }
    },
    sendNotification(data) {
      //若有新消息，则向桌面发送通知
      const notify = new Notification('New message from Luna Chatting', {
        body: data.content,
        lang: 'en-US',
        icon: 'http://localhost:3000/res/userIcons/userIcon.jpg'
      })
      notify.onshow = function () {
        // 通知已经发送至桌面
      }
      notify.onclick = function () {
        // 点击了通知
      }
      notify.onerror = function () {
        // 手动关闭
        notify.close()
      }
      notify.onclose = function () {
        // console.log('close')
      }
    },
    //WebSocket模块
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
        ws.onmessage = function (e) {
          let data = JSON.parse(e.data)
          if (data.WSType === 'message') {
          } else if (data.WSType === 'onlineUser') {
          }
          // let data = JSON.parse(e)
          // let message = 'message:' + e.content + ''
          // console.log(message)
        }
      }
    }
  }
}
</script>

<style scoped>
.myself {
  background: red;
}
</style>
