import Vue from 'vue'
import Vuex from 'vuex'
import moment from "moment"


Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        error: {
            errorShow: false,
            Message: 'Error'
        },
        screen: {
            screenWidth: document.body.clientWidth
        },
        avgstate: {
            avgblocktime: 0,
            balance: 0,
            blockcount: 0,
        },
        totallbtc: {
            height: 0,
            total: 0,
            bedcoin: 0,
            size: 0,
            difficulty: 0,
        },
        totalslot: {
            slotindex: 0,
            slotprice: 0,
            slotlock: 0,
            slotcount: 0,
        },
        totalslotchats: {
            slotcharts: [],
        },

        index: {
            flag: 1,
            loading: true,
            LatestBlocks: [],
            LatestTransactions: []
        },
        //block info
        block: {
            blockinfo: {},
            blockTable: {},
            loading: true,
            totalpage: 0,
            computing: 0,
        },
        //blocks
        blocks: [],
        //address
        address: {
            addrinfo: {},
            addrTable: [],
            loading: true,
            totalpage: 0
        },
        //transction info
        transaction: {
            txinfo: {},
            loading: true,
            total: {
                totalin: 0,
                totalout: 0
            }
        },
        //address1
        address1: {
            getaddressbalance: {},
            loading: true,
        },
        //Voters
        voters: {},
        //Votes
        votes: {}

    },
    getters: {

    },
    actions: {

    },
    mutations: {
        errorMessage(state, data) {
            state.error.errorShow = data.status;
            state.error.Message = data.msg;
        },

        getcomputed(state, data) {
            state.block.computing = data.computing
        },

        addCount(state, data) {
            state.index.flag = data + 1
        },

        screenSize(state, data) {
            state.screen.screenWidth = data;
        },

        getindexData(state, data) {
            var LatestTransactions = [];
            var result = [];
            data.forEach((item, index) => {
                item.time = moment(item.time * 1000).format("YYYY-MM-DD HH:mm:ss");
                //item.txs = item.txCount;
                result.push(item);
                if (item.txs) {
                    item.txs.forEach((item1, index) => {
                        var transItem = {};
                        transItem.txhash = item1.txid;
                        transItem.time = item.time;
                        LatestTransactions.push(transItem);
                    });
                };
            });
            state.index.LatestBlocks = result;
            state.index.LatestTransactions = LatestTransactions;
            state.index.loading = false
        },

        gettotallbtc(state, data) {
            state.totallbtc.height = data.height;
            state.totallbtc.total = data.total;
            state.totallbtc.bedcoin = data.bedcoin;
            state.totallbtc.size = data.size;
            state.totallbtc.difficulty = data.difficulty;
        },

        gettotalslot(state, data) {
            state.totalslot.slotindex = data.slotindex;
            state.totalslot.slotprice = data.slotprice;
            state.totalslot.slotlock = data.slotlock;
            state.totalslot.slotcount = data.slotcount;
        },

        gettotallchats(state, data) {
            if (data.slotcharts == undefined) {} else {
                state.totalslotchats.slotcharts = data.slotcharts;
            }
        },

        getavgblockstate(state, data) {
            state.avgstate.avgblocktime = data.avgblocktime;
            state.avgstate.balance = data.balance;
            state.avgstate.blockcount = data.blockcount;
        },

        //blocks
        getblocksData(state, data) {
            data.forEach((item, index) => {
                item.result.time = moment(item.result.time * 1000).format("YYYY-MM-DD HH:mm:ss");
            });
            state.blocks = data;
        },

        //block 
        getblockData(state, data) {
            var result = data
            result.time = moment(result.time * 1000).format("YYYY-MM-DD HH:mm:ss");
            state.block.blockinfo = result
            state.block.blockTable = data.txs
            state.block.totalpage = Math.ceil(result.txCount / 20)
            state.block.loading = false
        },

        //transaction 
        gettransactionData(state, data) {
            var totalin = 0;
            var totalout = 0;
            if (data.blockTime) {
                data.blockTime = moment(data.blockTime * 1000).format("YYYY-MM-DD HH:mm:ss");
            }
            data.vin.forEach((item, index) => {
                if (item.value !== undefined) {
                    totalin = totalin + parseInt(item.value);
                }
            });
            data.vout.forEach((item, index) => {
                if (item.value) {
                    totalout = totalout + parseInt(item.value);
                }
            });
            state.transaction.txinfo = data
            state.transaction.total.totalin = totalin;
            state.transaction.total.totalout = totalout;
            state.transaction.loading = false
        },

        //address 
        getaddressData(state, data) {
            state.address.addrinfo = data.addrinfo
            state.address.addrTable = data.addrTable
            state.address.totalpage = data.totalpage
            state.address.loading = false
        },

        //addres simple 
        getaddress1data(state, data) {
            state.address1.getaddressbalance = data
            state.address1.loading = false
        },

        //Voters
        getvoters(state, data) {
            state.voters = data.result
        },
        //Votes
        getvotes(state, data) {
            state.votes = data.result
        }

    }
})

export default store