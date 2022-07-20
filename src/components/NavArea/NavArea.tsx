import React from 'react';
import { Menu } from 'dw-mx';
import { useHistory, useLocation } from 'dw-mx-router';

import './style/index.less';

export interface NavAreaProps {
    route: any;
    menuState:boolean;
}

function renderRoutes(routes,history) {
    return routes.filter((route) => !route.redirect && !route.hideInMenu).map((route) => {
        if (route.routes) {
            return (<Menu.SubMenu icon={route.icon} style={{fontSize:'14px'}} key={route.path} title={route.name}>
                {renderRoutes(route.routes,history)}
            </Menu.SubMenu>);
        } else {
            return <Menu.Item icon={route.icon} key={route.path} onClick={()=>{
                history.replace(route.path);}
            }><div style={{fontSize:'14px',display:'inline'}}>{route.name}</div></Menu.Item>;
        }
    });
}

export default function NavArea(props: NavAreaProps) {
    const { route,menuState } = props;

    const history = useHistory();

    const location = useLocation();

    const {pathname} = location;
    return <div style={{width:'100%'}}>
        <Menu inlineCollapsed={menuState} selectedKeys={[location.pathname]} key={'Menu'} mode="inline" theme={'dark'} defaultSelectedKeys={[pathname]} style={{width:'100%'}}>
            {
                renderRoutes(route.routes,history)
            }
        </Menu>
    </div>;
}