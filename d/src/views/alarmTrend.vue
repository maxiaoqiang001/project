<template>
  <div class="c_warp charts_warp" :class="cls">
    <span class="leftT radius"></span>
    <span class="rightT radius"></span>
    <span class="leftB radius"></span>
    <span class="rightB radius"></span>
    <div class="titleImg">
      <img src="../../static/images/icon/title.png">
    </div>
    <!--<div class="charts_title">{{$store.state.alarmTrendData.title}}</div>-->
    <div class="charts_title">{{title}}</div>

    <div id="trend" :style="{height: curH}"></div>
  </div>
</template>

<script>
  export default {
    name: "alarmTrend",
    data() {
      return {
        cls: '',
        title: '',
        curH: 0,
        myChart: '',
        option: {
          grid: {
            top: '18%',
            left: '5%',
            right: '5%',
            bottom: '5%',
            containLabel: true,
          },
          tooltip: {
            trigger: 'axis',
            formatter: (params) => {
              let param = params[0];
              let year = new Date().getFullYear();
              let month = (new Date().getMonth() + 1) < 9 ? '0' + (new Date().getMonth() + 1) : new Date().getMonth() + 1;
              let style = `"width:10px;height:10px;display:inline-block;border-radius: 50%;background:${param.color};vertical-align:middle;"`;
              let str = `<div><p>${year}-${month}-${param.name}</p><p><span style=${style}></span><span style="padding:0 5px;">${param.seriesName}:</span><span>${param.value}</span></p></div>`;
              return str;
            },
            axisPointer: {
              lineStyle: {
                color: '#57617B'
              }
            }
            // show: false
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'],
            axisLine: {
              lineStyle: {
                color: '#03376e',
                width: 1
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#0b1349'
              }
            }
          },
          yAxis: [{
            type: 'value',
            axisTick: {
              show: false
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#0b1349'
              }
            },
            axisLine: {
              lineStyle: {
                color: '#03376e',
                width: 1
              }
            }
          }],
          series: [{
            name: '报警次数',
            type: 'line',
            smooth: true, //是否平滑曲线显示
            showAllSymbol: true,
            symbol: 'circle',
            symbolSize: 6,
            lineStyle: {
              normal: {
                color: new this.Echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    // color: '#ff0000'
                    color: '#f0637a'
                  },
                  {
                    color: '#eb64fb',
                    // color: '#f0637a'
                    offset: 1
                  }
                ], false)// 线条颜色
              },
            },
            label: {
              show: true,
              position: 'top',
              textStyle: {
                color: '#eb64fb',
                fontSize: 10
              }
            },
            itemStyle: {
              color: "#eb64fb",
              borderColor: "#eee",
              borderWidth: 1
            },
            areaStyle: {
              normal: {
                color: new this.Echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: '#eb64fb'
                  },
                  {
                    offset: 1,
                    // color: '#3fbbff0d'
                    color: '#0e194a'
                  }
                ], false)
              }
            },
            data: [393, 438, 485, 631, 689, 824, 987, 1000, 1100, 1200]
          }]
        }
      }
    },
    methods: {
      chart() {
        //初始化echarts实例
        this.myChart = this.Echarts.init(document.querySelector('#trend'));

        //使用制定的配置项和数据显示图表
        this.$store.state.alarmTrendData.option = this.option;
        this.$store.state.alarmTrendData.el = this.myChart;
        this.myChart.setOption(this.option);
      },
      chartResize(h) {
        this.curH = `${h}px`;
        if(this.myChart){
          setTimeout(this.myChart.resize,10);
        }
      },
      getClass(t) {
        this.title = t || '近一个月报警趋势';
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
