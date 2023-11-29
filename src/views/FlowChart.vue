<template>
  <div class="">
    <div id="流程图容器的id"></div>
  </div>
</template>

<script>
import G6 from '@antv/g6'
export default {
  data() {
    return {
      data() {
        return {
          // 保存自定义节点的数据
          // 一般实际开发中，流程图节点样式都是在自定义的
          nodeExtraAttrs: {
            begin: {
              fill: 'rgba(24, 144, 255, 0.1)',
              stroke: '#1890FF'
            },
            end: {
              fill: 'rgba(242, 65, 48, 0.1)',
              stroke: '#F24130'
            },
            接口返回的nodes字段的key: {
              fill: 'rgba(38, 191, 89, 0.1)',
              stroke: '#26BF59'
            }
          },
          // 这块的数据都是后台接口返回的
          // 节后按照g6插件的配置字段返回数据的
          // 所以这块要和后端沟通好
          data: {
            nodes: [
              {
                id: '节点起始id',
                label: 'name',
                key: 'ACTION',
                text: null
              },
              {
                id: '节点结束id',
                label: 'name',
                key: 'ORIGINAL',
                text: '带标签的字符串'
              }
            ],
            edges: [
              {
                source: '节点起始id',
                target: '节点结束id'
              }
            ]
          }
        }
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.drawView()
    })
  },
  methods: {
    drawView() {
      // 重写方法
      const _extends =
        Object.assign ||
        function (target) {
          for (let i = 1; i < arguments.length; i++) {
            const source = arguments[i]
            for (const key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key]
              }
            }
          }
          return target
        }
      // 自定义节点   内置节点无法满足需求
      // G6.registerNode(typeName: string, nodeDefinition: object, extendedTypeName?: string)
      G6.registerNode(
        // 该新节点类型名称
        'node',
        // 该新节点类型的定义
        // 当有 extendedTypeName （第三个参数）时，没被复写的函数将会继承 extendedTypeName 的定义
        {
          // cfg  节点身上所有的配置：包括label，size，x，y坐标等

          // 这个方法，每渲染一个节点，执行一次
          drawShape: (cfg, group) => {
            // ctg上的id key label 都可以决定当前节点的类型
            cfg.size = (cfg.label.length / 10) * 130
            let widthX = 0
            if (cfg.label.length / 10 < 1) {
              widthX = 120
            } else {
              widthX = cfg.size
            }
            // if(cfg.key==="ORIGINAL")  圆形
            const rect = group.addShape('rect', {
              attrs: _extends(
                {
                  x: -widthX / 2,
                  y: -25,
                  width: widthX,
                  height: 50,
                  radius: 4,
                  fill: '#FFD591',
                  fillOpacity: 1
                },
                // 相当于：
                // ORIGINAL: {
                //   fill: 'rgba(38, 191, 89, 0.1)',
                //   stroke: '#26BF59',
                // },

                // 属性为fill 和 stroke的对象
                this.nodeExtraAttrs[cfg.key]
              )
            })
            return rect
          },
          /**
           * 获取锚点（相关边的连入点）
           * @param  {Object} cfg 节点的配置项
           * @return {Array|null} 锚点（相关边的连入点）的数组,如果为 null，则没有控制点
           */
          // 自定义锚点
          getAnchorPoints: () => {
            return [
              [0, 0.5], // 左侧中间
              [1, 0.5] // 右侧中间
            ]
          }
        },
        // 被继承的节点类型，可以是内置节点类型名，也可以是其他自定义节点的类型名。
        // extendedTypeName 未指定时代表不继承其他类型的节点；
        // 例如基类 'single-node'，或 'circle', 'rect' 等
        'single-shape'
      )
      /**
       * 自定义带箭头的贝塞尔曲线 edge
       */
      G6.registerEdge('line-with-arrow', {
        itemType: 'edge',
        draw: (cfg, group) => {
          const startPoint = cfg.startPoint
          const endPoint = cfg.endPoint
          const centerPoint = {
            x: (startPoint.x + endPoint.x) / 2,
            y: (startPoint.y + endPoint.y) / 2
          }
          // 控制点坐标
          const controlPoint = {
            x: (startPoint.x + centerPoint.x) / 2,
            y: startPoint.y
          }
          // 为了更好的展示效果, 对称贝塞尔曲线需要连到箭头根部
          const path = group.addShape('path', {
            attrs: {
              path: [
                ['M', startPoint.x, startPoint.y],
                ['Q', controlPoint.x, controlPoint.y, centerPoint.x, centerPoint.y],
                ['T', endPoint.x, endPoint.y],
                ['L', endPoint.x, endPoint.y]
              ],
              stroke: '#ccc',
              lineWidth: 1.6,
              endArrow: {
                path: 'M 4,0 L -4,-4 L -4,4 Z',
                d: 4
              }
            }
          })
          return path
        }
      })
      const graph = new G6.Graph({
        // 常用配置项
        // 类型：Boolean；默认：'false'。图是否自适应画布。
        fitView: true,
        // 类型：Number | Array；默认：0。图自适应画布时的四周留白像素值。fitView 为 true 时生效。
        // fitViewPadding : 0
        // 类型：Boolean；默认：'false'。是否平移图使其中心对齐到画布中心。v3.5.1 后支持。
        fitCenter: true,
        // bloodView：流程图容器id
        container: '流程图容器的id',
        //modes 交互行为相关
        // 配置多种交互模式及其包含的交互事件的。
        modes: {
          default: [
            'drag-canvas',
            'zoom-canvas',
            {
              type: 'tooltip',
              formatText(model) {
                const cfg = model.text
                const text = model.text
                // cfg.forEach((row) => {
                //   text.push(row.label + ':' + row.value + '<br>');
                // });
                return text
              },
              offset: 30
            }
          ]
        },
        // 若数据中不存在节点位置，则默认为随机布局。配置布局类型及其参数。
        layout: {
          // 类型  总共三种：径向：radial   有向分层：dagre     力导：force
          type: 'dagre',
          // 'LR'：从左至右布局；
          rankdir: 'LR' // 可选可选值：'TB' | 'BT' | 'LR' | 'RL'，默认为图的中心 TB
        },
        // defaultNode类型：Object。默认情况下全局节点的配置项，包括样式属性和其他属性
        // G6 的内置节点包括
        // circle圆形，rect长方形，ellipse椭圆，diamond菱形，triangle三角形，
        // star五角星，image图片，modelRect卡片，donut圆形（v4.2.5 起支持）。
        defaultNode: {
          type: 'node', // 这里的type指向自定义节点
          // size:300,
          labelCfg: {
            style: {
              fill: '#595959',
              fontSize: 14
            }
          }
        },
        // defaultEdge  类型：Object。默认情况下全局边的配置项，包括样式属性和其他属性
        defaultEdge: {
          type: 'line-with-arrow',
          style: {
            endArrow: true,
            lineWidth: 2,
            stroke: '#ccc'
          }
        }
      })
      graph.data(this.data)
      // 渲染
      graph.render()
    }
  }
}
</script>

<style lang="scss" scoped></style>
