// import lodash from 'lodash';

export default {
  namespace: 'SysBindSmsModel',

  state: {
  },

  effects: {

  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
