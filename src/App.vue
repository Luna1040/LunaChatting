<template>
  <div id="app" :class="countTheme">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      countTheme:'dayLight'
    }
  },
  created() {
    //判断用户信息留存
    if (this.getLocal('userInfo') !== null) {
      // 若用户信息内有用户id
      if (this.getLocal('userInfo').uid) {
        //有 -> 获取设置&获取菜单 -> publicReq.js
        //若LocalStorage中储存的用户信息已超时，跳转登录页
        if (Date.now - 86400000 > this.getLocal('userInfo').timeStamp) {
          this.$router.push('/Chatting')
        } else {
          //没有过期则从LocalStorage读取
          this.userInfo = this.getLocal('userInfo')
        }
      } else {
        //设置空对象
        this.setLocal('userInfo', {})
        // 没有 -> 跳转登录
        this.$router.push('/Login')
      }
    } else {
      this.setLocal('userInfo', {})
      //没有留存 -> 跳转登录
      this.$router.push('/Login')
    }
    this.checkTime();
    //判断时间
    setInterval(()=>{
      this.checkTime()
    },1800000)
  },
  methods:{
    checkTime(){
      let currentTime = parseInt(new Date().toLocaleTimeString().split(':')[0]);
      if(currentTime > 17){
        this.countTheme='nightEye'
      }
    }
  }
}
</script>

<style lang="scss">
#app{
  width: 100vw;
  min-height: 100vh;
}
</style>
