import React from 'react';
import NoticeArea from './noticearea';
import AvatarDropdown from './AvatarDropdown';

export default function GlobalHeader() {
    return (
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <NoticeArea/>
            <AvatarDropdown />
        </div>
    );
}
