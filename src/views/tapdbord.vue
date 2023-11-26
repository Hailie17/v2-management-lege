<template>
  <div class="bord-container">
    <el-tabs stretch type="card">
      <el-tab-pane>
        <span slot="label"><i class="el-icon-guide"></i> 分析</span>
        <div style="margin-top:10px;">
          <grid-layout :layout.sync="layout"
                       :col-num="12"
                       :row-height="30"
                       :is-draggable="draggable"
                       :is-resizable="resizable"
                       :vertical-compact="true"
                       :use-css-transforms="true"
                       @layout-created="layoutCreatedEvent"
                       @layout-before-mount="layoutBeforeMountEvent"
                       @layout-mounted="layoutMountedEvent"
                       @layout-ready="layoutReadyEvent"
                       @layout-updated="layoutUpdatedEvent"
          >
            <grid-item v-for="item in layout"
                       :x="item.x"
                       :y="item.y"
                       :w="item.w"
                       :h="item.h"
                       :i="item.i"
                       @resize="resizeEvent"
                       @move="moveEvent"
                       @resized="resizedEvent"
                       @container-resized="containerResizedEvent"
                       @moved="movedEvent"
            >
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>报告整理</span>
                </div>
                <div>
                  <el-checkbox v-model="checked">产品调研 & 用户需求分析报告编写</el-checkbox>
                </div>
                <el-tag type="danger" size="mini" style="margin-top: 10px; margin-left: 25px" >低</el-tag>
                <div style="height: 28px">
                  <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" size="small" style="float: right"></el-avatar>
                </div>
                <el-button type="text" icon="el-icon-plus"></el-button>
              </el-card>
            </grid-item>
          </grid-layout>
        </div>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label"><i class="el-icon-c-scale-to-original"></i> 设计</span>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label"><i class="el-icon-monitor"></i> 开发</span>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label"><i class="el-icon-data-line"></i> 测试</span>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label"><i class="el-icon-money"></i> 发布</span>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { GridLayout, GridItem } from 'vue-grid-layout'

export default {
  components: {
    GridLayout,
    GridItem
  },
  data () {
    return {
      layout: [
        {
          'x': 0,
          'y': 0,
          'w': 2,
          'h': 6,
          'i': '0',
          static: false
        },
        {
          'x': 2,
          'y': 0,
          'w': 2,
          'h': 4,
          'i': '1',
          static: true
        },
        {
          'x': 4,
          'y': 0,
          'w': 2,
          'h': 5,
          'i': '2',
          static: false
        },
        {
          'x': 6,
          'y': 0,
          'w': 2,
          'h': 3,
          'i': '3',
          static: false
        },
        {
          'x': 8,
          'y': 0,
          'w': 2,
          'h': 3,
          'i': '4',
          static: false
        }
      ],
      draggable: true,
      resizable: true,
      index: 0,
      eventLog: [],
      checked: false
    }
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
::v-deep .el-tabs--card>.el-tabs__header .el-tabs__item {
  width: 300px;
  height: 100px;
}
::v-deep .el-tabs--card>.el-tabs__header .el-tabs__item {
  padding-top: 25px;
}
.vue-grid-layout {
  background: #eee;
}

.vue-grid-item:not(.vue-grid-placeholder) {
  background: #ccc;
  //border: 1px solid black;
}

.vue-grid-item .resizing {
  opacity: 0.9;
}

.vue-grid-item .static {
  background: #cce;
}

.vue-grid-item .text {
  font-size: 24px;
  text-align: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  height: 100%;
  width: 100%;
}

.vue-grid-item .no-drag {
  height: 100%;
  width: 100%;
}

.vue-grid-item .minMax {
  font-size: 12px;
}

.vue-grid-item .add {
  cursor: pointer;
}

.vue-draggable-handle {
  position: absolute;
  width: 20px;
  height: 20px;
  top: 0;
  left: 0;
  background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'><circle cx='5' cy='5' r='5' fill='#999999'/></svg>") no-repeat;
  background-position: bottom right;
  padding: 0 8px 8px 0;
  background-repeat: no-repeat;
  background-origin: content-box;
  box-sizing: border-box;
  cursor: pointer;
}

.layoutJSON {
  background: #ddd;
  border: 1px solid black;
  margin-top: 10px;
  padding: 10px;
}

.eventsJSON {
  background: #ddd;
  border: 1px solid black;
  margin-top: 10px;
  padding: 10px;
  height: 100px;
  overflow-y: scroll;
}
</style>
