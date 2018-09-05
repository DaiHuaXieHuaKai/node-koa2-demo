<template>
    <div class="panel-container">
        <el-row :gutter="24">
            <el-col :span="12">
               <el-card shadow="hover">
                   <div class="os-info">
                    <p>主机：15882221545</p>
                    <p>操作平台：windows</p>
                    <p>操作系统类型：linux</p>
                    <p>操作系统版本：1.2100114.155</p>
                    <p>系统总内存：2464444</p>
                    <p>上次登录时间：2018年5月20日 16.10.40</p>
                   </div>
               </el-card>
            </el-col>
            <el-col :span="12">
               <el-card shadow="hover">
                    <div ref="echart" class="echart-panel">

                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
var echarts = require("echarts/lib/echarts");
// 引入柱状图
require("echarts/lib/chart/bar");
// 引入提示框和标题组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
export default {
  name: "Panel",
  data() {
    return {
      myChart: null
    };
  },
  methods: {
    showEchart: function() {
      let domEchart = this.$refs.echart;
      this.myChart = echarts.init(domEchart);
      // 绘制图表
      this.myChart.setOption({
        title: {
          text: "ECharts 入门示例"
        },
        tooltip: {},
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 100, 10, 20]
          }
        ]
      });
    }
  },
  mounted() {
    this.showEchart();
  }
};
</script>

<style scoped>
.echart-panel {
  height: 300px;
}
.os-info {
  height: 300px;
}
.os-info p {
  margin-left: 50px;
  padding: 10px;
}
</style>

