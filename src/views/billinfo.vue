<style lang="less" scoped>
  @import "../styles/common.css";
  .billinfo{
    margin-bottom: 60px;
    a {
      &:hover {
				text-decoration:underline
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
    .status {
			font-size: 13px;
			color: #fff;
			padding: 2px 4px;
			margin-right: 3px;
			border-radius: 3px;
		}
		.ing {
			background-color: #19be6b;
		}
		.passed {
			background-color: #337ab7;
		}
		.notPassed {
			background-color: #ed3f14;
    }
    .td-fi {
      text-align: left;
    }
    .td-se {
      width: 100%;
      text-align: left;
      word-break: break-all;
    }
    .totalvote {
      font-size: 12px;
      position: relative;
      bottom: -1px;
      left: 6px;
      color: #999;
    }
    .option {
      .topic{
        width: 100%;
        display: flex;
      }
    }
  }
</style>

<template>
  <div class="billinfo">

    <loader v-if="loading"></loader>

    <div class="container" v-if="!loading">

      <Alert type="error" v-if="errorMsg">{{errorMsg}}</Alert>

      <div class="summary mb40">
        <h2 class="pt25" style="margin: 10px 0 10px;">Summary</h2>

        <table class="myTable" border="0" cellpadding="10" cellspacing="0">
          <tr>
            <td class="td-fi">Topic:</td>
            <td class="td-se" :title="billinfo.title">{{billinfo.title}}</td>
          </tr>
          <tr>
            <td class="td-fi">ID:</td>
            <td class="td-se" :title="billinfo.id">{{billinfo.id}}</td>
          </tr>
          <tr>
            <td class="td-fi">Starttime:</td>
            <td class="td-se">{{billinfo.starttime | timeFormat}}</td>
          </tr>
          <tr>
            <td class="td-fi">Endtime:</td>
            <td class="td-se">{{billinfo.endtime | timeFormat}}</td>
          </tr>
          <tr>
            <td class="td-fi">URL:</td>
            <td class="td-se">
              <a :href="urlFormat(billinfo.url)" target="_blank" >{{billinfo.url}}</a>
            </td>
          </tr>
          <tr>
            <td class="td-fi">State:</td>
            <td class="td-se">
              <span class="status ing" v-if="billinfo.status == 1">Voting</span>
              <span class="status passed" v-if="billinfo.status == 2">Passed</span>
              <span class="status notPassed" v-if="billinfo.status == 3">Rejected</span>
            </td>
          </tr>
          <tr v-if="billinfo.status == 2">
            <td class="td-fi">Option:</td>
            <td class="td-se">{{billinfo.options[billinfo.state.optoinindex].option}}</td>
          </tr>
          <tr v-if="billinfo.status == 2">
            <td class="td-fi">Totalvote:</td>
            <td class="td-se">{{billinfo.state.totalvote}}</td>
          </tr>
          <tr>
            <td class="td-fi">Detail:</td>
            <td class="td-se">{{billinfo.detail}}</td>
          </tr>
        </table>

      </div>

      <div class="option mb40">
        <h2>Options</h2>
        <Collapse>
          <Panel :name="item.option" v-for="(item, index) in billinfo.options" :key="JSON.stringify(item)">
            <span class="PanelTitle ellipsis" :title="item.option">{{subString1(item.option)}}</span>
            <span class="totalvote">{{totalvote(item.address)}}</span>
            <div slot="content" class="tag-container">
              <div class="tag-block" v-if="item.address.length" v-for="(item1, index1) in item.address">
                <router-link :to="{path:'/addrinfo',query: {param: item1.voters}}" :key="item1.voters">{{item1.voters}}</router-link>
                <span class="point" v-if="index1 != (item.address.length - 1)">·</span>
              </div>
              <div v-if="!item.address.length" style="color:#ed3f14">
                No data
              </div>
            </div>
          </Panel>
        </Collapse>
      </div>

    </div>
    

  </div>
</template>

<script>
  import config from "../config/config";
  import Loader from "./loader.vue";
  import moment from "moment"

  export default {
    name: "billinfo",
    components: {
      Loader
    },
    data () {
      return {
				loading: true,
        noData: false,
        haveData: false,
        billinfo: {}
      }
    },
    computed: {
      screenWidth (){
        return this.$store.state.screen.screenWidth
      },
    },
    filters: {
      dataFrm: function(el) {
        return moment(el).format("YYYY-MM-DD HH:mm:ss");
      },
      subString1: function(str) {
        var len = 18;
        var regexp = /[^\x00-\xff]/g;
        if (str.replace(regexp, "aa").length <= len) {
          return str;
        }
        var m = Math.floor(len/2);
        for (var i = m, j = str.length; i < j; i++) {
          if (str.substring(0, i).replace(regexp, "aa").length >= len) {
            return (str.substring(0, i) + '…');
          }
        }
        return str;
      }
    },
    created () {
      let _this = this;
      if (this.$route.query.id) {
        let id = this.$route.query.id
        $.getJSON(config.api.dev + 'v2/getbillsinfo', function(data,status) {
          if (data.error) {
            _this.loading = false;
            _this.errorMsg = 'No data';
          } else {
            if (data.msg.length) {
              for (let i = 0; i < data.msg.length; i++) {
                if (data.msg[i].id == id) {
                  let status;
                  if (data.msg[i].state.isfinished) {
                    if (data.msg[i].state.ispassed) {
                      status = 2;
                    } else {
                      status = 3;
                    }
                  } else {
                    status = 1;
                  }
                  data.msg[i].status = status;
                  _this.billinfo = data.msg[i];
                  _this.loading = false;
                  _this.errorMsg = '';
                }
              }
            }
          }
        })
      }
    },
    mounted () {
      
    },
    methods: {
      totalvote(param) {
        let sum = 0;
        for (let i = 0; i < param.length; i++) {
          sum = sum + param[i].votes;
        }
        return sum
      },
      urlFormat(url) {
        if (url.indexOf('http') >= 0) {
          return url
        } else {
          url = 'http://' + url 
          return url
        }
      },
      subString1(str) {
        var len;
        if (this.screenWidth > 367) {
          len = 28
        } else {
          len = 18
        }
        var regexp = /[^\x00-\xff]/g;
        if (str.replace(regexp, "aa").length <= len) {
          return str;
        }
        var m = Math.floor(len/2);
        for (var i = m, j = str.length; i < j; i++) {
          if (str.substring(0, i).replace(regexp, "aa").length >= len) {
            return (str.substring(0, i) + '…');
          }
        }
        return str;
      }
    },
    watch: {
      '$route' (to, from) {

      }
    }
  }
</script>