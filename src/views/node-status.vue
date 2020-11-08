<style lang="less" scoped>
  @import "../styles/common.css";
	.test-monitor{
		margin-bottom: 60px;
		a {
			&:hover {
				text-decoration:underline
			}
		}
		.list-item {
			display: inline-block;
			margin-right: 10px;
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
		.forging-total {
			color: white;
			padding: 1em;
			margin: 1rem 1.5rem;
			border-radius: 4px;
			position: relative;
			.forging-total-details {
				font-weight: 200;
    		font-size: 24px;
				line-height: 32px;
				margin: 0 0 10px;
			}
			.notforgedcontent {
				position: absolute;
				top: 110%;
				right: -8%;
				background: #1f2d3d;
				border-color: #1f2d3d;
				padding: 1rem;
				border-radius: 4px;
				width: auto;
				z-index: 1000;
				display: none;
				-webkit-transition: all 0.2s;
				-moz-transition: all 0.2s;
				-o-transition: all 0.2s;
				-ms-transition: all 0.2s;
				transition: all 0.2s;
				.table-container {
					margin: 0;
					font-size: 13px;
				}
				p {
					font-size: 13px;
			    text-align: center;
				}
				&::before {
            border: solid transparent;
            content: ' ';
            left: 100%;    //根据三角形的位置，可以随意更改。
						position: absolute;
						bottom: 100%;
				    left: 50%;
						width: 0;
						height:0;
						border-left:10px solid transparent;
						border-right: 10px solid transparent;
						border-bottom: 8px solid #1f2d3d;
        }
			}
			&:hover .notforgedcontent {
				display: block;
			}
		}
	}
</style>

<template>
  <div class="test-monitor">

    <loader v-if="loading"></loader>
		
    <div class="container" v-if="!loading">
      <h2 class="pt25" style="margin: 10px 0 10px;">Delegate Monitor</h2>

			<Row>
				<Col :xs="24" :sm="12" :md="8" :lg="8">
					<div class="forging-total blue">
						<p class="forging-total-details">{{forgedtotal}}</p>
						<span>Active delegates</span>
					</div>
				</Col>
				<Col :xs="24" :sm="12" :md="8" :lg="8">
					<div class="forging-total green">
						<p class="forging-total-details">{{forgedtotal - notforgedtotal}}</p>
						<span>Forging</span>
					</div>
				</Col>
				<Col :xs="24" :sm="12" :md="8" :lg="8">
					<div class="forging-total red">
						<p class="forging-total-details">{{notforgedtotal}}</p>
						<span>Not forging</span>
						<div class="notforgedcontent" v-if="notforgedarry.length > 0">
							<div class="table-container">
								<tbody>
									<tr v-for="item in notforgedarry">
										<td style="text-align: right;padding-right: 10px;">{{ item.name }}</td>
										<td>{{ item.address }}</td>
									</tr>
								</tbody>
							</div>
						</div>
					</div>
				</Col>
			</Row>

			<div class="table-container" style="margin-top: 10px">
				<table class="myTable" border="0" cellpadding="10" cellspacing="0" width="100%">
					<thead>
						<tr>
							<th>
								<div class="table-cell">
									<span @click="sortTdClick('rank')" style="cursor: pointer;">#</span>
									<span class="table-sort">
										<Icon type="arrow-up-b" :class="{ 'on': openSort.rankUp }" @click.native="sortArrowClick('rankUp')"></Icon>
										<Icon type="arrow-down-b" :class="{ 'on': openSort.rankDown }" @click.native="sortArrowClick('rankDown')"></Icon>
									</span>
								</div>
							</th>
							<th>
								<span>Name</span>
							</th>
							<th>
								<span>Address</span>
							</th>
							<th>
								<div class="table-cell">
									<span @click="sortTdClick('votes')" style="cursor: pointer;">Votes</span>
									<span class="table-sort">
										<Icon type="arrow-up-b" :class="{ 'on': openSort.votesUp }" @click.native="sortArrowClick('votesUp')"></Icon>
										<Icon type="arrow-down-b" :class="{ 'on': openSort.votesDown }" @click.native="sortArrowClick('votesDown')"></Icon>
									</span>
								</div>
							</th>
							<th>
								<div class="table-cell">
									<span @click="sortTdClick('ratio')" style="cursor: pointer;">Ratio</span>
									<span class="table-sort">
										<Icon type="arrow-up-b" :class="{ 'on': openSort.ratioUp }" @click.native="sortArrowClick('ratioUp')"></Icon>
										<Icon type="arrow-down-b" :class="{ 'on': openSort.ratioDown }" @click.native="sortArrowClick('ratioDown')"></Icon>
									</span>
								</div>
							</th>
							<th>Status</th>
							
						</tr>
					</thead>
					<tbody is="transition-group" name="list">
						<tr v-for="item in listwitnesses" :key="item.address">
							<td>{{item.index ? item.index : "--"}}</td>
							<td>
								<router-link v-if="item.name != 'Empty Node'" :to="{path:'/addrinfo',query: {param: item.address}}" class="ellipsis">{{item.name}}</router-link>          									
								<span v-if="item.name == 'Empty Node'">{{item.name}}</span>
							</td>
							<td>
								<router-link v-if="item.name != 'Empty Node'" :to="{path:'/addrinfo',query: {param: item.address}}" class="ellipsis">{{item.address}}</router-link>          									
								<span v-if="item.name == 'Empty Node'">{{item.address}}</span>
							</td>
							<td>{{ insert_flg (item.count) }}</td>
							<td>
								{{ item.ratio ? ((Number(item.ratio) * 100).toFixed(2) + '%') : 0 }}
							</td>
							<td>
								<div class="tip" v-tip.dark.left="changeForgedTooltip( item.status, item.now, item.index)">
									<span class="status" :class="changeForgedStyle( item.status, item.now, item.index)"></span>
								</div>
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
    name: "test-monitor",
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
				listwitnesses: [],
				listwitnesses1: [],
				forgedtotal: 101,
				// forgingtotal: 101,
				notforgedtotal: 0,
				notforgedarry: []
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
				this.getDelegatesData();
			},3000)

			this.getDelegatesData();

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
							if (_this.page > 0 && _this.page < Math.ceil(_this.listwitnesses1.length / 100)) {
									_this.fixStatus = true;
									_this.page = _this.page + 1;
									_this.listwitnesses = _this.listwitnesses1.slice(0, _this.page*100);
									_this.fixStatus = false;
									_this.sw = true;
							}
						}
					}
				});
			},

			changeForgedTooltip(p1, p2, p3) {

				var tooltip = '';
				if (p3 > 101) {
					tooltip = 'Stop forging';
				} else {
					(p2 && String(p2) == '1') ? tooltip = 'Forging' :
							 						(String(p1) == '1') ? tooltip = 'Waiting forging' :
												 (String(p1) == '-1') ? tooltip = 'Not forging' : 'Stop forging';
				}
				return tooltip;
				
			},

			changeForgedStyle( p1, p2, p3) {
				let class1 = '';
				let class2 = '';
				( p2 && String(p2) == "1" ) ? class2 = 'bcolor-space' : class2 = '';
				if (p3 && p3 > 101) {					
					class1 = 'bcolor-grey'
					return class1 + " " + class2
				} else {
					p1 === '1' ? class1 ='bcolor-green' :					
					p1 === '-1' ? class1 ='bcolor-red' :
					p1 === '0' ? class1 ='bcolor-green' : class1 ='bcolor-red';
					return class1 + " " + class2
				}

			},
 
			getDelegatesData () {
				var _this = this;
				$.getJSON( config.api.dev + 'v2/newgetnode', function(data,status) {
					_this.notforgedtotal = 0;
					_this.notforgedarry = [];

					if (data.error) {
						_this.listwitnesses1 = [];						
					}else {
						data.msg.forEach((item, index) => {
							var notforgeddetails = {};
							item.index = 1 + index;
							if (item.status && item.status == '-1' && index < 101) {
								_this.notforgedtotal = _this.notforgedtotal + 1;
								notforgeddetails.name = item.name;
								notforgeddetails.address = item.address;
								_this.notforgedarry.push(notforgeddetails);
							}
						});
						_this.fixStatus = false;
						_this.listwitnesses1 = data.msg;
						_this.sortArrowClick(_this.sortStatus);
						_this.loading = false;
						_this.listwitnesses = _this.listwitnesses1.slice(0, _this.page * 100);
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

			toPercent(param) {
      	Number.prototype.toPercent = function(){
          return (Math.round(param * 10000)/100).toFixed(2) + '%';
      	}
    	},

			sortArrowClick(param) {
				if (param == '') {
					return false;
				}
				this.sortStatus = param;
				this.sortArrowActive(param);
				this.startSort(param);
			},

			sortTdClick (param) {

				switch (param) {
					case 'rank':
						if (this.openSort.rankUp) {
							this.sortArrowClick('rankDown')
							} else {
							this.sortArrowClick('rankUp')
						}
						break;
					case 'votes':
						if (this.openSort.votesDown) {
							this.sortArrowClick('votesUp')
							} else {
							this.sortArrowClick('votesDown')
						}
						break;
					case 'ratio':
						if (this.openSort.ratioDown) {
							this.sortArrowClick('ratioUp')
							} else {
							this.sortArrowClick('ratioDown')
						}
						break;
					default:
						break;
				}
			},

			sortArrowActive (param) {
				for (const key in this.openSort) {
					if ( key == param ) {
						this.openSort[key] = true;
					}else{
						this.openSort[key] = false;
					}
				}
			},

			startSort (param) {
				switch (param) {
					case 'rankUp':
						this.listwitnesses1 = this.listwitnesses1.sort(this.compare('index', 'asc'));
						break;
					case 'rankDown':
						this.listwitnesses1 = this.listwitnesses1.sort(this.compare('index', 'desc'));
						break;
					case 'votesUp':
						this.listwitnesses1 = this.listwitnesses1.sort(this.compare('count', 'asc'));
						break;
					case 'votesDown':
						this.listwitnesses1 = this.listwitnesses1.sort(this.compare('count', 'desc'));
						break;
					case 'ratioUp':
						this.listwitnesses1 = this.listwitnesses1.sort(this.compare('ratio', 'asc'));
						break;
					case 'ratioDown':
						this.listwitnesses1 = this.listwitnesses1.sort(this.compare('ratio', 'desc'));
						break;
					default:
						break;
				};
				this.listwitnesses = this.listwitnesses1.slice(0, this.page * 100);
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