// import lodash from 'lodash';

export default {
  namespace: 'SysBindEmailModel',

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
