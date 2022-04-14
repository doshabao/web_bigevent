//注意:每次调用$.get()或$.post()或$.ajax()的时候，会先调用ajaxPrefilter 这个函数
//在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    // 在发起真正的Ajax之前，统一发起拼接请求的根路径
    options.url = 'http://www.liulongbin.top:3007' + options.url;
    // 统一为有权限的接口设置headers请求头

    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            headers: {
                Authorization: localStorage.getItem('token') || ''
            }
        }
    }

    console.log(options.url);
    //全局统一挂载 complete 回调函数
    // options.complete = function (res) {
    //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
    //         //1、强者清空token
    //         localStorage.removeItem('token')
    //         //2、强制跳转到登录页面
    //         location.href = '/04-阶段四%20前端后交互/后台大事件管理项目/login.html'
    //     }
    // }
})



