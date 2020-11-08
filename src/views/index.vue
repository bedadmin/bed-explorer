<style lang="less" scoped>
@import "../styles/common.css";
</style>
<template>
  <div id="bed-explore">
    <div id="container">
      <div id="box">
        <div id="left">
          <div id="netWorkSummary">
            <div id="net-top-des">
              <p>Bit Ecological digital</p>
              <p>currency systeam</p>
            </div>
            <div id="net-middle">
              <div class="net-middle-blocks net-middle-summary">
                <div class="net-middle-summary-des">
                  <p class="big">block:</p>
                  <p>{{ heightCur }}</p>
                </div>
              </div>
              <div class="net-middle-capacity net-middle-summary">
                <div class="net-middle-summary-des">
                  <p class="big">Network computing:</p>
                  <p>{{computing}}</p>
                </div>
              </div>
              <div class="net-middle-circulating net-middle-summary">
                <div class="net-middle-summary-des">
                  <p class="big">Circulation $BED$:</p>
                  <p>{{ bedcoin }}</p>
                </div>
              </div>
            </div>
            <div id="net-bottom">
              <div class="net-bottom-summary">
                <h2>Blockchain</h2>
                <div class="net-bottom-summary-body-des">
                  <div class="net-bottom-summary-des">
                    <span class="big">Network:</span>
                    <span>Mainnet</span>
                  </div>
                  <div class="net-bottom-summary-des">
                    <span class="big">Blockchain Size:</span>
                    <span>{{ size }}</span>
                  </div>
                  <div class="net-bottom-summary-des">
                    <span class="big">Latest Height:</span>
                    <span>#{{ height }}</span>
                  </div>
                </div>
              </div>
              <div class="net-bottom-summary">
                <h2>24h Stats</h2>
                <div class="net-bottom-summary-body-des">
                  <div class="net-bottom-summary-des">
                    <span class="big">Blocks:</span>
                    <span>{{blockcount}}</span>
                  </div>
                  <div class="net-bottom-summary-des">
                    <span class="big">Avg Block Time:</span>
                    <span>{{avgblocktime}} s.</span>
                  </div>
                  <div class="net-bottom-summary-des">
                    <span class="big">Production($BED$):</span>
                    <span>#{{balance.toFixed(2)}}</span>
                  </div>
                </div>
              </div>
              <div class="net-bottom-summary">
                <h2>Mempool</h2>
                <div class="net-bottom-summary-body-des">
                  <div class="net-bottom-summary-des">
                    <span class="big">Mempool Size:</span>
                    <span>64 B (virtual size: 0 B)</span>
                  </div>
                  <div class="net-bottom-summary-des">
                    <span class="big">Fees:</span>
                    <span>0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="fsSummary">
            <div id="shadow-sm">
              <div id="card-header">
                <div id="col">
                  <h2>Latest Blocks</h2>
                </div>
              </div>
              <div id="card-body">
                <div id="table-responsive">
                  <table id="table-striped">
                    <thead>
                      <tr>
                        <th class="data-header">Height</th>
                        <th class="data-header">Timestamp (utc)</th>
                        <th class="data-header">Transactions</th>
                        <th class="data-header">Size</th>
                        <th class="data-header">Confirmations</th>
                        <th class="data-header">Version</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in LatestBlocks">
                        <td class="data-cell monospace text-left">
                          <router-link
                            :to="{
                              path: '/blockinfo',
                              query: { param: item.height },
                            }"
                            class="ellipsis"
                            >{{ item.height }}</router-link
                          >
                        </td>
                        <td class="data-cell monospace">
                          {{ item.time ? item.time : "--" }}
                        </td>
                        <td class="data-cell monospace">
                          {{ item.txCount ? item.txCount : "--" }}
                        </td>
                        <td class="data-cell monospace">
                          {{ item.size ? item.size : "--" }}
                        </td>
                        <td class="data-cell monospace">{{ index + 1 }}</td>
                        <td class="data-cell monospace">
                          {{ item.version ? item.version : "--" }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div id="bottom-transaction">
            <h2>Latest Transaction</h2>
            <div id="bottom-table-box">
              <table id="bottom-table">
                <thead>
                  <tr>
                    <th>Transaction</th>
                    <th>Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in LatestTransactions">
                    <td style="text-align: left">
                      <router-link
                        :to="{
                          path: '/transinfo',
                          query: { param: item.txhash },
                        }"
                        class="ellipsis"
                        >{{ item.txhash }}</router-link
                      >
                    </td>
                    <td>{{ item.time ? item.time : "--" }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div id="right">
          <div id="top">
            <div id="box1">
              <div id="blocksGraph">
                <h2>Stick info</h2>
              </div>
              <div class="blocksGraph-basicInfo">
                <div class="blocksGraph-basicInfo-des">
                  <li>Slot Index:</li>
                  <span>{{ slotindex }}</span>
                </div>
                <div class="blocksGraph-basicInfo-des">
                  <li>Stick Price:</li>
                  <span>{{ slotprice }}</span>
                </div>
              </div>
              <div class="blocksGraph-basicInfo">
                <div class="blocksGraph-basicInfo-des">
                  <li>Lock Time:</li>
                  <span>{{ slotlock }}</span>
                </div>
                <div class="blocksGraph-basicInfo-des">
                  <li>Stick Count:</li>
                  <span>{{ slotcount }}</span>
                </div>
              </div>
            </div>
            <div id="blocksGraph-slotInfo">
              <h2>Slot Info</h2>
              <div id="text-Graph"></div>
            </div>
            <div id="blocksGraph-slotInfo-chart">
              <h2>Stick Price</h2>
              <div id="row"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { mapState } from "vuex";
import config from "../config/config";
import Loader from "./loader.vue";
import moment from "moment";
import echarts from "echarts";

export default {
  name: "index",
  components: {
    Loader,
  },
  computed: {
    loading() {
      return this.$store.state.index.loading;
    },

    screenWidth() {
      return this.$store.state.screen.screenWidth;
    },
    errorShow() {
      return this.$store.state.error.errorShow;
    },
    Message() {
      return this.$store.state.error.Message;
    },
    height() {
      return this.$store.state.totallbtc.height;
    },
    heightCur() {
      return this.$store.state.totallbtc.height + 1;
    },
    total() {
      return this.$store.state.totallbtc.total;
    },
    LatestTransactions() {
      return this.$store.state.index.LatestTransactions;
    },
    LatestBlocks() {
      return this.$store.state.index.LatestBlocks;
    },
    size() {
      return this.$store.state.totallbtc.size;
    },
    bedcoin() {
      return this.$store.state.totallbtc.bedcoin;
    },
    slotindex() {
      return this.$store.state.totalslot.slotindex;
    },
    slotprice() {
      return this.$store.state.totalslot.slotprice / Math.pow(10,8);
    },
    slotlock() {
      return this.$store.state.totalslot.slotlock;
    },
    slotcount() {
      return this.$store.state.totalslot.slotcount;
    },
    avgblocktime() {
      return this.$store.state.avgstate.avgblocktime;
    },
    blockcount() {
      return this.$store.state.avgstate.blockcount;
    },
    balance() {
      return this.$store.state.avgstate.balance;
    },
    difficulty() {
      return this.$store.state.totallbtc.difficulty;
    },   
    computing() {
      if (this.$store.state.block.computing < 1000) {
        return this.$store.state.block.computing.toFixed(2) +" TH/s"
      }else if(this.$store.state.block.computing >= 1000 && this.$store.state.block.computing < 1000000){
        return this.$store.state.block.computing.toFixed(2) +" PH/s"
      }else if(this.$store.state.block.computing >= 1000000 && this.$store.state.block.computing < 1000000000){
        return this.$store.state.block.computing.toFixed(2) +" EH/s"
      }
    },
    slotcharts() {
      return this.$store.state.totalslotchats.slotcharts;
    },


  },

  data() {
    return {
      searchText: "",
      searchLoading: false,
      enterStatus: false,
      timerIndex: "",
      timerHeight: "",
    };
  },
  filters: {
    dataFrm: function (el) {
      return moment(el * 1000).format("YYYY-MM-DD HH:mm:ss");
    },
  },
  created() {
    this.getIndexData();
    this.getTotallbtc();

    this.timerIndex = window.setInterval(() => {
      this.getIndexData();
      this.getTotallbtc();
    }, 240000);
    /*
			this.timerHeight = window.setInterval( () => {
				this.getTotallbtc();
			},240000)
                        */
  },

  beforeMount() {
  },

  mounted() {
    let _$store = this.$store.state;
    var SlotChart = echarts.init(document.getElementById("text-Graph"));
    var option = {
      tooltip: {
        formatter: "{a} <br/>{b} : {c}",
      },
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          restore: { show: true },
          saveAsImage: { show: true },
        },
      },
      series: [
        {
          name: "slot",
          type: "gauge",
          min: 0,
          max: 1008,
          splitNumber: 9,
          axisLine: {
            lineStyle: {
              color: [
                [0.2, "#228b22"],
                [0.8, "#48b"],
                [1, "#ff4500"],
              ],
              width: 8,
            },
          },
          axisTick: {
            splitNumber: 10,
            length: 12,
            lineStyle: {
              color: "auto",
            },
          },
          splitLine: {
            show: true,
            length: 30,
            lineStyle: {
              color: "auto",
            },
          },
          pointer: {
            width: 5,
          },
          title: {
            show: true,
            offsetCenter: [0, "-40%"],
            textStyle: {
              fontWeight: "bolder",
            },
          },
          detail: {
            formatter: "{value}",
            textStyle: {
              color: "auto",
              fontWeight: "bolder",
            },
          },
          data: [{ value: 0, name: "T 0" }],
        },
      ],
    };

    var priceChart = echarts.init(document.getElementById("row"));
    // mock
    //time: "3-06", num: 0 },
     var xData = [];
     var yData = [];
     var data =[];

    function insertSort(arr){
//假设第0元素是有序序列，第1元素之后是无序的序列。从第1元素开始依次将无序序列的元素插入到有序序列中
    for(var i=1; i<arr.length;i++){
        if(arr[i].index<arr[i-1].index){
            //取出无序序列中需要插入的第i个元素
            var temp = arr[i];
            //定义有序中的最后一个位置
            var j = i-1;
            arr[i] = arr[j];
            //比较大小，找到插入的位置
            while(j>=0&&temp.index<arr[j].index){
                arr[j+1] = arr[j];
                j--;
            };
            //插入
            arr[j+1] = temp;
        }
    }
  }
    function datamap(){
      data = _$store.totalslotchats.slotcharts
      insertSort(data)
      if(xData == ""){
        xData == []
        data.forEach(v => {
        yData.push(v.price)
        xData.push(v.index)
      }); 
     }
    }


    var option1 = {
      backgroundColor: "#fff",
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "#6a7985",
            fontSize: 12,
          },
        },
        textStyle: { fontSize: "100%" },
        formatter: (v) => {
          return `
              <div class='u-p-2'>
                <div class='fz-10'>index:${v[0].axisValue}</div>
                <div class='fz-10 u-mt-2'>price:${v[0].value}</div>
              </div>
            `;
        },
      },
      xAxis: {
        type: "category",
        boundaryGap: false, // 两边留白
        axisLabel: { textStyle: { color: '#556677', fontSize: 14 } },
        data: xData,
        axisLine: { lineStyle: { color: "#000", width: 1 } },
        splitLine: {
          lineStyle: {
            type: "dashed",
            color: "rgba(255,255,255,.2)",
            width: 1,
          },
          show: true,
        },
      },
      yAxis: {
        name: "count",
        type: "value",
        scale: true,
        nameTextStyle: {
          color: "rgba(255,255,255,.5)",
          align: "right",
          padding: [0, 0, 0, 0],
          fontSize: "100%",
        },
        axisLabel: {
          textStyle: { color: '#556677', fontSize: "100%" },
          margin: 8,
        },
        axisLine: { lineStyle: { color: "#000", width: 1 } },
        splitLine: {
          lineStyle: { type: "solid", color: "rgba(255,255,255,.2)", width: 1 },
          show: true,
        },
      },
      series: {
        name: "",
        smooth: true,
        type: "line",
        stack: "",
        // 修改的是线下区域的颜色
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgba(236, 99, 123, .5)",
            },
            {
              offset: 1,
              color: "rgba(102, 212, 250,.0)",
            },
          ]),
        },
        // 修改的是线的颜色
        lineStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 1,
            x2: 0,
            y2: 0,
            // 0% 处的颜色                           // 100% 处的颜色
            colorStops: [
              { offset: 0, color: "#3a76f6" },
              { offset: 0.25, color: "#66d4fa" },
              { offset: 0.75, color: "#f8d470" },
              { offset: 1, color: "#ec637b" },
            ],
            global: false, // 缺省为 false
          },
          width: 2,
        },
        //图例样式，默认空心圆，设为none是实心，还有'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
        symbol: "none",
        data: yData,
      },
    };
    
    setInterval(function () {
      datamap();
      option.series[0].data[0].value = (_$store.totallbtc.height) - (_$store.totalslot.slotindex*1008);
      option.series[0].data[0].name = "T " + (_$store.totalslot.slotindex + 1);
      priceChart.setOption(option1, true);
      SlotChart.setOption(option, true);
    }, 10000);

    window.onresize = function(){
      SlotChart.resize();
      priceChart.resize();
    }  
  },
  beforerouteleave() {},
  beforeDestroy() {},
  destroyed() {
    window.clearInterval(this.timerIndex);
    window.clearInterval(this.timerHeight);
  },
  methods: {
    getIndexData() {
      // alert((1905956 * Math.pow(2,32)) / (20*60) / Math.pow(10,12))
      let _this = this;
      let _$store = this.$store;
      //$.getJSON(config.api.dev + 'index3',function(data,status){
      $.getJSON(config.api.dev + "/block", function (data, status) {
        if (data.error) {
          _$store.commit("errorMessage", { status: true, msg: data.msg });
          setTimeout(
            () => _$store.commit("errorMessage", { status: false, msg: "" }),
            3000
          );
        } else {
          _this.$store.commit("getindexData", data);
        }
      });
    },

    // getavgstate() {
    //   let _this = this;
    //   let _$store = this.$store;
    //   $.getJSON("http://47.242.50.5:8003/api/v1/24stat", function (data,status) {
    //     if (!data.error) {
    //       _$store.commit("getavgblockstate", {avgblocktime: data.avg_block_time,blockcount: data.block_count, balance: data.balance});
    //     } else {
    //       setTimeout(() => _$store.commit("errorMessage", { status: false, msg: "" }),3000);
    //     }
    //   });
    // },

    getTotallbtc() {
      let _this = this;
      let _$store = this.$store;
      $.getJSON(config.api.dev + "/block", function (
        data,
        status
      ) {
        //console.log('data=', data);
        //console.log('status=', status);
        // alert(data[6].height)
        if (!data.error) {
          _$store.commit("gettotallbtc", {difficulty: data[0].difficulty, bedcoin: data[0].height * 50, height: data[0].height, size: data[8].size,});
          $.getJSON("http://47.242.50.5:8003/api/v1/24stat",function(text,status){
            if(!data.error){
              _$store.commit('getcomputed', {computing:((data[0].difficulty * Math.pow(2,32)) / text.avg_block_time) / Math.pow(10,12)})
              _$store.commit("getavgblockstate", {avgblocktime: text.avg_block_time,blockcount: text.block_count, balance: text.balance});
            }else {
              setTimeout(() => _$store.commit("errorMessage", { status: false, msg: "" }),3000);
              _$store.commit("errorMessage", { status: true, msg: data.msg });
            }
          })
        } else {
          setTimeout(() => _$store.commit("errorMessage", { status: false, msg: "" }),3000);
          _$store.commit("errorMessage", { status: true, msg: data.msg });
        }
      });
      $.getJSON(
        config.api.dev + "/tx/newest/getslotinfo",
        function (data, status) {
          if (!data.error) {
            _$store.commit("gettotalslot", {
              slotindex: data.index,
              slotprice: data.price,
              slotlock: data.locktime,
              slotcount: data.count,
            });
          } else {
            setTimeout(
              () => _$store.commit("errorMessage", { status: false, msg: "" }),
              3000
            );
            _$store.commit("errorMessage", { status: true, msg: data.msg });
          }
        }
      );
    },
  },
  watch: {},
};
</script>
