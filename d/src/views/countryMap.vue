<template>
  <div class="c_warp charts_warp" :class="cls">
    <span class="leftT radius"></span>
    <span class="rightT radius"></span>
    <span class="leftB radius"></span>
    <span class="rightB radius"></span>
    <div class="titleImg">
      <img src="../../static/images/icon/title.png">
    </div>
    <!--<div class="charts_title">{{$store.state.countryMapData.title}}</div>-->
    <div class="charts_title">{{title}}</div>

    <div id="country" :style="{height: curH}"></div>
  </div>
</template>

<script>
  export default {
    name: "countryMap",
    data() {
      return {
        cls: '',
        title: '全国地图',
        curH: 0,
        myChart: '',
        geoCoords: [],
        data: [
          {name: '北京', value: Math.round(Math.random() * 500)},
          {name: '天津', value: Math.round(Math.random() * 500)},
          {name: '上海', value: Math.round(Math.random() * 500)},
          {name: '重庆', value: Math.round(Math.random() * 500)},
          {name: '河北', value: Math.round(Math.random() * 500)},
          {name: '河南', value: Math.round(Math.random() * 500)},
          {name: '云南', value: Math.round(Math.random() * 500)},
          {name: '辽宁', value: Math.round(Math.random() * 500)},
          {name: '黑龙江', value: Math.round(Math.random() * 500)},
          {name: '湖南', value: Math.round(Math.random() * 500)},
          {name: '安徽', value: Math.round(Math.random() * 500)},
          {name: '山东', value: Math.round(Math.random() * 500)},
          {name: '新疆', value: Math.round(Math.random() * 500)},
          {name: '江苏', value: Math.round(Math.random() * 500)},
          {name: '浙江', value: Math.round(Math.random() * 500)},
          {name: '江西', value: Math.round(Math.random() * 500)},
          {name: '湖北', value: Math.round(Math.random() * 500)},
          {name: '广西', value: Math.round(Math.random() * 500)},
          {name: '甘肃', value: Math.round(Math.random() * 500)},
          {name: '山西', value: Math.round(Math.random() * 500)},
          {name: '内蒙古', value: Math.round(Math.random() * 500)},
          {name: '陕西', value: Math.round(Math.random() * 500)},
          {name: '吉林', value: Math.round(Math.random() * 500)},
          {name: '福建', value: Math.round(Math.random() * 500)},
          {name: '贵州', value: Math.round(Math.random() * 500)},
          {name: '广东', value: Math.round(Math.random() * 500)},
          {name: '青海', value: Math.round(Math.random() * 500)},
          {name: '西藏', value: Math.round(Math.random() * 500)},
          {name: '四川', value: Math.round(Math.random() * 500)},
          {name: '宁夏', value: Math.round(Math.random() * 500)},
          {name: '海南', value: Math.round(Math.random() * 500)},
          {name: '台湾', value: Math.round(Math.random() * 500)},
          {name: '香港', value: Math.round(Math.random() * 500)},
          {name: '澳门', value: Math.round(Math.random() * 500)},
          {
            name: "南海诸岛",
            value: 0,
            label: {normal: {show: false}},
            itemStyle: {normal: {opacity: 0, label: {show: false}}}
          }
        ],
        option: {
          geo: {
            show: true,
            map: 'china',
            zoom: 1.2,
            roam: true,
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                areaColor: '#060b31',
                borderWidth: 1,
                borderColor: '#026fbc',
                shadowColor: 'rgba(0,54,255, 1)',
                shadowBlur: 10
              }
            },
            regions: [{
              name: '南海诸岛',
              value: 0,
              itemStyle: {
                normal: {
                  opacity: 0,
                  label: {
                    show: false
                  }
                }
              }
            }]
          },
          tooltip: {
            trigger: 'item'
          },

          //左侧小导航图标
          visualMap: {
            show: true,
            left: 'right',
            top: 'bottom',
            itemHeight: '80%',
            calculable: true,
            seriesIndex: [0],
            // color: ['#060b31'],
            inRange: {
              // color:['#1488CC', '#2B32B2']
              color:['#ffc0cb', '#800080']
            }
          },

          //配置属性
          series: [
            {
              name: '数据',
              type: 'map',
              mapType: 'china',
              zoom: 1.2,
              roam: true,
              label: {
                normal: {
                  show: true,  //省份名称
                  textStyle: {
                    // color: '#587997'
                    color: '#ccc'
                  }
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    color: '#eee'
                  }
                }
              },
              itemStyle: {
                emphasis: {
                  show: true,
                  areaColor: '#006fff'
                }
              },
              data: []  //数据
            },
            {
              name: '散点',
              type: 'scatter',
              coordinateSystem: 'geo',
              data: [],
              symbolSize: function(val) {
                return val[2] / 30;
              },
              label: {
                normal: {
                  formatter: '{b}',
                  position: 'right',
                  show: false
                },
                emphasis: {
                  show: false
                }
              },
              itemStyle: {
                normal: {
                  color: this.getBg()
                }
              }
            },
            {
              type: 'effectScatter',
              coordinateSystem: 'geo',
              data: [],
              symbolSize: function(val) {
                return val[2] / 30;
              },
              showEffectOn: 'render',
              rippleEffect: {
                brushType: 'stroke'
              },
              hoverAnimation: true,
              label: {
                normal: {
                  formatter: '{b}',
                  position: 'right',
                  // color: this.getBg(),
                  color: "yellow",
                  show: false
                }
              },
              itemStyle: {
                normal: {
                  show: true,
                  color: this.getBg(),
                  // areaColor: 'yellow',
                  shadowBlur: 10,
                  shadowColor: this.getBg(),
                  opacity: 1
                }
              },
              z: 100
            }
          ]
        }
      }
    },
    methods: {
      chart() {
        this.getGeoCoord();
        //初始化echarts实例
        this.myChart = this.Echarts.init(document.querySelector('#country'));

        this.option.series[0].data = this.data;
        this.option.series[1].data = this.geoCoords;
        this.option.series[2].data = this.geoCoords;
        this.$store.state.countryMapData.option = this.option;
        this.$store.state.countryMapData.el = this.myChart;

        this.$store.state.curModule = this.$store.state.countryMapData;
        this.$store.state.showModuleEle = this.myChart;
        this.myChart.setOption(this.option);
      },
      chartResize(h) {
        this.curH = `${h}px`;
        if (this.myChart) {
          setTimeout(this.myChart.resize, 10);
        }
      },
      getGeoCoord() {
        let geoCoordMap = {};
        this.geoCoords = [];
        this.Echarts.getMap('china').geoJson.features.forEach((v) => {
          // 地区名称
          let name = v.properties.name;
          // 地区经纬度
          geoCoordMap[name] = v.properties.cp;
        });
        this.data.sort((a, b) => {
          return b.value - a.value;
        }).slice(0, 5).forEach((v) => {
            let geoCoord = geoCoordMap[v.name];
            if (geoCoord) {
              this.geoCoords.push({
                name: v.name,
                value: geoCoord.concat(v.value),
                label:{}
              });
            }
        });
      },
      getBg() {
        return `rgb(${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)})`;
      },
      getClass(t) {
        this.title = t || '全国地图';
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
