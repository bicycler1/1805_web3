<template>
<div class="view-window">
  <div class="page-turn">
    <li id="first" @click.stop.prevent="pageTurn($event)">
    </li>
    <li id="second" @click.stop.prevent="pageTurn($event)">
    </li>
  </div>
  <div id="frame">
    <div class="comment-bk">
      <div class="top-blur">
      </div>
      <div class="top">
        <li>
          大家快来发表评论呀
          <i class="iconfont icon-pinglun">
          </i>
        </li>
      </div>
      <div>
        <div id="comments">
        </div>
      </div>
    </div>
    <div class="block-bk" @click="clearAll">
      <div class="top-blur">
      </div>
      <div class="login animate__animated" @click.stop.prevent="">
        <div>
          <div>
            <div>
              请连接MestMask客服端
            </div>
            <a-button type="primary" icon="retweet" @click="connectMetaMask">
              连接MestMask客户端
            </a-button>
          </div>
          <div>
            以太坊地址：
            <div>
              <a-alert type="warning" :show-icon="false" :message="etherAddress" banner=""
              />
            </div>
          </div>
          <div>
            以太坊网络：
            <div>
              <a-alert type="warning" :show-icon="false" :message="etherNetName" banner=""
              />
            </div>
          </div>
          <div>
            <a-alert v-if="loginTextShow" :type="loginTextType" :message="loginText"
            banner="" />
          </div>
        </div>
      </div>
      <div class="coin">
          <div>
            <p>
              <b>
                <i class="iconfont icon-wen">
                </i>
                What is PAB ？
              </b>
            </p>
            <p>
              <b>
                PAB
              </b>
              是在区块链上部署发行的数字货币
            </p>
            <div>
              <p>
                <b>
                  <i class="iconfont icon-wen">
                  </i>
                  Why Call PAB ？
                </b>
              </p>
              <p>
                <b>
                  PAB = Particle Beam（粒子束）
                </b><br/>
                希望班上同学不管走到哪里，像粒子一样散开，回首时仍记得在1805一起上过学读过书，还是一束粒子！
              </p>
              <p>
                <i class="iconfont icon-7">
                </i>
                仅以此币纪念我们一起的青春，怀念青春！
              </p>
            </div>
          </div>
          <div>
            <i class="iconfont icon-xiangzuo" @click.stop.prevent="coinFold($event)"></i>
          </div>
      </div>
      <div class="top">
        <li>
          首先给大家说一声抱歉，自作主张玩了一下区块链，操作略显复杂
        </li>
        <li>
          区块链版本
          <i class="iconfont icon-B">
          </i>
        </li>
      </div>
      <a-button type="primary" class="login-button" @click.stop.prevent="login">
        <i class="iconfont icon-denglu2">
        </i>
        <i class="iconfont icon-denglu1">
        </i>
      </a-button>
    </div>
  </div>
</div>
</template>

<style lang="scss" scoped>
$button_color: #1296db;
$font_color: #fff;
$font_size1: 0.9rem;  // top头部字体大小
$font_size2: 1.2rem;  // button按钮字体大小
$top_height: 11%;

