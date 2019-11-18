import lazyComponent from 'core/utils/lazyComponent';

export default lazyComponent(() =>
  import(/* webpackChunkName: "dashboard" */ './index')
);
