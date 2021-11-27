
Component({

  /**
   * 页面的初始数据
   */
  data: {
    showUseTip: false,
    tipText: "本小程序不会收集用户任何信息，本小程序不会收集用户任何信息，本小程序不会收集用户任何信息，本小程序不会收集用户任何信息，本小程序不会收集用户任何信息，本小程序不会收集用户任何信息，本小程序不会收集用户任何信息，本小程序不会收集用户任何信息，本小程序不会收集用户任何信息"
  },
  
  properties: {
    showUseTipProps: Boolean
  },

  observers: {
    showUseTipProps: function(showUseTipProps) {
      this.setData({
        showUseTip: showUseTipProps
      });
    }
  },
  
  methods: {
    
    onChanged() {
      let show = !this.data.showUseTip;
      this.setData({
        showUseTip: show
      });
      // 组件事件外抛
      this.triggerEvent('customevent', show)
    },
  }

});
