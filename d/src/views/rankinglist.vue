<template>
  <div class="c_warp charts_warp" :class="cls">
    <span class="leftT radius"></span>
    <span class="rightT radius"></span>
    <span class="leftB radius"></span>
    <span class="rightB radius"></span>
    <div class="titleImg">
      <img src="../../static/images/icon/title.png">
    </div>
    <!--<div class="charts_title">{{$store.state.rankinglistData.title}}</div>-->
    <div class="charts_title">{{title}}</div>

    <div id="chartRanking" :style="{height: curH}"></div>
  </div>
</template>

<script>
  export default {
    name: "rankinglist",
    data() {
      return {
        title: '',
        cls: '',
        curH: 0,
        myChart: '',
        option: {
          tooltip: {
            trigger: 'item',
            formatter: "{b} : {c}%"
          },
          legend: {
            x: 'center',
            y: 'bottom',
            itemWidth: 10,   // 设置图例图形的宽
            itemHeight: 10,  // 设置图例图形的高
            textStyle: {
              color: ['#3ea1ff', '#00cef5', '#9860e5', '#f3637c', '#f2a511']  // 图例文字颜色
            },
            data: ['分神', '违规', '抽烟', '超速', '疲劳']
          },
          series: [{
            name: '访问来源',
            type: 'pie',
            roseType: 'radius',
            radius: ['15%', '70%'],
            center: ['50%', '45%'],
            color: ['#3ea1ff', '#00cef5', '#9860e5', '#f3637c', '#f2a511'], //'#FBFE27','rgb(11,228,96)','#FE5050'
            data: [
              {
                value: 30,
                name: '分神'
              },
              {
                value: 22,
                name: '违规'
              },
              {
                value: 12,
                name: '抽烟'
              },
              {
                value: 14,
                name: '超速'
              },
              {
                value: 7,
                name: '疲劳'
              }
            ],

            label: {
              normal: {
                formatter: '{c}%',
              }
            },
            labelLine: {
              normal: {
                length: 5,
              }
            },
          }]
        }
      }
    },
    methods: {
      chart() {
        //初始化echarts实例
        this.myChart = this.Echarts.init(document.querySelector('#chartRanking'));

        //使用制定的配置项和数据显示图表
        this.$store.state.rankinglistData.option = this.option;
        this.$store.state.rankinglistData.el = this.myChart;
        this.myChart.setOption(this.option);
      },
      chartResize(h) {
        this.curH = `${h}px`;
        if(this.myChart){
          setTimeout(this.myChart.resize,10);
        }
      },
      getClass(t) {
        this.title = t || '报警排行榜TOP5';
        this.cls = this.utils.portType(this);
      }
    },
    mounted() {
      this.chart();
    },
    created() {
      this.curH = `${this.chartH}px`;
    },
    props: ['chartH']
  }
</script>

<style scoped>

</style>
