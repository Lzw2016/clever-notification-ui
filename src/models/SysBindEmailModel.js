// import lodash from 'lodash';
import { ModelInitState } from '../utils/constant';
import { findByPage } from '../services/manage-by-sys-bind-email-controller';

export default {
  namespace: 'SysBindEmailModel',

  state: {
    queryParam: {
      ...ModelInitState.queryParam,
      sysName: undefined,
      account: undefined,
      fromName: undefined,
      enabled: undefined,
    },
    pagination: {
      ...ModelInitState.pagination,
    },
    data: [],
  },

  effects: {
    *findByPage({ payload }, { select, call, put }) {
      let queryParam = yield select(state => state.SysBindEmailModel.queryParam);
      let pagination = yield select(state => state.SysBindEmailModel.pagination);
      queryParam = { ...queryParam, ...payload }
      // 请求数据
      const resultData = yield call(findByPage, queryParam);
      if (!resultData) return;
      const { records, total, size, current } = resultData;
      if (!records) return;
      // 保存数据
      pagination = { ...pagination, pageSize: size, current, total };
      yield put({ type: 'save', payload: { data: records, queryParam, pagination } });
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
