<style lang="less" scoped>
  @import "../styles/common.css";
	.bills{
		margin-bottom: 60px;
		a {
			&:hover {
				text-decoration:underline
			}
		}
		.status {
			display: inline-block;
			font-size: 13px;
			color: #fff;
			padding: 2px 4px;
			margin-right: 3px;
			border-radius: 3px;
			width: 70px;
			text-align: center;
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
		.keep-all {
			min-width: 200px;
		}
	}
</style>

<template>
  <div class="bills">

    <loader v-if="loading"></loader>
		
    <div class="container" v-if="!loading">
      <h2 class="pt25">List of Proposals</h2>

			<div class="table-container" style="margin-top: 10px">
				<table class="myTable" border="0" cellpadding="10" cellspacing="0" width="100%">
					<thead>
						<tr v-if="!errorMsg">
							<th>
								#
							</th>
							<th class="ellipsis" style="max-width: 350px;">
								ID
							</th>
							<th class="ellipsis" style="max-width: 240px;">
								Topic
							</th>
							<th style="min-width: 200px;">
								Starttime
							</th>
							<th style="min-width: 200px;">
								Endtime
							</th>
							<th style="min-width: 110px;">
								Status
							</th>
						</tr>
						<tr v-if="errorMsg" style="color: rgb(237, 63, 20);">
							<th>
								{{errorMsg}}
							</th>
						</tr>
					</thead>
					<tbody v-if="!errorMsg" is="transition-group" name="list">
						<tr v-for="item in caseList" :key="item.id" class="list-item">
							<td>{{item.index}}</td>
							<td class="ellipsis" style="max-width: 350px;">
								<router-link :to="{path:'/billinfo',query: {id: item.id}}" class="ellipsis">{{item.id}}</router-link>
							</td>
							<td class="ellipsis" style="max-width: 240px;">
								<router-link :to="{path:'/billinfo',query: {id: item.id}}" class="ellipsis">{{item.title}}</router-link>
							</td>
							<td>
								{{item.starttime | timeFormat}}
							</td>
							<td>
								{{item.endtime | timeFormat}}
							</td>
							<td>
								<span class="status ing" v-if="item.status == 1">Voting</span>
								<span class="status passed" v-if="item.status == 2">Passed</span>
								<span class="status notPassed" v-if="item.status == 3">Rejected</span>
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
	import moment from "moment";

  export default {
    name: "bills",
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
				caseList: [],
				caseList1: [],
      };
    },
    computed: {
      screenWidth() {
        return this.$store.state.screen.screenWidth
      },
		},
		filters: {
			// timeformat
		},
		destroyed () {
			window.clearInterval(this.st);
			window.removeEventListener("scroll",this.handleFun)
		},
    created () {

			this.st = window.setInterval( () => {
				this.getCaseList();
			},15000);

			this.getCaseList();

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
							if (_this.page > 0 && _this.page < Math.ceil(_this.caseList1.length / 100)) {
									_this.fixStatus = true;
									_this.page = _this.page + 1;
									_this.caseList = _this.caseList1.slice(0, _this.page*100);
									_this.fixStatus = false;
									_this.sw = true;
							}
						}
					}
				});
			},

			getCaseList () {

				var _this = this;
				$.getJSON(config.api.dev + 'v2/getbillsinfo', function(data,status) {

					if (data.error) {
						_this.caseList1 = [];
						_this.loading = false;
						_this.errorMsg = 'No data';
					}else {
						data.msg = data.msg.sort(_this.compare('starttime', 'desc'));
						let timestamp = new Date().getTime();
						data.msg.forEach((item, index) => {
							item.index = 1 + index;
							let status;
							if (item.state.isfinished) {
								if (item.state.ispassed) {
									status = 2;
								} else {
									status = 3;
								}
							} else {
								status = 1;
							}
							item.status = status;
							// item.endtime = moment(item.endtime * 1000).format("YYYY-MM-DD HH:mm:ss");
						});
						_this.fixStatus = false;
						_this.caseList1 = data.msg;
						_this.loading = false;
						_this.errorMsg = '';
						_this.caseList = _this.caseList1.slice(0, _this.page * 100);
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

			compare (property, type) {
				return function(obj1,obj2){
					var value1 = 0;
					var value2 = 0;
					obj1[property] ? value1 = obj1[property] : value1 = 0;
					obj2[property] ? value2 = obj2[property] : value2 = 0;
					if (type == 'asc') {
						return value1 - value2;
					}
					if (type == 'desc') {
						return value2 - value1;
					}
					return false;
				}
			},
			
    },
    watch: {
			
    }
  }
</script>