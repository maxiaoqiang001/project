<template>
  <div class="c_warp charts_warp" :class="cls">
    <span class="leftT radius"></span>
    <span class="rightT radius"></span>
    <span class="leftB radius"></span>
    <span class="rightB radius"></span>
    <div class="titleImg">
      <img src="../../static/images/icon/title.png">
    </div>
    <!--<div class="charts_title">{{$store.state.onLineData.title}}</div>-->
    <div class="charts_title">{{title}}</div>

    <div id="chartLine" :style="{height: curH}"></div>
  </div>
</template>

<script>
  export default {
    name: "onLine",
    data() {
      return{
        cls: '',
        title: '近7天车辆在线数',
        curH: 0,
        myChart: '',
        week: ['星期一','星期二','星期三','星期四','星期五','星期六','星期日'],
        option: {
          color: ['#3398DB'],
          tooltip: {
            trigger: 'item',
            axisPointer: {
              type: 'shadow'
            },
            formatter: (params) => {
              return this.week[params.dataIndex] + "：" + params.value;
            }
          },
          grid: {
            left: '5%',
            right: '5%',
            bottom: '5%',
            top: '8%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              // data: ['01', '02', '03', '04', '05', '06', '07'],
              data: ['周一','周二','周三','周四','周五','周六','周日'],
              axisTick: {
                show: false
              },
              axisLine: {
                show: false,
                lineStyle: {
                  color: '#04829e'
                }
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              axisLabel: {
                formatter: (value) => {
                  if(value / 1000 >= 1) {
                    return `${value / 1000} k`;
                  }else {
                    return 0;
                  }
                }
              },
              axisTick:{
                show:false
              },
              splitLine: {
                lineStyle: {
                  color: '#0b1349',
                }
              },
              axisLine: {
                show: false,
                lineStyle: {
                  color: '#04829e'
                }
              }
            }
          ],
          series: [
            {
              type: 'bar',
              itemStyle: {
                normal: {color: '#0c1b48'}
              },
              barGap:'-100%',
              data: [5000, 5000, 5000, 5000, 5000, 5000, 5000],
              z: 1
            },
            {
              name: '',
              z: 2,
              type: 'bar',
              barWidth: '40%',
              itemStyle: {
                normal: {
                  color: '#ff8e01',
                  label: {
                    show: true,
                    position: 'top',
                    textStyle: {
                      color: '#e58106',
                      fontSize: 10
                    }
                  }
                }
              },
              data: [4200, 3200, 3000, 2200, 1800, 1800, 1100]
            }
          ]
        }
      }
    },
    methods: {
      chart() {
        //初始化echarts实例
        this.myChart = this.Echarts.init(document.querySelector('#chartLine'));

        //使用制定的配置项和数据显示图表
        this.$store.state.onLineData.option = this.option;
        this.$store.state.onLineData.el = this.myChart;
        this.myChart.setOption(this.option);
      },
      chartResize(h) {
        this.curH = `${h}px`;
        if(this.myChart){
          setTimeout(this.myChart.resize,10);
        }
      },
      getClass(t) {
        this.title = t || '近7天车辆在线数';
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
