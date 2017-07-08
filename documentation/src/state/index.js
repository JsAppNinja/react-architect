import { combineReducers } from 'redux';

import helmet from './helmet';
import docgens from './docgens';
import search from './search';
import theme from './theme';
import media from './media';
import drawer from './drawer';
import github from './github';
import quickNav from './quickNav';
import sassdocs from './sassdocs';
import sassdocFab from './sassdocFab';
import routing from './routing'; // until react-router-redux@5

export default combineReducers({
  docgens,
  helmet,
  theme,
  search,
  github,
  media,
  drawer,
  quickNav,
  sassdocs,
  sassdocFab,
  routing,
});
