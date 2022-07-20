import React, { useState, useEffect, useRef } from 'react';
import { Badge, Dropdown } from 'dw-mx';
import { BellOutlined } from 'dw-mx-icons';

import './style/index.less';
import NoticeList from './NoticeList';
import { useHistory } from 'dw-mx-router';

export interface NoticeAreaProps {
    count: number;
    data: {
        noticeid: string;
        noticeTitle: string;
        noticeType: string;
        sendAccountId: string;
        sendAccountName: string;
        receiveTime: string;
        receiveAccountid: string;
        view: string;
    }[];
}

export default function NoticeArea(props) {
    const [noticeArea, setNoticeArea] = useState<NoticeAreaProps>({ count: 0, data: [] });
    const timeHolder = useRef<NodeJS.Timeout>();

    const history = useHistory();

    useEffect(() => {
        timeHolder.current = setInterval(getNoticeAreaCount, 3000);
        return () => {
            clearTimeout(timeHolder.current);
        };
    }, []);

    const getNoticeAreaCount = () => {
    };

    const itemClick = (item) => {
    };

    const overlay = (
        <NoticeList
            data={noticeArea.data}
            onClick={itemClick}
            onViewMore={() => {
                alert('查看具体通知');
            }}
        />
    );

    return (
        <Dropdown overlay={overlay}>
            <Badge className={'notice-area'} count={noticeArea.count} style={{ boxShadow: 'none' }}>
                <BellOutlined style={{ color: '#fff' }}/>
            </Badge>
        </Dropdown>
    );
}
