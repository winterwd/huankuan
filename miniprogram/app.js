// app.js
App({
  onLaunch: function () {
    console.log("onLaunch")
    wx.cloud.init({
      env: 'cloud1-6gy3mahbca674017',
      traceUser: true
    })
  }
});
