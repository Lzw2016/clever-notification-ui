// import lodash from 'lodash';

export default {
  namespace: 'MessageTemplateModel',

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
