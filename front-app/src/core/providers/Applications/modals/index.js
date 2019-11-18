import AddApplication from './AddApplication';
import EditApplication from './EditApplication';
import AppInfo from './AppInfo';
import AddComment from './AddComment';
import SupportApplication from './SupportApplication';

import { MODAL_TYPES } from '../constants';
import ShowID from './ShowID';

export default [
  {
    type: MODAL_TYPES.ADD_APPLICATION,
    component: AddApplication,
    title: 'Add Application',
    icon: 'th large',
    size: 'small'
  },
  {
    type: MODAL_TYPES.EDIT_APPLICATION,
    component: EditApplication,
    title: 'Edit Application',
    icon: 'th large',
    size: 'large'
  },

  {
    type: MODAL_TYPES.INFO_APPLICATION,
    component: AppInfo,
    title: 'Application Information',
    icon: 'info circle',
    size: 'large'
  },
  {
    type: MODAL_TYPES.ADD_APP_COMMENT,
    component: AddComment,
    title: 'Add Application Comment',
    icon: 'comments',
    size: 'large'
  },
  {
    type: MODAL_TYPES.SUPPORT_APPLICATION,
    component: SupportApplication,
    title: 'Application Support',
    icon: 'help circle',
    size: 'large'
  },
  {
    type: MODAL_TYPES.SHOW_APPLICATION_ID,
    component: ShowID,
    title: 'Application Unique ID',
    icon: 'help circle',
    size: 'tiny'
  }
];
