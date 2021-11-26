// index.js
// const eMailOAuth = require('../../utils/eMailOAuth')
import eMailOAuth from "../../utils/eMailOAuth";

Page({
  data: {
    showTip: false,
    isOAuthing: false,
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

    let authInfo = wx.getStorageSync('OAuthInfoKey')
    console.log("OAuthInfoKey:" + info)
    if (info != null && info != "") {
      this.setData({
        disabledBtn: false,
        authInfo
      })

      // login
      loginAction()
    } 
  },

  useTipModalTap(e) {
    // useTipModal组件自定义事件
    let show = !e.detail
    wx.setStorageSync('showUseTipkey', show)
  },

  bindKeyInput: function (e) {
    let type = e.target.id
    if (type == "account") {
      console.log("bindKeyInput account:" + e.detail.value)
      account = e.detail.value
      password = this.data.authInfo.password
      enableLoginBtn(account, password)
    }
    else if (type == "password") {
      console.log("bindKeyInput password:" + e.detail.value)
      password = e.detail.value;
      account = this.data.authInfo.account
      enableLoginBtn(account, password)
    }
  },

  enableLoginBtn(account, password) {
    enable = account.has("@") && account.has('.com') && password.length > 3
    this.setData({
      disabledBtn: !enable,
      authInfo: {account, password}
    })
  },

  loginAction(e) {
    console.log('login...')
    isOAuthing = true
    this.setData({isOAuthing})

    this.eMailOAuth = eMailOAuth(this.data.authInfo, (res) => {
      this.setData({isOAuthing:false})

      if (res != null) {
        console.log(res)
      }
    })
  }
});
