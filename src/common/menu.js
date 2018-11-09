import { isUrl } from '../utils/utils';

const menuData = [
  // {
  // name: 'Dashboard',
  // icon: 'dashboard',
  // path: 'dashboard',
  // hideInBreadcrumb: true,
  // hideInMenu: true,
  // authority: 'admin',
  // },
  {
    name: 'Demo',
    icon: 'email_account_suser',
    path: 'demo/:list',
  },
  {
    name: '系统仪表盘',
    icon: 'dashboard1',
    path: 'dashboard/:list',
  },
  {
    name: '系统配置',
    icon: 'mokuai',
    path: 'sys_name/:list',
  },
  {
    name: '消息模版配置',
    icon: 'moban',
    path: 'message_template/:list',
  },
  {
    name: '邮件帐号配置',
    icon: 'youjian1',
    path: 'sys_bind_email/:list',
  },
  {
    name: '短信帐号配置',
    icon: 'sms1',
    path: 'sys_bind_sms/:list',
  },
  {
    name: '黑名单配置',
    icon: 'heimingdan2',
    path: 'receiver_black_list/:list',
  },
  {
    name: '发送限速配置',
    icon: 'sudu',
    path: 'frequency_limit/:list',
  },
  {
    name: '消息发送日志',
    icon: 'duanxinfasongrizhi',
    path: 'message_send_log/:list',
  },
];

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
