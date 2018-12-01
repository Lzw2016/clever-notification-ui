// 全局常量
import React, { Fragment } from 'react';
import { Icon } from 'antd';

// 系统支持的语言
const LocaleLanguage = {
  zh_CN: { locale: 'zh-CN', language: '中文' },
  en_US: { locale: 'en-US', language: 'English' },
};

// 系统信息
const SystemInfo = {
  languageConfigName: 'Language',
  currentLocale: null,
  name: 'Notification',
  description: 'Notification - 消息通知中心',
  copyright: (
    <Fragment>
      Copyright <Icon type="copyright" /> 2018 clever-notification版权所有
    </Fragment>
  ),
  copyrightLinks: [
    { key: 'help', title: '帮助', href: '', blankTarget: true },
    { key: 'privacy', title: '隐私', href: '', blankTarget: true },
    { key: 'terms', title: '条款', href: '', blankTarget: true },
  ],
  hiddenFooter: false,
  localStorageAuthorityKey: 'clever-notification',
};

// Layout 配置
const LayoutConfig = {
  // 左侧菜单栏宽度配置
  siderMenuWidth: 200,
};

// HTTP 状态码错误说明
const CodeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有登录（令牌、用户名、密码错误）。',
  403: '没有访问权限，请联系管理员授权',
  404: '服务器资源不存在',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

// Model 初始化值配置
const ModelInitState = {
  // 请求 “分页参数” 和 “排序参数” 默认值配置
  queryParam: { pageSize: 10, pageNo: 1, orderField: undefined, sort: undefined },
  // 分页参数默认值配置
  pagination: {
    defaultCurrent: 1,
    defaultPageSize: 10,
    hideOnSinglePage: false,
    pageSizeOptions: ['10', '30', '50', '100'],
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: total => `总记录数${total}条`,
    current: 1,
    pageSize: 10,
    total: 0,
  },
};

// 加密解密配置
const CryptoConfig = {
  ManageAES: {
    key: '636c657665722d73656375726974792d',
    iv: 'f0021ea5a06d5a7bade961afe47e9ad9',
  },
  LoginAES: {
    key: '636c657665722d736563757288888888',
    iv: '636c657665722d736563757266666666',
  },
};

export { LocaleLanguage, SystemInfo, LayoutConfig, CodeMessage, ModelInitState, CryptoConfig };
