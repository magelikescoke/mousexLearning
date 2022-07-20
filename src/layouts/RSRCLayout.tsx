import React, { useEffect, useRef, useState } from 'react';
import GlobalHeader from '../components/GlobalHeader';
import LogoArea from '../components/LogoArea';
import NavArea from '../components/NavArea';
import { renderRoutes } from './router/src';
// import SewLaneContainer from '@/pages/sew/demo/SewLaneContainer';
import './style/index.less';
import PageTabsHeader from './PageTabsHeader';
import { RowFlex, FlexItem } from 'dw-mx-flex';

export interface RSRCLayoutProps {
    logo: any;
    route: any;
    menuTheme: 'light' | 'dark';
    title: string;
}

const RSRCLayout: React.FunctionComponent<RSRCLayoutProps> = (props) => {
    const { route, logo, title } = props;

    // false代表不折叠
    const [menuExpand, setMenuExpand] = useState(false);
    const changeMenuState = (flag) => {
        setMenuExpand(flag);
    };
    const testRef = useRef();
    const [listHeight, updateListHeight] = useState('100%');
    useEffect(() => {
        if (testRef.current !== undefined) {
            updateListHeight(window.innerHeight - parseInt(window.getComputedStyle(testRef.current)['height']) + 'px');
        }
    }, []);
    return (
        <>
            <div style={{ height: '100%', overflow: 'hidden' }}>
                <div className={'dw-mx-layout-seflike'}>
                    <div className={'dw-mx-layout-seflike-header'}>
                        <div ref={testRef} className={'dw-mx-layout-seflike-header-bg'}>
                            <LogoArea logo={logo} title={title}/>
                            <GlobalHeader/>
                        </div>
                    </div>
                    <RowFlex style={{ height: listHeight }}>
                        <FlexItem style={{ backgroundColor: '#f0f0f0' }} overflow={'auto'}
                                  flexBasic={menuExpand ? '6%' : '14%'}>
                            <div style={{ display: 'flex', width: '100%', height: '100%', backgroundColor: '#075087' }}>
                                <NavArea menuState={menuExpand} route={route}/>
                            </div>
                        </FlexItem>
                        <FlexItem overflow={'auto'}
                                  style={{ padding: '0.10rem 0.12rem 0 0.12rem', backgroundColor: '#f5f7f9' }}>
                            <PageTabsHeader menuState={menuExpand}
                                            changeMenuState={changeMenuState}>{renderRoutes(route.routes)}</PageTabsHeader>
                        </FlexItem>
                    </RowFlex>
                </div>
            </div>
        </>
    );
};

export default RSRCLayout;
