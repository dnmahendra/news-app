import firebase from '../firebase'

export const ADD_NEWS = 'ADD_NEWS'
export const EDIT_NEWS = 'EDIT_NEWS'

function addNews (news) {
  return {
    type: ADD_NEWS,
    news,
  }
}

function editNews (id) {
  return {
    type: EDIT_NEWS,
    id,
  }
}

export function handleAddNews (news) {
  return async (dispatch) => {
    try {
      dispatch(addNews(news))
    } catch (error) {
      alert('There was an error. Try again.')
    }
  }
}

export function handleEditNews (news) {
  return async (dispatch) => {
    try {
      dispatch(editNews(news.id))
    } catch (error) {
      alert('An error occurred. Try again.')
    }
  }
}
