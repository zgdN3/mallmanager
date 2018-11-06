<template>
<el-container class="container">
    <!-- 头部 -->
    <el-header class="header">
        <el-row>
            <el-col :span="4">
                <div class="grid-content bg-purple">
                    <img src="@/assets/logo.png" alt="无法显示图片">
                </div>
            </el-col>
            <el-col :span="19" class="middle">

                <h2>电商后台管理系统</h2>

            </el-col>
            <el-col :span="1">

                <a href="#" class="loginout" @click.prevent="handleSignout">退出</a>

            </el-col>
        </el-row>
    </el-header>
    <el-container>
        <!-- 侧边栏 -->
        <el-aside class="aside" width="200px">
            <!-- :unique-opened:是否只保持一个子菜单的展开
            :route  开启理由模式 如果值为true 被激活的导航的index可以修改path标识 -->
            <el-menu default-active="2-1" class="menu" :unique-opened="true" :router="true">
                <!-- 用户管理-->
                <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>用戶管理</span>
                    </template>
                    <el-menu-item index="/users">
                        <i class="el-icon-menu"></i>
                        用戶列表
                    </el-menu-item>
                </el-submenu>
                <!-- 权限管理-->
                <el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>权限管理</span>
                    </template>
                    <el-menu-item index="/roles">
                        <i class="el-icon-menu"></i>
                        角色列表
                    </el-menu-item>
                    <el-menu-item index="/rights">
                        <i class="el-icon-menu"></i>
                        权限列表
                    </el-menu-item>
                </el-submenu>
                <!-- 商品管理-->
                <el-submenu index="3">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>商品管理</span>
                    </template>
                    <el-menu-item index="3-1">
                        <i class="el-icon-menu"></i>
                        商品列表
                    </el-menu-item>
                    <el-menu-item index="3-1">
                        <i class="el-icon-menu"></i>
                        分类参数
                    </el-menu-item>
                    <el-menu-item index="3-1">
                        <i class="el-icon-menu"></i>
                        商品分类
                    </el-menu-item>
                </el-submenu>
                <!--订单管理-->
                <el-submenu index="4">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>订单管理</span>
                    </template>
                    <el-menu-item index="4-1">
                        <i class="el-icon-menu"></i>
                        订单列表
                    </el-menu-item>
                </el-submenu>
                <!--数据统计-->
                <el-submenu index="5">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>数据统计</span>
                    </template>
                    <el-menu-item index="5-1">
                        <i class="el-icon-menu"></i>
                        数据报表
                    </el-menu-item>
                </el-submenu>

            </el-menu>
        </el-aside>
        <el-main class="main">
            <router-view></router-view>
        </el-main>
    </el-container>
</el-container>
</template>

<script>
export default {
beforeCreate(){
    //拿到token值
    const token = sessionStorage.getItem('token')
    //判断是否登录
    if(!token){
        // 先提示用户没有登录  先登录
        this.$message.warning('请先登录')
        //没有登录  返回登录页面
        this.$router.push('/login')
    }
},
methods:{
    handleSignout(){
        //删除session中的token
        sessionStorage.clear()
        //跳转到登录页面
        this.$router.push({name:'login'})
        //提示
        this.$message.success('退出成功')
    }
}
}
</script>

<style>
.container {
    height: 100%;
}

.header {
    background-color: #d3c0d1;
}

.header .middle {
    line-height: 60px;
    color: #fff;
    text-align: center;
}

.header .loginout {
    line-height: 60px;
    text-decoration: none;
}

.aside {
    background-color: #d3dce6;
}

.main {
    background-color: #e9eef3;
    height: 100%;
}

.aside .menu {
    height: 100%;
}
</style>
