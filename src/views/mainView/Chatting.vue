<template>
  <div>
    <h1>LunaChatting</h1>
    <Button theme="primary" @click="sendMessage('User1')">Send User1 Message</Button>
    <Button theme="primary" @click="sendMessage('User2')">Send User2 Message</Button>
    <Button theme="primary" @click="sendMessage('User3')">Send User3 Message</Button>
    <ul>
      <li v-for="i in userList" :key="'user' + i.id" @click="changeChattingUser(i.id)">
        {{ i.name }}
        <span v-show="i.unread !== 0">{{ i.unread }}</span>
      </li>
    </ul>
    <div class="chattingViewer">
      <ul>
        <li :class="{ myself: i.myself }" v-for="(i, index) in currentChatListFinal" :key="index">{{ i.content }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Chatting',
  data() {
    return {
      userList: [
        { name: 'User1', id: 'User1', unread: 0 },
        { name: 'User2', id: 'User2', unread: 0 },
        { name: 'User3', id: 'User3', unread: 0 }
      ],
      currentChatList: {
        User1: [
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
          }
        ],
        User2: [
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
          }
        ],
        User3: [
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
          }
        ]
      },
      currentMyChatList: {
        User1: [
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
        User2: [
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
        User3: [
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
    this.changeChattingUser('User1')
    this.countUnread()
    this.clearCurrentUnread('User1')
  },
  methods: {
    changeChattingUser(id) {
      this.currentChatListFinal = this.currentChatList[id].concat(this.currentMyChatList[id]).sort(function (a, b) {
        return a.timeStamp - b.timeStamp
      })
      this.currentChattingUser = id
      this.countUnread()
      this.clearCurrentUnread(id)
    },
    sendMessage(id) {
      let msg = {
        type: 'text',
        content: 'New Message from' + id + 'I love Luna Garden so much1',
        unread: true,
        timeStamp: Date.now()
      }
      this.currentChatList[id].push(msg)
      if (id === this.currentChattingUser) {
        this.changeChattingUser(id)
      }
      this.countunread()
    },
    countUnread() {
      for (let i = 0; i < this.userList.length; i++) {
        if (this.userList[i].id !== this.currentChattingUser) {
          let count = 0
          for (let a = 0; a < this.currentChatList[this.userList[i].id].length; a++) {
            if (this.currentChatList[this.userList[i].id][a].unread) {
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
      for (let i = 0; i < this.currentChatList[id].length; i++) {
        this.currentChatList[id][i].unread = false
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
