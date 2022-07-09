<template>
  <div>
    <h1>LunaChatting</h1>
    <Button theme="primary" @click="sendMessage(1)">Send User1 Message</Button>
    <Button theme="primary" @click="sendMessage(2)">Send User2 Message</Button>
    <Button theme="primary" @click="sendMessage(3)">Send User3 Message</Button>
    <ul>
      <li v-for="(i, index) in userList" :key="'user' + i.id" @click="changeChattingUser(index)">
        {{ i.name }}
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
        { name: 'User1', id: 'User1' },
        { name: 'User2', id: 'User2' },
        { name: 'User3', id: 'User3' }
      ],
      currentChatList: [
        {
          id: 'User1',
          chatData: [
            {
              type: 'text',
              content: 'I love Luna Garden so much1',
              unRead: false,
              timeStamp: 1657106528519
            },
            {
              type: 'text',
              content: 'I love Luna Garden so much2',
              unRead: false,
              timeStamp: 1657106528530
            },
            {
              type: 'text',
              content: 'I love Luna Garden so much3',
              unRead: false,
              timeStamp: 1657106528531
            },
            {
              type: 'text',
              content: 'I love Luna Garden so much4',
              unRead: true,
              timeStamp: 1657106528542
            }
          ]
        },
        {
          id: 'User2',
          chatData: [
            {
              type: 'text',
              content: 'User2 I love Luna Garden so much1',
              unRead: false,
              timeStamp: 1657106528519
            },
            {
              type: 'text',
              content: 'User2 I love Luna Garden so much2',
              unRead: false,
              timeStamp: 1657106528530
            },
            {
              type: 'text',
              content: 'User2 I love Luna Garden so much3',
              unRead: false,
              timeStamp: 1657106528531
            },
            {
              type: 'text',
              content: 'User2 I love Luna Garden so much4',
              unRead: true,
              timeStamp: 1657106528542
            }
          ]
        },
        {
          id: 'User3',
          chatData: [
            {
              type: 'text',
              content: 'User3 I love Luna Garden so much1',
              unRead: false,
              timeStamp: 1657106528519
            },
            {
              type: 'text',
              content: 'User3 I love Luna Garden so much2',
              unRead: false,
              timeStamp: 1657106528530
            },
            {
              type: 'text',
              content: 'User3 I love Luna Garden so much3',
              unRead: false,
              timeStamp: 1657106528531
            },
            {
              type: 'text',
              content: 'User3 I love Luna Garden so much4',
              unRead: true,
              timeStamp: 1657106528542
            }
          ]
        }
      ],
      currentMyChatList: [
        {
          id: 'User1',
          chatData: [
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
          ]
        },
        {
          id: 'User2',
          chatData: [
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
          ]
        },
        {
          id: 'User3',
          chatData: [
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
        }
      ],
      currentChatListFinal: [],
      currentChattingUser: ''
    }
  },
  created() {
    changeChattingUser(0)
  },
  methods: {
    changeChattingUser(value) {
      this.currentChatListFinal = this.currentChatList[value - 1].concat(this.currentMyChatList).sort(function (a, b) {
        return a.timeStamp - b.timeStamp
      })
      this.currentChattingUser = value
    },
    sendMessage(id) {}
  }
}
</script>

<style scoped>
.myself {
  background: red;
}
</style>
