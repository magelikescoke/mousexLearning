import React, { useEffect, useState } from 'react';
import { Redirect } from 'dw-mx-router';
import CurrentUser from './CurrentUser';
import routermapping from '../config/routemapping';
import { renderRoutes } from '@/layouts/router/src';

export default function NeedUserAuthorized(props) {
    const { children, route } = props;
    const { routes } = route;
    const routeList = JSON.parse(sessionStorage.getItem('routeList'));

    const [newRoutes, updateNewRoutes] = useState(routes);

    // 替换component
    const searchComponent = (value) => {
        const temp = { ...value };
        for (const key in routermapping) {
            if (key === temp.component) {
                return { ...temp, component: routermapping[key] };
            }
        }
    };

    // 遍历数组，替换component
    const getRouteList = (routeList) => {
        const list = [...routeList];
        const result = list.map(value => {
            if (value.routes) {
                value = { ...value, routes: getRouteList(value.routes) };
                return value;
            } else if (value.component) {
                value = searchComponent(value);
                return value;
            } else {
                return value;
            }
        });
        return result;
    };

    // 获取路由列表
    const getRoute = async () => {
        const tempArray = [];
        if (routeList) {
            const ret = getRouteList(routeList.routes);
            const temp = renderRoutes(ret);
            // 提取路由数据
            for (let i = 0; i < temp.length; i++) {
                tempArray.push(temp[i].props.route);
            }
            // 更新路由
            updateNewRoutes(tempArray);
        }

    };

    // 登录信息变化的时候更新路由
    useEffect(() => {
        if (!CurrentUser.isLoggedIn()) {
            return;
        }
        getRoute();
    }, [CurrentUser.isLoggedIn()]);

    if (CurrentUser.isLoggedIn()) {
        return React.cloneElement(children, {
            ...children.props,
            route: {
                ...route,
                routes: newRoutes
            }
        });
    } else {
        return <Redirect to={'/login'} />;
    }
}
