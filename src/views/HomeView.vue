<template>
  <div class="home">
    <div class="content">
      <div class="box1" style="background-color: rgb(245,23,156);">
        <h2>通用后台管理系统</h2>
      </div>
      <div class="box2">
        <dv-border-box-8>
          <h3>这是标题</h3>
          <dv-active-ring-chart :config="config" style="width: 100%;height: 100%"/>
        </dv-border-box-8>
      </div>
      <div class="box3">
        <ve-pie :data="chartData" height="100%"  :extend="pieExtend"></ve-pie>
      </div>
      <div class="box4" style="background-color: rgb(35, 18, 145);"></div>
      <div class="box5" style="background-color: rgb(233, 3, 34);"></div>
      <div class="box6" style="background-color: rgb(233, 156, 3);"></div>
      <div class="box7" style="background-color: rgb(3, 179, 233);"></div>
      <div class="box8" style="background-color: rgb(233, 187, 3);"></div>
      <div class="box9" style="background-color: rgb(245,23,156);"></div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      config: {
        data: [
          {
            name: '周口',
            value: 55
          },
          {
            name: '南阳',
            value: 120
          },
          {
            name: '西峡',
            value: 78
          },
          {
            name: '驻马店',
            value: 66
          },
          {
            name: '新乡',
            value: 80
          }
        ],
        lineWidth: 10
      },
      chartData: {
        columns: ['date', 'PV'],
        rows: [
          { 'date': '01-01', 'PV': 1231 },
          { 'date': '01-02', 'PV': 1223 },
          { 'date': '01-03', 'PV': 2123 },
          { 'date': '01-04', 'PV': 4123 },
          { 'date': '01-05', 'PV': 3123 },
          { 'date': '01-06', 'PV': 7123 }
        ]
      },
      pieExtend: { // 基于echarts的配置
        series: {
          // 设置饼状图
          type: 'pie',
          radius: ['0%', '55%'], // 设置半径 [内圈半径，外圈半径]
          center: ['50%', '60%'], // 设置圆心坐标
          // legend.textStyle. fontStyle
          label: {
            color: '#fff'
          }

        },
        legend: { // legend专门为各个标题的配置
          textStyle: {
            color: '#fff'
          }
        }
      }
    }
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.home {
  height: 100%;
}

.content {
  width: 100%;
  height: 100%;
  /* 设置网格布局 */
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 50px 1fr 1fr 1fr;
  gap: 10px;
}

.box1 {
  grid-column: span 3;
}

h2 {
  text-align: center;
  font-weight: bold;
  font-size: 22px;
  color: #fff;
  margin: 0;
  line-height: 50px;
}
h3{
  color:#fff;
  font-size: 20px;
  position: absolute;
  left: 50%;
  top: 5px;
  transform: translateX(-50%);
}
.box8 {
  grid-column: span 2;
}
</style>
