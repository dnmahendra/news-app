import fire from '../firebase'
import { showLoading, hideLoading } from 'react-redux-loading'
import merge from 'lodash/merge'

export const RECEIVE_DATA = 'RECEIVE_DATA'

function receiveData (news) {
  return {
    type: RECEIVE_DATA,
    news
  }
}

export function fetchNewsData () {
  return async (dispatch) => {
    dispatch(showLoading())

    const newsRef = fire.database().ref('news')
    const data = await newsRef.orderByChild('publishedAt').once('value')
    const totalsRef = fire.database().ref('totals')
    const totalsData = await totalsRef.once('value')

    let totals = {}
    totalsData.forEach((item) => {
      totals = item.val()
    })
    let newsList = []
    data.forEach((item) => {
      newsList.push(
        merge(item.val(), {key: item.key})
      )
    })
    const news = {
      newsList,
      totals,
    }
    dispatch(receiveData(news))
    dispatch(hideLoading())
  }
}
