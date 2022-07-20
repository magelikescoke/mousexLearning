import { hot } from 'react-hot-loader/root';

import {
    request,
    Leaf6ResponseParser,
    Leaf6ErrorHandler,
    SEFResponseParser,
    DateSerializer,
    SEFErrorHandler
} from 'dw-mx-request';
import React from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider ,MXConfigProvider } from 'dw-mx';
import { BrowserRouter ,renderRoutes } from 'dw-mx-router';
import 'antd/dist/antd.less';
import 'dw-mx-flex/lib/style/index.css';
import 'dw-mx/lib/Dialog/style/index.css';
import 'dw-mx-extend/lib/style/modal-extend.less';
import 'dw-mx-extend/lib/style/rem-extend.less';
import 'dw-mx-extend/lib/style/screen-resolution-extend.less';

import './index.less';
import zhCN from 'antd/es/locale/zh_CN';
import routes from './config/routes'; // 路由

import CurrentUser from '@/auth/CurrentUser';


// moment
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

// @ts-ignore
request.setBaseUrl(BASE_REQUEST_URL);

// Sef配置
request.setResponseParsers(new SEFResponseParser());
request.setErrorHandlers(new SEFErrorHandler());
request.setRequestFilters(
    {
        doFilter: (request, chain) => {
            request.headers['Access-Token'] = CurrentUser.getAccessToken();
            chain.doFilter(request, chain);
        },
    },
    {
        doFilter: (request) => {
            new DateSerializer('YYYYMMDDHHmmss').serialize(request.data);
        },
    }
);

// Leaf6配置
// request.setResponseParsers(new Leaf6ResponseParser());
// request.setErrorHandlers(new Leaf6ErrorHandler());
// request.setRequestFilters({
//     doFilter: (request, chain) => {
//         request.headers['Access-Token'] = CurrentUser.getAccessToken();
//         chain.doFilter(request, chain);
//     }
// }, {
//     doFilter: (request, chain) => {
//         if (!(request.data instanceof FormData)) {
//             const requestData = _.cloneDeep(request.data);
//             new DateSerializer('YYYYMMDD').serialize(requestData);
//             request.data = requestData;
//         } else {
//             // new DateSerializer('YYYYMMDDHHmmss').serialize(request.data);
//             new DateSerializer('YYYYMMDD').serialize(request.data);
//         }
//     }
// });


sessionStorage.removeItem('tagNaveList');

const data = [];
data.push({ pathname: '/home', search: '', hash: '', name: '首页', routeKey: 'eyJwYXRoIjoiL2hvbWUifQ==' });
sessionStorage.setItem('tagNaveList', JSON.stringify(data));

// root
const App = () => (
    <>
        <ConfigProvider
            locale={zhCN}
            getPopupContainer={(node) => {
                if (node) {
                    return node.parentNode;
                }
                return document.body;
            }}
        >
            <MXConfigProvider
                numberColumnConfig={{
                    isShowNumber: true,
                    numberTitle: 'No.',
                    numberWidth: 40,
                    align: 'center',
                    fixed: 'left'
                }}
            >
                <BrowserRouter basename={BASE_ROUTE_URL}>{renderRoutes(routes)}</BrowserRouter>
            </MXConfigProvider>
        </ConfigProvider>
    </>
);

// hot reload
const HotApp = hot(App);

// render
ReactDOM.render(<HotApp />, document.getElementById('mousex-app'));
