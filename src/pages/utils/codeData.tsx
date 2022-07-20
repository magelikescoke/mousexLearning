const nation = [
    {
        value: '01',
        content: '汉族'
    },
    {
        value: '02',
        content: '蒙古族'
    },
    {
        value: '03',
        content: '回族'
    },
    {
        value: '04',
        content: '藏族'
    },
    {
        value: '05',
        content: '维吾尔族'
    },
    {
        value: '06',
        content: '苗族'
    },
    {
        value: '07',
        content: '彝族'
    },
    {
        value: '08',
        content: '壮族'
    },
    {
        value: '09',
        content: '布依族'
    },
    {
        value: '10',
        content: '朝鲜族'
    },
    {
        value: '11',
        content: '满族'
    },
    {
        value: '12',
        content: '侗族'
    },
    {
        value: '13',
        content: '瑶族'
    },
    {
        value: '14',
        content: '白族'
    },
    {
        value: '15',
        content: '土家族'
    },
    {
        value: '16',
        content: '哈尼族'
    },
    {
        value: '17',
        content: '哈萨克族'
    },
    {
        value: '18',
        content: '傣族'
    },
    {
        value: '19',
        content: '黎族'
    },
    {
        value: '20',
        content: '傈僳族'
    },
    {
        value: '21',
        content: '佤族'
    },
    {
        value: '22',
        content: '畲族'
    },
    {
        value: '23',
        content: '高山族'
    },
    {
        value: '24',
        content: '拉祜族'
    },
    {
        value: '25',
        content: '水族'
    },
    {
        value: '26',
        content: '东乡族'
    },
    {
        value: '27',
        content: '纳西族'
    },
    {
        value: '28',
        content: '景颇族'
    },
    {
        value: '29',
        content: '柯尔克孜族'
    },
    {
        value: '30',
        content: '土族'
    },
    {
        value: '31',
        content: '达斡尔族'
    },
    {
        value: '32',
        content: '仫佬族'
    },
    {
        value: '33',
        content: '羌族'
    },
    {
        value: '34',
        content: '布朗族'
    },
    {
        value: '35',
        content: '撒拉族'
    },
    {
        value: '36',
        content: '毛难族'
    },
    {
        value: '37',
        content: '仡佬族'
    },
    {
        value: '38',
        content: '锡伯族'
    },
    {
        value: '39',
        content: '阿昌族'
    },
    {
        value: '40',
        content: '普米族'
    },
    {
        value: '41',
        content: '塔吉克族'
    },
    {
        value: '42',
        content: '怒族'
    },
    {
        value: '43',
        content: '乌孜别克族'
    },
    {
        value: '44',
        content: '俄罗斯族'
    },
    {
        value: '45',
        content: '鄂温克族'
    },
    {
        value: '46',
        content: '崩龙族'
    },
    {
        value: '47',
        content: '保安族'
    },
    {
        value: '48',
        content: '裕固族'
    },
    {
        value: '49',
        content: '京族'
    },
    {
        value: '50',
        content: '塔塔尔族'
    },
    {
        value: '51',
        content: '独龙族'
    },
    {
        value: '52',
        content: '鄂伦春族'
    },
    {
        value: '53',
        content: '赫哲族'
    },
    {
        value: '54',
        content: '门巴族'
    },
    {
        value: '55',
        content: '珞巴族'
    },
    {
        value: '56',
        content: '基诺族'
    }
];
const education = [
    {
        value: '01',
        content: '大专'
    },
    {
        value: '02',
        content: '本科'
    },
    {
        value: '03',
        content: '硕士'
    },
    {
        value: '04',
        content: '博士'
    },
    {
        value: '05',
        content: '博士后'
    }
];
const sex = [
    {
        value: '1',
        content: '男'
    },
    {
        value: '2',
        content: '女'
    },
    {
        value: '3',
        content: '未知性别'
    }
];
const maritalStatus = [
    {
        value: '01',
        content: '未婚'
    },
    {
        value: '02',
        content: '已婚'
    },
    {
        value: '03',
        content: '离婚'
    }
];
const bloodType = [
    {
        value: '01',
        content: 'A型'
    },
    {
        value: '02',
        content: 'B型'
    },
    {
        value: '03',
        content: 'O型'
    },
    {
        value: '04',
        content: 'AB型'
    }
];
const companyData = [
    {
        value: '010000',
        content: '人社部',
        children: [
            {
                value: '013700',
                content: '山东省人社厅',
                children: [
                    {
                        value: '013701',
                        content: '济南市人社局'
                    },
                    {
                        value: '013702',
                        content: '青岛市人社局'
                    }
                ]
            },
            {
                value: '013200',
                content: '江苏省人社厅',
                children: [
                    {
                        value: '013213',
                        content: '宿迁市人社局'
                    }
                ]
            }
        ]
    }
];
const zoneOptions = [
    {
        value: 'zhejiang',
        content: '浙江',
        children: [
            {
                value: 'hangzhou',
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
        value: 'beijing',
        content: '北京',
        children: [
            {
                value: 'dongcheng',
                content: '东城'
            },
            {
                value: 'chaoyang',
                content: '朝阳'
            }
        ]
    },
    {
        value: 'jiangsu',
        content: '江苏',
        children: [
            {
                value: 'nanjing',
                content: '南京',
                children: [
                    {
                        value: 'xuanwu',
                        content: '玄武'
                    }
                ]
            }
        ]
    },
    {
        value: 'shandong',
        content: '山东',
        children: [
            {
                value: 'jinan',
                content: '济南',
                children: [
                    {
                        value: 'licheng',
                        content: '历城'
                    }
                ]
            }
        ]
    }];
const orgType = [
    { value: '1', content: '民营' },
    { value: '2', content: '国有' },
    { value: '3', content: '事业机构' },
    { value: '4', content: '外商投资' },
    { value: '5', content: '港澳台资' },
    { value: '6', content: '其他__' }
];
const party = [
    { value: '1', content: '中国共产党' },
    { value: '2', content: '中国国民党革命委员会' },
    { value: '3', content: '中国民主同盟' },
    { value: '4', content: '中国民主建国会' },
    { value: '5', content: '中国民主促进会' },
    { value: '6', content: '中国农工民主党' },
    { value: '7', content: '中国致公党' },
    { value: '8', content: '九三学社' },
    { value: '9', content: '台湾民主自治同盟' },
    { value: '10', content: '无党派人士' },
    { value: '11', content: '群众' }
];
const familyRelationships = [
    { value: '1', content: '父亲' },
    { value: '2', content: '母亲' },
    { value: '3', content: '配偶' },
    { value: '4', content: '兄弟' },
    { value: '5', content: '姐妹' },
    { value: '6', content: '兄妹' },
    { value: '7', content: '姐弟' },
    { value: '8', content: '儿子' },
    { value: '9', content: '女儿' }
];
const socialRelationships = [
    { value: '1', content: '祖父' },
    { value: '2', content: '祖母' },
    { value: '3', content: '外祖父' },
    { value: '4', content: '外祖母' },
    { value: '5', content: '伯父' },
    { value: '6', content: '伯母' },
    { value: '7', content: '叔父' },
    { value: '8', content: '婶婶' },
    { value: '9', content: '姑妈' },
    { value: '10', content: '姑丈' },
    { value: '11', content: '舅舅' },
    { value: '12', content: '舅妈' },
    { value: '13', content: '姨妈' },
    { value: '14', content: '姨丈' }
];
const transferReason = [
    { value: '1', content: '留学回国分配' },
    { value: '2', content: '留学归国随迁家属' },
    { value: '3', content: '赴台陆生分配' },
    { value: '4', content: '赴台陆生随迁家属' },
    { value: '5', content: '其他' }
];
const householdRegistrationOfficeOfDestination = [
    { value: '1', content: '测试1派出所' },
    { value: '2', content: '测试2派出所' },
    { value: '3', content: '测试3派出所' },
    { value: '4', content: '测试4派出所' },
    { value: '5', content: '测试5派出所' },
    { value: '6', content: '测试6派出所' }
];
const professional = [
    { value: '1', content: '测试1职业' },
    { value: '2', content: '测试2职业' },
    { value: '3', content: '测试3职业' },
    { value: '4', content: '测试4职业' },
    { value: '5', content: '测试5职业' }
];
const country = [
    { value: '1', content: '中国' },
    { value: '2', content: '俄罗斯' },
    { value: '3', content: '加拿大' },
    { value: '4', content: '英国' },
    { value: '5', content: '法国' },
    { value: '6', content: '德国' },
    { value: '7', content: '美国' },
    { value: '8', content: '日本' },
    { value: '9', content: '新加坡' },
    { value: '10', content: '澳大利亚' },
    { value: '11', content: '韩国' }
];
const degree = [
    { value: '1', content: '工学学士' },
    { value: '2', content: '工学硕士' },
    { value: '3', content: '工学博士' },
    { value: '4', content: '理学学士' },
    { value: '5', content: '理学硕士' },
    { value: '6', content: '理学博士' }
];
const goAbroadType = [
    { value: '1', content: '自费' },
    { value: '2', content: '公派' }
];
const applyState = [
    { value: '1', content: '待提交' },
    { value: '2', content: '待审核' },
    { value: '3', content: '审核通过' },
    { value: '4', content: '审核未通过' }
];
const creditCardType = [
    { value: '1', content: '居民身份证' },
    { value: '2', content: '军人身份证' },
    { value: '3', content: '武装警察身份证' },
    { value: '4', content: '港澳居民往来内地通行证' },
    { value: '5', content: '武装警察身份证' },
    { value: '6', content: '台湾居民来往大陆通行证' },
    { value: '7', content: '护照' }
];
const investment = [
    { value: '1', content: '货币' },
    { value: '2', content: '非货币财产' }
];
const isIntegrity = [
    { value: '0', content: '无' },
    { value: '1', content: '有' }
];
const trackingState = [
    { value: '0', content: '待提交' },
    { value: '1', content: '待提交' },
    { value: '2', content: '待提交' },
    { value: '3', content: '已提交' },
    { value: '4', content: '已提交' }
];
const trackingType = [
    { value: '1', content: '高层次留学人才回国资助' },
    { value: '2', content: '留学人员回国创业启动支持计划' },
    { value: '3', content: '昆仑计划' }
];
const domain = [
    { value: '1', content: '资源环境' },
    { value: '2', content: '医学' },
    { value: '3', content: '新能源' },
    { value: '4', content: '先进制造' },
    { value: '5', content: '物理' },
    { value: '6', content: '微电子、通信' },
    { value: '7', content: '生物医药' },
    { value: '8', content: '社会科学' },
    { value: '9', content: '农业' },
    { value: '10', content: '化学' },
    { value: '11', content: '电子信息' },
    { value: '12', content: '材料' }
];
const programStatue = [
    { value: '1', content: '已申请' },
    { value: '2', content: '进行中' },
    { value: '3', content: '已结束' }
];
const plan = [
    { value: '1', content: '海外赤子为国服务行动计划' },
    { value: '2', content: '高层次留学人才回国资助计划' },
    { value: '3', content: '留学人员回国创业启动支持计划' }
];
const highLvPlan = [
    { value: '1', content: '高层次留学人才回国资助计划' },
    { value: '2', content: '2020高层次留学人才回国资助计划' }
];
const enableProgramPlan = [
    { value: '1', content: '留学人员回国创业启动支持计划' },
    { value: '2', content: '2020留学人员回国创业启动支持计划' }
];
const highLvMarkGrade = [
    { value: '1', content: 'A++' },
    { value: '2', content: 'A+' },
    { value: '3', content: 'A' },
    { value: '4', content: 'B++' },
    { value: '5', content: 'B+' },
    { value: '6', content: 'B' },
    { value: '7', content: 'C++' },
    { value: '8', content: 'C+' },
    { value: '9', content: 'C' }
];
const lev = [
    { value: '1', content: '国家级' },
    { value: '2', content: '省级' },
    { value: '3', content: '市级' }
];
const scale = [
    { value: '1', content: '5人及以下' },
    { value: '2', content: '6-10人' },
    { value: '3', content: '10人以上' }

];
const politicalStatus = [
    { value: '1', content: '中共党员' },
    { value: '2', content: '中共预备党员' },
    { value: '3', content: '共青团员' },
    { value: '4', content: '民革党员' },
    { value: '5', content: '民盟盟员' },
    { value: '6', content: '民建会员' },
    { value: '7', content: '民进会员' },
    { value: '8', content: '农工党党员' },
    { value: '9', content: '致公党党员' },
    { value: '10', content: '九三学社社员' },
    { value: '11', content: '台盟盟员' },
    { value: '12', content: '无党派人士' },
    { value: '13', content: '群众' }
];
const dataState = [
    { value: '0', content: '已保存' },
    { value: '1', content: '已提交' }
];

export default {
    dataState,
    politicalStatus,
    companyData,
    nation,
    education,
    sex,
    maritalStatus,
    bloodType,
    zoneOptions,
    orgType,
    party,
    familyRelationships,
    socialRelationships,
    transferReason,
    householdRegistrationOfficeOfDestination,
    professional,
    country,
    degree,
    goAbroadType,
    applyState,
    creditCardType,
    investment,
    isIntegrity,
    trackingState,
    trackingType,
    domain,
    programStatue,
    plan,
    highLvPlan,
    enableProgramPlan,
    highLvMarkGrade,
    lev,
    scale
};