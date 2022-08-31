<template>
  <div class="charts_warp" :class="cls">
    <span class="leftT radius"></span>
    <span class="rightT radius"></span>
    <span class="leftB radius"></span>
    <span class="rightB radius"></span>
    <div class="titleImg">
      <img src="../../static/images/icon/title.png">
    </div>
    <!--<div class="charts_title">报警分布</div>-->
    <!--<div class="charts_title">{{$store.state.alarmDistributionData.title}}</div>-->
    <div class="charts_title">{{title}}</div>

    <div id="distribution" :style="{height: curH}"></div>
  </div>
</template>

<script>
  export default {
    name: "alarmDistribution",
    data() {
      return {
        title: '',
        cls: '',
        curH: 0,
        myChart: '',
        option: {
          tooltip: {
            trigger: 'item',
            formatter: (params) => {
              let style = `"width:10px;height:10px;display:inline-block;border-radius: 50%;background:${params.color};vertical-align:middle;margin:0 5px;"`;
              return `<span style=${style}></span>` + params.name + ':' + this.plantCap[params.dataIndex].value;
            }
          },
          grid: {
            show: false,
            top: 10,
            bottom: 10
          },
          xAxis: [{
            gridIndex: 0,
            type: 'value',
            show: false,
            min: 0,
            max: 100,
            nameLocation: 'middle',
            nameGap: 5
          }],
          yAxis: [{
            gridIndex: 0,
            min: 0,
            show: false,
            max: 100,
            nameLocation: 'middle',
            nameGap: 30
          }],
          series: [{
            type: 'effectScatter',
            symbol: 'circle',
            label: {
              normal: {
                show: true,
                formatter: '{b}',
                color: '#fff',
                textStyle: {
                  fontSize: '20'
                }
              },
            },
            itemStyle: {
              normal: {
                color: '#00acea'
              }
            },
            data: []
          }]
        },
        plantCap: []
      }
    },
    methods: {
      init() {
        this.plantCap = [
          {
            offset: [15, 75],
            symbolSize: 30,
            opacity: .95,
            color: '#3ea1fe',
            name: '北京',
            value: '222',
            fontSize: 12
          },
          {
            offset: [10, 25],
            symbolSize: 25,
            opacity: .88,
            color: '#f3637c',
            name: '江苏',
            value: '115',
            fontSize: 12
          },
          {
            offset: [55, 70],
            symbolSize: 50,
            opacity: .84,
            color: '#50ca73',
            name: '山东',
            value: '113',
            fontSize: 18
          },
          {
            offset: [50, 10],
            symbolSize: 25,
            opacity: .8,
            color: '#f7a130',
            name: '宁夏',
            value: '95',
            fontSize: 12
          },
          {
            offset: [95, 75],
            symbolSize: 35,
            opacity: .75,
            color: '#9860e5',
            name: '河南',
            value: '92',
            fontSize: 16
          },
          {
            offset: [90, 20],
            symbolSize: 30,
            opacity: .7,
            color: '#3fcbcc',
            name: '广东',
            value: '87',
            fontSize: 14
          }
        ];
        for (var i = 0; i < this.plantCap.length; i++) {
          var item = this.plantCap[i];
          this.option.series[0].data.push({
            name: item.name,
            value: item.offset,
            symbolSize: item.symbolSize,
            label: {
              normal: {
                textStyle: {
                  fontSize: item.fontSize
                }
              }
            },
            itemStyle: {
              normal: {
                color: item.color,
                opacity: item.opacity
              }
            }
          })
        }
        this.chart();
      },
      chart() {
        //初始化echarts实例
        this.myChart = this.Echarts.init(document.querySelector('#distribution'));

        //使用制定的配置项和数据显示图表
        this.$store.state.alarmDistributionData.option = this.option;
        this.$store.state.alarmDistributionData.el = this.myChart;
        this.myChart.setOption(this.option);
      },
      chartResize(h) {
        this.curH = `${h}px`;
        if(this.myChart){
          setTimeout(this.myChart.resize,10);
        }
      },
      getClass(t) {
        this.title = t || '报警分布';
        this.cls = this.utils.portType(this);
      }
    },
    mounted() {
      this.init();
    },
    created() {
      this.curH = `${this.chartH}px`;
    },
    props: ['chartH']
  }
</script>

<style scoped>

</style>
