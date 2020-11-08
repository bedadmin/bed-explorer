<style lang="less" scoped>
@import "../styles/common.css";
.test-address {
  margin-bottom: 40px;
  h4 {
    line-height: 42px;
  }
  a {
    &:hover {
      text-decoration: underline;
    }
  }
  .tag-container {
    overflow: hidden;
    .tag-block {
      margin: 2px 0;
      float: left;
      .point {
        margin: 0 1px;
        font-size: 16px;
        height: 16px;
        line-height: 16px;
        position: relative;
        bottom: -1px;
        left: -4px;
        color: #262a2b;
      }
    }
  }
  .Icon {
    display: inline-block;
  }
  .info-item {
    line-height: 42px;
    text-indent: 1em;
    margin-bottom: 15px;
    background-color: #f8f8f9;
  }
  .changeStrong {
    width: 80px;
    display: inline-block;
    text-indent: 0;
  }
  .not-allowed {
    cursor: not-allowed;
  }
  .txinfo {
    display: flex;
    width: 100%;
    height: 46px;
    .txtitle {
      text-indent: 0;
      padding: 0 1rem;
    }
    .txheight {
      flex-shrink: 0;
    }
    .txtime {
      flex-shrink: 0;
    }
  }
  .txitemloading {
    margin: 15px 0 0 0;
    height: 40px;
    position: relative;
  }
  .transactionInfo {
    margin: 10px 0 20px 0;
  }
  .qrcode {
    // max-width: 140px;
    max-height: 140px;
    margin-top: 20px;
    canvas {
      width: 100%;
      height: 100%;
    }
  }
  .name {
    font-size: 13px;
    margin-left:15px;
  }
}
</style>

