<template>
  <div class="c_warp charts_warp" :class="cls">
    <span class="leftT radius"></span>
    <span class="rightT radius"></span>
    <span class="leftB radius"></span>
    <span class="rightB radius"></span>
    <div class="titleImg">
      <img src="../../static/images/icon/title.png">
    </div>
    <!--<div class="charts_title">{{$store.state.vehicleDistributionData.title}}</div>-->
    <div class="charts_title">{{title}}</div>

    <div id="vehicle" :style="{height: curH}"></div>
  </div>
</template>

<script>
  export default {
    name: "vehicleDistribution",
    data() {
      return {
        cls: '',
        title: '',
        curH: 0,
        myChart: '',
        option: {
          color: ['#3398DB'],
          tooltip: {
            trigger: 'item',
            axisPointer: {
              type: 'shadow'
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
              data: ['辽宁', '河北', '河南', '陕西', '北京', '四川', '湖北', '上海', '山东', '广东', '内蒙', '西藏', '天津', '甘肃', '宁夏', '贵州'],
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
                  return `${value / 1000} k`;
                }
              },
              axisTick: {
                show: false
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
            //柱底圆片
            name: '',
            type: 'pictorialBar',
            symbolSize: [20, 20],
            symbolOffset: [0, 0],
            z: 12,
            itemStyle: {
                normal: {
                    color: this.Echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: 'rgba(89,211,255,1)',
                        },
                        {
                            offset: 1,
                            color: 'rgba(23,237,194,1)',
                        },
                    ]),
                },
            },
            data: [5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000],
        },
            {
              type: 'bar',
              itemStyle: {
                normal: {color: '#0c1b48'}
              },
              barGap: '-100%',
              data: [5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000],
              z: 1
            },
            {
              name: '',
              z: 2,
              type: 'bar',
              barWidth: '40%',
              itemStyle: {
                normal: {
                  color: '#0078ff',
                }
              },
              data: [4200, 3200, 3000, 2200, 1800, 1800, 1100,4200, 3200, 3000, 2200, 1800, 1800, 1100, 1800, 1100]
            }
          ]
        }
      }
    },
    methods: {
      chart() {
        //初始化echarts实例
        this.myChart = this.Echarts.init(document.querySelector('#vehicle'));

        //使用制定的配置项和数据显示图表
        this.$store.state.vehicleDistributionData.option = this.option;
        this.$store.state.vehicleDistributionData.el = this.myChart;
        this.myChart.setOption(this.option);
      },
      chartResize(h) {
        this.curH = `${h}px`;
        if(this.myChart){
          setTimeout(this.myChart.resize,10);
        }
      },
      getClass(t) {
        this.title = t || '全国入网车辆分布';
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
  .c_warp .titleImg img {
    width: 30%;
  }
</style>
