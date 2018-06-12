import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { fetchMoreNews } from '../actions/news'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenSquare } from '@fortawesome/free-solid-svg-icons'

class Newlist extends Component {
  componentDidMount() {
    this.refs.iScroll.addEventListener("scroll", this.handleScroll)
  }

  componentDidUpdate (prevProps) {
    if (prevProps.limit > this.props.limit) {
      this.refs.iScroll.scrollTop = 0
    }
  }

  componentWillUnmount() {
    this.refs.iScroll.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    if (this.refs.iScroll.scrollTop + this.refs.iScroll.clientHeight >= this.refs.iScroll.scrollHeight - 2 && (this.props.limit < this.props.listCount)){
      this.loadMoreItems()
    }
  }

  loadMoreItems = () => {
    const category = this.props.match.params.category
    if (category) {
      this.props.dispatch(fetchMoreNews(this.props.limit, category))
    } else {
      this.props.dispatch(fetchMoreNews(this.props.limit))
    }
  }
  displayNewsList = (newsList) => {
    return newsList.map((item) => {
      return (
        <div key={item.key} className="article">
            <p className="header">{item.title}</p>
            <div className="section">
              <div className="image">
                <img src={item.urlToImage} alt="article"></img>
              </div>
              <p>{item.description}</p>
              <Link to={`edit-news/${item.key}`}>
                <FontAwesomeIcon icon={faPenSquare} size='2x' className="edit" />
              </Link>
            </div>
        </div>
      )
    })
  }
  render () {
    const { newsList } = this.props
    let renderNewsList
    if (newsList) {
      renderNewsList = this.displayNewsList(newsList)
    }

    return (
      <div ref="iScroll" className="news-list">
        {renderNewsList}
      </div>
    )
  }
}

Newlist.propTypes = {
  newsList: PropTypes.array,
  listCount: PropTypes.number,
  limit: PropTypes.number
}

export default connect(null)(withRouter(Newlist))
