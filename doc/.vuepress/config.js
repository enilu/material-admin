module.exports = {
    title: 'Material Admin',
    description: '使用Material Admin快速构建web应用程序',
    base: '/material-admin/',
    head: [
        ['link', { rel: 'shortcut icon', type: "image/x-icon", href: './favicon.ico' }]
    ],
    evergreen: true,
    editLinkText:'在 GitHub 上编辑此页',
    port: 8081,
    ga: 'UA-71886989-13',
    themeConfig: {
        repo: 'enilu/material-admin',
        docsDir: 'docs',
        editLinks: true,
        editLinkText: '编辑此页面！',
        nav: [
            {text: '文档', link: '/'},
            {text: '公告', link: 'https://www.oschina.net/p/material-admin'},
            // {text: '捐赠',link:'/donate'},
            {text: '资源',link:'/resource'},
            {text: '周边',
                items:[
                    {text: '代码生成',link:'/ecosystem/code-generator'},
                    {text: '数据库文档生成',link:'/ecosystem/database-doc-generator'},
                ]
            },
            {text: '码云',link:'https://gitee.com/enilu/material-admin'},


        ],
        sidebar: [
            {
                title: '基本准备',
                collapsable: false,
                children: [
                    '/base/jdkAndMaven',
                    '/base/modules'
                ]
            },

            {
                title: '10分钟将本项目跑起来',
                collapsable: false,
                children: [
                    '/quickstart/quickstart',
                    '/quickstart/clone',
                    '/quickstart/initDb',
                    '/quickstart/config',
                    '/quickstart/startup'
                ]
            },
            {
                title: '开发第一个功能',
                collapsable: false,
                children: [
                    '/helloworld/crud',
                    '/helloworld/create_table',
                    '/helloworld/base',
                    '/helloworld/list',
                    '/helloworld/add',
                    '/helloworld/delete',
                    '/helloworld/update',
                    '/helloworld/menuAndPermission'
                ]
            },
            {
                title: '基本功能介绍',
                collapsable: false,
                children: [
                    '/feature/modules',
                    '/feature/menu',
                    '/feature/dict',
                    '/feature/log',
                    '/feature/monitor'
                    ]
            },{
                title: '进阶',
                collapsable: false,
                children: [
                    '/action/sqlite',
                    '/action/cache',
                    '/action/task',
                    '/action/jpaauditing.md'

                ]
            },{
                title: '其他',
                collapsable: false,
                children:[
                    '/other/faq'
                ]
            }
        ]

    }
}
