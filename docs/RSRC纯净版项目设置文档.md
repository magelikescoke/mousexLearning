<font style='color:red'>注：图片看不清楚的，可以粘贴图片地址浏览器打开</font>

#### 基础语法参考

[React官网](https://react.docschina.org/docs/getting-started.html)

[组件总览 - Ant Design (gitee.io)](https://ant-design.gitee.io/components/overview-cn/)

[MouseX - 基于 React、AntDesign 的前端开发套件 (dareway.cn)](http://dareway.cn:10037/mousex/)

[导论 - JavaScript 教程 - 网道 (wangdoc.com)](https://wangdoc.com/javascript/basic/introduction.html)

[ES6 入门教程 - ECMAScript 6入门 (ruanyifeng.com)](https://es6.ruanyifeng.com/#README)

#### Create-mx-app脚手架创建的rsrc纯净版项目介绍

##### 登录页面设置

> ![image-20210623114808188](https://gitee.com/nevertheless-yousee/study_images_ben/raw/master/img/image-20210623114808188.png)
>
> 登录页面的背景图片可以在该文件夹下更换，将想要替换的图片覆盖为相应位置自己的图片即可，若想自己改名记得要把index.less样式里面的名称同步一下。

##### 全局样式设置

> ![image-20210623131358844](https://gitee.com/nevertheless-yousee/study_images_ben/raw/master/img/image-20210623131358844.png)
>
> 目前全局的样式配置都在这两个文件中，该文件在src文件夹下的index.tsx文件中被引用，如果想全局替换Antd的某些组件样式可以在挂文件中写css（不生效时，可以试着加一下`!important;`）。

##### 浏览器选项卡名称配置

> ![image-20210623131954879](https://gitee.com/nevertheless-yousee/study_images_ben/raw/master/img/image-20210623131954879.png)
>
> ![image-20210623132024482](https://gitee.com/nevertheless-yousee/study_images_ben/raw/master/img/image-20210623132024482.png)
>
> 位于项目根路径下的application.config.js文件中可以通过上图红框中的字段，配置浏览器选项卡名称，另外两个字段也比较重要会在部署中详细介绍。

##### 组件路由映射

> ![image-20210623132518903](https://gitee.com/nevertheless-yousee/study_images_ben/raw/master/img/image-20210623132518903.png)
>
> 纯净版采用后端管理路由的方式，详细的路由信息由后端返回，但是前端要在routemapping.tsx文件里面配置路由映射。
>
> 详情参考[公司MouseX框架路由部分](http://dareway.cn:10037/mousex/docs/routing)

##### 通用组件<font style='color:red'>（以下组件都可以根据自己的实际情况封装和修改，在此只是提供一个例子，可以点进去看一下入参规格直接使用，也可以自己封装一个，本人能力有限无法兼顾各种场景，还请多多包涵。）</font>

> ###### Cricle.tsx
>
> 环状占比图
>
> ![image-20210624113854641](https://gitee.com/nevertheless-yousee/study_images_ben/raw/master/img/image-20210624113854641.png)
>
> ```typescript
> // 组件代码                 
>                 <FlexItem style={{ backgroundColor: '#fff', marginLeft: '0.1rem' }}>
>                     <ColFlex>
>                         <div style={{
>                             height: '0.42rem',
>                             lineHeight: '0.42rem',
>                             paddingLeft: '0.35rem',
>                             borderBottom: '0.01rem solid #e2e2e2',
>                             fontSize: '0.16rem'
>                         }}>
>                             公共机构经营性机构占有比例
>                         </div>
>                         <FlexItem>
>                             <RowFlex>
>                                 <FlexItem>
>                                     <ColFlex>
>                                         <Cricle percent={circle['GOVRATE']} percentColor={'#41a6f3'}
>                                                 strokeColor={'#78C2FB'}
>                                                 text={circle['GOV'] + '个'} cricleName={'公共机构'}/>
>                                     </ColFlex>
>                                 </FlexItem>
>                                 <FlexItem>
>                                     <ColFlex>
>                                         <Cricle percent={circle['COMRATE']} percentColor={'#fb8e78'}
>                                                 strokeColor={'#FB8E78'}
>                                                 text={circle['COMPANY'] + '个'} cricleName={'经营性机构'}/>
>                                     </ColFlex>
>                                 </FlexItem>
>                             </RowFlex>
>                         </FlexItem>
>                     </ColFlex>
>                 </FlexItem>
> ```
>
> ###### BarChart.tsx
>
> 柱状图
>
> ![image-20210624140430893](https://gitee.com/nevertheless-yousee/study_images_ben/raw/master/img/image-20210624140430893.png)
>
> ```typescript
> // 组件代码
> <FlexItem style={{ marginRight: '0.1rem', backgroundColor: '#fff', borderRadius: '5px' }}>
>                         <ColFlex>
>                             <FlexItem>
>                                 <TitleCard title={'大师工作室按带头人年龄段'} contentHeight={''}>
>                                     <BarChart xData={ageNum.map(item => item['age_group'])}
>                                               yData={ageNum.map(item => item['age_num'])} xTitle={'年龄段'}
>                                               yTitle={'数量/人'} tipTitle={'人数'} />
>                                 </TitleCard>
>                             </FlexItem>
>                         </ColFlex>
>                     </FlexItem>
> // 请求后端及数据处理代码
>     // 大师工作室带头人年龄段
>     useEffect(() => {
>         request('/masterStudioHome/getMasterStudioByAge', {}).then(res => {
>             const temp = [...res];
>             const result = temp.map(item => {
>                 return {
>                     age_num: item['age_num'],
>                     age_group: func.adaptCodeUndefined('AGE_GROUP', item['age_group'])
>                 };
>             });
>             setAgeNum(result);
>         });
>     }, []);
> ```
>
> ###### LineChart.tsx
>
> 曲线图
>
> ![image-20210624142645637](https://gitee.com/nevertheless-yousee/study_images_ben/raw/master/img/image-20210624142645637.png)
>
> ```typescript
> // 组件代码                   
> <FlexItem style={{ marginRight: '0.2rem', borderRadius: '5px' }}>
>                         <ColFlex>
>                             <FlexItem flexBasic={'2.8rem'} style={{ marginBottom: '0.1rem', backgroundColor: '#fff' }}>
>                                 <TitleCard title={'近年培训基地数量'} contentHeight={''}>
>                                     <LineChart xData={recentBaseNum.map(item => item['years'])}
>                                                yData={recentBaseNum.map(item => item['basenum'])}
>                                                xTitle={'年龄段'}
>                                                yTitle={'数量/个'} height={'2.2rem'} />
>                                 </TitleCard>
>                             </FlexItem>
>                         </ColFlex>
>                     </FlexItem>
> ```
>
> ###### LinePlus.tsx
>
> 多曲线图
>
> ![image-20210624143055400](https://gitee.com/nevertheless-yousee/study_images_ben/raw/master/img/image-20210624143055400.png)
>
> ```typescript
> // 组件代码               
> <FlexItem style={{ backgroundColor: '#fff', marginRight: '0.1rem' }}>
>                     <ColFlex>
>                         <div style={{
>                             height: '0.42rem',
>                             lineHeight: '0.42rem',
>                             paddingLeft: '0.35rem',
>                             borderBottom: '0.01rem solid #e2e2e2',
>                             fontSize: '0.16rem'
>                         }}>
>                             近年留学落户人数，赴台落户人数统计
>                         </div>
>                         {/*<FlexItem>*/}
>                         {/*    <RowFlex>*/}
>                         {/*        <FlexItem>*/}
>                         {/*            /!*<CardLink />*!/*/}
>                         {/*        </FlexItem>*/}
>                         {/*    </RowFlex>*/}
>                         {/*</FlexItem>*/}
>                         <FlexItem>
>                             <LinePlus xData={settle['title']} yData={settle['data']} yTitle={'人数/人'}
>                                       height={'2.7rem'} />
>                         </FlexItem>
>                     </ColFlex>
>                 </FlexItem>
> // 请求后端和数据处理
>     useEffect(() => {
>         request('/home/projectNumber').then(res => {
>             // 存储X轴信息
>             const tempYear = [];
>             // 存储Y轴信息
>             const tempHighLv = ['高层次'];
>             const tempEnabled = ['创业启动'];
>             const tempOverseas = ['海外赤子'];
>             const tempKunLun = ['昆仑计划'];
>             // 项目信息
>             res.forEach(item => {
>                 tempYear.push(item['nd']);
>                 tempOverseas.push(item['hwcznum']);
>                 tempHighLv.push(item['gccnum']);
>                 tempKunLun.push(item['klnum']);
>                 tempEnabled.push(item['cyqdnum']);
>             });
>             const tempProject = {
>                 title: tempYear,
>                 data: [
>                     tempOverseas,
>                     tempHighLv,
>                     tempKunLun,
>                     tempEnabled
>                 ]
>             };
>             setProject(tempProject);
>         });
>     }, []);
> ```
>
> ###### PieChart.tsx
>
> 饼状图（条目类别在底部）
>
> ![image-20210624143532840](https://gitee.com/nevertheless-yousee/study_images_ben/raw/master/img/image-20210624143532840.png)
>
> ```typescript
> // 组件代码
>                     <FlexItem>
>                         <ColFlex>
>                             <FlexItem style={{ backgroundColor: '#fff', marginLeft: '0.1rem' }}>
>                                 <TitleCard title={'培训基地数量，按性质'} contentHeight={''}>
>                                     <PieChart data={stateNum} height={'3.5rem'} />
>                                 </TitleCard>
>                             </FlexItem>
>                         </ColFlex>
>                     </FlexItem>
> 
> // 根据性质获取培训基地数量
>     useEffect(() => {
>         request('/trainingBaseHome/listTrainingBaseByAab019', {}).then(res => {
>             const temp = [...res];
>             const result = temp.map(item => {
>                 return {
>                     value: item['aab019_num'],
>                     name: func.adaptCodeUndefined('AAB019', item['aab019'])
>                 };
>             });
>             setStateNum(result);
>         });
>     }, []);
> ```
>
> ###### PieChartPlus.tsx
>
> 饼状图（条目类别在右边）
>
> ![image-20210624143959172](https://gitee.com/nevertheless-yousee/study_images_ben/raw/master/img/image-20210624143959172.png)
>
> ```typescript
> // 组件代码
>                     <FlexItem style={{ backgroundColor: '#fff', borderRadius: '5px' }}>
>                         <ColFlex>
>                             <FlexItem>
>                                 <TitleCard title={'各种大师工作室数量'} contentHeight={''}>
>                                     <PieChartPlus height={'3.5rem'} data={workTypeNum} />
>                                 </TitleCard>
>                             </FlexItem>
>                         </ColFlex>
>                     </FlexItem>
> 
> // 根据工种统计工作室数量
>     useEffect(() => {
>         request('/masterStudioHome/getMasterStudioByAca111', {}).then(res => {
>             const temp = [...res];
>             const result = temp.map(item => {
>                 return {
>                     value: item['aca111_num'],
>                     name: func.adaptCodeUndefined('ACA111', item['aca111'])
>                 };
>             });
>             setWorkTypeNum(result);
>         });
>     }, []);
> ```
>
> ###### PieGraph.tsx
>
> 也是饼状图？？？（忘了有啥区别了）
>
> ![image-20210624144305025](https://gitee.com/nevertheless-yousee/study_images_ben/raw/master/img/image-20210624144305025.png)
>
> ```typescript
> // 组件代码 
> <PieGraph title={''} tipTitle={'性质：'} data={tableData.map(item => {
>                 return { name: func.adaptCodeUndefined('AAB019', item.aab019), value: Number(item.aab019_num) };
>             })} />
> ```
>
> ###### AvatarUploadPlus.tsx
>
> 上传头像组件
>
> ![image-20210624145712196](https://gitee.com/nevertheless-yousee/study_images_ben/raw/master/img/image-20210624145712196.png)
>
> ![image-20210624145730438](https://gitee.com/nevertheless-yousee/study_images_ben/raw/master/img/image-20210624145730438.png)
>
> ![image-20210624145748443](https://gitee.com/nevertheless-yousee/study_images_ben/raw/master/img/image-20210624145748443.png)
>
> ![image-20210624145805231](https://gitee.com/nevertheless-yousee/study_images_ben/raw/master/img/image-20210624145805231.png)
>
> ```typescript
> <FlexItem style={{ marginLeft: '2.5rem' }}>
>     {/*<Form.Item name={'imgUrl'} hidden={true}></Form.Item>*/}
>     <div style={{ height: '2.0rem' }}>
>         <AvatarUploadPlus imgNum={1} imgUrl={common.imgBaseUrl + '/file/upload'}
>                           fileID={'agc318'}
>                           form={props.form}
>                           disabled={(props.mode === mode.VIEW || props.mode === mode.CHECK || props.mode === mode.APPROVE)} />
>     </div>
> </FlexItem>
> ```
>
> ###### FormUpload.tsx
>
> 文件上传及上传后下载组件
>
> ![image-20210624145901616](https://gitee.com/nevertheless-yousee/study_images_ben/raw/master/img/image-20210624145901616.png)
>
> ![image-20210624145927282](https://gitee.com/nevertheless-yousee/study_images_ben/raw/master/img/image-20210624145927282.png)
>
> ```typescript
> <Form
>     {...layout.label8Wrapper16}
>     form={form2}
> >
>     <Row gutter={8}>
>         <Col span={8}>
>             <FormUpload form={form2} fileID={'aez040'}
>                         required={true}
>                         popTitle={<p>测试上传文件描述</p>}
>                         hidden={(props.mode === mode.VIEW || props.mode === mode.CHECK || props.mode === mode.APPROVE)}
>                         accept={'ZIP'}
>                         max={10} isChange={change} />
>         </Col>
>     </Row>
> </Form>
> ```
>
> ###### SelectDown.tsx
>
> 带文本缩略、气泡详情及可书写其他选项的多选下拉框
>
> ![image-20210624150642762](https://gitee.com/nevertheless-yousee/study_images_ben/raw/master/img/image-20210624150642762.png)
>
> ```typescript
> <Col span={8} key={i++}>
>     <SelectDown form={props.form} selectName={'aee033'} selectTitle={'行政许可服务范围'} otherKey={'8'}
>                 otherName={'aee034'}
>                 otherTitle={'补充'} disabled={true} options={Code.NAMEDCODE.get('AEE033')}/>
> </Col>
> ```
>
> ###### SelectOne.tsx
>
> 带文本缩略、气泡详情及可书写其他选项的单选下拉框
>
> ![image-20210624150728103](https://gitee.com/nevertheless-yousee/study_images_ben/raw/master/img/image-20210624150728103.png)
>
> ```typescript
> <Col span={8} key={'orgBasicInfoForm' + i++}>
>     <SelectOne form={props.form} selectName={'aeb004'} selectTitle={'机构性质'} otherKey={'6'}
>                rules={[{ required: (props.mode === 'add' || props.mode === 'edit') }]}
>                otherName={'aeb005'}
>                otherTitle={'补充'}
>                disabled={(props.mode === 'view' || props.mode === 'accept' || props.mode === 'check')}
>                options={Code.NAMEDCODE.get('AEB004')}/>
> </Col>
> ```
>
> ###### SwitchPlus.tsx
>
> 开关组件
>
> ![image-20210624150937367](https://gitee.com/nevertheless-yousee/study_images_ben/raw/master/img/image-20210624150937367.png)
>
> ```typescript
> <SwitchPlus enabled={record.enabled === '1'} id={record['userid']} url={'/user/enableUser'} />
> ```
>
> ###### UploadModal.tsx
>
> Excel模板下载、上传解析回读、批量插入组件的一部分
>
> ![image-20210624151525568](https://gitee.com/nevertheless-yousee/study_images_ben/raw/master/img/image-20210624151525568.png)
>
> 父组件（可根据自己实际情况修改，但是该模块需要配合修改后端和模板，详情参考[人力资源市场项目前后端代码](http://10.1.10.120/rsrc/rsbrsrc/rlzysc)机构监管-信用监管情况-示范机构管理代码）
>
> ```typescript
> // 使用UploadModal组件的地方（UploadModal的父组件）
> import React, { useState } from 'react';
> import { Button, Col, message, Modal, Row, Tabs } from 'dw-mx';
> import func from '@/pages/utils/func';
> import { ExclamationCircleOutlined } from 'dw-mx-icons';
> import CurrentUser from '@/auth/CurrentUser';
> import { request } from 'dw-mx-request';
> import common from '@/pages/common/common';
> import { BasicTable } from 'dw-mx-table';
> import UploadModal from '@/components/expand/UploadModal';
> 
> export default function ModelUploadMain(props) {
> 
>     // 切换面板
>     const { TabPane } = Tabs;
>     // 当前激活面板
>     const [activeTab, setActiveTab] = useState('success');
>     // 控制上传组件的是否可见
>     const [visible, setVisible] = useState(false);
>     // 合法数据
>     const [successData, setSuccessData] = useState([]);
>     // 非法数据
>     const [errorData, setErrorData] = useState([]);
> 
>     // 成功数据表头
>     const successColumns = [
>         {
>             align: 'left',
>             title: '行政区划',
>             dataIndex: 'aab301',
>             key: 'aab301',
>             fixed: 'left',
>             render: (text, record) => {
>                 return func.getContentListByItem(JSON.parse(CurrentUser.getAreaCode())[0], record.aab301);
>             }
>         },
>         {
>             align: 'left',
>             title: '示范机构级别',
>             dataIndex: 'aee165',
>             key: 'aee165',
>             render: (text, record) => {
>                 return func.adaptCodeUndefined('AEE165', record.aee165);
>             }
>         },
>         {
>             align: 'left',
>             title: '单位名称',
>             dataIndex: 'aab004',
>             key: 'aab004'
>         },
>         {
>             align: 'left',
>             title: '统一社会信用代码',
>             dataIndex: 'aab998',
>             key: 'aab998'
>         },
>         {
>             align: 'left',
>             title: '政策依据',
>             dataIndex: 'aba007',
>             key: 'aba007'
>         },
>         {
>             align: 'left',
>             title: '列入原因',
>             dataIndex: 'aee166',
>             key: 'aee166'
>         },
>         {
>             align: 'left',
>             title: '列入时间',
>             dataIndex: 'aee167',
>             key: 'aee167',
>             render: (text) => {
>                 return func.showTimeConverter(text);
>             }
>         },
>         {
>             align: 'left',
>             title: '备注',
>             dataIndex: 'aae013',
>             key: 'aae013'
>         }
>     ];
>     // 失败数据表头
>     const errorColumns = [
>         {
>             align: 'left',
>             title: '行政区划',
>             dataIndex: 'aab301',
>             key: 'aab301',
>             fixed: 'left',
>             render: (text, record) => {
>                 return func.getContentListByItem(JSON.parse(CurrentUser.getAreaCode())[0], record.aab301);
>             }
>         },
>         {
>             align: 'left',
>             title: '示范机构级别',
>             dataIndex: 'aee165',
>             key: 'aee165',
>             render: (text, record) => {
>                 return func.adaptCodeUndefined('AEE165', record.aee165);
>             }
>         },
>         {
>             align: 'left',
>             title: '单位名称',
>             dataIndex: 'aab004',
>             key: 'aab004'
>         },
>         {
>             align: 'left',
>             title: '统一社会信用代码',
>             dataIndex: 'aab998',
>             key: 'aab998'
>         },
>         {
>             align: 'left',
>             title: '政策依据',
>             dataIndex: 'aba007',
>             key: 'aba007'
>         },
>         {
>             align: 'left',
>             title: '列入原因',
>             dataIndex: 'aee166',
>             key: 'aee166'
>         },
>         {
>             align: 'left',
>             title: '列入时间',
>             dataIndex: 'aee167',
>             key: 'aee167',
>             render: (text) => {
>                 return func.showTimeConverter(text);
>             }
>         },
>         {
>             align: 'left',
>             title: '备注',
>             dataIndex: 'aae013',
>             key: 'aae013'
>         },
>         {
>             align: 'center',
>             title: '错误信息',
>             dataIndex: 'errorMsg',
>             key: 'errorMsg'
>         }
>     ];
> 
>     // 切换Tabs
>     const changeTabs = (key, event) => {
>         setActiveTab(key);
>     };
> 
>     // 下载模板
>     const onDownload = () => {
>         request.download('/model/load_model_template', {});
>     };
>     // 导入模板
>     const onUpload = () => {
>         setVisible(true);
>     };
>     // 保存数据
>     const onSave = () => {
>         request('/model/batch_Insert_model_info', func.handlerSetData([...successData])).then(res => {
>             setSuccessData([]);
>             message.success('导入数据成功!');
>         });
>     };
>     // 处理后台返回数据
>     const handlerReturnBackData = (e) => {
>         setSuccessData([]);
>         setErrorData([]);
>         setSuccessData(e.success);
>         setErrorData(e.error);
>         if (e.error.length > 0) {
>             setActiveTab('error');
>             message.warn('上传模板数据中存在不符合格式的信息，请检查。');
>         }
>     };
> 
>     // 导出数据
>     const onExport = () => {
>         // 批量插入数据库
>         request.download('/model/export_model_illegal', [...errorData]);
>     };
>     // 关闭按钮提醒
>     const remind = () => {
>         if (successData && successData.length > 0) {
>             Modal.confirm({
>                 title: '提示',
>                 icon: <ExclamationCircleOutlined/>,
>                 content: '确定您是否已提交解析成功页面数据？',
>                 okText: '确认',
>                 cancelText: '取消',
>                 // 点击确认时，输出数据
>                 onOk() {
>                     props.setVisible(false);
>                 },
>                 onCancel() {
> 
>                 }
>             });
>         } else {
>             props.setVisible(false);
>         }
>     };
> 
> 
>     let i = 0;
> 
>     return (
>         <>
>             <Modal
>                 title={<h3>诚信服务示范机构导入</h3>}
>                 visible={true}
>                 maskClosable={false}
>                 width={common.modHeightLv1}
>                 className={'dw-mx-modal'}
>                 style={{
>                     height: common.modHeightLv1
>                 }}
>                 onCancel={() => {
>                     remind();
>                 }}
>                 footer={
>                     <Row justify={'center'} align={'middle'} key={'AnnualReportEdit' + i++}
>                          style={{ padding: '0.12rem 0.08rem' }}>
>                         {/*<Space key={'AnnualReportEdit' + i++}>*/}
>                         <Col span={16}>
>                             <Button style={{ marginRight: 200 }} onClick={() => {
>                                 remind();
>                             }}>关闭</Button>
>                         </Col>
>                         <Col span={8}>
> 
>                             {activeTab === 'success' &&
>                             <div style={{ float: 'right' }}>
>                                 <Button type={'primary'} onClick={onDownload}>下载模板</Button>
>                                 <Button type={'primary'} onClick={onUpload}>导入数据</Button>
>                                 <Button type={'primary'} onClick={onSave}>提交数据</Button>
>                             </div>
>                             }
>                             {activeTab === 'error' &&
>                             <Button type={'primary'} onClick={onExport}>导出数据</Button>
>                             }
>                         </Col>
>                         {/*</Space>*/}
>                     </Row>
>                 }
>             >
>                 <Tabs type='card' size={'small'} activeKey={activeTab} onTabClick={changeTabs}>
>                     <TabPane tab={'解析成功数据'} key={'success'}>
>                         <BasicTable
>                             rowKey={(record) => {
>                                 return func.randomRangeStringId(8);
>                             }}
>                             columns={successColumns}
>                             dataSource={successData}
>                             pagination={{
>                                 showSizeChanger: true,
>                                 showQuickJumper: true,
>                                 showTotal: func.showTotal
>                             }}
>                             tableNumber={{ isShow: true, title: 'No.', width: 40, align: 'center' }}
>                         />
>                     </TabPane>
>                     <TabPane tab={'解析失败数据'} key={'error'} forceRender>
>                         <BasicTable
>                             rowKey={(record) => {
>                                 return func.randomRangeStringId(8);
>                             }}
>                             columns={errorColumns}
>                             dataSource={errorData}
>                             pagination={{
>                                 showSizeChanger: true,
>                                 showQuickJumper: true,
>                                 showTotal: func.showTotal
>                             }}
>                             tableNumber={{ isShow: true, title: 'No.', width: 40, align: 'center' }}
>                         />
>                     </TabPane>
>                 </Tabs>
>             </Modal>
>             {visible &&
>             <UploadModal closeModal={setVisible} targetUrl={'/model/batchUpload_model_info'}
>                          progressUrl={'/model/getModel_upload_info'}
>                          returnData={(e) => {
>                              console.log(e, 'return data');
>                              handlerReturnBackData(e);
>                          }}/>
>             }
>         </>
>     );
> }
> ```
>
> 父组件效果图
>
> ![image-20210624151419821](https://gitee.com/nevertheless-yousee/study_images_ben/raw/master/img/image-20210624151419821.png)

##### 模板文件

> ![image-20210624165858169](https://gitee.com/nevertheless-yousee/study_images_ben/raw/master/img/image-20210624165858169.png)
>
> ###### <font style='color:red'>componentConfiguration文件夹下的index.tsx：</font>Form的内容（组件，例如：Input、Select等）配置（包括查询Form）、Table的数据列配置，详情参考index.tsx里面的例子，参数参考数据类型接口注解
>
> ###### <font style='color:red'>TemplateBasicTable.tsx：</font>表格模板文件，使用方式参考business文件夹下的PersonInfoMain.tsx
>
> ###### <font style='color:red'>TemplateForm.tsx：</font>表单模板文件，使用方式参考business文件夹下的PersonInfoMain.tsx
>
> ###### <font style='color:red'>TemplateModalForm.tsx：</font>弹出表单模板文件，使用方式参考business文件夹下的PersonInfoMain.tsx
>
> **模板文件使用思路，在index.tsx文件下配置表单组件内容属性List、表格表头属性List，一些特殊需要渲染的列可以打个标记**（利用renderKey属性来做特定标记，我觉得这个标记如果用的比较固定可以根据自己项目常用的标记定义个枚举或啥的，走固定渲染方式；至于不常见的个别特殊渲染，我感觉直接用dateIndex的指标名来查找也无可厚非）**，然后在父组件中找到这个标记书写渲染逻辑。**（为什么要打标记不直接在配置文件中写渲染呢？其实如果你的渲染中不夹带传值，例如：修改state或其他的数据处理，是可以直接写在配置文件中的，例如：你只是想处理下时间的是显示格式或者字体换个颜色等UI方面操作，但是如果涉及到数据共享，无法跨文件直接操作，当然我也咨询过前端框架采用Redux的方式实现状态数据工共享，但是框架给出的建议是Redux太大没必要）
>
> 模板组件只是基于我们这边项目的使用情况抽离的，后面可以根据自己项目的实际情况抽离自己觉得常用的模板，众人拾柴火焰高。
>
> <font style='color:red'>注：TemplateForm模板的实现方案，目前并不是最优解，目前采用的是内嵌在代码里的判断渲染，这种方式必定要消耗一定的内存去走判断逻辑，如果页面内容多的话，实际渲染效率应该是不如原生代码直接写Form的，等价交换嘛，时间换空间，不同事物罢了。如果你的页面有很多特殊需求的组件，我建议你写原生的Form，可以参考Ant Design的Form写法，官网复制Ant Design的代码来修改即可，他们放出这种框架的目的就是快速开发，所以熟悉语法之后并不会花费太多时间，也可以点进模板中看一下你需要的那部分是怎么写的，之后你可以直接在Form里面写。我们公司的前端框架也在开发一款拖拽式的代码生成方式，在我看来这是最佳节省开发速度的方案，因为拖完后生成的代码是原生的，不会掺杂判断逻辑，势必不会影响渲染效率，不过在我看来也是“等价交换”，因人而异。</font>

##### 通用函数

> ![image-20210623163201468](https://gitee.com/nevertheless-yousee/study_images_ben/raw/master/img/image-20210623163201468.png)
>
> utils文件夹下面放置了一些，工具函数，可以根据自己的需要修改和添加。
>
> - **codeData.tsx**里面是一些模拟后端返回的Code值的数据（一般用于下拉菜单），可以配合[MouseX框架的Code机制](http://dareway.cn:10037/mousex/docs/form#code-%E6%9C%BA%E5%88%B6)一起使用。
> - **func.tsx**里面是一些通用数据处理函数，可以在里面编写一些通用的数据处理逻辑，有些现成的也可以直接使用。（比如：加载根节点到指定节点的路径生成数组来初始化级联下拉选框的函数）
> - **layout.tsx**里面是一些布局的lableCol和wrapperCol的分割比例定义，可用于Form的标题和内容显示比例的整体分割，也可以用于Form.Item的标题和内容比例分割，Form.Item也支持更加具体的显示分割配置，具体可参考Ant Design官网Form.Item

##### 通用配置

> ![image-20210624091757312](https://gitee.com/nevertheless-yousee/study_images_ben/raw/master/img/image-20210624091757312.png)
>
> common文件夹下打算放一下通用的配置，觉得不合适的地方可以自己修改。
>
> - **common.tsx**文件下放的是一些全局的静态常量配置（大部分是关于UI布局大小的，也有些例如：获取图片的前置路径、全局提示语字符串）。
> - **dataStruct.tsx**该文件本来打算放一些全局的数据类型接口定义，但是后面没有具体使用，组件的入参类型也直接声明到组件内部了。
> - **mode.tsx**此文件内是为组件复用定义了一些打开组件的场景（例如：新增、修改、查看、审核等），可以根据自己组件的写法决定要不要引用该文件，也可以酌情自己添加类型。（初始目的是怕直接写字符串会因为手误打错字符串导致打卡页面错误）
> - **state.tsx**里面存储一些和后台的业务环节状态静态常量相匹配的全局常量，用来判断业务环节，可自行决定是否启用和删改。

##### Mock模拟后台

> ![image-20210624102014680](https://gitee.com/nevertheless-yousee/study_images_ben/raw/master/img/image-20210624102014680.png)
>
> mock文件夹下的js文件可以在开发模式下用来模拟后台的响应，可以参考里面写法直接在以上两个的任意一个文件里面配置请求路径和返回值。也可以自己再创一个js文件写自己的请求路径和返回值，但是自己创建的时候要注意不要漏掉以下部分
>
> ```javascript
> const LEAF6ResponseWrapper = require('dw-mx-request-mocker/lib/LEAF6ResponseWrapper');
> 
> module.exports = LEAF6ResponseWrapper({
> 	// 请求和返回值编写......
> });
> ```
>
> **开发模式下Mock模拟后台的关闭**
>
> > ![image-20210624103116107](https://gitee.com/nevertheless-yousee/study_images_ben/raw/master/img/image-20210624103116107.png)
> >
> > 将dev.webpack.config.js文件下红框内的代码注释掉即可。
>
> Mock的一些语法和函数可以参考，[Mockjs官网](http://mockjs.com/)。

##### 部署发包配置

> ![image-20210624103253938](https://gitee.com/nevertheless-yousee/study_images_ben/raw/master/img/image-20210624103253938.png)
>
> **Tomcat下部署**
>
> > - 开发模式
> >
> >   ```javascript
> >   // 开发模式下需要保证这两个配置如下，第一个也可以是空字符串，否则开发模式前端项目启动后无法访问
> >   module.exports.BASE_REQUEST_URL = '/';
> >   module.exports.BASE_ROUTE_URL = '/';
> >   ```
> >
> > - 部署模式
> >
> >   ```javascript
> >   // 拿lxry举个例子
> >   // 访问后端的路径，注意跨域问题，需要用Nginx代理一下18080端口的/lxry/到后端项目真正端口的/lxry/
> >   module.exports.BASE_REQUEST_URL = 'http://dareway.cn:18080/lxry/';
> >   // 前端项目根路径下，终端运行npm run build，完成后dist文件夹就是要放到tomcat的webapps下的项目文件夹，但是要注意给dist改名
> >   // 前端打包后dist文件夹需要改成的名字
> >   module.exports.BASE_ROUTE_URL = '/lxry_test/';
> >   ```
>
> **Nginx下部署**
>
> Nginx部署我这边没有具体部署过，按照我做过的Vue项目的部署方式，推测大概是把dist文件夹内容放到nginx的html文件下，配置nginx前端访问代理，然后配置转发后端代理。
>
> 下面是同事给的Nginx部署配置，以`gjzy项目为例`详情可咨询**阚树伟**。
>
> ###### 一、前端打包
>
> 1. 在`application.config.js`文件中对基础请求路径（`BASE_REQUEST_URL`)与基础路由路径（`BASE_ROUTE_URL`）进行配置。
>
>    * `BASE_REQUEST_URL`：基础请求路径，后端请求路径的通用前缀；
>    * `BASE_ROUTE_URL`：基础路由路径，与打包后的前端包文件名相同；
>
>    ```tsx
>    module.exports.BASE_REQUEST_URL = '/gjzy-backend/';
>    module.exports.BASE_ROUTE_URL = '/gjzy/';
>    ```
>
> 
>
> 2. 在命令行（`Terminal`）中执行下面命令进行打包：
>
>    ```json
>    npm run build
>    ```
>
> 
>
> 3. 在前端项目根目录下找到打好的前端包`dist`文件夹，并更改文件夹名与`BASE_ROUTE_URL`相同，如`gjzy`。
>
>    ###### 二、Nginx配置
>
>    > Nginx文件目录结构：
>    >
>    > * nginx.conf
>    > * conf.d
>    >   * default.conf
>    > * html
>    >   * index.html
>    >   * 50x.html
>    >   * gjzy   //前端包
>
>    1. 将更名的前端包文件夹放在`html`文件夹下，记住存放位置；
>    
>    2. nginx.conf配置
>    
>       完善nginx的基础配置；
>    
>       最后，通过`include`访问`conf.d`下的所有配置文件，简化nginx.conf的复杂度，这里采用的是绝对路径的写法；
>    
>       > `conf.d`下的所有配置文件视为写在`http`节点下。
>    
>       ```nginx
>       user  nginx;
>       worker_processes  1;
>                   
>       error_log  /var/log/nginx/error.log warn;
>       pid        /var/run/nginx.pid;
>       
>       
>       events {
>           worker_connections  1024;
>       }
>       
>       
>       http {
>           include       /etc/nginx/mime.types;
>           default_type  application/octet-stream;
>               
>           log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
>                             '$status $body_bytes_sent "$http_referer" '
>                             '"$http_user_agent" "$http_x_forwarded_for"';
>               
>           access_log  /var/log/nginx/access.log  main;
>               
>           sendfile        on;
>           #tcp_nopush     on;
>               
>           keepalive_timeout  65;
>               
>           #gzip  on;
>               
>           include /etc/nginx/conf.d/*.conf; 	#访问conf.d下的所有配置文件
>       }
>               
>       ```
>    
>    3. default.conf配置
>    
>       （1）添加`server`节点，首先配置监听端口和服务名；
>    
>       ```nginx
>       server {
>           listen       9090;		#配置监听端口
>           server_name  localhost;		#配置服务名
>       }
>       ```
>    
>       （2）在`server`节点下，新建`location`节点，匹配到`/gjzy/`路径。使用`alias`路径替换`location`路径，即将`/gjzy/`替换为项目存放路径，实现对前端页面的访问；在此配置下，可以通过IP加端口号加`/gjzy/`实现对前端页面的访问，如`http://10.1.80.99:9090/gjzy/`。
>    
>       > alias后面必须要用`/`结束，否则会找不到文件。
>    
>       添加`try_files $uri $uri/ /gjzy/index.html`命令解决React单页应用刷新404的问题。
>    
>       ```nginx
>       server {
>           listen       9090;		#配置监听端口
>           server_name  localhost;		#配置服务名
>       	
>       
>           location /gjzy/ {
>                alias /etc/nginx/html/gjzy/;   #项目存放路径
>                index index.html;		#配置首页文件的名称
>                try_files $uri $uri/ /gjzy/index.html;   #内部项目跳转路径
>               
>           }
>               
>       }
>       ```
>            
>       ​	（3）在`server`节点同级位置，添加upstream节点，可以配置代理多台服务器。
>            
>       ```nginx
>       upstream test {
>             ip_hash;
>             server 10.1.80.98:8001;
>             server 10.1.80.98:8002;
>             server 10.1.80.98:8003;
>             server 10.1.80.99:8001;
>             server 10.1.80.99:8002;
>             server 10.1.80.99:8003;
>       }
>               
>       server { ... }
>       ```
>            
>       ​	这里采用的是`ip_hash`分配策略，每个请求按访问 IP 的 hash 结果分配，这样每个访客固定访问一个后端服务器，可以解决 session 的问题。
>            
>       （4）在`server`节点下，新建`location`节点，匹配到`/gjzy-backend/`路径。在该`location`节点中的`proxy_pass`配置为：`http:// + upstream名称`，即`proxy_pass http://test`。并添加其他配置后实现对后端请求的代理。
>            
>       ```nginx
>       upstream test {
>             ip_hash;
>             server 10.1.80.98:8001;
>             server 10.1.80.98:8002;
>             server 10.1.80.98:8003;
>             server 10.1.80.99:8001;
>             server 10.1.80.99:8002;
>             server 10.1.80.99:8003;
>       }
>               
>       server {
>           listen       9090;		#配置监听端口
>           server_name  localhost;		#配置服务名
>       	        
>       	location /gjzy-backend/ {
>               proxy_pass http://test;		#反向代理的地址，http:// + upstream名称
>               proxy_redirect off;		#是否开启重定向
>               proxy_http_version 1.1;
>               proxy_set_header Upgrade $http_upgrade;
>               proxy_set_header Host $host:$server_port;
>               proxy_set_header X-Real-IP $remote_addr;
>               proxy_set_header REMOTE-HOST $remote_addr;
>               proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
>               proxy_set_header X-Forwarded-Proto $scheme;
>           }
>       	
>       
>           location /gjzy/ {
>                alias /etc/nginx/html/gjzy/;   #项目存放路径
>                index index.html;		#配置首页文件的名称
>                try_files $uri $uri/ /gjzy/index.html;   #内部项目跳转路径
>               
>           }
>               
>       }
>       ```
>            
>         （5）在`server`节点下，配置`50x`错误页面。
>            
>       ```nginx
>       upstream test {
>             ip_hash;
>             server 10.1.80.98:8001;
>             server 10.1.80.98:8002;
>             server 10.1.80.98:8003;
>             server 10.1.80.99:8001;
>             server 10.1.80.99:8002;
>             server 10.1.80.99:8003;
>       }
>               
>       server {
>           listen       9090;		#配置监听端口
>           server_name  localhost;		#配置服务名
>       	        
>       	location /gjzy-backend/ {
>               proxy_pass http://test;		#反向代理的地址
>               proxy_redirect off;		#是否开启重定向
>               proxy_http_version 1.1;
>               proxy_set_header Upgrade $http_upgrade;
>               proxy_set_header Host $host:$server_port;
>               proxy_set_header X-Real-IP $remote_addr;
>               proxy_set_header REMOTE-HOST $remote_addr;
>               proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
>               proxy_set_header X-Forwarded-Proto $scheme;
>           }
>       	
>       
>           location /gjzy/ {
>                alias /etc/nginx/html/gjzy/;   #项目存放路径
>                index index.html;		#配置首页文件的名称
>                try_files $uri $uri/ /gjzy/index.html;   #内部项目跳转路径
>               
>           }
>       	
>       	
>           error_page   500 502 503 504  /50x.html; 	#配置50x错误页面
>           location = /50x.html {
>               root   html;
>           }
>               
>       }
>       ```

