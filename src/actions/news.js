import fire from '../firebase'
import { showLoading, hideLoading } from 'react-redux-loading'
import merge from 'lodash/merge'

export const ADD_NEWS = 'ADD_NEWS'
export const EDIT_NEWS = 'EDIT_NEWS'
export const RECEIVE_MORE_NEWS = 'RECEIVE_MORE_NEWS'

function addNews (news) {
  return {
    type: ADD_NEWS,
    news,
  }
}

function editNews (news, key) {
  return {
    type: EDIT_NEWS,
    news,
    key
  }
}

export function handleAddNews (news) {
  return async (dispatch, getState) => {
    try {
      dispatch(showLoading())
      const category = news.newsCategory || 'business'
      const categoryCount = getState().news.totals[`${category}`] + 1
      let article = {
        title: news.newsTitle || '',
        description: news.newsContent || '',
        category,
        author: news.newsAuthor || '',
        urlToImage: news.newsThumbnail || '',
        publishedAt: news.publishDate || '',
      }
      const db = fire.database()
      const newsRef = db.ref('news')
      const data = await newsRef.push(article)

      article = merge(article, {key: data.key})

      const totalRef = db.ref('totals/-LEXc7KHWj707rkg14Zh')
      await totalRef.update({[`${category}`]: categoryCount})

      dispatch(addNews({article, categoryCount}))
      dispatch(hideLoading())
    } catch (error) {
      alert(error)
    }
  }
}

export function handleEditNews (news, key) {
  return async (dispatch, getState) => {
    try {
      dispatch(showLoading())
      let article = {
        title: news.newsTitle || '',
        description: news.newsContent || '',
        category: news.newsCategory,
        author: news.newsAuthor || '',
        urlToImage: news.newsThumbnail || '',
        publishedAt: news.publishDate || '',
      }
      const db = fire.database()
      const newsRef = db.ref(`news/${key}`)
      await newsRef.set(article)

      article = merge(article, {key: key})

      dispatch(editNews(article, key))
      dispatch(hideLoading())
    } catch (error) {
      alert(error)
    }
  }
}

export function receiveMoreNews (news) {
  return {
    type: RECEIVE_MORE_NEWS,
    news,
  }
}

export function fetchMoreNews (startAt = 0, limit = 10) {
  return async (dispatch) => {
    dispatch(showLoading())
    if (startAt > 0) {
      startAt = startAt * limit + 1
    }
    const newsRef = fire.database().ref('news')
    const data = await newsRef.orderByKey().startAt(startAt).limitToFirst(limit).once('value')

    let newsList = []
    data.forEach((item) => {
      newsList.push(
        merge(item.val(), {key: item.key})
      )
    })
    const news = {
      newsList,
      startAt
    }

    dispatch(receiveMoreNews(news))
    dispatch(hideLoading())
  }
}
