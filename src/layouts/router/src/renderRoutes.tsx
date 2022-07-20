import React from "react";
import {Route, Redirect, useParams, useLocation} from "react-router-dom"
import {RouteComponentProps} from "react-router-dom"
import {MxRoute, MxRoutes} from "./"
import ErrorBoundary from './ErrorBoundary'
import {Base64} from 'js-base64';
const EMPTY_COMPONENT = (props) => (props.children); // 二级有子路由，但是没有 component，保证三级正常渲染

function CustomRouteComponent(props: {
    route: Exclude<MxRoute, "key">,
    routeComponentProps: RouteComponentProps<any>
}) {
    const {route, routeComponentProps} = props;
    const {component: Component = EMPTY_COMPONENT, props: customRouteComponentProps, wrappers, routes = []} = route;

    // 路由传参
    const routeParams = useParams();
    let extraRouteComponentProps = {};
    if (customRouteComponentProps === true) {
        extraRouteComponentProps = {
            ...routeParams
        };
    } else if (typeof customRouteComponentProps === "object") {
        extraRouteComponentProps = {
            ...customRouteComponentProps
        };
    }

    const newProps = {
        route,
        ...routeComponentProps, // 路由参数
        ...extraRouteComponentProps, // 组件参数
    };
    let wrappedComponent = <Component {...newProps}>{renderRoutes(routes)}</Component>;

    if(route.path.indexOf('/:') > -1){
        const tagNaveList = sessionStorage.getItem('tagNaveList');
        const naveList = JSON.parse(tagNaveList);
        const matchLists = naveList.filter((value)=>{
            const path = route.path;
            const matchPath = path.slice(0,path.lastIndexOf('/'));
            if(value['pathname'].indexOf(matchPath) > -1){
                return true;
            }else if(value){
                return false;
            }
        });

        const result = matchLists.map((value)=>{
            const key = value['routeKey'];
            return <div key={key} style={location.pathname == value['pathname'] ? {height:'100%',width:'100%'}:{display:'none'}}>
                <Component {...newProps}>{renderRoutes(routes)}</Component>
            </div>
        });

        wrappedComponent = result;
    }else{
        wrappedComponent = <Component {...newProps}>{renderRoutes(routes)}</Component>;
    }

    if (wrappers) {
        wrappers.forEach((wrapper) => {
            wrappedComponent = React.createElement(wrapper, newProps, wrappedComponent);
        });
    }

    return wrappedComponent;
}

interface RouteWithSubRoutesProps {
    route: Exclude<MxRoute, "key">;
    path: string;
}

function RouteWithSubRoutes(props: RouteWithSubRoutesProps) {
    const {route} = props;
    const {exact = false, strict = false, sensitive = false} = route;
    const {redirect} = route;
    const {path,name} = route; // path maybe a relative path

    const location = useLocation();

    const saveCacheRoute = () =>{

        const tagNaveList = sessionStorage.getItem('tagNaveList');

        // tab页名自定义R
        let tabname = "";
        if(route.props && route.props.tabsname){
            tabname = route.props.tabsname;
        }else{
            tabname = name;
        }
        //包装key
        const routeKey = {
            path:location.pathname
        };

        const base64 = Base64.encode(JSON.stringify(routeKey));
        if(!tagNaveList){
            const newTagNaveList = [];
            newTagNaveList.push({...location,name:tabname,routeKey:base64});
            sessionStorage.setItem('tagNaveList',JSON.stringify(newTagNaveList));
        }else{
            const newTagNaveList = JSON.parse(tagNaveList);
            const isTagOpen = newTagNaveList.find((value)=>{
                if(value['pathname'] == location.pathname){
                    return true;
                }
            });
            if(!isTagOpen){
                newTagNaveList.push({...location,name:tabname,routeKey:base64});
                sessionStorage.removeItem('tagNaveList');
                sessionStorage.setItem('tagNaveList',JSON.stringify(newTagNaveList));
            }
        }
    };

    const isLoadRoute = ()=>{
        const tagNaveList = sessionStorage.getItem('tagNaveList');
        if(!tagNaveList){
            return false;
        }else{
            const TagNaveList = JSON.parse(tagNaveList);
            const result = TagNaveList.find((value)=>{
                if(value['pathname'].indexOf(path) > -1){
                    return true;
                }else if(path.indexOf('/:') > -1){
                    return true;
                }
            });
            return result;
        }
    };


    const renderChildren = (props) =>{
        const { match } = props;
        // console.log(match,'match')
        const style =  match ? {height:'100%',width:'100%'} : {display:'none'};
        // 缓存节点
        if(match && location.pathname != "/empty" && location.pathname != "/" &&  (path == location.pathname || Object.keys(match.params).length != 0)){
            if(typeof route.isShowByTab ==  'undefined' || route.isShowByTab == true){
                saveCacheRoute();
            }
        }

        // 增加对缓存部分的内容判断,是否渲染
        if(match || isLoadRoute()){
            return <div style={style}>
                <CustomRouteComponent route={route} routeComponentProps={props}/>
            </div>
        }else{
            return <></>;
        }
    };

    if (redirect && location.pathname == path) {
        return <Redirect exact={exact} strict={strict} from={path} to={redirect}/>;
    } else {
        if(route.routes){
            return (
                <Route
                    children={(routeComponentProps: RouteComponentProps<any>) => renderChildren(routeComponentProps)}
                    exact={exact}
                    strict={strict}
                    sensitive={sensitive}
                    path={path}
                />
            )
        }else{
            return (
                <Route
                    children={(routeComponentProps: RouteComponentProps<any>) => <ErrorBoundary isShow={routeComponentProps['match']}>{renderChildren(routeComponentProps)}</ErrorBoundary>}
                    exact={exact}
                    strict={strict}
                    sensitive={sensitive}
                    path={path}
                />
            );
        }
    }
}

export default function renderRoutes(routes: MxRoutes) {
    // console.log(routes,'123')
    return routes ? (
        routes.map((route, index) => {
            const {key, ...rest} = route;
            return <RouteWithSubRoutes key={key || index} route={rest} {...route}/>
        })
    ) : null;
}