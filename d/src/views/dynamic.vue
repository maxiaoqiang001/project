<template>
  <div class="c_warp charts_warp" :class="cls">
    <span class="leftT radius"></span>
    <span class="rightT radius"></span>
    <span class="leftB radius"></span>
    <span class="rightB radius"></span>
    <div class="titleImg">
      <img src="../../static/images/icon/title.png">
    </div>
    <div class="charts_title">车辆动态</div>

    <div class="dynamic_con" :style="{height: curH}">
      <div class="tHeader">
        <el-row :gutter="10">
          <div v-for="tH in tHead">
            <el-col :span="tH.width">
              <p class="ellipsis center td">{{tH.title}}</p>
            </el-col>
          </div>
        </el-row>
      </div>

      <div class="tBody" :style="{height: tbH}">
        <el-row :gutter="10">
          <div v-for="(tD,index) in list">
            <div v-for="tH in tHead">
              <el-col :span="tH.width">
                <el-tooltip placement="left-start" :open-delay="200">
                  <span slot="content" v-html="tH.render?tH.render(tD,tH.name,index,list):tD[tH.name]"></span>
                  <p class="ellipsis center td" v-html="tH.render?tH.render(tD,tH.name,index,list):tD[tH.name]"></p>
                </el-tooltip>
              </el-col>
            </div>
          </div>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "dynamic",
    data() {
      return {
        cls: '',
        curH: 0,
        tbH: 0,
        tHead: [
          {
            title: '车牌号码',
            name: 'carCode',
            width: 7
          },
          {
            title: '集团名称',
            name: 'name',
            width: 7
          },
          {
            title: '状态',
            name: 'state',
            width: 4,
            render: (item, name, index, data) => {
              let state = item[name];
              let style = '';
              if(state == 0) {
                style = 'gery';
              }else if (state == 1) {
                style = 'green';
              } else if (state == 2) {
                style = 'red';
              }
              return `<span class="${style}">${this.translate[state]}</span>`;
            }
          },
          {
            title: '时间',
            name: 'date',
            width: 6
          },
        ],
        list: [
          {
            name: '辽宁物流公司',
            carCode: '京A12345',
            state: '1',
            date: '12:06:34'
          },
          {
            name: '辽宁物流公司',
            carCode: '京A17845',
            state: '0',
            date: '15:13:34'
          },
          {
            name: '辽宁物流公司',
            carCode: '京A92345',
            state: '1',
            date: '10:56:34'
          },
          {
            name: '辽宁物流公司',
            carCode: '京A12376',
            state: '2',
            date: '09:36:34'
          },
          {
            name: '辽宁物流公司',
            carCode: '京A17845',
            state: '0',
            date: '15:13:34'
          },
          {
            name: '辽宁物流公司',
            carCode: '京A92345',
            state: '1',
            date: '10:56:34'
          },
          {
            name: '辽宁物流公司',
            carCode: '京A12376',
            state: '2',
            date: '09:36:34'
          },
          {
            name: '辽宁物流公司',
            carCode: '京A17845',
            state: '0',
            date: '15:13:34'
          },
          {
            name: '辽宁物流公司',
            carCode: '京A92345',
            state: '1',
            date: '10:56:34'
          },
          {
            name: '辽宁物流公司',
            carCode: '京A12376',
            state: '2',
            date: '09:36:34'
          }
        ],
        translate: {
          0: '离线',
          1: '在线',
          2: '报警'
        }
      }
    },
    methods: {
      chartResize(h) {
        this.curH = `${h}px`;
        this.tbH = `${h-28}px`;
      },
      getClass() {
        this.cls = this.utils.portType(this);
      }
    },
    created() {
      this.curH = `${this.chartH}px`;
      this.tbH = `${this.chartH-28}px`;
    },
    props: ['chartH']
  }
</script>

<style scoped>
  .dynamic_con{
    overflow: hidden;
  }

  .dynamic_con .td {
    height: 24px;
    line-height: 24px;
  }

  .tHeader {
    background: #1e2776;
    color: #0ca1c8;
    font-weight: 700;
  }

  .tHeader .td {
    height: 28px;
    line-height: 28px;
  }

  .tBody {
    color: #b1b0b7;
    font-size: 12px;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .tBody::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  .tBody::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: #0556B0;
  }

  .tBody::-webkit-scrollbar-track,.tBody::-webkit-scrollbar-corner {
    background: #032058;
  }
</style>
