$(function () {
    // 调用 getUserInfo 获取用户基本信息
    getUserInfo()

    var layer = layui.layer
    $('#btnLogout').on('click', function () {
        // 提示用户是否确认退出
        layer.confirm('是否确定退出', { icon: 3, title: '提示' }, function (index) {
            //do something
            //1. 清空本地存储中的token
            localStorage.removeItem('token')
            //2.重新跳转到登录页面 
            location.href = '/04-阶段四%20前端后交互/后台大事件管理项目/login.html'
            // location.href = '/login.html'

            // 关闭confirm 询问框
            layer.close(index);
        });
    })
})

// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            // 调用 renderAvatar 渲染用户的头像
            renderAvatar(res.data)
        }
        // 不论成功还是失败，最终都会调用 complete 回调函数
        // complete: function(res) {
        //   // console.log('执行了 complete 回调：')
        //   // console.log(res)
        //   // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
        //   if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //     // 1. 强制清空 token
        //     localStorage.removeItem('token')
        //     // 2. 强制跳转到登录页面
        //     location.href = '/login.html'
        //   }
        // }
    })
}

// 渲染用户头像
function renderAvatar(user) {
    //1.获取用户的昵称
    var name = user.nickname || user.username
    //2.设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    //3.按需渲染用户的头像
    if (user.user_pic != null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
        //3.1 渲染图片头像    
    } else {

        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show()
    }
}