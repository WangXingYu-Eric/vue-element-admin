export default {
  route: {
    /* demo演示的国际化配置*/
    demo: {
      baseSettings: {
        title: '系统管理',
        children: {
          groupRole: {
            title: '部门权限管理'
          },
          userGroup: {
            title: '用户部门管理'
          },
          role: {
            title: '角色管理'
          },
          user: {
            title: '用户管理'
          },
          dictionary: {
            title: '数据字典'
          },
          timedTaskManagement: {
            title: '批处理设置'
          },
          noticeManagement: {
            title: '公告管理'
          }
        }
      },
      package: {
        title: '配置管理',
        children: {
          reportParameter: {
            title: '报送参数配置'
          },
          codeTransfer: {
            title: '码表转换配置'
          },
          checkRole: {
            title: '校验规则配置'
          },
          dataSourceSetting: {
            title: '业务系统数据源配置'
          },
          dataCleanConfig: {
            title: '数据清洗规则配置'
          }
        }
      },
      job: {
        title: '上报任务管理',
        children: {
          eastQuery: {
            title: 'EAST任务申请与查询'
          }
        }
      },
      dataCollection: {
        title: '数据采集',
        children: {
          standardDataBase: {
            title: '数据标准库',
            children: {
              finance: {
                title: '财务金融标准'
              },
              car: {
                title: '汽车金融标准'
              },
              details: {
                title: '表结构详情'
              }
            }
          },
          dataSourceSetting: {
            title: '数据源配置'
          },
          mappingSetting: {
            title: '数据采集映射配置'
          },
          mappingSettingEdit: {
            title: '新建数据映射配置'
          },
          checkRule: {
            title: '校验规则配置'
          },
          additional: {
            title: '数据补录'
          }
        }
      },
      dataMaintenance: {
        title: '特殊表维护',
        children: {
          dongJianGao: {
            title: '董监高信息维护'
          },
          branch: {
            title: '机构信息维护'
          },
          groupEquity: {
            title: '股东信息维护'
          },
          entrustedInvestment: {
            title: '内部分户账信息维护'
          },
          associatedInformation: {
            title: '非底层资产投资信息维护'
          },
          importantAssociated: {
            title: '非底层资产持仓信息'
          }
          // associatedAggregate: {
          //   title: '关联交易汇总'
          // },
          // bankAccountInformation: {
          //   title: '银行账户信息维护'
          // },
          // autonomousInvestmentPositionDetails: {
          //   title: '自主投资账户持仓明细维护'
          // },
          // autonomousInvestmentRecord: {
          //   title: '自主投资交易流水维护'
          // },
          // autonomousInvestmentAggregate: {
          //   title: '自主投资信息汇总维护'
          // }
        }
      },
      dataSplitCheck: {
        title: '数据确认'
      },
      dataCheck: {
        title: '数据校验',
        children: {
          dataCheckOne: {
            title: '数据校验'
          },
          checkResult: {
            title: '校验结果维护'
          },
          checkResultConfirm: {
            title: '校验结果确认'
          }
        }
      },
      dataAudit: {
        title: '数据审核'
      },
      dataApproval: {
        title: '数据审批'
      },
      oneButtonReport: {
        title: '一键上报'
      },
      receipt: {
        title: '回执处理'
      },
      integratedQuery: {
        title: '综合查询',
        children: {
          coreQuery: {
            title: '核心推数查询'
          },
          dataStatus: {
            title: '数据抽取状态'
          },
          maintenanceStatus: {
            title: '特别表维护状态'
          },
          checkStatus: {
            title: '校验明细项统计'
          },
          auditStatus: {
            title: '审核状态日志'
          },
          branchReportingLog: {
            title: '分支机构上报日志'
          },
          ruleHitStatistics: {
            title: '规则命中统计'
          },
          reportProblemSummary: {
            title: '上报问题汇总'
          }
        }
      },
      workflow: {
        title: '流程配置管理'
      }
    },
    dashboard: '首页',
    documentation: '文档',
    guide: '引导页',
    permission: '权限测试页',
    rolePermission: '角色权限',
    pagePermission: '页面权限',
    directivePermission: '指令权限',
    icons: '图标',
    components: '组件',
    tinymce: '富文本编辑器',
    markdown: 'Markdown',
    jsonEditor: 'JSON 编辑器',
    dndList: '列表拖拽',
    splitPane: 'Splitpane',
    avatarUpload: '头像上传',
    dropzone: 'Dropzone',
    sticky: 'Sticky',
    countTo: 'Count To',
    componentMixin: '小组件',
    backToTop: '返回顶部',
    dragDialog: '拖拽 Dialog',
    dragSelect: '拖拽 Select',
    dragKanban: '可拖拽看板',
    charts: '图表',
    keyboardChart: '键盘图表',
    lineChart: '折线图',
    mixChart: '混合图表',
    example: '综合实例',
    nested: '路由嵌套',
    menu1: '菜单1',
    'menu1-1': '菜单 1-1',
    'menu1-2': '菜单 1-2',
    'menu1-2-1': '菜单 1-2-1',
    'menu1-2-2': '菜单 1-2-2',
    'menu1-3': '菜单 1-3',
    menu2: '菜单 2',
    Table: 'Table',
    dynamicTable: '动态 Table',
    dragTable: '拖拽 Table',
    inlineEditTable: 'Table 内编辑',
    complexTable: '综合 Table',
    tab: 'Tab',
    form: '表单',
    createArticle: '创建文章',
    editArticle: '编辑文章',
    articleList: '文章列表',
    errorPages: '错误页面',
    page401: '401',
    page404: '404',
    errorLog: '错误日志',
    excel: 'Excel',
    exportExcel: '导出 Excel',
    selectExcel: '导出 已选择项',
    mergeHeader: '导出 多级表头',
    uploadExcel: '上传 Excel',
    zip: 'Zip',
    pdf: 'PDF',
    exportZip: 'Export Zip',
    theme: '换肤',
    clipboardDemo: 'Clipboard',
    i18n: '国际化',
    externalLink: '外链',
    profile: '个人中心'
  },
  navbar: {
    dashboard: '首页',
    github: '项目地址',
    logOut: '退出登录',
    profile: '个人中心',
    theme: '换肤',
    size: '布局大小'
  },
  login: {
    title: '系统登录',
    logIn: '登录',
    username: '账号',
    password: '密码',
    any: '随便填',
    thirdparty: '第三方登录',
    thirdpartyTips: '本地不能模拟，请结合自己业务进行模拟！！！'
  },
  documentation: {
    documentation: '文档',
    github: 'Github 地址'
  },
  permission: {
    addRole: '新增角色',
    editPermission: '编辑权限',
    roles: '你的权限',
    switchRoles: '切换权限',
    tips: '在某些情况下，不适合使用 v-permission。例如：Element-UI 的 el-tab 或 el-table-column 以及其它动态渲染 dom 的场景。你只能通过手动设置 v-if 来实现。',
    delete: '删除',
    confirm: '确定',
    cancel: '取消'
  },
  guide: {
    description: '引导页对于一些第一次进入项目的人很有用，你可以简单介绍下项目的功能。本 Demo 是基于',
    button: '打开引导'
  },
  components: {
    documentation: '文档',
    tinymceTips: '富文本是管理后台一个核心的功能，但同时又是一个有很多坑的地方。在选择富文本的过程中我也走了不少的弯路，市面上常见的富文本都基本用过了，最终权衡了一下选择了Tinymce。更详细的富文本比较和介绍见',
    dropzoneTips: '由于我司业务有特殊需求，而且要传七牛 所以没用第三方，选择了自己封装。代码非常的简单，具体代码你可以在这里看到 @/components/Dropzone',
    stickyTips: '当页面滚动到预设的位置会吸附在顶部',
    backToTopTips1: '页面滚动到指定位置会在右下角出现返回顶部按钮',
    backToTopTips2: '可自定义按钮的样式、show/hide、出现的高度、返回的位置 如需文字提示，可在外部使用Element的el-tooltip元素',
    imageUploadTips: '由于我在使用时它只有vue@1版本，而且和mockjs不兼容，所以自己改造了一下，如果大家要使用的话，优先还是使用官方版本。'
  },
  table: {
    dynamicTips1: '固定表头, 按照表头顺序排序',
    dynamicTips2: '不固定表头, 按照点击顺序排序',
    dragTips1: '默认顺序',
    dragTips2: '拖拽后顺序',
    title: '标题',
    importance: '重要性',
    type: '类型',
    remark: '点评',
    search: '搜索',
    add: '添加',
    export: '导出',
    reviewer: '审核人',
    id: '序号',
    date: '时间',
    author: '作者',
    readings: '阅读数',
    status: '状态',
    actions: '操作',
    edit: '编辑',
    publish: '发布',
    draft: '草稿',
    delete: '删除',
    cancel: '取 消',
    confirm: '确 定'
  },
  example: {
    warning: '创建和编辑页面是不能被 keep-alive 缓存的，因为keep-alive 的 include 目前不支持根据路由来缓存，所以目前都是基于 component name 来进行缓存的。如果你想类似的实现缓存效果，可以使用 localStorage 等浏览器缓存方案。或者不要使用 keep-alive 的 include，直接缓存所有页面。详情见'
  },
  errorLog: {
    tips: '请点击右上角bug小图标',
    description: '现在的管理后台基本都是spa的形式了，它增强了用户体验，但同时也会增加页面出问题的可能性，可能一个小小的疏忽就导致整个页面的死锁。好在 Vue 官网提供了一个方法来捕获处理异常，你可以在其中进行错误处理或者异常上报。',
    documentation: '文档介绍'
  },
  excel: {
    export: '导出',
    selectedExport: '导出已选择项',
    placeholder: '请输入文件名(默认excel-list)'
  },
  zip: {
    export: '导出',
    placeholder: '请输入文件名(默认file)'
  },
  pdf: {
    tips: '这里使用   window.print() 来实现下载pdf的功能'
  },
  theme: {
    change: '换肤',
    documentation: '换肤文档',
    tips: 'Tips: 它区别于 navbar 上的 theme-pick, 是两种不同的换肤方法，各自有不同的应用场景，具体请参考文档。'
  },
  tagsView: {
    refresh: '刷新',
    close: '关闭',
    closeOthers: '关闭其它',
    closeAll: '关闭所有'
  },
  settings: {
    title: '系统布局配置',
    theme: '主题色',
    tagsView: '开启 Tags-View',
    fixedHeader: '固定 Header',
    sidebarLogo: '侧边栏 Logo'
  }
}
