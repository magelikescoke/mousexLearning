import React from 'react';
import dynamic from 'dw-mx-dynamic';
import logo from '../assets/logo.png';
// 整体布局
import BasicLayout from '../layouts/BasicLayout';

// 登录、异常页
import Login from '../pages/Login/Login';

// 认证组件
import NeedUserAuthorized from '../auth/NeedUserAuthorized';

export default [
    {
        path: '/login',
        component: Login,
    },
    {
        path: '/',
        component: BasicLayout,
        props: {
            title: '数字保险箱',
            logo,
        },
        wrappers: [NeedUserAuthorized],
        routes: [],
    },
];
