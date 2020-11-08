const routers = [
    {
        path: '*',
        meta: {
            title: 'BED'
        },
        component: (resolve) => require(['./views/index.vue'], resolve)
    },
    {
        path: '/',
        meta: {
            title: 'BED'
        },
        component: (resolve) => require(['./views/index.vue'], resolve)
    },
    {
        path: '/transinfo',
        meta: {
            title: 'Transaction'
        },
        component: (resolve) => require(['./views/transaction.vue'], resolve)
    },
    {
        path: '/addrinfo',
        meta: {
            title: 'Address'
        },
        component: (resolve) => require(['./views/address.vue'], resolve)
    },
    {
        path: '/blockinfo',
        meta: {
            title: 'Block'
        },
        component: (resolve) => require(['./views/block.vue'], resolve)
    },
    {
        path: '/delegateMonitor',
        meta: {
            title: 'Delegate Monitor'
        },
        component: (resolve) => require(['./views/node-status.vue'], resolve)
    },
    // {
    //     path: '/richList',
    //     meta: {
    //         title: 'Delegate Monitor'
    //     },
    //     component: (resolve) => require(['./views/rich-list.vue'], resolve)
    // },
    {
        path: '/committee',
        meta: {
            title: 'Committee'
        },
        component: (resolve) => require(['./views/committee.vue'], resolve)
    },
    {
        path: '/bills',
        meta: {
            title: 'Peoposals'
        },
        component: (resolve) => require(['./views/bills.vue'], resolve)
    },
    {
        path: '/billinfo',
        meta: {
            title: 'Peoposal Info'
        },
        component: (resolve) => require(['./views/billinfo.vue'], resolve)
    },
];
export default routers;
