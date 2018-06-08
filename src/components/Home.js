import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Sidebar from './Sidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenSquare } from '@fortawesome/free-solid-svg-icons'
import '../styles/home.css'

class Home extends Component {
  render() {
    const { newsList, totals } = this.props

    let renderNewsList
    if (newsList) {
      renderNewsList = newsList.map((item) => {
        return (
          <div key={item.key}>
            <Link to={`news/${item.key}`}>
              <p>{item.title}</p>
              <div className="article-section">
                <img className="article-image" src={item.urlToImage} alt="article"></img>
                <p>{item.description}</p>
                <FontAwesomeIcon icon={faPenSquare} size='2x' />
              </div>
            </Link>
          </div>
        )
      })
    }

    return (
      <div className="news-container">
        <div className="sidebar">
          <Sidebar categories={totals}/>
        </div>
        <div className="main">
          <div className="news-list">
            {renderNewsList}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    newsList: state.news.newsList,
    totals: state.news.totals
  }
}

export default connect(mapStateToProps)(Home)
