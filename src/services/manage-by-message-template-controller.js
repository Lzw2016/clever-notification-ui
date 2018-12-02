import { stringify } from 'qs';
import request from '../utils/request';

// 分页查询消息模版
export async function findByPage(queryReq) {
  return request(`/api/manage/message_template?${stringify(queryReq)}`, { method: 'GET' });
}

// 新增消息模版
export async function addFrequencyLimit(addReq) {
  return request('/api/manage/message_template', { method: 'POST', body: addReq });
}

// 更新消息模版
export async function updateMessageTemplate(id, updateReq) {
  return request(`/api/manage/message_template/${id}`, { method: 'PUT', body: updateReq });
}

// 删除消息模版
export async function delMessageTemplate(id) {
  return request(`/api/manage/message_template/${id}`, { method: 'DELETE' });
}



