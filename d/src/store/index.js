import vue from 'vue'
import Vuex from 'vuex'

vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    onLineData: {
      title: '近7天车辆在线数',
      el: null,
      type: 'onLineData',
      option: {},
    },
    countryMapData: {
      title: '全国地图',
      el: null,
      type: 'countryMapData',
      option: {}
    },
    vehicleDistributionData: {
      title: '全国入网车辆分布',
      el: null,
      type: 'vehicleDistributionData',
      option: {}
    },
    rankinglistData: {
      title: '报警排行榜TOP5',
      el: null,
      type: 'rankinglistData',
      option: {}
    },
    alarmTrendData: {
      title: '近一个月报警趋势',
      el: null,
      type: 'alarmTrendData',
      option: {}
    },
    alarmDistributionData: {
      title: '报警分布',
      el: null,
      type: 'alarmDistributionData',
      option: {}
    },
    curModule: {},
    showModuleEle: null,
    clsList: ['fadeInLeftBig','fadeInRight','fadeInLeft','fadeInUp','bounceIn','bounce','flash','pulse','rubberBand','shake','swing','tada','wobble','jello','flip','flipInX','flipInY','lightSpeedIn','rotateInDownLeft','zoomIn','zoomInDown','zoomOut',]
  }
});
export default store;
