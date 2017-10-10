new Vue({
  el: '#app',
  components: {
    //传入props组件
    testArg: {
      template: "#test-arg",
      props: ["message"],
      methods: {
        on_click: function () {
          if (this.isGood) {
            this.count--;
          } else {
            this.count++;
          }
          this.isGood = !this.isGood;
        }
      },
      data: function () {
        return {
          isGood: false,
          count: this.message,
        }
      }
    },
    nest: {
      template: "#nest",
    }
  }
})

// 全局组件注册
Vue.component('alert', {
  template: '#alert',
  props: ['message'],
  methods: {
    on_click: function () {
      if (this.isGood) {
        this.count--;
      } else {
        this.count++;
      }
      this.isGood = !this.isGood;
    }
  },
  data: function () {
    return {
      count: 1,
      isGood: false
    }
  },
})


Vue.component('my-component', {
  template: '<div>A custom component!<slot></slot></div>',
})
// 创建根实例
new Vue({
  el: '#example'
})