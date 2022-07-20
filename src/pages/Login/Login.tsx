import React from 'react';
import { Form, Input, Button, Checkbox } from 'dw-mx';
import { UserOutlined, LockOutlined } from 'dw-mx-icons';
import { request } from 'dw-mx-request';
import CurrentUser from '../../auth';

import './style';

import { useHistory } from 'dw-mx-router';
import { Code } from 'dw-mx-extend';

export default function Login() {
    const [form] = Form.useForm();

    const history = useHistory();

    const doLogon = async (values) => {
        const { username, password } = values;

        // 登录
        // const uuid = await request('/sef2/mx/test/doLogin', {
        //     username,
        //     password,
        // });
        // console.log('UUID=======》》》', uuid);
        // CurrentUser.logIn(username, username, '123', '123');
        CurrentUser.logIn(username, password, '123', '123');
        const result = await request('/mock/test/routetest');
        sessionStorage.setItem('routeList',JSON.stringify(result));

        // 填code
        // const codedata = await request('/mx/login/codedata');
        // Code.NAMEDCODE.set(codedata);

        // 跳转
        history.push('/');
    };

    const handleSubmit = (values) => {
        doLogon(values);
    };
    const handleEnter = async (e) => {
        doLogon(form.getFieldsValue());
    };
    const handleForgot = () => {
        alert('TODO——忘记密码');
    };
    const sef2Login = async()=>{
        const token = await request('/sef2/mx/test/doLogin',{
            username:'admin',
            password: '123456'
        })
        alert(token);
        CurrentUser.logIn('admin','admin',token)
    }
    return (
        <div className={'app-logon'}>
            <div className={'app-logon-title'} />
            <div className={'app-logon-beltWrapper'}>
                <div className={'app-logon-formWrapper'}>
                    <Form name="normal_login" className="app-logon-formWrapper-form" initialValues={{ remember: true }} onFinish={handleSubmit}>
                        <Form.Item name="username" rules={[{ required: true, message: '请输入用户名!' }]}>
                            <Input prefix={<UserOutlined />} placeholder="用户名" onPressEnter={handleEnter} />
                        </Form.Item>
                        <Form.Item name="password" rules={[{ required: true, message: '请输入密码!' }]}>
                            <Input prefix={<LockOutlined />} type="password" placeholder="密码" />
                        </Form.Item>
                        <Form.Item>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>记住我</Checkbox>
                            </Form.Item>

                            <a className="login-form-forgot" href="###" onClick={handleForgot}>
                                忘记密码
                            </a>
                        </Form.Item>

                        <Form.Item>
                            <Button block={true} type="primary" htmlType="submit">
                                登录
                            </Button>
                            <Button onClick={sef2Login} type="primary" >
                                test登录
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
}
