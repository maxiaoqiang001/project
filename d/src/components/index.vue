<template>
  <el-container class="warp">
    <el-header>
      <heade></heade>
    </el-header>

    <el-main>
      <section class="section">
        <el-row :gutter="20">
          <el-col :span="6">
            <!--统计数据-->
            <div>
              <statistics ref="statisticsCon" :chartH="statisticsH"></statistics>
            </div>

            <!--近7天车辆在线数-->
            <div @click="changeChart('onLineData')">
              <onLine ref="onLineData" :chartH="chartLineH"></onLine>
            </div>

            <!--车辆动态-->
            <div>
              <dynamic ref="dynamicCon" :chartH="dynamicH"></dynamic>
            </div>
          </el-col>
          <el-col :span="12">
            <!--全国地图-->
            <div @click="changeChart('countryMapData')">
              <countryMap ref="countryMapData" :chartH="mapH"></countryMap>
            </div>

            <!--全国入网车辆分布-->
            <div @click="changeChart('vehicleDistributionData')">
              <vehicleDistribution ref="vehicleDistributionData" :chartH="three"></vehicleDistribution>
            </div>
          </el-col>
          <el-col :span="6">
            <!--报警排行榜-->
            <div @click="changeChart('rankinglistData')">
              <rankinglist ref="rankinglistData" :chartH="three"></rankinglist>
            </div>

            <!--近一个月报警趋势-->
            <div @click="changeChart('alarmTrendData')">
              <alarmTrend ref="alarmTrendData" :chartH="three"></alarmTrend>
            </div>

            <!--报警分布-->
            <div @click="changeChart('alarmDistributionData')">
              <alarmDistribution ref="alarmDistributionData" :chartH="three"></alarmDistribution>
            </div>
          </el-col>
        </el-row>
      </section>
    </el-main>
  </el-container>
</template>

<script>
  import heade from '@/components/heade'
  import statistics from '@/views/statistics'
  import onLine from '@/views/onLine'
  import dynamic from '@/views/dynamic'
  import countryMap from '@/views/countryMap'
  import vehicleDistribution from '@/views/vehicleDistribution'
  import rankinglist from '@/views/rankinglist'
  import alarmTrend from '@/views/alarmTrend'
  import alarmDistribution from '@/views/alarmDistribution'

  export default {
    name: 'index',
    components: {
      heade: heade,
      statistics: statistics,
      onLine: onLine,
      dynamic: dynamic,
      countryMap: countryMap,
      vehicleDistribution: vehicleDistribution,
      rankinglist: rankinglist,
      alarmTrend: alarmTrend,
      alarmDistribution: alarmDistribution
    },
    data() {
      return {
        screenHeight: window.innerHeight,
        three: 0
      }
    },
    methods: {
      getH(first) {
        this.screenHeight = window.innerHeight;
        this.three = (this.screenHeight - 60 - 4 * 15 - 3 * 35 - 6) / 3;
        this.mapH = this.screenHeight - (this.three + 35 + 2) - 60 - 3 * 15 - 35 - 2;
        this.statisticsH = this.three * 3 * (1 / 6);
        this.chartLineH = this.three * 3 * (2 / 6);
        this.dynamicH = this.three * 3 * (3 / 6);
        if (first) {
          this.$refs.rankinglistData.chartResize(this.three); // 报警排行榜
          this.$refs.alarmTrendData.chartResize(this.three); // 近一个月报警趋势
          this.$refs.alarmDistributionData.chartResize(this.three); // 报警分布
          this.$refs.vehicleDistributionData.chartResize(this.three); // 全国入网车辆分布
          this.$refs.countryMapData.chartResize(this.mapH); // 全国地图
          this.$refs.statisticsCon.chartResize(this.statisticsH); // 统计数据
          this.$refs.dynamicCon.chartResize(this.dynamicH); // 车辆动态
          this.$refs.onLineData.chartResize(this.chartLineH); // 近7天车辆在线数
        }
      },
      changeChart(curType) {
        this.$refs[curType].getClass(this.$store.state.curModule.title);
        this.$refs['countryMapData'].getClass(this.$store.state[curType].title);

        this.$store.state[curType].el.clear();
        this.$store.state.showModuleEle.clear();
        if(this.$store.state.curModule.prev && this.$store.state.curModule.prev !== curType) {
          // 判断如果是上一个已经切换到中间展示区先把上一个还原到之前的位置
          let prevType = this.$store.state.curModule.prev;
          this.$refs[prevType].getClass(this.$store.state[prevType].title);
          this.$store.state[prevType].el.clear();
          this.$store.state[prevType].el.setOption(this.$store.state[prevType].option);
          this.$store.state.curModule = this.$store.state['countryMapData'];
          this.$refs[curType].getClass('全国地图');
        }

        // 如果当前点击的这个图表和中间展示区的是同一个，那么还原图表
        if (curType === this.$store.state.curModule.type) {
          this.$store.state[curType].el.setOption(this.$store.state[curType].option);
          this.$store.state.showModuleEle.setOption(this.$store.state['countryMapData'].option);
          this.$store.state.curModule = this.$store.state['countryMapData'];
          this.$refs['countryMapData'].getClass('全国地图');
          return
        }
        // 第一次点击的时候切换
        this.$store.state[curType].el.setOption(this.$store.state.curModule.option);
        this.$store.state.showModuleEle.setOption(this.$store.state[curType].option);
        this.$store.state.curModule = this.$store.state[curType];

        this.$store.state.curModule.prev = curType;
      }
    },
    mounted() {
      let arr = ['statisticsCon','dynamicCon','alarmDistributionData','alarmTrendData','rankinglistData','vehicleDistributionData','countryMapData','onLineData'];
      arr.forEach((item) => {
        this.$refs[item].getClass();
      });
      window.addEventListener('resize', this.getH);
    },
    watch: {
      screenHeight(val) {
        this.screenHeight = val;
      }
    },
    created() {
      this.getH();
      // { parser: "babylon" } is deprecated; we now treat it as { parser: "babel" }
    }
  }
</script>

<style scoped>
  .warp {
    /*min-width: 1000px;*/
    -moz-user-select: none; /*火狐*/
    -webkit-user-select: none; /*webkit浏览器*/
    -ms-user-select: none; /*IE10*/
    -khtml-user-select: none; /*早期浏览器*/
    user-select: none;
  }

  .section {
    padding: 0 15px;
    overflow: auto;
  }

  .section::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }

  .section::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: #0556B0;
  }

  .section::-webkit-scrollbar-track, .section::-webkit-scrollbar-corner {
    background: #032058;
  }

  .el-header, .el-main {
    padding: 0;
  }
</style>
