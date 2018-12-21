// import lodash from 'lodash';
import { ModelInitState } from '../utils/constant';
import { findByPage } from '../services/manage-by-message-send-log-controller';

export default {
  namespace: 'MessageSendLogModel',

  state: {
    queryParam: {
      ...ModelInitState.queryParam,
      sendId: undefined,
      sysName: undefined,
      messageType: undefined,
      sendState: undefined,
      templateName: undefined,
      useTimeMin: undefined,
      useTimeMax: undefined,
      sendTimeStart: undefined,
      sendTimeEnd: undefined,
    },
    pagination: {
      ...ModelInitState.pagination,
    },
    data: [],
  },

  effects: {
    *findByPage({ payload }, { select, call, put }) {
      let queryParam = yield select(state => state.MessageSendLogModel.queryParam);
      let pagination = yield select(state => state.MessageSendLogModel.pagination);
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
