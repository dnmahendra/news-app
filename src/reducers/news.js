import {
  ADD_NEWS,
  EDIT_NEWS,
  RECEIVE_MORE_NEWS
} from '../actions/news'
import update from 'react-addons-update'

import {
  RECEIVE_DATA
} from '../actions/shared'

const initialState = {newsList: [], totals: {}, startAt: 0}

export default function news (state = initialState, action) {
  switch(action.type) {
    case ADD_NEWS:
      return update(
        state, {
          newsList: {$push: [action.news.article]},
          totals: {$set: {[`${action.news.article.category}`]: action.news.categoryCount}}
      })
    case EDIT_NEWS:
      const newData = state.newsList.map((item) => {
        if (item.key === action.key) {
          return action.news
        } else {
          return item
        }
      })

      return update(
        state, {
          newsList: {$set: newData}
        }
      )
    case RECEIVE_DATA:
      return action.news
    case RECEIVE_MORE_NEWS:
      return update(
        state, {
          newsList: {$set: action.news.newsList},
          limit: {$set: action.news.limit}
      })
    default :
      return state
  }
}
