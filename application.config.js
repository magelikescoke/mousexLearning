const path = require('path');
// ==================================
// DEFAULT CONFIG
//
module.exports.BASE_REQUEST_URL = '';
module.exports.BASE_ROUTE_URL = '/';
module.exports.DEFAULT_TITLE = 'MouseX-Template';
module.exports.DEFAULT_LOGO = path.resolve(process.cwd(), './src/assets/logo.png');

// ==================================
// STYLE CONFIG
//
module.exports.STYLE_CONFIG = {
    '@font-size-base':'14px',
    '@dw-mx-screen-resolution-min-width': '1366px',
    '@table-header-color':'#5e86b8',
    '@table-header-bg':'#fff',
    '@table-row-hover-bg':'#77b6ed',
    '@table-selected-row-bg':'#77b6ed',
    '@modal-header-bg':'#f7ffff',
    '@menu-item-active-bg':'#629E1E',
    '@tabs-ink-bar-color':'#005EA4',
    '@tabs-active-color':'#0750a3',
    '@table-padding-vertical':'5px',
    '@table-padding-horizontal':'8px',

    '@success-color':'#52c41a',
    '@warning-color':'#faad14',
    '@error-color':'#f5222d',
    '@btn-disable-color': '#d9d9d9',
    '@btn-disable-bg': '#f5f5f5',
    '@btn-disable-border': '#d9d9d9',

    '@btn-danger-bg': '@error-color',
    '@btn-danger-border': '@error-color',

    '@primary-color':'#005EA4',
    '@body-background':'#EBEEF5',
    '@component-background': '#fff',

    // Disabled states
    // Default grey background color
    '@background-color-base': 'hsv(0, 0, 96%)',
    // '@disabled-color': 'fade(#999, 25%)',
    '@disabled-color': '#666666',
    '@disabled-bg': '@background-color-base',
    '@disabled-color-dark': 'fade(#fff, 35%)'
};
