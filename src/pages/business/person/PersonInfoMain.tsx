import React, { useRef, useState } from 'react';
import TemplateForm from '@/components/templateComponent/TemplateForm';
import { Form, message, Modal } from 'dw-mx';
import CurrentUser from '@/auth/CurrentUser';
import Config from '@/components/templateComponent/componentConfiguration/index';
import TemplateBasicTable, { PageProps } from '@/components/templateComponent/TemplateBasicTable';
import OptionsButton from '@/components/templateComponent/OptionsButton';
import TemplateModalForm from '@/components/templateComponent/TemplateModalForm';
import { Code } from 'dw-mx-extend';
import codeData from '@/pages/utils/codeData';
import { ExclamationCircleOutlined } from 'dw-mx-icons';
import { request } from 'dw-mx-request';
import func from '@/pages/utils/func';
import common from '@/pages/common/common';

export default function PersonInfoMain() {
    // 存储查询Form
    const [form] = Form.useForm();
    // 存储Table的数据
    const [tableData, setTableData] = useState([]);
    // 挂载子组件ModalForm，用来获取暴露方法
    const formRef = useRef(null);
    // 挂载子组件BasicTable，用来获取所选行数据
    const tableRef = useRef(null);
    // 新增
    const [visible1, setVisible1] = useState(false);
    // 查看
    const [visible2, setVisible2] = useState(false);
    // 修改
    const [visible3, setVisible3] = useState(false);
    // 存储选中行的数据
    const [tableItem, setTableItem] = useState({});

    // 查询Form的Item；配置List
    const formItemList = Config['PersonalInfoConfig']['PersonalInfoQueryForm'].map((value, index) => {
        if (value.name === 'zone') {
            value.cascaderOptions = JSON.parse(CurrentUser.getArea());
        }
        return value;
    });
    // 查询Form的查询方法
    const onSearch = (page?: PageProps) => {
        const requestData = {
            query: { ...form.getFieldsValue() },
            page: page ? page : common.page
        };
        request('/mx/test/search', requestData).then(res => {
            setTableData(res['records']);
            tableRef.current.setPage({
                current: res['current'],
                size: res['size'],
                total: res['total']
            });
        });
    };
    // 查询Form的重置方法
    const onReSetData = () => {
        form.resetFields();
    };
    // BasicTable的列配置
    const columns = Config['PersonalInfoConfig']['PersonalInfoTable'].map((value, index) => {
        if (value.renderKey === 'state') {
            value.render = (text, record, index) => {
                return func.adaptCodeUndefined('dataState', record.state);
            };
        } else if (value.renderKey === 'area') {
            value.render = (text, record, index) => {
                const temp = {
                    value: '',
                    content: '全国',
                    children: JSON.parse(CurrentUser.getArea())
                };
                return func.getContentListByItem(temp, record.zone);
            };
        }
        if (value.dataIndex === 'name') {
            value.render = (text, record, index) => {
                return <a onClick={() => {
                    const area = {
                        value: '',
                        content: '全国',
                        children: JSON.parse(CurrentUser.getArea())
                    };
                    const temp = { ...record, zone: func.getListByItemPlus(area, record.zone) };
                    request('/mx/test/modify', { ...temp }).then(res => {
                        setTableItem(res);
                        setVisible2(true);
                    });
                }}>{text}</a>;
            };
        } else if (value.dataIndex === 'options') {
            value.render = (text, record, index) => {
                const buttonList = [
                    {
                        title: '修改',
                        option: () => {
                            if (record.state === '0') {
                                const area = {
                                    value: '',
                                    content: '全国',
                                    children: JSON.parse(CurrentUser.getArea())
                                };
                                const temp = { ...record, zone: func.getListByItemPlus(area, record.zone) };
                                request('/mx/test/modify', { ...temp }).then(res => {
                                    console.log('Resp====》》》', res);
                                    setTableItem(res);
                                    setVisible3(true);
                                });
                            } else {
                                message.warning('已提交的数据无法修改!');
                            }
                        }
                    },
                    {
                        title: '删除',
                        option: () => {
                            if (record.state === '0') {
                                Modal.confirm({
                                    title: '提示',
                                    icon: <ExclamationCircleOutlined />,
                                    content: <span>确定要删除该落户信息吗？</span>,
                                    okText: '确认',
                                    cancelText: '取消',
                                    onOk() {
                                        // 实际情况下删除是不需要传table数据的，这里为了Mock模拟删除数据效果删掉原table的某项，将table的数据和要删除的数据一起
                                        const requestData = {
                                            tableData: tableData,
                                            deleteItem: record
                                        };
                                        request('/mx/test/deleteItem', requestData).then(res => {
                                            message.success('删除成功!');
                                            // 正规删完走查询，而不是直接返回删完的数据
                                            setTableData(res);
                                        });
                                    },
                                    onCancel() {

                                    }
                                });
                            } else {
                                message.warning('已提交的数据无法删除!');
                            }
                        }
                    }
                ];
                return <OptionsButton buttonList={buttonList} key={'optionsButton' + index} />;
            };
        }
        return value;
    });
    // 填写Form的Item配置List
    const modalFormList = Config['PersonalInfoConfig']['PersonalInfoForm'].map((value, index) => {
        if (value.name === 'zone') {
            value.cascaderOptions = JSON.parse(CurrentUser.getArea());
        }
        return value;
    });

    // 测试Code机制能否使用,正式环境下通过后端获取Code，然后那这段代码删掉
    Code.NAMEDCODE.set({
        idCardType: codeData.creditCardType,
        country: codeData.country,
        politicalStatus: codeData.politicalStatus,
        gender: codeData.sex,
        nationality: codeData.nation,
        dataState: codeData.dataState
    });

    return (
        <>
            <TemplateForm form={form} formItemList={formItemList}
                          onSearch={onSearch} reSetData={onReSetData} />
            <TemplateBasicTable
                data={tableData}
                columns={columns}
                queryDataByPage={(page) => {
                    onSearch(page);
                }}
                getChildValues={() => {
                }}
                rowKey={[]} buttonList={[{
                type: 'primary',
                title: '添加',
                option: () => {
                    setVisible1(true);
                }
            }]} ref={tableRef} />
            {visible1 &&
            <TemplateModalForm
                title={'人员信息'}
                onCancel={() => {
                    setVisible1(false);
                }} buttonList={[
                {
                    type: 'primary',
                    title: '保存',
                    option: async () => {
                        const result = await formRef.current.submit();
                        if (result['flag']) {
                            console.log('SaveResult=======》》》', result['result']);
                            // 正规只传新增数据，此处只为数据展示
                            const requestData = {
                                tableData: tableData,
                                insertItem: {
                                    ...result['result'],
                                    zone: func.getZoneOptionsCode(result['result']['zone'])
                                }
                            };
                            request('/mx/test/insertSave', requestData).then(res => {
                                // 正规走查询，这里仅为数据展示
                                setTableData(res);
                                setVisible1(false);
                                message.success('保存成功!');
                            });
                        } else {
                            message.warning('请保证所有必填项都已经填写完毕!');
                        }
                    }
                },
                {
                    type: 'primary',
                    title: '提交',
                    option: async () => {
                        const result = await formRef.current.submit();
                        if (result['flag']) {
                            console.log('SubmitResult=======》》》', result['result']);
                            // 正规只传提交数据，此处只为数据展示
                            const requestData = {
                                tableData: tableData,
                                insertItem: {
                                    ...result['result'],
                                    zone: func.getZoneOptionsCode(result['result']['zone'])
                                }
                            };
                            request('/mx/test/insertSubmit', requestData).then(res => {
                                // 正规走查询，这里仅为数据展示
                                setTableData(res);
                                setVisible1(false);
                                message.success('提交成功!');
                            });
                        } else {
                            message.warning('请保证所有必填项都已经填写完毕!');
                        }
                    }
                }
            ]} formItemList={modalFormList} ref={formRef} />
            }
            {visible2 &&
            <TemplateModalForm
                title={'人员信息'}
                onCancel={() => {
                    setVisible2(false);
                }}
                initialValues={{ ...tableItem }}
                isReadOnly={true}
                buttonList={[]}
                formItemList={modalFormList} ref={formRef} />
            }
            {visible3 &&
            <TemplateModalForm
                title={'人员信息'}
                onCancel={() => {
                    setVisible3(false);
                }}
                initialValues={{ ...tableItem }}
                buttonList={[
                    {
                        type: 'primary',
                        title: '保存',
                        option: async () => {
                            const result = await formRef.current.submit();
                            if (result['flag']) {
                                console.log('SaveResult=======》》》', result['result']);
                                // 正规只传修改数据，此处只为数据展示
                                const requestData = {
                                    tableData: tableData,
                                    modifyItem: {
                                        ...result['result'],
                                        zone: func.getZoneOptionsCode(result['result']['zone'])
                                    }
                                };
                                request('/mx/test/editSave', requestData).then(res => {
                                    // 正规走查询，这里仅为数据展示
                                    setTableData(res);
                                    setVisible3(false);
                                    message.success('保存成功!');
                                });
                            } else {
                                message.warning('请保证所有必填项都已经填写完毕!');
                            }
                        }
                    },
                    {
                        type: 'primary',
                        title: '提交',
                        option: async () => {
                            const result = await formRef.current.submit();
                            if (result['flag']) {
                                console.log('SubmitResult=======》》》', result['result']);
                                // 正规只传修改数据，此处只为数据展示
                                const requestData = {
                                    tableData: tableData,
                                    modifyItem: {
                                        ...result['result'],
                                        zone: func.getZoneOptionsCode(result['result']['zone'])
                                    }
                                };
                                request('/mx/test/editSubmit', requestData).then(res => {
                                    // 正规走查询，这里仅为数据展示
                                    setTableData(res);
                                    setVisible3(false);
                                    message.success('提交成功!');
                                });
                            } else {
                                message.warning('请保证所有必填项都已经填写完毕!');
                            }
                        }
                    }
                ]} formItemList={modalFormList} ref={formRef} />
            }
        </>
    );
}