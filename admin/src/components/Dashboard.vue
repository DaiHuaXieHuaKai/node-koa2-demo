<template>
  <div class="dashboard-container">
    <el-container>
      <el-aside>
        <div class="profile">
             <div class="profile-img">
              <img src="../assets/logo.png" alt="">
             </div>
             <div class="profile-name">Admin</div>
        </div>
        <el-menu default-active="1" background-color="#4b6c8b" text-color="#ffffff">
          <el-menu-item index="1">
              <template slot="title">
                <i class="el-icon-info"></i>
                <span>系统面板</span>
              </template>
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">用户管理</span>
            </template>
              <el-menu-item index="1-1">用户列表</el-menu-item>
              <el-menu-item index="1-2">角色管理</el-menu-item>
              <el-menu-item index="1-3">权限管理</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title">影片管理</span>
            </template>
            <el-menu-item index="2-1">所有影片</el-menu-item>
            <el-menu-item index="2-2">爬取影片</el-menu-item>
            <el-menu-item index="2-3">分类管理</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">              
              <i class="el-icon-setting"></i>
              <span slot="title">系统设置</span>
            </template>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span slot="title">导航四</span>
            </template>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          header
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  data() {
    return {
      collapse: false
    };
  },
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-aside {
  background: #4b6c8b;
  height: 100vh;
}
.el-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  background: #4b6c8b;
}
.el-menu-item.is-active {
  background: #fff !important;
  border-right: 5px solid #409eff;
}
.profile {
  margin: 40px 0;
}
.profile-img {
  text-align: center;
}
.profile-img img {
  width: 80px;
  height: 80px;
  box-sizing: border-box;
  border: 1px solid #fefefe;
  border-radius: 50%;
}
.profile-name {
  margin: 10px 0;
  text-align: center;
  color: #fff;
  font-weight: 700;
  font-size: 18px;
}
</style>
