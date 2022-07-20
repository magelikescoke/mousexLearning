import React from 'react';
import { Tree } from 'dw-mx';
import type { DataNode, TreeProps } from 'antd/lib/tree';
export default function TreeTest(){

    const treeData: DataNode[] = [
        {
            title: '山东省',
            key: '0',
            children: [
                {
                    title: '济南市',
                    key: '1',
                    children: [
                        {
                            title: '章丘区',
                            key: '2',

                        },{
                            title: 'xx区',
                            key: '3',
                        },

                    ],
                },
                {
                    title: '烟台市',
                    key: '4',
                    disabled: true,
                    children: [{ title: '芝罘区', key: '5',disableCheckbox: true, }],
                },
            ],
        },
    ];

    const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
    };

    const onCheck: TreeProps['onCheck'] = (checkedKeys, info) => {
        console.log('onCheck', checkedKeys, info);
    };


    return (
        <Tree
            checkable
            defaultExpandedKeys={['0','1', '4']}
            defaultCheckedKeys={['0', '1','2']}
            onSelect={onSelect}
            onCheck={onCheck}
            treeData={treeData}
        />
    )
}