import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenSquare } from '@fortawesome/free-solid-svg-icons'
import slice from 'lodash/slice'

class Newlist extends Component {
  constructor (props) {
    super(props)
    this.state = {
      endAt: 11
    }
  }
  componentDidMount() {
    this.refs.iScroll.addEventListener("scroll", this.handleScroll)
  }

  componentWillUnmount() {
    this.refs.iScroll.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    if (this.refs.iScroll.scrollTop + this.refs.iScroll.clientHeight >= this.refs.iScroll.scrollHeight - 20 && (this.state.endAt < this.props.listCount)){
      this.loadMoreItems()
    }
  }

  loadMoreItems = () => {
    const endAt = this.state.endAt + 10
    this.setState({ endAt: endAt })
  }
  displayNewsList = (newsList) => {
    const { endAt } = this.state
    const slicedArr = slice(newsList, 0, endAt)
    return slicedArr.map((item) => {
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
  listCount: PropTypes.number
}

export default connect(null)(Newlist)