<template>
  <div class="test-address">

    <loader v-if="loading"></loader>

    <div class="container" v-if="!loading">

      <div class="info mb40" >
        <h2 class="pt25" style="margin-bottom:5px">Common</h2>
        <Row :gutter="20">
          <Col :xs="24" :sm="24" :md="20" :lg="20" style="height:100%;padding-top:12px;padding-bottom:12px;">
            <Row>
              <p class="ellipsis" :title="address"><strong class="changeStrong">Address: </strong><span>{{address}}</span></p>
            </Row>
            <Row>
              <p class="ellipsis" style="margin-top:15px" :title="getaddressbalance.balance"><strong class="changeStrong">Balance: </strong><span>{{ parseFloat(getaddressbalance.balance)/100000000 ? parseFloat(getaddressbalance.balance)/100000000 : 0}}</span></p>
            </Row>
            <!-- <Row v-if="showName">
              <p class="ellipsis" style="margin-top:15px" :title="name"><strong class="changeStrong">Name: </strong><span>{{name}}</span></p>
            </Row> -->
            <!-- <Row v-if="showCount">
              <p class="ellipsis" style="margin-top:15px" :title="name"><strong class="changeStrong">Votes: </strong><span>{{insert_flg(count)}}</span></p>
            </Row> -->
          </Col>
          <Col :xs="24" :sm="24" :md="4" :lg="4" style="height:100%;text-align:center">
            <qrcode-vue :value="address" size="140" level="H" class="qrcode"></qrcode-vue>
          </Col>
        </Row>
      </div>
      <!--
      <div class="node mb40">
        <h2>Forging </h2>

        <Collapse simple v-model="node.index">
          <Panel name="1">
              Votes
              <div slot="content" class="tag-container">
                <div class="tag-block" v-for="(item, index) in node.votes.array" v-if="node.votes.array.length">
                  <span v-if="item.delegate == getaddressbalance.addr">{{item.name ? item.name : item.delegate}}</span>
                  <router-link v-if="item.delegate != getaddressbalance.addr" :to="{path:'/addrinfo',query: {param: item.delegate}}" :key="item.address">{{item.name ? item.name : item.address}}</router-link>
                  <span class="point" v-if="index != (node.votes.array.length - 1)">·</span>
                </div>
                <div v-if="!node.votes.array.length" style="color:#ed3f14">
                  {{node.votes.msg}}
                </div>
              </div>
          </Panel>
          <Panel name="2">
              Voters<span class="name" v-if="node.name">({{node.name}})</span>
              <div slot="content" class="tag-container">
                <div class="tag-block" v-for="(item, index) in node.voters.array" v-if="node.voters.array.length">
                  <span v-if="item.address == getaddressbalance.addr">{{item.name ? item.name : item.address}}</span>
                  <router-link  v-if="item.address != getaddressbalance.addr" :to="{path:'/addrinfo',query: {param: item.address}}" :key="item.address">{{item.name ? item.name : item.address}}</router-link>
                  <span  class="point" v-if="index != (node.voters.array.length - 1)">·</span>
                </div>
                <div v-if="!node.voters.array.length" style="color:#ed3f14">
                  {{node.voters.msg}}
                </div>
              </div>
          </Panel>
        </Collapse>
      </div>
      
      <div class="committee mb40">
        <h2>Committee</h2>

        <Collapse simple v-model="committee.index">
          <Panel name="1">
              Votes
              <div slot="content" class="tag-container">
                <div class="tag-block" v-for="(item, index) in committee.votes.array" v-if="committee.votes.array.length && index < 30">
                  <span v-if="item.address == getaddressbalance.addr">{{item.name ? item.name : item.delegate}}</span>
                  <router-link v-if="item.address != getaddressbalance.addr" :to="{path:'/addrinfo',query: {param: item.address}}" :key="item.address">{{item.name ? item.name : item.address}}</router-link>
                  <span class="point" v-if="index != (committee.votes.array.length - 1)">·</span>
                </div>
                <div v-if="!committee.votes.array.length" style="color:#ed3f14">
                  {{committee.votes.msg}}
                </div>
              </div>
          </Panel>
          <Panel name="2">
              Voters<span class="name" v-if="committee.name && committee.name != address">({{committee.name}})</span>
              <div slot="content" class="tag-container">
                <div class="tag-block" v-for="(item, index) in committee.voters.array" v-if="committee.voters.array.length && index < 30">
                  <span v-if="item.address == getaddressbalance.addr">{{item.name ? item.name : item.address}}</span>
                  <router-link  v-if="item.address != getaddressbalance.addr" :to="{path:'/addrinfo',query: {param: item.address}}" :key="item.address">{{item.name ? item.name : item.address}}</router-link>
                  <span  class="point" v-if="index != (committee.voters.array.length - 1)">·</span>
                </div>
                <div v-if="!committee.voters.array.length" style="color:#ed3f14">
                  {{committee.voters.msg}}
                </div>
              </div>
          </Panel>
        </Collapse>
      </div>

      <div class="committee mb40">
        <h2>Proposals</h2>

        <Collapse simple v-model="bills.index">
          <Panel name="1">
              Votes
              <div slot="content" class="tag-container">
                <div class="tag-block" v-for="(item, index) in bills.array" v-if="bills.array.length">
                  <router-link :to="{path:'/billinfo',query: {id: item.id}}" :key="item.id">{{item.id}}</router-link>
                  <span class="point" v-if="index != (bills.array.length - 1)">·</span>
                </div>
                <div v-if="!bills.array.length" style="color:#ed3f14">
                  {{bills.msg}}
                </div>
              </div>
          </Panel>
          <Panel name="2">
              Submit
              <div slot="content" class="tag-container">
                <div class="tag-block" v-for="(item, index) in sBills.array" v-if="sBills.array.length">
                  <router-link :to="{path:'/billinfo',query: {id: item.billid}}" :key="item.billid">{{item.billid}}</router-link>
                  <span class="point" v-if="index != (sBills.array.length - 1)">·</span>
                </div>
                <div v-if="!sBills.array.length" style="color:#ed3f14">
                  {{sBills.msg}}
                </div>
              </div>
          </Panel>
        </Collapse>
      </div>
      -->
      <div class="transactions mb10" id="transactions">
        <h2 class="">Transactions</h2>

        <Row class="notice txloading" v-if="txloading">
          <Col>Loading Transactions …</Col>
        </Row>
        <Row class="notice txNodata" style="color:#ed3f14" v-if="txNodata">
          <Col>{{txerrormsg}}</Col>
        </Row>
        <Row v-if="havetx">
          <div class="table-container">
            <table class="myTable" border="0" cellpadding="10" cellspacing="0" width="100%">
              <tbody>
                <tr v-for="(item, index) in txs.txids" :key="item">
                  <td style="text-align: center">
                    <router-link :to="{path:'/transinfo',query: {param: item, byAddr: address}}"  class="ellipsis">{{item}}</router-link>          									
                  </td>
                  <!--
                  <td style="text-align: left">
                    <router-link :to="{path:'/blockinfo',query: {param: item.meta[0].blockHeight}}"  class="ellipsis">{{item.meta[0].blockHeight}}</router-link>          									
                  </td>
                  <td style="min-width:200px;">{{item.meta[0].rawTime | dataFrm}}</td>
                  -->
                </tr>
              </tbody>
            </table>
          </div>
        </Row>

        <Row>
          <button class="page" type="button" value="Previous page" @click="previousPage($event)" v-if="page > 1" :disabled="previouspagestatus" :class="{'not-allowed': previouspagestatus}">
            Previous page
            <i class="ivu-load-loop ivu-icon ivu-icon-load-c page-loading" v-if="previouspagestatus"></i>
          </button>
          <button class="page" type="button" value="Next page" @click="nextPage($event)" v-if="page < pagecount" :disabled="nextpagestatus" :class="{'not-allowed': nextpagestatus}">
            Next page
            <i class="ivu-load-loop ivu-icon ivu-icon-load-c page-loading" v-if="nextpagestatus"></i>
          </button>
        </Row>
        
      </div>

    </div>
  </div>
