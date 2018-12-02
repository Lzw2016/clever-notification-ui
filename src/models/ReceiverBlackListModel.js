// import lodash from 'lodash';

export default {
  namespace: 'ReceiverBlackListModel',

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
