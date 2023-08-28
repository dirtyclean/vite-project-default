<template>
  <div :ref="el => (chartRef = el)" style="width: 600px; height: 400px" class="bg-[#fff]"></div>
  <b
      :style="{
          top: centerX + 'px',
          left: centerY + 'px',
          position: 'absolute'
      }"
  >
      0
  </b>
</template>
<script setup lang="ts">
import { useECharts } from '@/hooks/useECharts';
const chartRef = ref<HTMLDivElement | null>(null);
const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);
const centroid = arcData => {
  // 示例的圆弧数据
  arcData = arcData || {
      cx: 100, // 圆心 x 坐标
      cy: 100, // 圆心 y 坐标
      r0: 50, // 内半径
      r: 80, // 外半径
      startAngle: 0, // 起始角度
      endAngle: Math.PI / 2 // 结束角度
  }

  const { cx, cy, r0, r, startAngle, endAngle } = arcData

  const averageRadius = (r + r0) / 2
  const angle = (startAngle + endAngle) / 2

  const centerX = cx + averageRadius * Math.cos(angle)
  const centerY = cy + averageRadius * Math.sin(angle)

  const center = [centerX, centerY]
  return center
}
const centerX = ref(0)
const centerY = ref(0)
onMounted(() => {
  renderChart()
})
const renderChart = () => {
  console.log('renderChart')
  const data = [
      {
          name: 'value',
          value: 64,
          borderColor: '#006eff',

          itemStyle: {
              color: 'rgba(12,82,196,.8)',
              borderRadius: [0, '50%', 0, '50%'],
              borderColor: '#006eff',
              opacity: 1,
              borderWidth: 1
          } // [0, '50%', 0, '50%']
      },
      {
          name: 'value',
          value: 36,
          borderColor: '#ff3157',
          itemStyle: {
              color: 'rgba(255,49,87,.8)',
              borderRadius: [0, '50%', 0, '50%'],
              borderColor: '#ff3157',
              opacity: 1,
              borderWidth: 1
          }
      }
  ]
  // 配置图表的选项
  const option = {
      yAxis: {
          show: false
      },
      xAxis: {
          show: false
      },
      series: [
          {
              type: 'pie',
              radius: [50, 80],
              center: [300, 200],
              startAngle: 0,
              data,
              z: 1
          },
          {
              type: 'custom',
              z: 2,
              renderItem: (params, api) => {
                  console.log('renderItem')
                  const shape = {
                      cx: 300, // 圆心 x 坐标
                      cy: 200, // 圆心 y 坐标
                      r0: 50, // 内半径
                      r: 80, // 外半径
                      startAngle: 0, // 起始角度
                      endAngle: 2 * Math.PI * (data[0].value / 100) // 结束角度
                  }

                  const addImages = [
                      {
                          ...Object.assign(
                              { ...shape },
                              {
                                  startAngle: shape.startAngle, // 起始角度
                                  endAngle: shape.startAngle // 结束角度
                              }
                          )
                      },
                      {
                          ...Object.assign(
                              { ...shape },
                              {
                                  startAngle: shape.endAngle, // 起始角度
                                  endAngle: shape.endAngle // 结束角度
                              }
                          )
                      }
                  ].map((item, index) => {
                      return [
                          {
                              type: 'arc',
                              x: centroid(item)[0],
                              y: centroid(item)[1],
                              style: {
                                  fill: '#fff',
                                  stroke: data[index].borderColor
                              },
                              rotation: Math.PI * 2 - item.endAngle,
                              shape: {
                                  cx: 0, // 圆心 x 坐标
                                  cy: 0, // 圆心 y 坐标
                                  r: 15, // 外半径
                                  startAngle: 0, // 起始角度
                                  endAngle: 2 * Math.PI * 0.5 + 0 // 结束角度
                              }
                          },
                          {
                              type: 'line',
                              x: centroid(item)[0],
                              y: centroid(item)[1],
                              style: {
                                  stroke: '#fff',
                                  lineWidth: 2
                              },
                              rotation: Math.PI * 2 - item.endAngle,
                              shape: {
                                  x1: -15,
                                  x2: 15,
                                  y1: 0,
                                  y2: 0
                              }
                          }
                      ]
                  })
                  return {
                      type: 'group',
                      children: [...addImages.flat()]
                  }
              },
              data: [{ name: 'value', value: 50 }]
          }
      ]
  }

  // 使用配置项显示图表
  setOptions(option)
}
</script>