</template>

<script>
import config from "../config/config";
import Loader from "./loader.vue";
import moment from "moment";
import QrcodeVue from "qrcode.vue";

export default {
  name: "Address",
  components: {
    Loader,
    QrcodeVue
  },
  data() {
    return {
      address: "",
      // tx
      page: 1,
      pagecount: "",
      txs: [],
      txloading: true,
      txNodata: false,
      txerrormsg: "",
      havetx: false,
      nextpagestatus: false,
      previouspagestatus: false,
      // vote
      node: {
        name: '',
        index: '0',
        votes: {
          array: [],
          msg: ''
        },
        voters: {
          array: [],
          msg: ''
        }
      },
      // committee
      committee: {
        name: '',
        index: '0',
        votes: {
          array: [],
          msg: ''
        },
        voters: {
          array: [],
          msg: ''
        }
      },
      // bills
      bills: {
        index: '0',
        array: [],
        msg: ''
      },
      // set bills
      sBills: {
        index: '0',
        array: [],
        msg: ''
      },

      // router
      previousFullPath: "",
    };
  },
  computed: {
    loading() {
      return this.$store.state.address1.loading;
    },
    getaddressbalance() {
      return this.$store.state.address1.getaddressbalance;
    }
  },
  filters: {
    dataFrm: function(el) {
      return moment(el * 1000).format("YYYY-MM-DD HH:mm:ss");
    },
    keyFrm: function(el) {
      if (el.indexOf("+") >= 0) {
        return el.slice(1);
      } else {
        return el;
      }
    }
  },
  created() {
    this.address = this.$route.query.param;
    console.log(this.$route.query.from, this.$route.query.fromdm);
    if (this.$route.query.from) {
      var _this = this;
      if (this.getaddressbalance.balance) {
      //if (this.getaddressbalance.result) {
        
        this.node.index = '0';
        this.committee.index = '0';
        this.bills.index = '0';
        this.sBills.index = '0';

        var data = this.getaddressbalance;
        _this.txs = data;
          _this.txloading = false;
          _this.txNodata = false;
          _this.havetx = true;
          data.pagecount
            ? (_this.pagecount = data.pagecount)
            : (_this.pagecount = 0);

        //this.getDelegatesAndTxs({ param: _this.address });
        //this.getCommitteeAndBills(_this.address);
        //this.getAddressTxs({ param: this.address });
      } else {
        this.getInfo("search3", { param: this.address });
      }
      //this.getInfo("getaddressbalance", { param: this.address });
    } else if (this.$route.query.fromdm) {
      this.getInfo("getaddressbalance", { param: this.address });
    } else {
      this.getInfo("getaddressbalance", { param: this.address });
    }
  },
  mounted() {},
  methods: {

    insert_flg(num) {
      var num = (num || 0).toString(),
        result = "";
      while (num.length > 8) {
        result = "," + num.slice(-8) + result;
        num = num.slice(0, num.length - 8);
      }
      if (num) {
        result = num + result;
      }
      return result;
    },

    getInfo(type, param) {
      var _this = this;
      this.address = this.$route.query.param;

      //$.getJSON(config.api.dev + type, param, function(data, status) {
      $.getJSON(config.api.dev + '/address/' + param.param + '/balance', param, function(data, status) {
        if (data.error) {
          _this.$store.commit("errorMessage", { status: true, msg: data.msg });
          setTimeout(
            () =>
              _this.$store.commit("errorMessage", { status: false, msg: "" }),
            3000
          );
          _this.$router.push({ path: "/" });
        } else {
          _this.$store.commit("getaddress1data", data);
        }
      });

      this.node.index = '0';
      this.committee.index = '0';
      this.bills.index = '0';
      this.sBills.index = '0';

      //this.getDelegatesAndTxs(param);
      //this.getCommitteeAndBills(param.param); 
      this.getAddressTxs(param); 
    },

    getAddressTxs(param) {
      //param address
      this.node.name = ''
      var _this = this;
      //$.getJSON(config.api.dev + "v2/gettxbyaddr", param, function(data, status) {
      $.getJSON(config.api.dev + '/address/' + param.param + '/txs', param, function(data, status) {
        console.log(data);
        if (data.error) {
          _this.txs = [];
          _this.txerrormsg = data.msg;
          _this.txloading = false;
          _this.txNodata = true;
          _this.havetx = false;
        } else {
          _this.txs = data;
          _this.txloading = false;
          _this.txNodata = false;
          _this.havetx = true;
          _this.page = data.page;
          data.totalPages
            ? (_this.pagecount = data.totalPages)
            : (_this.pagecount = 0);
          //if(_this.page < _this.pagecount ) {
          //    _this.nextpagestatus = true;
          //}
          
        }
      });
    },


      nextPage() {
        this.address = this.$route.query.param;
        if (this.pagecount > 1 && this.page < this.pagecount) {
          this.nextpagestatus = true;
          this.page = this.page + 1;
          var _this = this;
          var type = '/address/';

          //$.getJSON(config.api.dev + type ,{ 'param': this.block, page: this.page}, function( data, status) {
          $.getJSON(config.api.dev + type + this.address + '/txs' ,{ 'param': this.address, page: this.page}, function( data, status) {
            if (data.error) {
              console.log('data=', data)
              _this.$store.commit('errorMessage', { status: true , msg: data.msg});
              setTimeout(() =>_$store.commit('errorMessage', { status: false , msg: ''}),3000)
              _this.page = _this.page - 1;
              _this.nextpagestatus = false;
              _this.txloading = false;
              _this.txNodata = true;
              _this.havetx = false;
              _this.txerrormsg = data.msg;
            } else {
              //_this.$store.commit('getblockData', data);
              _this.txs = data;
              _this.txloading = false;
              _this.txNodata = false;
              _this.havetx = true;
              _this.page = data.page;
              data.totalPages
               ? (_this.pagecount = data.totalPages)
               : (_this.pagecount = 0);

              _this.nextpagestatus = false;
              window.scrollTo(0, 60);
            }
          })
        }
      },

      previousPage() {
        this.address = this.$route.query.param;
        if (this.page > 1) {
          this.previouspagestatus = true;
          this.page = this.page - 1;
          var _this = this;
          var type = '/address/';
          
          //$.getJSON(config.api.dev + type ,{ 'param': this.block, page: this.page}, function( data, status) {
          $.getJSON(config.api.dev + type + this.address + '/txs' ,{ 'param': this.address, page: this.page}, function( data, status) {
            if (data.error) {
              _this.$store.commit('errorMessage', { status: true , msg: data.msg});
              setTimeout(() =>_$store.commit('errorMessage', { status: false , msg: ''}),3000);
              _this.page = _this.page + 1;
              _this.previouspagestatus = false;
              _this.txloading = false;
              _this.txNodata = true;
              _this.havetx = false;
              _this.txerrormsg = data.msg;
            } else {
              //_this.$store.commit('getblockData', data);
              _this.txs = data; 
              _this.txloading = false;
              _this.txNodata = false;
              _this.havetx = true;
              _this.page = data.page;
              data.totalPages
               ? (_this.pagecount = data.totalPages)
               : (_this.pagecount = 0);

              _this.previouspagestatus = false;
              window.scrollTo(0, 60);
            } 
          })
        }
      },

    getDelegatesAndTxs(param) {
      //param address
      this.node.name = ''
      var _this = this;
      $.getJSON(config.api.dev + "getlistdelegates", function(data, status) {
        for (let index = 0; index < data.length; index++) {
          if (_this.address == data[index].address) {
            _this.node.name = data[index].name;
            break;
          }
        }
        $.getJSON(config.api.dev + "getvotebyaddress", param, function(
          data1,
          status1
        ) {
          if (data1.error) {
            _this.node.votes.array = [];
            _this.node.votes.msg = 'No data';
          } else {
            if (data1.result.length > 0) {
              _this.node.votes.array = [];
              _this.node.votes.array = data1.result;
              _this.node.votes.msg = '';
            } else {
              _this.node.votes.array = [];
              _this.node.votes.msg = 'No data';
            }
          }
        });
        $.getJSON(config.api.dev + "getvotersbywitness", param, function(
          data2,
          status2
        ) {
          if (data2.error) {
            _this.node.voters.array = [];
            _this.node.voters.msg = 'No data';
          } else {
            if (data2.result.length > 0) {
              _this.node.voters.array = [];
              _this.node.voters.msg = 'No data';
              var arr = [];
              data2.result.forEach((item, index) => {
                var obj = { address: "", name: "" };
                obj.address = item;
                for (let index = 0; index < data.length; index++) {
                  if (item == data[index].address) {
                    obj.name = data[index].name;
                    break;
                  }
                }
                arr.push(obj);
              });
              _this.node.voters.array = arr;
              _this.node.voters.msg = '';
            } else {
              _this.node.voters.array = [];
              _this.node.voters.msg = 'No data';
            }
          }
        });
      });
      $.getJSON(config.api.dev + "v2/gettxbyaddr", param, function(data, status) {
        if (data.error) {
          _this.txs = [];
          _this.txerrormsg = data.msg;
          _this.txloading = false;
          _this.txNodata = true;
          _this.havetx = false;
        } else {
          _this.txs = data.msg;
          _this.txloading = false;
          _this.txNodata = false;
          _this.havetx = true;
          data.msg.pagecount
            ? (_this.pagecount = data.msg.pagecount)
            : (_this.pagecount = 0);
        }
      });
    },

    getCommitteeAndBills(addr) {
      // param address
      this.committee.name = '';
      var _this = this;
      $.getJSON(config.api.dev + 'v2/getlistcommittees', function(data, status) {
        for (let m = 0; m < data.msg.length; m++) {
          if (addr == data.msg[m].address) {
            _this.committee.name = data.msg[m].name;
            break;
          }
        }
        $.getJSON(config.api.dev + 'v2/getlistvotedcommittee', {param: addr}, function(data1, status1) {
          if (data1.error) {
            _this.committee.votes.array = [];
            _this.committee.votes.msg = 'No data';
          } else {
            _this.committee.votes.array = data1.msg;
            _this.committee.votes.msg = '';
          }
        });
        $.getJSON(config.api.dev + 'v2/voterbillsbyaddr', {param: addr}, function(data3, status3) {
          if (data3.error) {
            _this.bills.array = [];
            _this.bills.msg = 'No data';
          } else {
            _this.bills.array = data3.msg;
            _this.bills.msg = '';
          }
        });
        if (_this.committee.name) {
          
          $.getJSON(config.api.dev + 'v2/getlistcommitteevotes', {param: _this.committee.name}, function(data2, status2) {
            if (data2.error) {
              _this.committee.voters.array = [];
              _this.committee.voters.msg = 'No data';
            } else {
              _this.committee.voters.array = data2.msg;
              _this.committee.voters.msg = '';
            }
          });

          $.getJSON(config.api.dev + 'v2/getlistcommitteebills', {param: _this.committee.name}, function(data4, status4) {
            if (data4.error) {
              _this.sBills.array = [];
              _this.sBills.msg = 'No data';
            } else {
              _this.sBills.array = data4.msg;
              _this.sBills.msg = '';
            }
          });

        } else {
          _this.committee.voters.array = [];
          _this.committee.voters.msg = 'No data';
          _this.sBills.array = [];
          _this.sBills.msg = 'No data';
        }
      })
    },

  },
  activated() {},
  deactivated() {},
  destroyed() {
    // window.removeEventListener('scroll', this.handleScroll);
  },
  watch: {
    $route(to, from) {
      var _this = this;
      this.address = this.$route.query.param;

      if (
        this.getaddressbalance.addr &&
        from.meta == to.meta &&
        this.getaddressbalance.addr != to.query.param
      ) {
        this.getInfo("getaddressbalance", { param: this.address });
      }

      if (
        this.previousFullPath != from.fullPath &&
        this.$route.query.from &&
        this.getaddressbalance.addr == to.query.param
      ) {
        this.node.index = '0';
        this.committee.index = '0';
        this.bills.index = '0';
        this.sBills.index = '0';
        this.getDelegatesAndTxs({ param: this.address });
        this.getCommitteeAndBills(this.address);
      }
      this.previousFullPath = from.fullPath;
    }
  }
};
</script>
