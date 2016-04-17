/**
 * Created by Walter on 16/1/18.
 */

Vue.transition('fade', {
    css: false,
    enter: function (el, done) {
        // 元素已被插入 DOM
        // 在动画结束后调用 done
        $(el)
            .css('opacity', 0)
            .animate({ opacity: 1 }, 500, done)
    },
    enterCancelled: function (el) {
        $(el).stop()
    },
    leave: function (el, done) {
        // 与 enter 相同
        $(el).animate({ opacity: 0 }, 500, done)
    },
    leaveCancelled: function (el) {
        $(el).stop()
    }
})

var Test = Vue.extend({
    props: ['content','title','myName'],
    template: '<div class="card blue-grey darken-1"> <div class="card-content white-text"> <span class="card-title">{{title}}-{{myName}}</span> <p>{{content}}</p> </div> </div>'
});

Vue.component('Test', Test);

new Vue({
    el: '#app',
    data: {
        showHeader: false,
        urlLink: '###',
        message: '这个例子使用 Firebase 作为后台数据存储，并与客户端实时同步 (你可以在多个浏览器标签中打开它)。',
        todoList: [
            {name: '干掉小王'},
            {name: '干掉小张'},
            {name: '干掉小立'}
        ],
        userList: [
            {name: "杨世伟", company: "卡萨丁科技", mobile: '15340698421'},
            {name: "杨世伟", company: "卡萨丁科技", mobile: '15340698421'},
            {name: "杨世伟", company: "卡萨丁科技", mobile: '15340698421'},
            {name: "杨世伟", company: "卡萨丁科技", mobile: '15340698421'}
        ]
    },
    created: function() {
        Materialize.toast('Vue Created!', 1000, 'rounded');
    },
    compiled: function() {
        Materialize.toast('Vue Compiled!', 1000, 'rounded');
    },
    ready: function() {
        Materialize.toast('Vue Ready!', 1000, 'rounded');
    },
    destroyed: function() {
        Materialize.toast('Vue Destroyed!', 1000, 'rounded');
    },
    methods: {
        reverseMessage: function() {
            this.message = this.message.split('').reverse().join('');
        },
        addTodo: function() {
            var text = this.newTodo.trim();
            if(text) {
                this.todoList.push({name: text});
                this.newTodo = '';
            }
        },
        removeTodo: function(index) {
            this.todoList.splice(index, 1);
        },
        showName: function(obj) {
            console.log(obj.mobile);
        }
    }
});

