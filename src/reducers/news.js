import {
  ADD_NEWS,
  EDIT_NEWS
} from '../actions/news'

import {
  RECEIVE_DATA
} from '../actions/shared'

export default function news (state = [], action) {
  switch(action.type) {
    case ADD_NEWS :
      return state.concat([action.news])
    case EDIT_NEWS :
      return state.filter((news) => news.id !== action.id)
    case RECEIVE_DATA :
      return action.news
    default :
      return state
  }
}
