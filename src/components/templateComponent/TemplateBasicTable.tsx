import React, { useImperativeHandle, useState } from 'react';
import { BasicTable } from 'dw-mx-table';
import { Button, Col, Row, Space } from 'dw-mx';

// Table的Column配置
export interface TableColumnItem {
    // Table列的位置
    align: 'left' | 'center' | 'right'
    // （IE 下无效）列是否固定，可选 true (等效于 left) left right
    fixed?: boolean | 'left' | 'right',
    // 列标题名称
    title: string,
    // 对应后端返回值的哪个属性
    // 列数据在数据项中对应的路径，支持通过数组查询嵌套路径
    dataIndex: string | string[],
    // 	React 需要的 key，如果已经设置了唯一的 dataIndex，可以忽略这个属性
    key?: string,
    // 宽度
    width?: string | number,
    // 渲染函数
    render?: (text, record, index) => any,
    // 列样式类名
    className?: string,
    // 	表头列合并,设置为 0 时，不渲染
    colSpan?: number,
    // 渲染标记，可以在配置文件打个自定义标记，然后在父组件还找到相应标记，做特殊渲染
    renderKey?: string
}

// Table顶部标题button属性
export interface TitleButton {
    // button样式
    type?: 'primary' | 'ghost' | 'dashed' | 'link' | 'text' | 'default'
    // button的触发事件
    option: () => void,
    // button的显示标题
    title: string
}

export interface TemplateBasicTableProps {
    // table主键的指标名
    keyName?: string,
    // table的数据
    data: Array<Record<string, unknown>>
    // table的表头
    columns: Array<TableColumnItem>,
    // 实时获取table的数据的方法
    getChildValues: any,
    // table选中的行的数组
    rowKey: Array<string | number>,
    // table title上的按钮，可由当前组件自定义
    buttonList: Array<TitleButton>,
    // 根据Page查询Table数据的方法
    queryDataByPage?: (page: PageProps) => void,
    // 是否展示行选框
    showRowSelection?: boolean,
    // 选择框的样式
    rowSelectionType?: 'checkbox' | 'radio',
    // table的左标题文字
    tableTitle?: string,
    // 是否前端分页
    isFrontPage?: boolean,
    // 是否行点击触发行选
    isRowClickSelected?: boolean
}

export interface PageProps {
    current: number,
    size: number,
    total: number
}

