// 状态 1启用 0禁用
const StatusArray = [
  { value: '0', label: '禁用' },
  { value: '1', label: '启用' },
];
const StatusMapper = {
  '0': { label: '禁用', color: '#faad14' },
  '1': { label: '启用', color: '#52c41a' },
  'error': { label: '未知', color: '#f5222d' },
};

// 排序
const SorterOrderMapper = {
  'descend': 'DESC',
  'ascend': 'ASC',
};

// 消息类型，1：邮件；2：短信；...
const MessageTypeArray = [
  { value: '1', label: '邮件' },
  { value: '2', label: '短信' },
];
const MessageTypeMapper = {
  '1': { label: '邮件' },
  '2': { label: '短信' },
  'error': { label: '未知' },
};

// 发送状态，1：发送中；2：发送失败；3：发送成功
const SendStateArray = [
  { value: '1', label: '发送中' },
  { value: '2', label: '发送失败' },
  { value: '3', label: '发送成功' },
];
const SendStateMapper = {
  '1': { label: '发送中', color: '#1890ff' },
  '2': { label: '发送失败', color: '#f5222d' },
  '3': { label: '发送成功', color: '#52c41a' },
  'error': { label: '未知', color: '#f5222d' },
};


export {
  StatusArray,
  StatusMapper,
  SorterOrderMapper,
  MessageTypeArray,
  MessageTypeMapper,
  SendStateArray,
  SendStateMapper,
};
