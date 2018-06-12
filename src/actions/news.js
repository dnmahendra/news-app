import fire from '../firebase'
import { showLoading, hideLoading } from 'react-redux-loading'
import merge from 'lodash/merge'
import {
  receiveData
} from './shared'

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

export function fetchMoreNews (limit = 10, category) {
  return async (dispatch) => {
    dispatch(showLoading())
    const newsRef = fire.database().ref('news')
    let data
    limit = limit + 10
    if (category) {
      data = await newsRef.orderByChild('category').equalTo(category).limitToFirst(limit).once('value')
    } else {
      data = await newsRef.orderByChild('publishedAt').limitToFirst(limit).once('value')
    }

    let newsList = []
    data.forEach((item) => {
      newsList.push(
        merge(item.val(), {key: item.key})
      )
    })
    const news = {
      newsList,
      limit,
    }

    dispatch(receiveMoreNews(news))
    dispatch(hideLoading())
  }
}

export function fetchNewsByCategory (category) {
  return async (dispatch) => {
    dispatch(showLoading())
    const newsRef = fire.database().ref('news')
    const data = await newsRef.orderByChild('category').equalTo(category).limitToFirst(10).once('value')
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
      limit: 10,
    }

    dispatch(receiveData(news))
    dispatch(hideLoading())
  }
}
