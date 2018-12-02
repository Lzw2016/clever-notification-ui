// import { stringify } from 'qs';
import request from '../utils/request';

// 发送邮件(使用模版)
export async function sendEmailTemplate(req) {
  return request('/api/send/email/template', { method: 'POST', body: req });
}

// 发送邮件(使用内容)
export async function sendEmailContent(req) {
  return request('/api/send/email/content', { method: 'POST', body: req });
}




















