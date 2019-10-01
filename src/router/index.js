import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const commonRoutes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('../components/Login.vue')
    },
    {path: '/', redirect: '/home'},
] 

// 需要通过后台数据来生成的组件
export const asyncRoutes = {
    'home': {
        path: 'home',
        name: 'home',
        component: () => import('../views/Home.vue')
    },
    'ol': {
        path: 'ol',
        name: 'ol',
        component: () => import('../views/HourKri.vue')
    },

    //气温三维
    'weather': {
        path: 'weather',
        name: 'weather',
        component: () => import('../views/Weather.vue')
    },
    'rainfall': {
        path: 'rainfall',
        name: 'rainfall',
        component: () => import('../views/Rainfall.vue')
    },
    'day-temp': {
        path: 'day-temp',
        name: 'day-temp',
        component: () => import('../views/DayTemp.vue')
    },
    'day-rain': {
        path: 'day-rain',
        name: 'day-rain',
        component: () => import('../views/DayRain.vue')
    },
    //通过站点查询
    'station-info': {
        path: 'station-info',
        name: 'station-info',
        component: () => import('../views/StationInfo.vue')
    },
    'station-24hour': {
        path: 'station-24hour',
        name: 'station-24hour',
        component: () => import('../views/StationQuery.vue')
    },
    'station-day': {
        path: 'station-day',
        name: 'station-day',
        component: () => import('../views/StationDayWeather.vue')
    },
    'station-hour-windy': {
        path: 'station-hour-windy',
        name: 'station-hour-windy',
        component: () => import('../views/StationHourWindy.vue')
    },
    't1': {
        path: 't1',
        name: 't1',
        component: () => import('../views/T1.vue')
    },
    'password': {
        path: 'password',
        name: 'password',
        component: () => import('../views/Password.vue')
    },
    'msg': {
        path: 'msg',
        name: 'msg',
        component: () => import('../views/Msg.vue')
    },
    'userinfo': {
        path: 'userinfo',
        name: 'userinfo',
        component: () => import('../views/UserInfo.vue')
    }
}

const createRouter = () => new Router({
    routes: commonRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher 
}

export default router