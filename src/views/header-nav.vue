<style lang="less">
@import "../styles/common.css";
  header {
    font-family: "Droid Sans Mono",Menlo,Monaco,Consolas,"Courier New",monospace;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 99999;
    background: #262a2b;
  }
  .expanded {
    height: 98px;
    transition: height .3s ease-in-out;
    .logo img{
      height: 40px;
    }
    ul {
      list-style: none;
    }
    .igation {
      align-items: center;
      display: flex;
      flex-flow: row nowrap;
      font-weight: 400;
      min-height: 98px;
      justify-content: flex-start;
      margin: 0;
      overflow: visible;
      ul {
        background-color: rgba(255, 255, 255, 0.1);
        left: 0;
        padding: 0;
        position: absolute;
        top: 0;
        // width: 140px;
        padding-top: 32px;
        li {
          padding: 2px 10px 4px;
          font-size: 13px;
          &:hover a {
            color: #e8e8e8;
          }
          &:last-of-type {
            margin-bottom: 4px;
          }
        }
        a {
          color: #cbcbcb;
          white-space: nowrap;
        }
      }
      li {
        display: list-item;
        text-align: -webkit-match-parent;
      }
      li.with-children {
        border-radius: 2px 2px 0 0 !important;
        // width: 140px;
        padding: 5px 10px;
        position: relative;
        color: #fff;
      }
      li.with-children > span {
        cursor: pointer;
        font-family: "Microsoft YaHei";
        font-size: 15px;
        font-weight: 600;
      }
      & > li:first-of-type {
        margin-right: 30px;
        opacity: 1 !important;
      }
      & > li:nth-of-type(1) {
        order: 1;
      }
      & > li:nth-of-type(2) {
        order: 2;
      }
      & > li.flex-space {
        flex-grow: 1;
      }
      & > li:nth-of-type(3) {
        order: 3;
      }
      & > li:last-of-type {
        margin-left: 25px;
      }
      & > li:nth-of-type(4) {
        order: 4;
      }
      .ivu-input {
        border: 1px solid #fff!important;
        border-radius: 15px!important;
        background-color: #f8f8f9;
        color: #262a2b;
        width: 250px;
        font-size: 14px;
        transition: width .3s ease-in-out;
      }
    }
    .message{
      position: absolute;
      top: 65px;
      width: 250px;
      line-height: 32px;
      text-align: center;
      font-size: 14px;
      background-color: #3c3c3c;
      color: #f8f8f9;
      letter-spacing: 1px;
    }
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  .unexpanded {
    .navbar-header {
      padding: 2px 0;
      overflow: auto;
      .nav-button {
        float: right;
        display: inline-block;
        position: relative;
        height: 50px;
        width: 50px;
        overflow: hidden;
        text-indent: 100%;
        white-space: nowrap;
        color: transparent;
        ul {
          list-style: none;
        }
      }
      .logo {
        float: left;
        height: 50px;
        overflow: hidden;
        display: flex;
        align-items:center;
        img {
          height: 100%;
        }
      }
      &::before {
        clear: both;
      }
      &::after {
        clear: both;
      }
    }
    .navbar-collapse {
      overflow: hidden;
      transition: all 0.2s ease-in-out;
      height: 0;
    }
  }
  .nav-trigger {
    display: inline-block;
    transition: background 0.2s 0.2s;
    position: absolute;
    top: 24px;
    left: 10px;
    width: 28px;
    height: 3px;
    background-color: #FFF;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    &::before {
      bottom: 8px;
    }
    &::after {
      top: 8px;
    }
  }
  ul.collapse {
    list-style: none;
    margin-left: 15px;
    margin-right: 15px;
    li.with-children {
      transform: all 0.4s;
      color: #b2b2b2;
      line-height: 30px;
      font-size: 15px;
      &:hover {
        color: #fff;
      }
      .children-ul {
        margin-left: 15px;
        list-style: none;
        font-size: 13px;
        li {
          transform: all 0.4s;
          color: #b2b2b2;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          &:hover {
            color: #fff;
          }
          &:last-child {
            border-bottom: none;
          }
          a {
            color: inherit;
          }
        }
      }
    }
    li.input-collapse {
      height: 40px;
      line-height: 40px;
      position: relative;
      .ivu-input {
        border: 1px solid #fff!important;
        border-radius: 0!important;
        background-color: #f8f8f9;
        color: #262a2b;
        width: 100%;
        font-size: 14px;
        transition: width .3s ease-in-out;
      }
      .message{
        position: absolute;
        top: 36px;
        width: 100%;
        line-height: 32px;
        text-align: center;
        font-size: 14px;
        background-color: #3c3c3c;
        color: #f8f8f9;
        letter-spacing: 1px;
      }
    }
  }

  .nav-is-visible .nav-trigger {
    background-color:rgba(255, 255, 255, 0);
  }
  .nav-is-visible .nav-trigger::before {
    transform: translateY(8px) rotate(-45deg);
  }
  .nav-is-visible .nav-trigger::after {
    transform: translateY(-8px) rotate(45deg);
  }
  .nav-trigger::before, .nav-trigger:after {
    content: '';
    left: 0;
    position: absolute;
    width: 28px;
    height: 3px;
    background-color: #FFF;
    backface-visibility: hidden;
    -webkit-transition: -webkit-transform 0.2s 0.2s;
    -moz-transition: -moz-transform 0.2s 0.2s;
    transition: transform 0.2s 0.2s;
  }

  .changeHeight {
    height: 180px;
  }
  .unexpanded .isExpanded {
    height: 225px;
  }

  // .changeHeight {
  //   height: 160px;
  // }
  // .unexpanded .isExpanded {
  //   height: 195px;
  // }
  
  </style>

