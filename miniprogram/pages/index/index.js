// index.js

Page({
  data: {
    showTip: false,
    isAuthing: false,
    disabledBtn: true,
    authInfo: {
      account: "",
      password: ""
    }
  },

  onLoad: function(options) {
    let show = wx.getStorageSync('showUseTipkey')
    console.log("showUseTipkey:" + show)
    this.setData({
      showTip: !show
    })

    // let authInfo = wx.getStorageSync('OAuthInfoKey')
    let authInfo = {
      account: "mixiu2009@126.com",
      password: "xxx"
    }
    console.log("OAuthInfoKey:" + authInfo)
    if (authInfo != null && authInfo != "") {
      this.setData({
        disabledBtn: false,
        authInfo
      })

      // login
      // this.loginAction(null)
    } 
  },

  useTipModalTap(e) {
    // useTipModal组件自定义事件
    let show = !e.detail
    wx.setStorageSync('showUseTipkey', show)
  },

  bindKeyInput: function (e) {
    var {account, password} = this.data.authInfo
    let type = e.target.id
    if (type == "account") {
      account = e.detail.value
      this.enableLoginBtn({account, password})
    }
    else if (type == "password") {
      password = e.detail.value;
      this.enableLoginBtn({account, password})
    }
  },

  enableLoginBtn(info) {
    let {account, password} = info
    let enable = account.includes("@") && account.includes(".com") && password.length > 3
    this.setData({
      disabledBtn: !enable,
      authInfo: info
    })
  },

  loginAction(e) {
    if (this.data.disabledBtn) {return}
    if (this.data.isAuthing) {return}
    console.log('login...')
    this.setData({isAuthing: true})

    wx.cloud.callFunction({
      // name: 'imapmsg',
      name: 'popmsg',
      data: this.data.authInfo
    }).then(res => {
      this.setData({isAuthing: false})
      console.log(res)
    }).catch( err => {
      this.setData({isAuthing: false})
      console.log(err)
    })

    // var {account, password} = this.data.authInfo
    // wx.cloud.callFunction({
    //   name: 'sendmail',
    //   data: {
    //     account, password,
    //     to: 'winter.wd@qq.com',
    //     subject: '你好',
    //     text: 'hello',
    //     html: '<p><b>你好：</b><img src=""></p>' +'<p>欢迎欢迎<br/></p>'
    //   }
    // }).then(res => {
    //   this.setData({isAuthing: false})
    //   console.log(res)
    // }).catch( err => {
    //   this.setData({isAuthing: false})
    //   console.log(err)
    // })
  }
});
