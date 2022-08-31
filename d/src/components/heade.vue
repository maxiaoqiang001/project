<template>
  <div class="header">
    <el-row :gutter="10">
      <el-col :span="6">
        <el-row :gutter="20">
<!--          <el-col :span="12">
            <div class="logo"></div>
          </el-col>-->
          <el-col :span="24">
            <div class="logoTitle">中国车联网网</div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="14">
        <div class="content">
          <el-row :gutter="10">
            <div v-for="(item,index) in column" @click="curHref(item,index)">
              <el-col :span="3" class="navs" :class="item.active?'active':''">{{item.title}}</el-col>
            </div>
          </el-row>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="user">
          <el-row :gutter="10">
            <el-col :span="12" style="text-align: right;">
              <el-tooltip class="item" effect="dark" content="您好，王宁" placement="bottom">
                <img src="../../static/images/icon/users.png">
              </el-tooltip>
            </el-col>
            <el-col :span="12">
              <el-tooltip class="item" effect="dark" content="退出" placement="bottom">
                <img src="../../static/images/icon/off.png" @click="close">
              </el-tooltip>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "heade",
    data() {
      return {
        column: [
          {title: '首页', path: 'index', active: true},
          {title: '车辆监控', path: 'monitor'},
          {title: '安全管理', path: 'securityManagement'},
          {title: '主动安全', path: 'activesafety'},
          {title: '机务管理', path: 'maintenance'},
          {title: '报表统计', path: 'statistics'},
          {title: '运营管理', path: 'operate'},
          {title: '系统管理', path: 'system'}
        ]
      }
    },
    methods: {
      curHref(path, i) {
        this.column.forEach((item, index) => {
          item.active = index == i ? true : false;
        });
        if(path.path !== 'index') {
          this.$message({
            message: '模块正在建设中...',
            duration: 800,
            type: 'info'
          });
        }
        this.$forceUpdate();
      },
      close() {
        this.$msgbox({
          title: '温馨提示',
          message: '是否要继续退出？',
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '正在退出中...';
              setTimeout(() => {
                done();
                setTimeout(() => {
                  instance.confirmButtonLoading = false;
                }, 300);
              }, 2000);
            } else {
              done();
            }
          }
        }).then(action => {
          this.$message({
            type: 'info',
            message: '退出成功！'
          });
        }).catch(() => {});
      }
    }
  }
</script>

<style scoped>
  .header {
    background: #08124f;
    width: 100%;
    height: 60px;
  }

  .logo {
    width: 122px;
    height: 40px;
    margin: 10px 20px;
    /*background: url("../../static/images/icon/logo.png ") no-repeat 100% 100%;*/
  }

  .logoTitle{
    height: 60px;
    line-height: 60px;
    font-weight: 700;
    color: #045396;
    text-align: center;
  }

  .content {
    line-height: 58px;
    color: #9597a7;
    text-align: center;
  }

  .navs:hover {
    cursor: pointer;
    color: #359adc;
  }

  .active {
    color: #359adc;
    border-bottom: 2px solid #3eb4fa;
    animation: myfirst 5s;
  }

  .user{
    width: 100%;
    /*line-height: 60px;*/
    text-align: center;
  }

  .user img{
    width: 20px;
    height: 20px;
    margin: 20px 0;
  }

  .user img:hover{
    cursor: pointer;
  }

  @keyframes myfirst
  {
    0%   {left:0px; top:0px;}
    25%  {left:200px; top:0px;}
    50%  {left:200px; top:200px;}
    75%  {left:0px; top:200px;}
    100% {left:0px; top:0px;}
  }
</style>
