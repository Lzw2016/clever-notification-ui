// import lodash from 'lodash';

export default {
  namespace: 'MessageSendLogModel',

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
