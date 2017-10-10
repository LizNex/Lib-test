var routes = [{
    path: '/',
    component: {
      template: '<div>主页</div>'
    }
  }, {
    path: '/page1',
    component: {
      template: '<div>第一页</div>'
    }
  },
  {
    path: '/page2/:name',
    component: {
      template: `
    <div>
      <h2>第二页</h2>
      <div>姓名：{{$route.params.name}}</div>
      <div>性别：{{$route.query.sex}}</div>
      <router-link to="more" append >更多</router-link>
     
    </div>
    <div> <router-view></router-view></div>
      `
    },
    child: [{
      path: 'more',
      component: {
        // template: '<div>{{$route.params.name}}详细信息</div><div>xxxxxxx</div>'
        template: `<div>我就是测试子路由</div>`
      }
    }]
  }
];



var router = new VueRouter({
  routes: routes
})

// var app = new Vue({
//   el: "#app",
//   router: router
// })

// ------------------------------------------

var routerTest = [{
  path: '/test',
  component: {
    template: `
    <div>
      <div>父级路由</div>
      <div>以下是父级路由内容</div>
      <router-link to="son" append>子级路由</router-link>
      <router-view></router-view>
    </div>
    `
  },
  children: [{
    path: 'son',
    component: {
      template: `
      <div>子级路由</div>
      `
    }
  }]
}];


var routerTest = new VueRouter({
  routes: routerTest
})


var testApp = new Vue({
  el: "#test",
  router: routerTest
})