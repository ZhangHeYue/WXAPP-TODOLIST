//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    inputValue: '',
    defaultTask: {},
    finishTask: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  bindInputText: function (e) {
    console.log(e.detail.value)
    this.setData({
      inputvalue: e.detail.value
    })
  },
  bindAddTap: function () {
    this.setData({
      defaultTask: {this.defaultTask, { date: new Date(), text: this.inputValue }}
    })
    wx.setStorage({
      key: "defaultTask",
      data: defaultTask
    })
    this.setData({
      inputvalue: ''
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo,
        defaultTask: wx.getStorageSync('defaultTask'),
        finishTask: wx.getStorageSync('finishTask')
      })
    })
  }
})
