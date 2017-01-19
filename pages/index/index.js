//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    inputValue: '',
    defaultTask: [],
    finishTask: []
  },
  //事件处理函数
  onPullDownRefresh: function(){
    wx.stopPullDownRefresh()
  },
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  bindIconDefaultTap: function (e) {
    var newDefaultTask = wx.getStorageSync('defaultTask') || []
    var newFinishTask = wx.getStorageSync('finishTask') || []
    for (let i = 0; i < newDefaultTask.length; i++) {
      if (newDefaultTask[i]['date'] == e.target.id) {
        newFinishTask.unshift(newDefaultTask[i])
        newDefaultTask.splice(i, 1);
        break;
      }
    }
    wx.setStorage({
      key: "defaultTask",
      data: newDefaultTask
    })
    wx.setStorage({
      key: "finishTask",
      data: newFinishTask
    })
    this.setData({
      defaultTask: newDefaultTask,
      finishTask: newFinishTask
    })
  },
   bindIconFinishTap: function (e) {
    var newDefaultTask = wx.getStorageSync('defaultTask') || []
    var newFinishTask = wx.getStorageSync('finishTask') || []
    for (let i = 0; i < newFinishTask.length; i++) {
      if (newFinishTask[i]['date'] == e.target.id) {
        newDefaultTask.unshift(newFinishTask[i])
        newFinishTask.splice(i, 1);
        break;
      }
    }
    wx.setStorage({
      key: "defaultTask",
      data: newDefaultTask
    })
    wx.setStorage({
      key: "finishTask",
      data: newFinishTask
    })
    this.setData({
      defaultTask: newDefaultTask,
      finishTask: newFinishTask
    })
  },
  bindDefaultDeleteTap: function(e) {
   var newDefaultTask = wx.getStorageSync('defaultTask') || []
   for (let i = 0; i < newDefaultTask.length; i++) {
      if (newDefaultTask[i]['date'] == e.target.id) {
        newDefaultTask.splice(i, 1);
        break;
      }
    }
    wx.setStorage({
      key: "defaultTask",
      data: newDefaultTask
    })
    this.setData({
      defaultTask: newDefaultTask,
    })
     wx.showToast({
    title: '成功删除',
    icon: 'success',
    mask: true,
    duration: 1000
      })
  },
  bindFinishDeleteTap: function(e) {
   var newFinishTask = wx.getStorageSync('finishTask') || []
   for (let i = 0; i < newFinishTask.length; i++) {
      if (newFinishTask[i]['date'] == e.target.id) {
        newFinishTask.splice(i, 1);
        break;
      }
    }
    wx.setStorage({
      key: "finishTask",
      data: newFinishTask
    })
    this.setData({
      finishTask: newFinishTask
    })
     wx.showToast({
    title: '成功删除',
    icon: 'success',
    mask: true,
    duration: 1000
      })
  },
  bindInputText: function (e) {
    this.inputValue = e.detail.value
  },
  bindAddTap: function () {
    var newDefaultTask = wx.getStorageSync('defaultTask') || []
    console.log(this.inputValue)
    if (this.inputValue === null || this.inputValue === undefined || this.inputValue === '') {
      return
    }
    newDefaultTask.unshift({ date: new Date(), text: this.inputValue })
    this.setData({
      defaultTask: newDefaultTask,
      inputValue: ''
    })
     this.inputValue = ''
    wx.setStorage({
      key: "defaultTask",
      data: newDefaultTask
    })
  },
  bindNextTap: function(e) {
    console.log(e)
    wx.navigateTo({url: '../logs/logs'})
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据~~
      that.setData({
        userInfo:userInfo,
        defaultTask: wx.getStorageSync('defaultTask') || [],
        finishTask: wx.getStorageSync('finishTask') || []
      })
    })
  }
})
