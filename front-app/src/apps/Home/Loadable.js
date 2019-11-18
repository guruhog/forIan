import lazyComponent from 'core/utils/lazyComponent';

export default lazyComponent(() =>
  import(/* webpackChunkName: "home" */ './index')
);
