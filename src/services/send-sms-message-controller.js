// import { stringify } from 'qs';
import request from '../utils/request';

// 发送短信(使用模版)
export async function sendSmsTemplate(req) {
  return request('/api/send/sms/template', { method: 'POST', body: req });
}