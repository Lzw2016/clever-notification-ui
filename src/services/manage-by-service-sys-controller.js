import { stringify } from 'qs';
import request from '../utils/request';

// 分页查询接入系统
export async function findByPage(queryReq) {
  return request(`/api/manage/service_sys?${stringify(queryReq)}`, { method: 'GET' });
}

// 新增查询接入系统
export async function addServiceSys(addReq) {
  return request('/api/manage/service_sys', { method: 'POST', body: addReq });
}

// 更新查询接入系统
export async function updateServiceSys(id, updateReq) {
  return request(`/api/manage/service_sys/${id}`, { method: 'PUT', body: updateReq });
}

// 更新查询接入系统
export async function delServiceSys(id) {
  return request(`/api/manage/service_sys/${id}`, { method: 'DELETE' });
}





