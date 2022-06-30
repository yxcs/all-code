import {
    Home,
    Classfiy,
    Cart,
    Mine,
    Login
} from "pages"

export const TabBarRoute = [
    {
        path:"/home",
        component:Home,
        meta:{
            flag:true
        },
        icon:"\ue6b3",
        text:"首页"
    },
    {
        path:"/classfiy",
        component:Classfiy,
        meta:{
            flag:true
        },
        icon:"\ue60d",
        text:"分类"
    },
    {
        path:"/cart",
        component:Cart,
        meta:{
            flag:true
        },
        icon:"\ue636",
        text:"购物车"
    },
    {
        path:"/mine",
        component:Mine,
        meta:{
            flag:true,
            requiredAuth:true
        },
        icon:"\ue61d",
        text:"我的"
    },

];

export const NoTabBarRoute = [
    {
        path:"/login",
        component:Login,
        meta:{}
    }
];

export const RouteConfig = TabBarRoute.concat(NoTabBarRoute)