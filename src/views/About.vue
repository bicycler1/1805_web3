<template>
  <div class="background">
    <div>
      <div class='font'>
      感谢你对区块链的热爱！<br/><br/>
      有一句话我挺喜欢的，在这里送给大家<br/><br/>
      <b>“有的人用一生去治愈青春，有的人用青春治愈一生”</b><br/><br/>
      希望大家能常常想起这段一起读研的日子<br/>
      希望大家能把这美好的回忆视若珍宝<br/>
      或许你并不喜欢读研，不喜欢老师的催促，不喜欢这段单调的生活<br/>
      可能喜欢的是少数吧<br/>
      生活更喜欢强人所难<br/>
      希望你能找到你所热爱的，热爱你的<br/>
      一顿饕餮大餐，一捧金色的朝阳，一段简单枯燥的代码<br/>
      一个发光的屏幕，一个旋转的电扇，一段生活<br/><br/>
      希望大家洒脱于世，粒子一生，光束一瞬<br/>
      最后希望大家希望“粒子束”这个名字<br/>
      个人鄙见，多多包涵！
      </div>
    </div>
    <div>
      <div>
        <div class="balance">
          我的余额
          <i class="iconfont icon-yue"></i>
          {{tokenNum}}
        <div>
          <a-button type="primary" :loading="loading" @click="renewBalance">
            更新余额
          </a-button>
        </div>
      </div>
      <div class="form">
        <div>
          赠人玫瑰，手留余香
        </div>
        <div>
          送给他人PAB货币
        </div>
        <label for="toAddress">
          收币人的以太坊地址
          <i class="iconfont icon-qukuailian"></i>
        </label>
         <a-input v-model="form.toAddress" id='toAddress' placeholder="请填入收币人的以太坊地址" @blur="checkAddress()">
            <a-icon slot="prefix" type="home" style="color:rgba(0,0,0,.25)" />
          </a-input>
          <div>
            <a-alert
              v-if="addressAlertShow"
              :type="addressAlertIcon"
              show-icon
              :message="addressAlert"
              banner=""
            />
          </div>
          <label for="toAmount">
            转币数量，最大可精确到小数点后9位
            <i class="iconfont icon-qian"></i>
          </label>
          <a-input v-model="form.toAmount" id="toAmount" placeholder="请填入转币数量" @blur="checkAmount()">
            <a-icon slot="prefix" type="money-collect" style="color:rgba(0,0,0,.25)" />
          </a-input>
          <div>
            <a-alert
              v-if="amountAlertShow"
              :type="amountAlertIcon"
              show-icon
              :message="amountAlert"
              banner=""
            />
          </div>
          <a-button type="primary" @click.stop.prevent="send()">
            发送
          </a-button>
          <a-button @click.stop.prevent="clearForm()">
            重置
          </a-button>
          <div>
            <a-alert
              v-if="sendAlertShow"
              :type="sendAlertIcon"
              show-icon
              :message="sendAlert"
              banner=""
            />
          </div>
      </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang='scss'>
