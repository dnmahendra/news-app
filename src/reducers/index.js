import { combineReducers } from 'redux'

import news from './news'
import { loadingBarReducer } from 'react-redux-loading'
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
  news,
  loadingBar: loadingBarReducer,
  form: formReducer,
})
