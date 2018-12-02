import { stringify } from 'qs';
import request from '../utils/request';

// 分页查询黑名单
export async function findByPage(queryReq) {
  return request(`/api/manage/receiver_black_list?${stringify(queryReq)}`, { method: 'GET' });
}

// 增加黑名单
export async function addReceiverBlackList(addReq) {
  return request('/api/manage/receiver_black_list', { method: 'POST', body: addReq });
}

// 更新黑名单
export async function updateReceiverBlackList(id, updateReq) {
  return request(`/api/manage/receiver_black_list/${id}`, { method: 'PUT', body: updateReq });
}

// 更新黑名单
export async function delReceiverBlackList(id) {
  return request(`/api/manage/receiver_black_list/${id}`, { method: 'DELETE' });
}


















