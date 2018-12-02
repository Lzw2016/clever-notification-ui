import { stringify } from 'qs';
import request from '../utils/request';

// 分页查询消息发送日志
export async function findByPage(queryReq) {
  return request(`/api/manage/message_send_log?${stringify(queryReq)}`, { method: 'GET' });
}