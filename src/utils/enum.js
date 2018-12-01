// 状态 1启用 0未启用
const StatusArray = [
  { value: '0', label: '未启用' },
  { value: '1', label: '启用' },
];

// 排序
const SorterOrderMapper = {
  'descend': 'DESC',
  'ascend': 'ASC',
};

// 用户类型，0：系统内建，1：外部系统用户
const UserTypeArray = [
  { value: '0', label: '内部用户' },
  { value: '1', label: '外系统用户' },
];
const UserTypeMapper = {
  '0': { label: '内部用户', color: '#19be6b' },
  '1': { label: '外系统用户', color: '#ff9900' },
  error: { label: '未知', color: '#ed4014' },
};

// 帐号是否锁定，0：未锁定；1：锁定
const LockedArray = [
  { value: '0', label: '未锁定' },
  { value: '1', label: '锁定' },
];
const LockedMapper = {
  '0': { label: '未锁定', color: '#19be6b' },
  '1': { label: '锁定', color: '#ff9900' },
  error: { label: '未知', color: '#ed4014' },
};

// 是否启用，0：禁用；1：启用
const EnabledArray = [
  { value: '0', label: '禁用' },
  { value: '1', label: '启用' },
];
const EnabledMapper = {
  '0': { label: '禁用', color: '#ff9900' },
  '1': { label: '启用', color: '#19be6b' },
  error: { label: '未知', color: '#ed4014' },
};

// 资源类型（1:请求URL地址, 2:菜单权限, 3:UI权限)
const ResourcesTypeArray = [
  { value: '1', label: 'URL资源' },
  { value: '2', label: '系统菜单' },
  { value: '3', label: '页面UI' },
  { value: '4', label: '自定义' },
];
const ResourcesTypeMapper = {
  '1': { label: 'URL资源', color: '#108ee9' },
  '2': { label: '系统菜单', color: '#108ee9' },
  '3': { label: '页面UI', color: '#108ee9' },
  '4': { label: '自定义', color: '#108ee9' },
  error: { label: '未知', color: '#ed4014' },
};

// Controller路由资源是否存在，0：不存在；1：存在
const TargetExistArray = [
  { value: '0', label: '不存在' },
  { value: '1', label: '存在' },
];
const TargetExistMapper = {
  '0': { label: '不存在', color: '#ed4014' },
  '1': { label: '存在', color: '#19be6b' },
  error: { label: '未知', color: '#ed4014' },
};

// 需要授权才允许访问（1：需要；2：不需要）
const NeedAuthorizationArray = [
  { value: '1', label: '需要' },
  { value: '2', label: '不需要' },
];
const NeedAuthorizationMapper = {
  '1': { label: '需要', color: '#19be6b' },
  '2': { label: '不需要', color: '#ed4014' },
  error: { label: '未知', color: '#ed4014' },
};

// 登录状态，0：未知；1：已登录；2：登录已过期
const LoginStateArray = [
  { value: '0', label: '未知' },
  { value: '1', label: '已登录' },
  { value: '2', label: '登录已过期' },
];
const LoginStateMapper = {
  '0': { label: '未知', color: '#f5222d' },
  '1': { label: '已登录', color: '#52c41a' },
  '2': { label: '登录已过期', color: '#faad14' },
  error: { label: '未知', color: '#f5222d' },
};

// 认证模式，0：sesion-cookie，1：jwt-token
const LoginModelArray = [
  { value: '0', label: 'Sesion-Cookie' },
  { value: '1', label: 'Jwt-Token' },
];
const LoginModelMapper = {
  '0': { label: 'Sesion-Cookie', color: undefined },
  '1': { label: 'Jwt-Token', color: undefined },
  error: { label: '未知', color: '#f5222d' },
};

export {
  StatusArray,
  SorterOrderMapper,
  UserTypeArray,
  UserTypeMapper,
  LockedArray,
  LockedMapper,
  EnabledArray,
  EnabledMapper,
  ResourcesTypeArray,
  ResourcesTypeMapper,
  TargetExistArray,
  TargetExistMapper,
  NeedAuthorizationArray,
  NeedAuthorizationMapper,
  LoginStateArray,
  LoginStateMapper,
  LoginModelArray,
  LoginModelMapper,
};
