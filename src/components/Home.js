import React, { Component } from 'react'
import { connect } from 'react-redux'
import Sidebar from './Sidebar'
import NewsList from './NewsList'
import qs from 'qs'
import '../styles/home.css'

class Home extends Component {
  render() {
    const { newsList, totals, listCount } = this.props

    return (
      <div className="news-container">
        <div className="sidebar">
          <Sidebar categories={totals}/>
        </div>
        <div className="main">
          <NewsList newsList={newsList} listCount={listCount} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const totals = state.news.totals
  let listCount = 0
  Object.keys(totals).forEach((key) => {
    listCount = listCount + totals[key]
  })

  const params = qs.parse(ownProps.location.search.replace(/^\?/, ''))

  let newsList
  if (params.category) {
    newsList = state.news.newsList.filter((item) => item.category === params.category)
  } else {
    newsList = state.news.newsList
  }
  return {
    newsList,
    totals,
    listCount
  }
}

export default connect(mapStateToProps)(Home)
