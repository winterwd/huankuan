// index.js

Page({
  data: {
    showTip: false,
  },

  onLoad: function(options) {
    let show = wx.getStorageSync('showUseTipkey')
    console.log("showUseTipkey:" + show)
    this.setData({
      showTip: !show
    })
  },

  useTipModalTap: function (e) {
    // useTipModal组件自定义事件
    let show = !e.detail
    wx.setStorageSync('showUseTipkey', show)
  },

  properties: {
    
  },

  methods: {
  },
});