// export default function TemplateBasicTable(props: TemplateBasicTableProps) {
const TemplateBasicTable = (props: TemplateBasicTableProps, ref) => {
    // 暴露给父组件的方法
    useImperativeHandle(ref, () => ({
        getRowKeys: () => rowKeys,
        getRows: () => rows,
        setPage: (page: PageProps) => {
            setPage({ ...page });
        }
    }));

    // 因为需要在columns中，根据renderKey，在父组件中对配置文件中的columns配置进行处理。所以，传给模板的应该是处理后的columns
    const {
        keyName,
        data,
        columns,
        getChildValues,
        queryDataByPage,
        showRowSelection,
        rowSelectionType,
        rowKey,
        buttonList,
        tableTitle,
        isFrontPage,
        isRowClickSelected
    } = props;

    // 存储所选行的key
    const [rowKeys, setRowKeys] = useState(rowKey);
    // 存储所选行的数据
    const [rows, setRows] = useState([]);
    // 分页
    const [page, setPage] = useState({
        current: 1,
        size: 10,
        total: null
    });

    const pageBackChange = (current, pageSize) => {
        if (queryDataByPage) {
            queryDataByPage({
                current: current,
                size: pageSize,
                total: null
            });
        }
    };
    const rowSelection = {
        selectedRowKeys: rowKeys,
        onChange: (selectedRowKeys, selectedRows) => {
            setRowKeys(selectedRowKeys);
            setRows(selectedRows);
        }
    };

    return (
        <>
            {isFrontPage ?
                (keyName ?
                    <BasicTable
                        rowKey={(record) => {
                            return record.keyName;
                        }}
                        onRow={isRowClickSelected ? rowSelectionType && rowSelectionType === 'radio' ? record => {
                            return {
                                onClick: event => {
                                    setRowKeys([record[keyName]]);
                                    setRows([record]);
                                }
                            };
                        } : record => {
                            return {
                                onClick: event => {
                                    let tempKeys;
                                    let tempRows;
                                    if (rowKeys.indexOf(record[keyName]) > -1) {
                                        tempKeys = rowKeys.filter((current, index, arr) => {
                                            return current !== record[keyName];
                                        });
                                        tempRows = rows.filter((current, index, arr) => {
                                            return current[keyName] !== record[keyName];
                                        });
                                    } else {
                                        tempKeys = [...rowKeys];
                                        tempKeys.push(record[keyName]);
                                        tempRows = [...rows];
                                        tempRows.push(record);
                                    }
                                    setRowKeys(tempKeys);
                                    setRows(tempRows);
                                }
                            };
                        } : record => {
                            return {
                                onClick: event => {

                                }
                            };
                        }}
                        pagination={{
                            showQuickJumper: true,
                            pageSizeOptions: ['10', '20', '50', '100', '200'],
                            showTotal: (total) => `共${total}条`,
                            defaultCurrent: 1,
                            defaultPageSize: 10
                        }}
                        rowSelection={showRowSelection ? {
                            type: rowSelectionType ? rowSelectionType : 'checkbox',
                            ...rowSelection,
                            columnWidth: '38px'
                        } : false}
                        getChildValues={(val) => {
                            getChildValues(val);
                        }}
                        columns={columns}
                        dataSource={data}
                        bordered
                        title={() => (
                            <Row key={'tableTitleRow'}>
                                <Col span={8} key={'tableTitleCol'}>
                        <span style={{
                            lineHeight: '32px',
                            color: '#5e86b8',
                            fontWeight: 'bold',
                            marginLeft: 10
                        }} key={'tableTitleSpan'}>{tableTitle ? tableTitle : ''}</span>
                                </Col>
                                <Col span={16} key={'tableTitleSpan'}>
                                    <Row justify='end' key={'tableTitleButtonRow'}>
                                        <Space key={'basicTableSpace'}>
                                            {/*<Space style={{ paddingRight: '24px' }} key={'basicTableSpace'}>*/}
                                            {
                                                buttonList.map((value, index) => {
                                                    return <Button type={value.type ? value.type : 'default'}
                                                                   key={'indexTitleButton' + index}
                                                                   onClick={value.option}>{value.title}</Button>;
                                                })
                                            }
                                        </Space>
                                    </Row>
                                </Col>
                            </Row>
                        )}
                        tableNumber={{ isShow: true, title: 'No.', width: 60, align: 'center', fixed: 'left' }}
                    />
                    :
                    <BasicTable
                        pagination={{
                            showQuickJumper: true,
                            pageSizeOptions: ['10', '20', '50', '100', '200'],
                            showTotal: (total) => `共${total}条`,
                            defaultCurrent: 1,
                            defaultPageSize: 10
                        }}
                        rowSelection={showRowSelection ? {
                            type: rowSelectionType ? rowSelectionType : 'checkbox',
                            ...rowSelection,
                            columnWidth: '38px'
                        } : false}
                        getChildValues={(val) => {
                            getChildValues(val);
                        }}
                        columns={columns}
                        dataSource={data}
                        bordered
                        title={() => (
                            <Row key={'tableTitleRow'}>
                                <Col span={8} key={'tableTitleCol'}>
                        <span style={{
                            lineHeight: '32px',
                            color: '#5e86b8',
                            fontWeight: 'bold',
                            marginLeft: 10
                        }} key={'tableTitleSpan'}>{tableTitle ? tableTitle : ''}</span>
                                </Col>
                                <Col span={16} key={'tableTitleSpan'}>
                                    <Row justify='end' key={'tableTitleButtonRow'}>
                                        <Space key={'basicTableSpace'}>
                                            {/*<Space style={{ paddingRight: '24px' }} key={'basicTableSpace'}>*/}
                                            {
                                                buttonList.map((value, index) => {
                                                    return <Button type={value.type} key={'indexTitleButton' + index}
                                                                   onClick={value.option}>{value.title}</Button>;
                                                })
                                            }
                                        </Space>
                                    </Row>
                                </Col>
                            </Row>
                        )}
                        tableNumber={{ isShow: true, title: 'No.', width: 60, align: 'center', fixed: 'left' }}
                    />)
                :
                (keyName ?
                    <BasicTable
                        rowKey={(record) => {
                            return record.keyName;
                        }}
                        onRow={isRowClickSelected ? rowSelectionType && rowSelectionType === 'radio' ? record => {
                            return {
                                onClick: event => {
                                    setRowKeys([record[keyName]]);
                                    setRows([record]);
                                }
                            };
                        } : record => {
                            return {
                                onClick: event => {
                                    let tempKeys;
                                    let tempRows;
                                    if (rowKeys.indexOf(record[keyName]) > -1) {
                                        tempKeys = rowKeys.filter((current, index, arr) => {
                                            return current !== record[keyName];
                                        });
                                        tempRows = rows.filter((current, index, arr) => {
                                            return current[keyName] !== record[keyName];
                                        });
                                    } else {
                                        tempKeys = [...rowKeys];
                                        tempKeys.push(record[keyName]);
                                        tempRows = [...rows];
                                        tempRows.push(record);
                                    }
                                    setRowKeys(tempKeys);
                                    setRows(tempRows);
                                }
                            };
                        } : record => {
                            return {
                                onClick: event => {

                                }
                            };
                        }}
                        pagination={{
                            showQuickJumper: true,
                            current: page.current,
                            pageSize: page.size,
                            total: page.total,
                            pageSizeOptions: ['10', '20', '50', '100', '200'],
                            showTotal: (total) => `共${total}条`,
                            defaultCurrent: 1,
                            defaultPageSize: 10,
                            onChange: pageBackChange
                        }}
                        rowSelection={showRowSelection ? {
                            type: rowSelectionType ? rowSelectionType : 'checkbox',
                            ...rowSelection,
                            columnWidth: '38px'
                        } : false}
                        getChildValues={(val) => {
                            getChildValues(val);
                        }}
                        columns={columns}
                        dataSource={data}
                        bordered
                        title={() => (
                            <Row key={'tableTitleRow'}>
                                <Col span={8} key={'tableTitleCol'}>
                        <span style={{
                            lineHeight: '32px',
                            color: '#5e86b8',
                            fontWeight: 'bold',
                            marginLeft: 10
                        }} key={'tableTitleSpan'}>{tableTitle ? tableTitle : ''}</span>
                                </Col>
                                <Col span={16} key={'tableTitleSpan'}>
                                    <Row justify='end' key={'tableTitleButtonRow'}>
                                        <Space key={'basicTableSpace'}>
                                            {/*<Space style={{ paddingRight: '24px' }} key={'basicTableSpace'}>*/}
                                            {
                                                buttonList.map((value, index) => {
                                                    return <Button type={value.type ? value.type : 'default'}
                                                                   key={'indexTitleButton' + index}
                                                                   onClick={value.option}>{value.title}</Button>;
                                                })
                                            }
                                        </Space>
                                    </Row>
                                </Col>
                            </Row>
                        )}
                        tableNumber={{ isShow: true, title: 'No.', width: 60, align: 'center', fixed: 'left' }}
                    />
                    :
                    <BasicTable
                        pagination={{
                            showQuickJumper: true,
                            current: page.current,
                            pageSize: page.size,
                            total: page.total,
                            pageSizeOptions: ['10', '20', '50', '100', '200'],
                            showTotal: (total) => `共${total}条`,
                            defaultCurrent: 1,
                            defaultPageSize: 10,
                            onChange: pageBackChange
                        }}
                        rowSelection={showRowSelection ? {
                            type: rowSelectionType ? rowSelectionType : 'checkbox',
                            ...rowSelection,
                            columnWidth: '38px'
                        } : false}
                        getChildValues={(val) => {
                            getChildValues(val);
                        }}
                        columns={columns}
                        dataSource={data}
                        bordered
                        title={() => (
                            <Row key={'tableTitleRow'}>
                                <Col span={8} key={'tableTitleCol'}>
                        <span style={{
                            lineHeight: '32px',
                            color: '#5e86b8',
                            fontWeight: 'bold',
                            marginLeft: 10
                        }} key={'tableTitleSpan'}>{tableTitle ? tableTitle : ''}</span>
                                </Col>
                                <Col span={16} key={'tableTitleSpan'}>
                                    <Row justify='end' key={'tableTitleButtonRow'}>
                                        <Space key={'basicTableSpace'}>
                                            {/*<Space style={{ paddingRight: '24px' }} key={'basicTableSpace'}>*/}
                                            {
                                                buttonList.map((value, index) => {
                                                    return <Button type={value.type} key={'indexTitleButton' + index}
                                                                   onClick={value.option}>{value.title}</Button>;
                                                })
                                            }
                                        </Space>
                                    </Row>
                                </Col>
                            </Row>
                        )}
                        tableNumber={{ isShow: true, title: 'No.', width: 60, align: 'center', fixed: 'left' }}
                    />)
            }
        </>
    );
};
export default React.forwardRef(TemplateBasicTable);