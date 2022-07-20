import React, { useEffect, useState } from 'react';
import { Avatar, Dropdown, Menu } from 'dw-mx';
import { UserOutlined, LockOutlined, LogoutOutlined } from 'dw-mx-icons';
import { useHistory } from 'dw-mx-router';
import CurrentUser from '../auth/CurrentUser';

export default function AvatarDropdown() {
    const [useName, setUserName] = useState('');

    useEffect(() => {
        setUserName(useName => CurrentUser.getUserName());
    }, []);

    const history = useHistory();

    const logout = () =>{
        CurrentUser.logOut();
        history.replace('/login');
        sessionStorage.removeItem('routeList');
        sessionStorage.removeItem('tagNaveList');
    };

    const menu = (
        <Menu
            className={'app-top-user-menu'}
            onClick={() => {
                // this.changeUserStyle(false);
            }}
        >
            <Menu.Divider />
            <Menu.Item
                key={'logout'}
                onClick={() => {
                    logout();
                }}
            >
                <LogoutOutlined
                    style={{
                        fontSize: 10
                    }}
                />
                <span>退出</span>
            </Menu.Item>
        </Menu>
    );

    return (
        <Dropdown overlay={menu}>
            <span style={{ marginRight: 16 }}>
                <Avatar icon={<UserOutlined />} style={{ marginRight: 8, backgroundColor: '#fff', color: '#005EA4' }} />
                <span className={'app-top-userInfo'}>{useName}</span>
            </span>
        </Dropdown>
    );
}
