const { SEFResponseWrapper } = require('dw-mx-request-mocker');

module.exports = SEFResponseWrapper({
    '/mock/test/routetest': () => {
        return {
            routes: [
                {
                    path: '/',
                    redirect: 'home'
                },
                {
                    path: 'home',
                    name: '首页',
                    component: 'homeindex'

                },
                {
                    path: 'demo',
                    name: 'Demo',
                    routes: [
                        // {
                        //     path: 'demo1',
                        //     name: 'Demo1',
                        //     component: 'demo'
                        // },
                        // {
                        //     path: 'demo2',
                        //     name: 'Demo2',
                        //     component: 'demo'
                        // },
                        {
                            path: 'personalInfo',
                            name: 'personalInfo',
                            component: 'personalInfo'
                        },
                        {
                            path: 'demoTest',
                            name: 'demo测试',
                            component: 'demoTest'
                        },
                        {
                            path: 'selectSearchDemo',
                            name: 'select demo测试',
                            component: 'selectSearchDemo'
                        },
                        {
                            path: 'formExercise',
                            name: '1_form练习题',
                            component: 'formExercise'
                        },
                        {
                            path: 'tabsTest',
                            name: 'tabsTest',
                            component: 'tabsTest'
                        },
                        {
                            path: 'tableTest',
                            name: 'tableTest',
                            component: 'tableTest'
                        },
                        {
                            path: 'tableExercise',
                            name: 'tableExercise',
                            component: 'tableExercise'
                        },
                        {
                            path: 'modalTest',
                            name: 'modalTest',
                            component: 'modalTest'
                        },
                        {
                            path: 'lovTest',
                            name: 'lovTest',
                            component: 'lovTest'
                        },
                        {
                            path: 'treeTest',
                            name: 'treeTest',
                            component: 'treeTest'
                        },
                        {
                            path: 'modalExercise',
                            name: 'modalExercise',
                            component: 'modalExercise'
                        },
                        {
                            path: 'generalExercise1',
                            name: 'generalExercise1',
                            component: 'generalExercise1'
                        },
                        {
                            path: 'personInfoQueryMain',
                            name: 'personInfoQueryMain',
                            component: 'personInfoQueryMain'
                        }
                    ]
                }

            ]
        };
    },
    '/mock/test/search':(req, res) => {
        const {
            body: { value }, } = req;
        if (value == '山东') {
            return {
                data: [
                    {
                        key: 0,
                        address: '山东省济南市历下区'
                    },
                    {
                        key: 1,
                        address: '山东省济南市槐荫区'
                    },
                    {
                        key: 2,
                        address: '山东省济南市市中区'
                    },
                    {
                        key: 3,
                        address: '山东省烟台市'
                    },
                    {
                        key: 4,
                        address: '山东省菏泽市'
                    },
                    {
                        key: 5,
                        address: '山东省济南市'
                    },
                    {
                        key: 6,
                        address: '山东省聊城市'
                    },
                    {
                        key: 7,
                        address: '山东省淄博市'
                    }

                ]
            }
        } else if (value == '江苏') {
            return {
                data: [
                    {
                        key: 8,
                        address: '江苏南京'
                    }
                ]
            }
        } else if (value == '浙江') {
            return {
                data: [
                    {
                        key: 9,
                        address: '浙江杭州'
                    }
                ]
            }
        } else {
            return {
                data: []
            }
        }

    },
    '/mock/test/downloaddemo': (req, res) => {
        const data = []
        for (let i = 0; i < 3; i++) {
            data.push({
                'key': i,
                'name': '张' + i,
                'age': 32,
                'date': '2020/02/09',
            })

        }
        return {
            data: data
        }
    },
    '/mock/table/test': (req, res) => {
        return [{
            key:0,
            name:'Edward King 0',
            age:32,
            address:'London Park Lane no.0',
            date:'20200209',
            status:'2',
            operation:'delete',
            // innerData:'111'
        },{
            key:1,
            name:'Edward King 1',
            age:32,
            address:'London Park Lane no.1',
            date:'20200809',
            status:'2',
            operation:'delete'
        },{
            key:2,
            name:'Edward King 2',
            age:32,
            address:'London Park Lane no.2',
            date:'20200209',
            status:'2',
            operation:'delete'
        },{
            key:3,
            name:'Edward King 3',
            age:32,
            address:'London Park Lane no.3',
            date:'20200809',
            status:'2',
            operation:'delete'
        },{
            key:4,
            name:'Edward King 4',
            age:32,
            address:'London Park Lane no.4',
            date:'20200209',
            status:'2',
            operation:'delete'
        },{
            key:5,
            name:'Edward King 5',
            age:32,
            address:'London Park Lane no.5',
            date:'20200809',
            status:'2',
            operation:'delete'
        }]
    },
    '/mock/table/testPage': (req, res) => {
        const current = req.body.current
        const pageSize = req.body.pageSize
        const datas = [{
            key:0,
            name:'Edward King 0',
            age:32,
            address:'London Park Lane no.0',
            date:'20200209',
            status:'2',
            operation:'delete',
            // innerData:'111'
        },{
            key:1,
            name:'Edward King 1',
            age:32,
            address:'London Park Lane no.1',
            date:'20200809',
            status:'2',
            operation:'delete'
        },{
            key:2,
            name:'Edward King 2',
            age:32,
            address:'London Park Lane no.2',
            date:'20200209',
            status:'2',
            operation:'delete'
        },{
            key:3,
            name:'Edward King 3',
            age:32,
            address:'London Park Lane no.3',
            date:'20200809',
            status:'2',
            operation:'delete'
        },{
            key:4,
            name:'Edward King 4',
            age:32,
            address:'London Park Lane no.4',
            date:'20200209',
            status:'2',
            operation:'delete'
        },{
            key:5,
            name:'Edward King 5',
            age:32,
            address:'London Park Lane no.5',
            date:'20200809',
            status:'2',
            operation:'delete'
        }]
        return {
            data: datas.filter(d=>{
                if(d.key>=(current-1)*pageSize && d.key<current*pageSize) return true
                return false
            }),
            total: datas.length
        }
    },
    '/mock/search/docInfo':(req,res)=>{
        const {ksmc} = req.body
        const docData = [
            {
                key:0,
                name:'小赵',
                gender:'1',
                cell:'12354687',
                ksmc:'3',
                // timeOut: new Date(),
                timeOut: '20220717123456'
            },{
                key:1,
                name:'小赵1',
                gender:'2',
                cell:'12354687',
                ksmc:'2',
                // timeOut: new Date(),
                timeOut: '20220717123456'
            },{
                key:2,
                name:'小赵2',
                gender:'1',
                cell:'12354687',
                ksmc:'2',
                // timeOut: new Date(),
                timeOut: '20220717123456'
            },{
                key:3,
                name:'小赵3',
                gender:'2',
                cell:'12354687',
                ksmc:'1',
                // timeOut: new Date(),
                timeOut: '20220717123456'
            },{
                key:4,
                name:'小赵4',
                gender:'1',
                cell:'12354687',
                ksmc:'3',
                // timeOut: new Date(),
                timeOut: '20220717123456'
            },{
                key:5,
                name:'小赵5',
                gender:'2',
                cell:'12354687',
                ksmc:'2',
                // timeOut: new Date(),
                timeOut: '20220717123456'
            },{
                key:6,
                name:'小赵6',
                gender:'1',
                cell:'12354687',
                ksmc:'1',
                // timeOut: new Date(),
                timeOut: '20220717123456'
            },{
                key:7,
                name:'小赵7',
                gender:'2',
                cell:'12354687',
                ksmc:'3',
                // timeOut: new Date(),
                timeOut: '20220717123456'
            },{
                key:8,
                name:'小赵8',
                gender:'1',
                cell:'12354687',
                ksmc:'2',
                // timeOut: new Date(),
                timeOut: '20220717123456'
            },{
                key:9,
                name:'小赵9',
                gender:'2',
                cell:'12354687',
                ksmc:'1',
                // timeOut: new Date(),
                timeOut: '20220717123456'
            },
        ];
        return docData.filter(data=>
            data.ksmc == ksmc
        )
    },
    '/mock/search/ksInfo':(req,res)=>{
        return [
            {
                key:0,
                ksmc:'内科'
            },
            {
                key:1,
                ksmc:'外科'
            },{
                key:2,
                ksmc:'儿科'
            },
        ]
    },
    '/mock/search/perInfo':(req, res)=>{
        return [
            {
                key:0,
                name:'小赵',
                gender:'1',
                cell:'12354687',
                ksmc:'外科',
                // timeOut: new Date(),
                timeOut: '20220717123456'
            },{
                key:1,
                name:'小赵1',
                gender:'2',
                cell:'12354687',
                ksmc:'外科',
                // timeOut: new Date(),
                timeOut: '20220717123456'
            },{
                key:2,
                name:'小赵2',
                gender:'1',
                cell:'12354687',
                ksmc:'内科',
                // timeOut: new Date(),
                timeOut: '20220717123456'
            },{
                key:3,
                name:'小赵3',
                gender:'2',
                cell:'12354687',
                ksmc:'外科',
                // timeOut: new Date(),
                timeOut: '20220717123456'
            },{
                key:4,
                name:'小赵4',
                gender:'1',
                cell:'12354687',
                ksmc:'内科',
                // timeOut: new Date(),
                timeOut: '20220717123456'
            },{
                key:5,
                name:'小赵5',
                gender:'2',
                cell:'12354687',
                ksmc:'儿科',
                // timeOut: new Date(),
                timeOut: '20220717123456'
            },{
                key:6,
                name:'小赵6',
                gender:'1',
                cell:'12354687',
                ksmc:'儿科',
                // timeOut: new Date(),
                timeOut: '20220717123456'
            },{
                key:7,
                name:'小赵7',
                gender:'2',
                cell:'12354687',
                ksmc:'外科',
                // timeOut: new Date(),
                timeOut: '20220717123456'
            },{
                key:8,
                name:'小赵8',
                gender:'1',
                cell:'12354687',
                ksmc:'儿科',
                // timeOut: new Date(),
                timeOut: '20220717123456'
            },{
                key:9,
                name:'小赵9',
                gender:'2',
                cell:'12354687',
                ksmc:'内科',
                // timeOut: new Date(),
                timeOut: '20220717123456'
            },
        ]
    },
    '/mock/exercise2/personInfo':(req, res)=>{
        const {cardType,cardNum,name,workType,current,pageSize} = req.body
        const datas = []
        for(let i = 0;i<21;i++){
            datas[i] = {
                key: i,
                unitName:`工伤一科${Math.ceil(i/10)}`,
                cardType:(i%2)+1,
                cardNum: `11111111111111${10+i}`,
                name:`测试人员${i}`,
                birthday: `202207${10+i}`,
                gender:`${(i%2)+1}`,
                nationality: `${(i%2)+1}`,
                workType: `${(i%3)+1}`,
                level:`正高三级`,
                status:`${(i%3)+1}`,
                telephone: `181379512${10+i}`
            }
        }
        const data = datas.filter(
            (e)=>{
                if(cardType && cardType != e.cardType) return false
                if(cardNum && cardNum != e.cardNum) return false
                if(name && name != e.name) return false
                if(workType && workType != e.workType) return false
                return true
            }
        ).sort((e1, e2)=>{
            return e1.unitName == e2.unitName ?
                    (e1.cardNum > e2.cardNum ? 1 : -1) :
                    (e1.unitName > e2.unitName ? 1 : -1)
        })
        return {
            data: data.filter((e,index)=>{
                if(index>=(current-1)*pageSize && index<current*pageSize) return true
                return false
            }),
            total:data.length
        }
    }
});