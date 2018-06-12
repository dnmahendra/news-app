import React, { Component } from 'react'
import { connect } from 'react-redux'
import Sidebar from './Sidebar'
import NewsList from './NewsList'
import { fetchNewsByCategory } from '../actions/news'
import { fetchNewsData } from '../actions/shared'
import isEqual from 'lodash/isEqual'
import '../styles/home.css'

class Home extends Component {
  componentDidUpdate (prevProps) {
    if (!isEqual(prevProps.match, this.props.match)) {
      const { dispatch, match } = this.props

      const category = match.params.category
      if (category) {
        dispatch(fetchNewsByCategory(category))
      } else {
        dispatch(fetchNewsData())
      }
    }
  }
  render() {
    const { newsList, totals, listCount, limit } = this.props

    return (
      <div className="news-container">
        <div className="sidebar">
          <Sidebar categories={totals}/>
        </div>
        <div className="main">
          <NewsList newsList={newsList} listCount={listCount} limit={limit} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const totals = state.news.totals
  let listCount = 0

  if (ownProps.match.params.category) {
    listCount = totals[`${ownProps.match.params.category}`]
  } else {
    Object.keys(totals).forEach((key) => {
      listCount = listCount + totals[key]
    })
  }

  return {
    newsList: state.news.newsList,
    totals,
    listCount,
    limit: state.news.limit
  }
}

export default connect(mapStateToProps)(Home)