.background{
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background: url(../assets/index/bk.jpg);
  background-size: cover;
  width: 100vw;
  height: 100vh;
  &>div:first-child{
    width:40%;
    height: 100%;
    background: rgba(azure,0.7);

  }
  &>div:last-child{
    position: relative;
    width:60%;
    height: 100%;
    background: rgba(lightskyblue,0.7);
    &>div{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      width: 70%;
    }
  }
}
.font{
  position: relative;
  top: 50%;
  transform: translate(0,-50%);
  padding: 16px;
  font-size: 1.1rem;
}
.balance{
  margin-top: 26px;
  padding: 16px;
  background: azure;
  border-radius: 9px;
  &>div{
    margin: 9px 0 0 0;
  }
}
.form{
  margin-top: 26px;
  padding: 16px;
  background: azure;
  border-radius: 9px;
  &>label{
    display: block;
    margin: 9px 0 0 0;
  }
  &>button{
    margin: 9px 16px 9px 0;
  }
}
.loadingAnimate{
  // animation: 1s linear 0s infinite loading;
  transform: scale(2,1);
}
@keyframes loading {
  from{
    transform: rotate(0);
  }
  to{
    transform: rotate(360deg);
  }
}
</style>
<script>
export default {
  name: 'About',
  data () {
    return {
      contract: '',
      tokenNum: '',
      form: {
        toAddress: '',
        toAmount: ''
      },
      addressAlert: '',
      addressAlertShow: false,
      addressAlertIcon: 'error',
      amountAlert: '',
      amountAlertShow: false,
      amountAlertIcon: 'error',
      sendAlert: '',
      sendAlertShow: false,
      sendAlertIcon: 'error',
      loading: false

    }
  },
  methods: {
    initWeb3: function () {
      window.ethereum.autoRefreshOnNetworkChange = false
      window.ethereum.on('accountsChanged', () => {
      })
      window.ethereum.on('networkChanged', () => {
      })
    },
    initContract: async function () {
      const _this = this
      let load = this.$message.loading('检查以太坊配置文件', 0)
      if (this.GLOBAL.web3 === '' || this.GLOBAL.etherAddress === '' || !this.GLOBAL.web3.utils.isAddress(this.GLOBAL.etherAddress)) {
        setTimeout(load, 3000)
        setTimeout(() => {
          _this.$message.error('MetaMask授权中断，请返回上一页重新登录', 3)
        }, 3000)
      } else {
        setTimeout(load, 3000)
        const wait = function () {
          return new Promise(resolve => {
            setTimeout(() => {
              load = _this.$message.loading('检查以太坊合约', 0)
              resolve(true)
            }, 3000)
          })
        }
        if (await wait()) {
          const contract = this.contract = new this.GLOBAL.web3.eth.Contract(this.GLOBAL.contractAbi, this.GLOBAL.contractAddress)
          if (contract !== '') {
            setTimeout(load, 3000)
            setTimeout(() => {
              _this.$message.success('以太坊合约连接成功', 3)
            }, 3000)
          } else {
            setTimeout(load, 3000)
            setTimeout(() => {
              _this.$message.error('以太坊合约连接失败，请告知网站建设者', 3)
            }, 3000)
          }
        }
      }
    },
    initBalance: function () {
      const _this = this
      const timer = setInterval(async () => {
        if (this.contract === '') {
        } else {
          clearInterval(timer)
          console.log('11')
          _this.tokenNum = await _this.contract.methods.balanceOf(_this.GLOBAL.etherAddress).call()
          _this.tokenNum /= 10 ** 9
          _this.loading = false
        }
      }, 500)
    },
    clearForm: function () {
      this.form.toAddress = ''
      this.form.toAmount = ''
      this.checkAddress()
      this.checkAmount()
    },
    checkAddress: function () {
      this.addressAlertIcon = 'error'
      const reg = /^(0x)([0-9a-f]+)$/i
      if (this.form.toAddress === '') {
        this.addressAlert = '输入接收者的以太坊地址'
      } else {
        const index = this.form.toAddress.search(reg)
        if (index === -1) {
          this.addressAlert = '输入格式正确的以太坊地址\r\n0x开头包含40位的以太坊地址'
        } else {
          const res = this.form.toAddress.match(reg)[0]
          if (!this.GLOBAL.web3.utils.isAddress(res)) {
            this.addressAlert = '请检查您输入的以太坊地址\r\n0x开头包含40位的以太坊地址'
          } else if (res === this.GLOBAL.etherAddress) {
            this.addressAlert = '请不要给自己转币'
          } else {
            this.addressAlert = '以太坊地址正确'
            this.addressAlertIcon = 'success'
          }
        }
      }
      this.addressAlertShow = true
    },
    checkAmount: function () {
      this.amountAlertIcon = 'error'
      if (this.form.toAmount === '') {
        this.amountAlert = '请输入货币数量'
      } else if (parseFloat(this.form.toAmount) > parseFloat(this.tokenNum)) {
        this.amountAlert = '货币数量超出余额，请填入合适货币数量'
      } else if (parseFloat(this.form.toAmount) === 0) {
        this.amountAlert = '货币数量为0'
      } else {
        this.amountAlert = '货币数量正确'
        this.amountAlertIcon = 'success'
      }
      this.amountAlertShow = true
    },
    send: async function () {
      const _this = this
      if (this.addressAlertIcon === 'success' && this.amountAlertIcon === 'success') {
        if (this.contract === '') {
          this.$message.error('MetaMask授权中断，请返回上一页重新登录', 3)
        } else {
          const amount = parseInt(parseFloat(this.form.toAmount) * 10 ** this.GLOBAL.decimals)
          const value = this.GLOBAL.web3.utils.toBN(amount)
          try {
            await this.contract.methods.transfer(this.form.toAddress, value)
              .send({
                from: this.GLOBAL.etherAddress,
                gasPrice: 20000000000
              })
              .on('transactionHash', function (hash) {
                _this.sendAlertIcon = 'warning'
                _this.sendAlert = '请稍等，交易等待打包确认中......'
                _this.sendAlertShow = true
              })
            await this.contract.events.Transfer({
              fromBlock: 0,
              toBlock: 'latest'
            })
              .on('data', function (event) {
                _this.sendAlertIcon = 'success'
                _this.sendAlert = '发送成功，请点击更新余额或稍等'
                _this.sendAlertShow = true
                _this.initBalance()
              })
              .on('changed', function (event) {
                _this.sendAlertIcon = 'error'
                _this.sendAlert = '发送失败，交易被中断'
                _this.sendAlertShow = true
              // remove event from local database
              })
              .on('error', () => {
                _this.sendAlertIcon = 'error'
                _this.sendAlert = '发送失败，请重试'
                _this.sendAlertShow = true
              })
          } catch (error) {
            this.sendAlertIcon = 'error'
            this.sendAlert = '发送失败，请检查MetaMask当前账号和授权账号保持一致或重试'
            if (error.code === 4001) {
              this.sendAlert = '发送失败，用户拒绝了本次交易'
            } else if (error.code === -32603) {
              this.sendAlert = '发送失败，请设置合适矿工费'
            }
            this.sendAlertShow = true
          }
        }
      } else {
        this.sendAlertIcon = 'error'
        this.sendAlert = '请检查接收者地址和转币数'
        this.sendAlertShow = true
      }
    },
    renewBalance: function () {
      this.loading = true
      this.initBalance()
    }
  },
  mounted () {
    this.initWeb3()
    this.initContract()
    this.initBalance()
  }
}
</script>
