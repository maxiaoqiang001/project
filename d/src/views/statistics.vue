<template>
  <div class="c_warp charts_warp" :class="cls">
    <span class="leftT radius"></span>
    <span class="rightT radius"></span>
    <span class="leftB radius"></span>
    <span class="rightB radius"></span>
    <div class="titleImg">
      <img src="../../static/images/icon/title.png">
    </div>
    <div class="charts_title">统计数据</div>

    <div class="statistics_warp" :style="{height: curH,padding: padding}">
      <div class="statistics_con">
        <el-row :getter="20">
          <el-col :span="6" class="br ellipsis">
            <p>集团总数</p>
            <p>3家</p>
          </el-col>

          <el-col :span="8" class="br ellipsis">
            <p>入网车辆数</p>
            <p>98辆</p>
          </el-col>

          <el-col :span="10" class="ellipsis">
            <p>昨日里程数</p>
            <p>10,000,000km</p>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "statistics",
    data() {
      return {
        cls: '',
        curH: 0,
        padding: 0
      }
    },
    methods: {
      chartResize(h) {
        this.curH = `${h}px`;
        this.padding = `${(this.chartH-40)/2}px 2%`;
      },
      getClass() {
        this.cls = this.utils.portType(this);
      }
    },
    created() {
      this.curH = `${this.chartH}px`;
      this.padding = `${(this.chartH-40)/2}px 2%`;
    },
    props: ['chartH']
  }
</script>

<style scoped>
  .statistics_warp{
    overflow: hidden;
    box-sizing: border-box;
  }

  .statistics_con {
    box-sizing: border-box;
    padding: 5px;
    text-align: center;
    border: 1px solid;
    border-top-color: #0b2f79;
    border-left-color: #0b2f79;
    border-right-color: #057be8;
    border-bottom-color: #057be8;
  }

  .statistics_con p{
    line-height: 14px;
  }

  .statistics_con p:nth-child(odd) {
    color: #03c6de;
    font-size: 12px;
  }

  .statistics_con p:nth-child(even) {
    color: #03c992;
    font-size: 14px;
  }

  .br{
    border-right: 1px solid #052c68;
  }
</style>
