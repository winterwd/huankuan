// index.js

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

    let info = wx.getStorageSync('OAuthInfoKey')
    console.log("OAuthInfoKey:" + info)
    if (info != null && info != "") {
      this.setData({
        isOAuthing: true,
        disabledBtn: false,
        authInfo: info
      })

      // login

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
    }
    else if (type == "password") {
      console.log("bindKeyInput password:" + e.detail.value)
    }
  },

  submitAction(e) {
    console.log("submitAction:" + e)
  }
});