.view-window{
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
#frame{
  position: absolute;
  top: 0;
  left: 0;
  transition: all .9s ease-in-out;
}
.page-turn{
  position: absolute;
  top: 50%;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  transform: translate(0,-50%);
  width: 29px;
  height: 90px;
  background: rgba($color: #eee, $alpha: 0.6);
  z-index: 101;
  border-radius: 16px 0 0 16px;
  cursor: pointer;
  &>li{
    width: 16px;
    height: 16px;
    border: 2px solid #888;
    border-radius: 50%;
    &:hover{
      background: rgb(35, 102, 226);
    }
  }
}
.comment-bk{
  position: relative;
  width: 100vw;
  height: 100vh;
  background: url(../assets/index/bk.jpg);
  background-size: cover;
  &>div:nth-child(3){
  position: absolute;
  left: 50%;
  bottom: 6%;
  width: 60%;
  height: 80%;
  transform: translate(-50%,0);
  background: inherit;
  overflow: hidden;
  z-index: 1;
  &::after{
    content:'';
    position: absolute;
    top: 0;
    left: 0;
    width: 110%;
    height: 110%;
    background: inherit;
    filter: blur(9px);
    margin: -30px 0 0 -30px;
    z-index: 2;
  }
  }
}
#comments{
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  background: rgba($color: #fff, $alpha: .7);
  z-index: 11;
  overflow-y: auto;
  color:#666;
}
.block-bk {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: url(../assets/index/bk.jpg);
  background-size: cover;
}
.top-blur{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: $top_height;
  background: inherit;
  z-index: 1;
  overflow: hidden;
  &::after{
    content: '';
    position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 130%;
  background: inherit;
  filter: blur(9px);
  margin-top: -30px;
  z-index: 2;
  }
}
.top{
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100vw;
  height: $top_height;
  background: rgba(255,255,255,0.4);
  overflow: hidden;
  z-index: 11;
  li {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0px;
    padding: 1rem;
    height: 50%;
    background: $button_color;
    color: $font_color;
    margin: 0 1rem;
    font-size: $font_size1;
    border-radius: 6px;
  }
}
.login-button{
  position: absolute;
  left: 50%;
  bottom: 9%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 230px;
  height: 50px;
  transform: translate(-50%,0);
  border-radius: 9px;
  font-size: $font_size2;
  color: $font_color;
  z-index: 11;
  &>i:first-child{
    font-size: 1.6rem;
  }
}
.login{
  position: absolute;
  top: 50%;
  left: 50%;
  opacity: 0;
  margin: auto;
  width: 300px;
  height: 390px;
  transform: translate(-50%,-50%);
  background: inherit;
  z-index: 3;
  overflow: hidden;
  &::after{
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    background: inherit;
    width: 130%;
    height: 130%;
    filter: blur(13px);
    margin: -30px 0 0 -30px;
    z-index: 4;
  }
    &>div:first-child{
      position: relative;
      padding: 20px;
      z-index: 11;
      color: $font_color;
      &>div{
        margin: 16px 0;
      }
    }
  }
  .coin{
  position: absolute;
  top: 50%;
  left: 0;
  display: flex;
  align-items: center;
  width: 330px;
  height: 380px;
  transform: translate(0,-50%);
  background: inherit;
  z-index: 3;
  overflow: hidden;
  color: #fff;
  transition: left .9s ease-in-out;
  &::after{
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    background: inherit;
    width: 130%;
    height: 130%;
    filter: blur(9px);
    z-index: 4;
     margin: 0 -30px -30px 0;
  }
  &>div:nth-child(1){
    position: relative;
    width: 300px;
    padding: 16px;
    z-index: 11;
    font-size: 1rem;
    }
  &>div:nth-child(2){
    position: relative;
    width: 30px;
    z-index: 11;
    cursor: pointer;
    }
  }
</style>

<script>
import $ from 'jquery'
import Valine from 'valine'

export default {
  name: 'Home',
  data () {
    return {
      etherAddress: '以太坊地址，MetaMask自动获取',
      etherNetName: '以太坊网络，MetaMask自动获取',
      etherNetId: Number,
      loginText: '',
      loginTextType: 'error',
      // loginIcon: '',
      loginTextShow: false,
      isLoginShow: false,
      isLoginCorrect: false,
      valine: Object,
      pageNum: 1
    }
  },
  watch: {
    pageNum: {
      handler (newVal, oldVal) {
        let load
        switch (newVal) {
          case 1:
            break
          case 2:
            load = this.$message.loading('检查MetaMask客户端', 0)
            setTimeout(load, 3000)
            if (window.ethereum) {
              this.initWeb3()
              setTimeout(() => {
                this.$message.success('MetaMask客服端已安装', 3)
              }, 3000)
            } else {
              setTimeout(() => {
                this.$message.error('本服务需要MetaMask客户端支持，请先安装MetaMask客户端', 3)
              }, 3000)
            }
            break
          default:
        }
      }
    }
  },
  methods: {
    pageTurn: function (ev) {
      const element = ev.srcElement || ev.target
      const pageId = $(element).attr('id')
      $('#first').css({ background: '' })
      $('#second').css({ background: '' })
      $('#' + pageId).css({ background: 'rgb(35, 102, 226)' })
      switch (pageId) {
        case 'first':
          $('#frame').css({ top: '0' })
          this.pageNum = 1
          break
        case 'second':
          $('#frame').css({ top: '-100%' })
          this.pageNum = 2
          break
        default:
      }
    },
    initWeb3: function () {
      const _this = this
      this.GLOBAL.web3 = window.web3 = new this.Web3(window.ethereum)
      // this.$store.commit('editWeb3', window.web3)
      window.ethereum.autoRefreshOnNetworkChange = false
      window.ethereum.on('accountsChanged', () => {
        // console.log('accountsChanged')
        switch (_this.$route.path) {
          case '/':
            this.connectMetaMask()
            break
          default:
        }
      })
      window.ethereum.on('networkChanged', () => {
        // console.log('networkChanged')
        switch (_this.$route.path) {
          case '/':
            this.connectMetaMask()
            break
          default:
        }
      })
    },
    async connectMetaMask () {
      if (window.ethereum) {
        this.loginText = '正在获取MetaMask授权，请点击连接'
        this.loginTextType = 'info'
        this.loginTextShow = true
        try {
          // Request account access if needed
          await window.ethereum.enable()
        } catch (error) {
          // User denied account access...
          if (error.code === 4001) {
            this.loginText = '用户拒绝，MetaMask授权失败'
          } else {
            this.loginText = 'MetaMask授权失败'
          }
          this.loginTextType = 'error'
          this.etherAddress = '以太坊地址，通过MetaMask自动获取'
          this.etherNetName = '以太坊网络，通过MetaMask自动获取'
          this.loginTextShow = true
          this.isLoginCorrect = false
          return false
        }
        if (await this.GLOBAL.web3.eth.net.isListening()) {
          const resAcc = await this.GLOBAL.web3.eth.getAccounts()
          const resNet = await this.GLOBAL.web3.eth.net.getId()
          this.GLOBAL.etherAddress = this.etherAddress = resAcc[0]
          // this.$store.commit('editEtherAddress', resAcc[0])
          this.etherNetId = resNet
          if (this.etherNetId === 3) {
            this.etherNetName = this.GLOBAL.etherNet[resNet]
            this.loginText = 'MetaMask授权完成，请点击登录按钮'
            this.loginTextType = 'success'
            this.loginTextShow = true
            this.isLoginCorrect = true
            return true
          } else {
            this.loginText = this.etherNetName = '请更改MetaMask网络至Ropsten测试网络'
            this.loginTextType = 'error'
            this.loginTextShow = true
            this.isLoginCorrect = false
            return false
          }
        }
      } else {
        this.loginText = '本服务需要MetaMask客户端支持，请安装MetaMask客户端'
        this.loginTextType = 'error'
        this.loginTextShow = true
        this.isLoginCorrect = false
        return false
      }
    },
    checkEthAddress: function () {
      const reg = /^(0x)([0-9a-f]+)$/i
      if (this.etherAddress === '') {
        this.loginText = '输入以太坊地址'
        this.loginIcon = 'iconfont icon-cuowu error'
        this.isAddressCorrect = false
      } else {
        const index = this.etherAddress.search(reg)
        if (index === -1) {
          this.loginText = '输入格式正确的以太坊地址\r\n0x开头包含40位的以太坊地址'
          this.loginIcon = 'iconfont icon-cuowu error'
          this.isAddressCorrect = false
        } else {
          const res = this.etherAddress.match(reg)[0]
          if (!this.GLOBAL.web3.utils.isAddress(res)) {
            this.loginText = '请检查您输入的以太坊地址\r\n0x开头包含40位的以太坊地址'
            this.loginIcon = 'iconfont icon-cuowu error'
            this.isAddressCorrect = false
          } else {
            this.loginIcon = 'iconfont icon-icon-test correct'
            this.loginText = '请点击登录'
            this.isAddressCorrect = true
          }
        }
      }
    },
    login: async function () {
      if ($('.login').hasClass('animate__fadeOut')) {
        $('.login').toggleClass('animate__fadeOut').toggleClass('animate__fadeIn')
        this.isLoginShow = true
      } else if ($('.login').hasClass('animate__fadeIn')) {
        if (this.isLoginCorrect) {
          this.$router.push({ path: '/about' })
          // const routeUrl = this.$router.resolve({
          //   path: '/about'
          // })
          // window.open(routeUrl.href, '_blank')
        } else {
          this.loginText = '本服务需要MetaMask客服端授权，请先授权'
          this.loginTextType = 'error'
          this.loginTextShow = true
        }
      } else {
        $('.login').toggleClass('animate__fadeIn')
        this.isLoginShow = true
      }
      if (this.isLoginShow && this.isAddressCorrect) {
        console.log('tiaozhuan')
      }
    },
    coinFold (ev) {
      const element = ev.srcElement || ev.target
      if ($(element).hasClass('icon-xiangzuo')) {
        $('.coin').css({ left: '-300px' })
      } else if ($(element).hasClass('icon-xiangyou1')) {
        $('.coin').css({ left: '0' })
      }
      $(element).toggleClass('icon-xiangyou1').toggleClass('icon-xiangzuo')
    },
    clearAll: function () {
      if (this.isLoginShow) {
        $('.login').toggleClass('animate__fadeIn').toggleClass('animate__fadeOut')
        this.isLoginShow = false
      }
    }
  },
  mounted () {
    $('#first').css({ background: 'rgb(35, 102, 226)' })
    // eslint-disable-next-line no-unused-vars
    const valine = new Valine({
      el: '#comments',
      appId: 'iWxIi4oVpt8hv0nSSaSegQSl-gzGzoHsz',
      appKey: 'phzWAHz9CPYzd832h3obx1Rc',
      placeholder: '欢迎留言与我分享您的想法...',
      path: window.location.pathname,
      pageSize: 3,
      avatar: 'retro',
      visitor: true
    })
  }
}
</script>
