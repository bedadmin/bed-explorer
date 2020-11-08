<style lang="less" scoped>
  @import "../styles/common.css";
  .block{
		margin-bottom: 60px;
    a {
      &:hover {
				text-decoration:underline
			}
		}
    .not-allowed {
      cursor:not-allowed;
    }
  }
</style>

<template>
  <div class="block">

    <loader v-if="loading"></loader>

    <div class="container" v-if="!loading">

      <div class="info mb40">
        <h2 class="pt25">Block&nbsp;&nbsp;<span>{{blockinfo.height ? blockinfo.height : '--'}}</span></h2>
        <p class="ellipsis" :title="blockinfo.hash"><strong>Block Hash: </strong>{{blockinfo.hash ? blockinfo.hash : '--'}}</p>

      </div>

      <div class="summary mb40">
        <h2 class="">Summary<span></span></h2>
        <Row class="backgroundColor">
          <Col span="12" class="ellipsis">Transactions:</Col>
          <Col span="12" style="text-align: right;">{{blockinfo.txCount ? blockinfo.txCount : '--'}}</Col>
        </Row>
        <Row>
          <Col span="12" class="ellipsis">Time:</Col>
          <Col span="12" style="text-align: right;" class="ellipsis">{{blockinfo.time ? blockinfo.time : '--'}}</Col>
        </Row>
        <Row class="backgroundColor">
          <Col span="12" class="ellipsis">Transaction Merkle Root:</Col>
          <Col span="12" style="text-align: right;" class="ellipsis" :title="blockinfo.merkleRoot">{{blockinfo.merkleRoot ? blockinfo.merkleRoot :'--'}}</Col>
        </Row>
        <Row>
          <Col span="12" class="ellipsis">Previous Block Hash:</Col>
          <Col span="12" style="text-align: right;" class="ellipsis">
            <router-link :to="{path:'/blockinfo',query: {param: blockinfo.previousBlockHash,}}" class="ellipsis" :title="blockinfo.previousBlockHash">{{blockinfo.previousBlockHash}}</router-link>          
          </Col>
        </Row>
        <Row class="backgroundColor">
          <Col span="12" class="ellipsis">Next Block Hash:</Col>
          <Col span="12" style="text-align: right;" class="ellipsis">
            <router-link :to="{path:'/blockinfo',query: {param: blockinfo.nextBlockHash}}" class="ellipsis" :title="blockinfo.nextBlockHash">{{blockinfo.nextBlockHash}}</router-link>                    
          </Col>
        </Row>
      </div>

      <div class="transactions mb40">
        <h2 class="">Transactions</h2>

        <Row class="notice txloading" v-if="txloading">
          <Col>Loading Transactions …</Col>
        </Row>
        <Row class="notice txNodata" style="color:#ed3f14" v-if="txNodata">
          <Col>{{txerrormsg}}</Col>
        </Row>

        <div class="transaction" v-for="item in blockTable" :key="item.txid">
          <Row class="transactionTitle">
            <Col span="24" class="ellipsis">
              <router-link :to="{path:'/transinfo',query: {param: item.txid}}"  class="ellipsis">{{item.txid}}</router-link>
            </Col>
          </Row>

          <Row style="margin: 10px 0 20px 0">
            <Col :xs="24" :md="11" style="min-height:40px">
              <Row v-if="item.vin.length===1 && item.vin[0].isAddress===false" class="panel">
                <Col span="24">CoinBase</Col>
              </Row>
              <Row v-if="!(item.vin.length===1 && item.vin[0].isAddress===false)" v-for="item1 in item.vin" :key="item1.n" class="panel">
                <Col span="18" class="ellipsis">
                  <router-link :to="{path:'/addrinfo',query: {param: item1.addresses[0]}}">{{item1.addresses[0]}}</router-link>
                </Col>
                <Col span="6" style="text-align: right;">{{parseFloat(item1.value)/100000000}}</Col>
              </Row>
            </Col>

            <Col :xs="0" :md="2" style="text-align: center;">
              <Row class="panel" style="margin:5px 0">
                <div><Icon type="arrow-right-a"></Icon></div>
              </Row>
            </Col>
            <Col :xs="24" :md="0" style="text-align: center;">
              <Row class="panel" style="margin:5px 0">
                <div><Icon type="arrow-down-a"></Icon></div>
              </Row>
            </Col>

            <Col :xs="24" :md="11" style="min-height:40px">
              <Row v-for="item2 in item.vout" :key="item2.n" class="panel">
                <Col span="18" class="ellipsis" v-if="!item2.addresses">
                  Unknown
                </Col>
                <Col span="18" class="ellipsis" v-if="item2.addresses">
                  <router-link :to="{path:'/addrinfo',query: {param: item2.addresses[0]}}">{{item2.addresses[0]}}</router-link>
                </Col>
                <Col span="6" style="text-align: right;">{{parseFloat(item2.value)/100000000}}</Col>
              </Row>
            </Col>
          </Row>
        </div>

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

  export default {
    name: "block",
    components: {
      Loader
    },
    data () {
      return {
        block: '',
        VotesStatus: false,
        VotersStatus: false,
        previousFullPath: '',
        page: 1,
        txloading: false,
        txNodata: false,
        txerrormsg: '',
        havetx: false,
        nextpagestatus: false,
        previouspagestatus: false,
      };
    },
    computed: {
      loading() {
        return this.$store.state.block.loading;
      },
      pagecount() {
        return this.$store.state.block.totalpage;
      },
      blockinfo() {
        return this.$store.state.block.blockinfo;
      },
      blockTable() {
        return this.$store.state.block.blockTable;
      },
    },
    created () {

      this.block = this.$route.query.param;
      console.log(this.block);
      console.log(this.$route.query);

      if (this.$route.query.from) {
        if (this.blockinfo.height) {
            this.txloading = false;
            this.txNodata = false
            this.havetx = true;
        }else{
          this.getBlockInfo('search3', { 'param': this.block });
        }
        //this.getBlockInfo('getblockinfo', { 'param': this.block });

      }else {
        if ( this.block.length == 64 ) {
          this.getBlockInfo('getblockbyhash', { 'param': this.block });
        } else {
          this.getBlockInfo('getblockinfo', { 'param': this.block });
        }
      };

    },
    mounted () {

    },
    methods: {

      getBlockInfo ( type, getData) {
        var _this = this;
        //$.getJSON(config.api.dev + type, getData, function(data,status){
        $.getJSON(config.api.dev + '/block/' + getData.param, getData, function(data,status){
          if (data.error) {
            _this.$store.commit('errorMessage', { status: true , msg: data.msg});
            setTimeout(() =>_this.$store.commit('errorMessage', { status: false , msg: ''}),3000);
            _this.$router.push({path: '/'});
            _this.txloading = false;
            _this.txNodata = true;
            _this.havetx = false;
            _this.txerrormsg = data.msg;
          }else{
            _this.$store.commit('getblockData', data);
            _this.txloading = false;
            _this.txNodata = false
            _this.havetx = true;
          }
        });
      },

      

      nextPage() {
        this.block = this.$route.query.param;
        if (this.pagecount > 1 && this.page < this.pagecount) {
          this.nextpagestatus = true;
          this.page = this.page + 1;
          var _this = this;
          var type = '';
          if ( this.block.length == 64 ) {
            type = 'getblockbyhash'
          } else {
            type = 'getblockinfo'
          }

          $.getJSON(config.api.dev + type ,{ 'param': this.block, page: this.page}, function( data, status) {
            if (data.error) {
              _this.$store.commit('errorMessage', { status: true , msg: data.msg});
              setTimeout(() =>_$store.commit('errorMessage', { status: false , msg: ''}),3000)
              _this.page = _this.page - 1;
              _this.nextpagestatus = false;
              _this.txloading = false;
              _this.txNodata = true;
              _this.havetx = false;
              _this.txerrormsg = data.msg;
            } else {
              _this.$store.commit('getblockData', data);
              _this.nextpagestatus = false;
              window.scrollTo(0, 60);
            }
          })
        }
      },

      previousPage() {
        this.block = this.$route.query.param;
        if (this.page > 1) {
          this.previouspagestatus = true;
          this.page = this.page - 1;
          var _this = this;
          var type = '';
          if ( this.block.length == 64 ) {
            type = 'getblockbyhash'
          } else {
            type = 'getblockinfo'
          }
          
          $.getJSON(config.api.dev + type ,{ 'param': this.block, page: this.page}, function( data, status) {
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
              _this.$store.commit('getblockData', data);
              _this.previouspagestatus = false;
              window.scrollTo(0, 60);
            } 
          })
        }
      }
      
    },
    watch: {
      '$route' (to, from) {
        if (this.blockinfo.height && from.meta == to.meta && this.blockinfo.height != to.query.param) {
          if ( to.query.param.length == 64 ) {
            this.getBlockInfo('getblockbyhash', { 'param': to.query.param });
          } else {
            this.getBlockInfo('getblockinfo', { 'param': to.query.param });
          }
        }
      }
    }


  }
</script>
