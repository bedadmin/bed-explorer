<style lang="less" scoped>
  @import "../styles/common.css";
	.council{
		margin-bottom: 60px;
		a {
			&:hover {
				text-decoration:underline
			}
		}
		.list-item {
			// display: inline-block;
			// margin-right: 10px;
		}
		.list-enter-active {
			transition: all 1s;
		}
		.list-leave-active {
			transition: all 0.2s;
		}
		.list-enter, .list-leave-to {
			opacity: 0;
			transform: translateY(30px);
		}
		.table-cell {
			display: inline-block;
		}
		.table-sort {
			font-size: 12px;
			display: inline-block;
			width: 9px;
			height: 12px;
			margin-left: 4px;
			margin-top: -1px;
			vertical-align: middle;
			overflow: hidden;
			cursor: pointer;
			position: relative;
		}
		.table-sort i {
			display: block;
			height: 6px;
			line-height: 6px;
			overflow: hidden;
			position: absolute;
			color: #bbbec4;
			transition: color .2s ease-in-out;
			&:hover {
				color: inherit;
			}
			&:first-child {
				top: 0;
			}
			&:last-child {
				bottom: 0;
			}
		}
		.table-sort i.on {
			color: #2d8cf0;
		}
		.status {
			box-sizing: border-box;
			display: inline-block;
			width: 14px;
			height: 14px;
			border-radius: 50%;
			margin: 8px auto;
		}
		.bcolor-green {
			border: 3px solid #19be6b;
			background-color: #19be6b;
		}
		.bcolor-red {
			border: 3px solid #ed3f14;
			background-color: #ed3f14;
		}
		.bcolor-grey {
			border: 3px solid grey;
			background-color: grey;
		}
		.bcolor-space {
			background-color: #fff;
		}
		.tip {
			width: 30px;
			height: 30px;
			margin: auto;
		}
		.super-node {
			color: #ff9900;
			font-weight:bold
		}
	}
</style>

<template>
  <div class="council">

    <loader v-if="loading"></loader>
		
    <div class="container" v-if="!loading">
      <h2 class="pt25">Committee Members</h2>

			<div class="table-container" style="margin-top: 10px">
				<table class="myTable" border="0" cellpadding="10" cellspacing="0" width="100%">
					<thead>
						<tr v-if="!errorMsg">
							<th>
								#
							</th> 
							<th>
								Name
							</th>
							<th>
								Address
							</th>
							<th class="ellipsis" style="max-width: 240px;">
								URL
							</th>
							<th>
								Votes
							</th>
						</tr>
						<tr v-if="errorMsg" style="color: rgb(237, 63, 20);">
							<th>
								{{errorMsg}}
							</th>
						</tr>
					</thead>
					<tbody is="transition-group" name="list" v-if="!errorMsg">
						<tr v-for="item in committee" :key="JSON.stringify(item.address)" class="list-item">
							<td>{{item.index}}</td>
							<td>
								<router-link :to="{path:'/addrinfo',query: {param: item.address}}" class="ellipsis">{{item.name}}</router-link>         									
							</td>
							<td>
								<router-link :to="{path:'/addrinfo',query: {param: item.address}}" class="ellipsis">{{item.address}}</router-link>          									
							</td>
							<td class="ellipsis" style="max-width: 240px;">
								<a :href="urlFormat(item.url)" target="_blank">{{item.url}}</a>
							</td>
							<td>
								{{item.votes}}
							</td>
						</tr>
					</tbody>
				</table>
			</div>

    </div>
  </div>
</template>

<script>
	import config from "../config/config";
  import Loader from "./loader.vue";

  export default {
    name: "council",
    components: {
			Loader
		},
    data () {
      return {
				loading: true,
				page: 1,
				st: '',
				sreload: '',
				fixStatus: false,
				errorMsg: '',
				sw: true,
				sortStatus: '',
				openSort: {
					rankUp: true, 
					rankDown: false,
					votesUp: false,
					votesDown: false,
					ratioUp: false,
					ratioDown: false
				},
				committee: [],
				committee1: [],
      };
    },
    computed: {
      screenWidth() {
        return this.$store.state.screen.screenWidth
      },
    },
		destroyed () {
			window.clearInterval(this.st);
			window.removeEventListener("scroll",this.handleFun)
		},
    created () {

			this.st = window.setInterval( () => {
				this.getlistcommittee();
			},15000);

			this.getlistcommittee();

			window.addEventListener("scroll",this.handleFun);

    },
    mounted () {

		},
    methods: {

			handleFun() {
				var _this = this;
				window.addEventListener('scroll',function(){  
					var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;//滚动高度
					var innerHeight = window.innerHeight;
					var offsetHeight = document.body.offsetHeight;
					var scrollHeight = document.documentElement.scrollHeight;  
					if( innerHeight + scrollTop >= (offsetHeight - 30 )) {
						if(_this.sw==true){
							_this.sw = false;
							if (_this.page > 0 && _this.page < Math.ceil(_this.committee1.length / 100)) {
									_this.fixStatus = true;
									_this.page = _this.page + 1;
									_this.committee = _this.committee1.slice(0, _this.page*100);
									_this.fixStatus = false;
									_this.sw = true;
							}
						}
					}
				});
			},

			getlistcommittee () {

				var _this = this;
				$.getJSON(config.api.dev + 'v2/getlistcommittees', function(data,status) {

					if (data.error) {
						_this.committee1 = [];
						_this.loading = false;
						_this.errorMsg = 'No data';
					}else {
						data.msg.forEach((item, index) => {
							var notforgeddetails = {};
							item.index = 1 + index;
						});
						_this.fixStatus = false;
						_this.committee1 = data.msg;
						_this.loading = false;
						_this.errorMsg = '';
						_this.committee = _this.committee1.slice(0, _this.page * 100);
					}
					
				});
				
			},
			
			insert_flg(num) {
				var num = (num || 0).toString(), result = '';
				while (num.length > 8) {
						result = ',' + num.slice(-8) + result;
						num = num.slice(0, num.length - 8);
				}
				if (num) { result = num + result; }
				return result;
			},

			urlFormat(url) {
        if (url.indexOf('http') >= 0) {
          return url
        } else {
          url = 'http://' + url 
          return url
        }
      },
			
    },
    watch: {
			
    }
  }
</script>