<template>

  <header>
    <nav role="navigation" v-if="screenWidth >= 760" class="expanded" :class="{ changeHeight: changeHeight }">
      <div class="container">
        <ul class="igation">
          <li>
            <a class="logo" href="https://www.bedcoin.cc/">
              <img src="../images/logo.png" alt="BED Blockchain Explorer">
            </a>
          </li>
          
          <!--
          <li class="with-children" @mouseover="overShow" @mouseout="outHide"> 
            <span>Tools</span>
            <transition name="fade">
              <ul v-if="changeHeight">
                <li>
                  <a href="/">Blocks</a>
                </li>
                <li>
                  <a href="/delegateMonitor">Delegates</a>
                </li>
                <li>
                  <a href="/committee">Committee</a>
                </li>
                <li>
                  <a href="/bills">Proposals</a>
                </li>
              </ul>
            </transition>
          </li>
          -->
          
          <li class="flex-space"></li>
          <li>
            <Input :disabled="enterStatus" v-model="searchText" id="search-form" icon="search" placeholder="Block, Transaction, Address or Delegate" @on-click="searchTextEnter()" @on-enter="searchTextEnter()" @on-focus="onFocus()" @on-blur="onBlur()">
            </Input>
            <div class="message" v-if="errorShow">
              {{Message}}
            </div>
          </li>
        </ul>
      </div>
    </nav>

    <nav class="unexpanded" v-if="screenWidth < 760">
      <div class="navbar-header">
        <div class="container">
          <a class="nav-button" href="javascript:;" @click="navVisible()">
            <span class="nav-trigger"> 
            </span>
          </a>
          <a class="logo" href="/">
            <img v-if="screenWidth >= 356" src="../images/logo-w-t.png" alt="BED Blockchain Explorer">
            <img v-if="screenWidth < 356" style="height:90%" src="../images/logo-s.png" alt="BED Blockchain Explorer">
          </a>
        </div>
      </div>
      <div class="navbar-collapse">
        <div class="container">
          <ul class="collapse">
            <!--
            <li class="with-children">
              Tool
              <ul class="children-ul">
                <li>
                  <a href="/">Blocks</a>
                </li>
                <li>
                  <a href="/delegateMonitor">Delegates</a>
                </li>
                <!-- <li>
                  <a href="/richList">Rich List</a>
                </li> 
                <li>
                  <a href="/committee">Committee</a>
                </li>
                <li>
                  <a href="/bills">Proposals</a>
                </li> -->
              </ul>
            </li>
            -->
            <li class="input-collapse">
              <Input :disabled="enterStatus" v-model="searchText" id="search-form" icon="search" placeholder="Block, Transaction, Address or Delegate" @on-click="searchTextEnter()" @on-enter="searchTextEnter()">
              </Input>
              <div class="message" v-if="errorShow">
                {{Message}}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
    
</template>

