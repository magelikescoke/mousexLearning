const { LEAF6ResponseWrapper } = require('dw-mx-request-mocker');

module.exports = LEAF6ResponseWrapper({
    '/mx/login/doLogin': () => {
        return {
            token: 'login-uuid-mx-mock-' + Date.now(),
            zoneOptions: [
                {
                    value: 'zhj',
                    content: '浙江',
                    children: [
                        {
                            value: 'hzh',
                            content: '杭州',
                            children: [
                                {
                                    value: 'xihu',
                                    content: '西湖'
                                }
                            ]
                        }
                    ]
                },
                {
                    value: 'bj',
                    content: '北京',
                    children: [
                        {
                            value: 'dch',
                            content: '东城'
                        },
                        {
                            value: 'chy',
                            content: '朝阳'
                        }
                    ]
                },
                {
                    value: 'js',
                    content: '江苏',
                    children: [
                        {
                            value: 'nj',
                            content: '南京',
                            children: [
                                {
                                    value: 'xw',
                                    content: '玄武'
                                }
                            ]
                        }
                    ]
                },
                {
                    value: '370000',
                    content: '山东',
                    children: [
                        {
                            value: '370100',
                            content: '济南',
                            children: [
                                {
                                    value: '370101',
                                    content: '市辖区'
                                },
                                {
                                    value: '370102',
                                    content: '历下区'
                                }
                            ]
                        },
                        {
                            value: '370200',
                            content: '青岛',
                            children: [
                                {
                                    value: '370201',
                                    content: '市辖区'
                                },
                                {
                                    value: '370202',
                                    content: '市南区'
                                }
                            ]
                        }
                    ]
                }
            ]
        };
    },
    '/mx/login/codedata': {
        gender: [
            {
                value: '1',
                content: '男'
            },
            {
                value: '2',
                content: '女'
            }
        ],
        idCardType: [
            {
                value: '1',
                content: '男'
            },
            {
                value: '2',
                content: '女'
            }
        ]
    },
    '/mx/positionmentSuperiorOrgRecord/queryInfo': (req, res) => {
        const temp = [];
        for (let i = 0; i < 10; i++) {
            temp.push({
                key: Random.string(7, 10),
                dwmc: '单位' + (i + 1),
                hdbzs: (i + 1) * 10,
                hdgws: (i + 1) * 100,
                zgws: (i + 1) * 150,
                glgws: (i + 1) * 50,
                bazt: i % 2,
                zjgws: (i + 1) * 20,
                gqgws: (i + 1) * 30,
                tbsj: ''
            });
        }
        return temp;
    },
    '/mx/test/modify': (req, res) => {
        const name = req.body.name;
        const zone = req.body.zone;
        const birth = req.body.birth;
        return {
            zone: zone,
            idCardType: '1',
            idCode: '370721199811220213',
            area: '1',
            name: name,
            gender: '1',
            nationality: '01',
            birth: birth,
            politicalStatus: '1',
            address: '山东省济南市',
            phone: '15064261873',
            email: '2353165431@qq.com',
            postcode: '262600',
            aab004: '山大地纬',
            companyAddress: '山东省济南市章丘市',
            jobTitle: '软件开发工程师',
            skillLv: '初、中级软件开发工程师',
            college: '山东农业大学',
            profession: '计算机科学与技术',
            education: '本科',
            degree: '工科学士学位'
        };
    },
    '/mx/test/search': (req, res) => {
        const { page } = req.body;
        if (req.body.query.name === 'Charis') {
            return {
                records: [
                    {
                        name: 'Charis',
                        zone: 'xihu',
                        birth: '19971022',
                        phone: '15666081253',
                        aab004: '山大地纬',
                        state: '0'
                    }
                ],
                current: 1,
                size: 10,
                total: 1
            };
        } else if (req.body.query.name === 'Ice') {
            return {
                records: [
                    {
                        name: 'Ice',
                        zone: 'dch',
                        birth: '19980211',
                        phone: '18054801122',
                        aab004: '萨瓦迪卡',
                        state: '0'
                    }
                ],
                current: 1,
                size: 10,
                total: 1
            };
        } else {
            if (page.size === 10) {
                if (page.current === 1) {
                    return {
                        records: [
                            {
                                name: 'Charis',
                                zone: 'xihu',
                                birth: '19971022',
                                phone: '15666081253',
                                aab004: '山大地纬',
                                state: '0'
                            }, {
                                name: 'Ice',
                                zone: 'dch',
                                birth: '19980211',
                                phone: '18054801122',
                                aab004: '萨瓦迪卡',
                                state: '0'
                            },
                            {
                                name: 'ISee',
                                zone: 'xw',
                                birth: '19980211',
                                phone: '18054801122',
                                aab004: '萨瓦迪卡',
                                state: '0'
                            },
                            {
                                name: 'Vans',
                                zone: '370102',
                                birth: '19980211',
                                phone: '18054801122',
                                aab004: '萨瓦迪卡',
                                state: '0'
                            },
                            {
                                name: 'Scream',
                                zone: '370100',
                                birth: '19980211',
                                phone: '18054801122',
                                aab004: '萨瓦迪卡',
                                state: '0'
                            },
                            {
                                name: 'UI',
                                zone: 'nj',
                                birth: '19980211',
                                phone: '18054801122',
                                aab004: '萨瓦迪卡',
                                state: '0'
                            },
                            {
                                name: 'IE',
                                zone: 'chy',
                                birth: '19980211',
                                phone: '18054801122',
                                aab004: '萨瓦迪卡',
                                state: '0'
                            },
                            {
                                name: 'Iic',
                                zone: 'bj',
                                birth: '19980211',
                                phone: '18054801122',
                                aab004: '萨瓦迪卡',
                                state: '0'
                            },
                            {
                                name: 'Leo',
                                zone: 'hzh',
                                birth: '19980211',
                                phone: '18054801122',
                                aab004: '萨瓦迪卡',
                                state: '0'
                            },
                            {
                                name: 'TCL',
                                zone: 'zhj',
                                birth: '19980211',
                                phone: '18054801122',
                                aab004: '萨瓦迪卡',
                                state: '0'
                            }
                        ],
                        current: 1,
                        size: 10,
                        total: 16
                    };
                } else {
                    return {
                        records: [
                            {
                                name: 'Jane',
                                zone: 'js',
                                birth: '19980211',
                                phone: '18054801122',
                                aab004: '萨瓦迪卡',
                                state: '0'
                            },
                            {
                                name: 'Kennerys',
                                zone: '370000',
                                birth: '19980211',
                                phone: '18054801122',
                                aab004: '萨瓦迪卡',
                                state: '0'
                            },
                            {
                                name: 'IF',
                                zone: '370200',
                                birth: '19980211',
                                phone: '18054801122',
                                aab004: '萨瓦迪卡',
                                state: '0'
                            },
                            {
                                name: 'Feel',
                                zone: '370202',
                                birth: '19980211',
                                phone: '18054801122',
                                aab004: '萨瓦迪卡',
                                state: '0'
                            },
                            {
                                name: 'Stand',
                                zone: '370201',
                                birth: '19980211',
                                phone: '18054801122',
                                aab004: '萨瓦迪卡',
                                state: '0'
                            },
                            {
                                name: 'UnStopped',
                                zone: '370101',
                                birth: '19980211',
                                phone: '18054801122',
                                aab004: '萨瓦迪卡',
                                state: '0'
                            }
                        ],
                        current: 2,
                        size: 10,
                        total: 16
                    };
                }
            } else {
                return {
                    records: [
                        {
                            name: 'Charis',
                            zone: 'xihu',
                            birth: '19971022',
                            phone: '15666081253',
                            aab004: '山大地纬',
                            state: '0'
                        }, {
                            name: 'Ice',
                            zone: 'dch',
                            birth: '19980211',
                            phone: '18054801122',
                            aab004: '萨瓦迪卡',
                            state: '0'
                        },
                        {
                            name: 'ISee',
                            zone: 'xw',
                            birth: '19980211',
                            phone: '18054801122',
                            aab004: '萨瓦迪卡',
                            state: '0'
                        },
                        {
                            name: 'Vans',
                            zone: '370102',
                            birth: '19980211',
                            phone: '18054801122',
                            aab004: '萨瓦迪卡',
                            state: '0'
                        },
                        {
                            name: 'Scream',
                            zone: '370100',
                            birth: '19980211',
                            phone: '18054801122',
                            aab004: '萨瓦迪卡',
                            state: '0'
                        },
                        {
                            name: 'UI',
                            zone: 'nj',
                            birth: '19980211',
                            phone: '18054801122',
                            aab004: '萨瓦迪卡',
                            state: '0'
                        },
                        {
                            name: 'IE',
                            zone: 'chy',
                            birth: '19980211',
                            phone: '18054801122',
                            aab004: '萨瓦迪卡',
                            state: '0'
                        },
                        {
                            name: 'Iic',
                            zone: 'bj',
                            birth: '19980211',
                            phone: '18054801122',
                            aab004: '萨瓦迪卡',
                            state: '0'
                        },
                        {
                            name: 'Leo',
                            zone: 'hzh',
                            birth: '19980211',
                            phone: '18054801122',
                            aab004: '萨瓦迪卡',
                            state: '0'
                        },
                        {
                            name: 'TCL',
                            zone: 'zhj',
                            birth: '19980211',
                            phone: '18054801122',
                            aab004: '萨瓦迪卡',
                            state: '0'
                        },
                        {
                            name: 'Jane',
                            zone: 'js',
                            birth: '19980211',
                            phone: '18054801122',
                            aab004: '萨瓦迪卡',
                            state: '0'
                        },
                        {
                            name: 'Kennerys',
                            zone: '370000',
                            birth: '19980211',
                            phone: '18054801122',
                            aab004: '萨瓦迪卡',
                            state: '0'
                        },
                        {
                            name: 'IF',
                            zone: '370200',
                            birth: '19980211',
                            phone: '18054801122',
                            aab004: '萨瓦迪卡',
                            state: '0'
                        },
                        {
                            name: 'Feel',
                            zone: '370202',
                            birth: '19980211',
                            phone: '18054801122',
                            aab004: '萨瓦迪卡',
                            state: '0'
                        },
                        {
                            name: 'Stand',
                            zone: '370201',
                            birth: '19980211',
                            phone: '18054801122',
                            aab004: '萨瓦迪卡',
                            state: '0'
                        },
                        {
                            name: 'UnStopped',
                            zone: '370101',
                            birth: '19980211',
                            phone: '18054801122',
                            aab004: '萨瓦迪卡',
                            state: '0'
                        }
                    ],
                    current: 1,
                    size: page.size,
                    total: 16
                };
            }
        }
    },
    '/mx/test/deleteItem': (req, res) => {
        const tableData = [...req.body.tableData];
        const deleteItem = req.body.deleteItem;
        const result = [];
        tableData.forEach((item) => {
            if (item.name !== deleteItem.name)
                result.push(item);
        });
        return result;
    },
    '/mx/test/insertSave': (req, res) => {
        const tableData = [...req.body.tableData];
        const insertItem = req.body.insertItem;
        return [...tableData, { ...insertItem, state: '0' }];
    },
    '/mx/test/insertSubmit': (req, res) => {
        const tableData = [...req.body.tableData];
        const insertItem = req.body.insertItem;
        return [...tableData, { ...insertItem, state: '1' }];
    },
    '/mx/test/editSave': (req, res) => {
        const tableData = [...req.body.tableData];
        const modifyItem = req.body.modifyItem;
        return tableData.map(item => {
            if (item.name === modifyItem.name) {
                return { ...modifyItem, state: '0' };
            } else {
                return item;
            }
        });
    },
    '/mx/test/editSubmit': (req, res) => {
        const tableData = [...req.body.tableData];
        const modifyItem = req.body.modifyItem;
        return tableData.map(item => {
            if (item.name === modifyItem.name) {
                return { ...modifyItem, state: '1' };
            } else {
                return item;
            }
        });
    }
});
