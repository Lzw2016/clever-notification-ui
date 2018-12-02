import { stringify } from 'qs';
import request from '../utils/request';

// 分页查询限制消息发送频率
export async function findByPage(queryReq) {
  return request(`/api/manage/frequency_limit?${stringify(queryReq)}`, { method: 'GET' });
}

// 新增限制消息发送频率
export async function addFrequencyLimit(addReq) {
  return request('/api/manage/frequency_limit', { method: 'POST', body: addReq });
}

// 更新限制消息发送频率
export async function updateFrequencyLimit(id, updateReq) {
  return request(`/api/manage/frequency_limit/${id}`, { method: 'PUT', body: updateReq });
}

// 删除限制消息发送频率
export async function delFrequencyLimit(id) {
  return request(`/api/manage/frequency_limit/${id}`, { method: 'DELETE' });
}