<script>
  import config from "../config/config";

  export default {
    name: 'HeaderNav',
    components: {},
    computed: {
        errorShow() {
          return this.$store.state.error.errorShow
        },
        Message() {
          return this.$store.state.error.Message
        }
    },
    data() {
      return {
        screenWidth: document.body.clientWidth,
        searchText: '',
        expanded: false,
        clicktag: 0,
        searchLoading: false,
        enterStatus: false,
        changeHeight: false
      }
    },
    created() {

      const that = this
      window.onresize = () => {
        return (() => {
            window.screenWidth = document.body.clientWidth
            that.screenWidth = window.screenWidth
            this.$store.commit('screenSize', that.screenWidth);
        })()
      }
      
    },
    mounted() {

    },
    methods: {
      overShow () {
        this.changeHeight = true;
      },

      outHide () {
        this.changeHeight = false;
      },

      toolsOnchang(e) {
        this.$router.push({path:e})
      },

      networkOnchange(e) {
        location.reload();
      },

      onFocus() {
        $("#search-form input").css("width", "350px");
      },

      onBlur() {
        $("#search-form input").css("width", "250px");
      },

      navVisible() {
        
        var collapse_header = document.getElementsByClassName('navbar-header')[0];
        var collapse_navbar = document.getElementsByClassName('navbar-collapse')[0];
        if (this.clicktag === 0) {
          this.clicktag = 1;
          if (collapse_header.classList.contains('nav-is-visible')) {
            collapse_header.classList.remove('nav-is-visible');
            collapse_navbar.classList.remove('isExpanded');
            
          } else {
            collapse_header.classList.add('nav-is-visible');
            collapse_navbar.classList.add('isExpanded');
          }

          window.setTimeout( () => {
            this.clicktag = 0;
          },500)
        } else{

        }
      },

      searchTextEnter() {
        if (!this.searchText) {
          return
        }
        this.$Loading.start();
        var _this = this;
        var _$store = this.$store;
        this.searchLoading = true;
        this.enterStatus = true;
        var collapse_header = document.getElementsByClassName('navbar-header')[0];
        var collapse_navbar = document.getElementsByClassName('navbar-collapse')[0];

        //$.getJSON( config.api.dev + 'search3', { 'param': this.searchText }, function( data, status) {
        $.getJSON( config.api.dev + '/block/newest/'  + 'search', { 'param': this.searchText }, function( data, status) {
          console.log('search=', data);
          if (data.error) {
            _$store.commit('errorMessage', { status: true , msg: data.msg});
            setTimeout(() =>_$store.commit('errorMessage', { status: false , msg: ''}),3000);
            _this.searchText = '';
            _this.searchLoading = false;
            _this.enterStatus = false;
            _this.$Loading.finish();

          }else if (data.type === 4) {
            _this.$store.commit('getaddress1data', data);
            //_this.$router.push({path: '/addrinfo', query: {param: data.query_value,from: 'search'}});
            _this.$router.push({path: '/addrinfo', query: {param: data.address, from: 'search'}});
            _this.searchText = '';
            _this.searchLoading = false;
            _this.enterStatus = false;
            if (collapse_header) {
              collapse_header.classList.remove('nav-is-visible');
              collapse_navbar.classList.remove('isExpanded')
            }
            _this.$Loading.finish();

          }else if (data.type === 3) {
            _this.$store.commit('gettransactionData', data);
            _this.$router.push({path: '/transinfo', query: {param: _this.searchText,from: 'search'}});
            _this.searchText = '';
            _this.searchLoading = false;
            _this.enterStatus = false;
            if (collapse_header) {
              collapse_header.classList.remove('nav-is-visible');
              collapse_navbar.classList.remove('isExpanded')
            }
            _this.$Loading.finish();

          }else if (data.type === 2 || data.type === 1 ) {
            _this.$store.commit('getblockData', data);
            _this.$router.push({path: '/blockinfo', query: {param: _this.searchText,from: 'search'}});
            _this.searchText = '';
            _this.searchLoading = false;
            _this.enterStatus = false;
            if (collapse_header) {
              collapse_header.classList.remove('nav-is-visible');
              collapse_navbar.classList.remove('isExpanded')
            }
            _this.$Loading.finish();

          } else {
            _this.searchText = '';
            _this.searchLoading = false;
            _this.enterStatus = false;
            _this.$Loading.finish();

          }
        })
      }

    },
    watch: {

      screenWidth (val) {
        if (!this.timer) {
          this.screenWidth = val;
          this.timer = true
          let that = this
          setTimeout(function () {
              that.timer = false
          }, 400)
        }
      }
      
    }
  };
</script>
