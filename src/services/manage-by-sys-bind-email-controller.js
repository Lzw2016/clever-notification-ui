import { stringify } from 'qs';
import request from '../utils/request';

// 分页查询邮件发送者帐号
export async function findByPage(queryReq) {
  return request(`/api/manage/sys_bind_email?${stringify(queryReq)}`, { method: 'GET' });
}

// 新增邮件发送者帐号
export async function addSysBindEmail(addReq) {
  return request('/api/manage/sys_bind_email', { method: 'POST', body: addReq });
}

// 更新邮件发送者帐号
export async function updateSysBindEmail(id, updateReq) {
  return request(`/api/manage/sys_bind_email/${id}`, { method: 'PUT', body: updateReq });
}

// 删除邮件发送者帐号
export async function delSysBindEmail(id) {
  return request(`/api/manage/sys_bind_email/${id}`, { method: 'DELETE' });
}




















