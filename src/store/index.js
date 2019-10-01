import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        // 左侧菜单栏数据
        menuItems: [
            {
                name: 'home', // 要跳转的路由名称 不是路径
                size: 18, // icon大小
                type: 'md-home', // icon类型
                text: '主页' // 文本内容
            },
            {
                name: 'ol', // 要跳转的路由名称 不是路径
                size: 18, // icon大小
                type: 'md-home', // icon类型
                text: 'openLayer测试' // 文本内容
            },
            //气象三维可视化
            {
                text: '三维可视化',
                type: 'ios-paper',
                children: [
                    {
                        type: 'ios-grid',
                        name: 'weather',
                        text: '24小时气温'
                    },
                    {
                        type: 'ios-grid',
                        name: 'rainfall',
                        text: '24小时降水'
                    },
                    {
                        type: 'ios-grid',
                        name: 'day-temp',
                        text: '日平均气温'
                    },
                    {
                        type: 'ios-grid',
                        name: 'day-rain',
                        text: '日降水总量'
                    }
                ]
            },
            // 通过站点查询
            {
                text: '气象站查询',
                type: 'ios-paper',
                children: [
                    {
                        type: 'ios-grid',
                        name: 'station-info',
                        text: '气象站信息'
                    },
                    {
                        type: 'ios-grid',
                        name: 'station-24hour',
                        text: '24小时气温降水'
                    },
                    {
                        type: 'ios-grid',
                        name: 'station-day',
                        text: '日气温降水'
                    },
                    {
                        type: 'ios-grid',
                        name: 'station-hour-windy',
                        text: '24小时风速风向'
                    }
                ]
            },
            {
                text: '二级菜单',
                type: 'ios-paper',
                children: [
                    {
                        type: 'ios-grid',
                        name: 't1',
                        text: '表格'
                    },
                    {
                        text: '三级菜单',
                        type: 'ios-paper',
                        children: [
                            {
                                type: 'ios-notifications-outline',
                                name: 'msg',
                                text: '查看消息'
                            },
                            {
                                type: 'md-lock',
                                name: 'password',
                                text: '修改密码'
                            },
                            {
                                type: 'md-person',
                                name: 'userinfo',
                                text: '基本资料',
                            }
                        ]
                    }
                ]
            }
        ],
    },
    mutations: {
        setMenus(state, items) {
            state.menuItems = [...items]
        },
    }
})

export default store