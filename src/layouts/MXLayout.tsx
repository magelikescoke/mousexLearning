import React from 'react';
import RSRCLayout from '@/layouts/RSRCLayout';

interface MXLayoutProps {
    logo: any;
    route: any;
    title: string;
    layoutStyle?: string
}

const MXLayout: React.FunctionComponent<MXLayoutProps> = (props) => {

    const { route, logo, title ,layoutStyle='RSRC'} = props;

    if(layoutStyle == 'RSRC'){
        return (
            <RSRCLayout
                logo={logo}
                route={route}
                title={title}
            />
        )
    }
}

export default MXLayout