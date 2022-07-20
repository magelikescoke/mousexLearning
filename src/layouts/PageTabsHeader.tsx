import { Tabs } from 'dw-mx';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { ColFlex, FlexItem, RowFlex } from 'dw-mx-flex';
import {CloseCircleOutlined} from 'dw-mx-icons';
import './style/index.less';
const { TabPane } = Tabs;
import {MenuFoldOutlined,MenuUnfoldOutlined} from 'dw-mx-icons';
export default function PageTabsHeader(props) {
    const { children,changeMenuState,menuState } = props;
    const location = useLocation();
    const history = useHistory();

    // 为了触发重新渲染。。。
    const [tabs, setTabs] = useState(null);
    const [activeKey, setActiveKey] = useState(location.pathname);
    const tagNaveList = JSON.parse(sessionStorage.getItem('tagNaveList'));

    const changeTab = (key) => {
        const targetRoute = tagNaveList.find((value) => {
            return value['pathname'] == key;

        });
        history.replace({ pathname: targetRoute['pathname'], state: targetRoute['state'] });
    };

    // 删除tab
    const deleteTab = (key, action) => {
        if (action == 'remove') {
            // 重新设置tablist
            const newTageNaveList = tagNaveList.filter((value) => {
                return value['pathname'] != key;
            });
            sessionStorage.removeItem('tagNaveList');
            sessionStorage.setItem('tagNaveList', JSON.stringify(newTageNaveList));
            //修改activekey定位
            if (key == location.pathname) {
                // 当删除的节点为当前路由节点时，activekey定位到工作台
                setActiveKey('/');
                history.replace('/');
            } else {
                setTabs(newTageNaveList);
            }
        }
    };

    const tabRoutesName = (props) => {
        const ret = [...props];
        let result;
        ret.forEach(value => {
            if(value.routes){
                result = tabRoutesName(value.routes)
                return result;
            }else{
                if(value.path == location.pathname){
                    result = value.name;
                    return result
                }
            }
        })
        return result
        
    }

    const getPushTabName = (children) => {
        let pushTabName;
        children.forEach(value => {
            if(value.props && value.props.routes){
                pushTabName = tabRoutesName(value.props.routes);
            }else{
                if(value.props.path == location.pathname ){
                    pushTabName = value.props.name
                }
            }
        })
        return pushTabName;
    }

    // 生成tab
    const getTabPane  = () => {
        const temp = tagNaveList.findIndex(value => {
            return value.pathname == location.pathname
        })
        
        if(temp < 0 && location.pathname != '/'){

            const pushTab = children.length>0 ? ( getPushTabName(children)) : '';

            const tagList = tagNaveList.filter(value => {
                if(value.pathname != '/login'){
                    return value;
                }
            })

            const result = tagList.map((value) => {
                return <TabPane tab={value['name']}  key={value['pathname']} closable={value['pathname'] != '/home'}/>;
            })
            result.push(
                <TabPane tab={pushTab? pushTab :'' }  key={location.pathname} closable={location.pathname != '/home'}/>
            )
            return result;
        }else{
            const tagList = tagNaveList.filter(value => {
                if(value.pathname != '/login'){
                    return value
                }
            })
            const result = tagList.map((value) => {
                return <TabPane tab={value['name']}  key={value['pathname']} closable={value['pathname'] != '/home'}/>;
            })
            return result;
        }
    }

    useEffect(() => {
        setActiveKey(location.pathname);
    }, [location.pathname, tabs]);


    return (
        <>
            <ColFlex style={{ overflow: 'auto', backgroundColor:'#fff' }}>
                <FlexItem flexBasic={'0.38rem'} style={{backgroundColor:'#F5F7F9'}}>
                    <RowFlex>
                        <FlexItem style={{backgroundColor:'#F5F7F9'}} flexBasic={26}>
                            {menuState ?
                                <MenuUnfoldOutlined style={{width:'0.26rem',height:'0.26rem',marginTop:'calc( (0.32rem - 14px)/2 )'}} onClick={()=>{
                                    changeMenuState(false);
                                }}/>:
                                <MenuFoldOutlined style={{width:'0.26rem',height:'0.26rem',marginTop:'calc( (0.32rem - 14px)/2 )'}} onClick={()=>{
                                    changeMenuState(true);
                                }}/>
                            }
                        </FlexItem>
                        <FlexItem style={{backgroundColor:'#F5F7F9'}}>
                            <div className={'routes-tab-title'}>
                                {tagNaveList ? (
                                    <Tabs onEdit={deleteTab} type={'editable-card'} style={{ backgroundColor: '#F5F7F9', height: '0.32rem' }} hideAdd onChange={changeTab} activeKey={activeKey}>
                                        {getTabPane()}
                                    </Tabs>
                                ) : null}
                            </div>
                        </FlexItem>
                    </RowFlex>
                </FlexItem>
                <div style={{margin:'16px 16px 16px 16px',backgroundColor:'#fff',padding:'10px 10px 0 10px'}}>
                    {children}
                </div>
            </ColFlex>
        </>
    );
}
