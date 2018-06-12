import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { Link, withRouter } from 'react-router-dom'
import '../styles/sidebar.css'

class Sidebar extends Component {
  render () {
    const { categories } = this.props

    let renderList
    if (categories) {
      renderList = Object.keys(categories).map((category) => {
        return (
          <div className="category-group" key={category}>
            <div className="category-content" key={category}>
              <Link to={`/category/${category}`}>
                <div className="category-name">{category}</div>
                <div className="category-count">{categories[category]} News</div>
              </Link>
            </div>
            <div className="add-icon">
              <Link className="link-icon" to={`/add-news?category=${category}`}>
                <FontAwesomeIcon icon={faPlusCircle} size='2x' />
              </Link>
            </div>
          </div>
        )
      })
    }
    return (
      <div className="category-list">
        {renderList}
      </div>
    )
  }
}

Sidebar.propTypes = {
  categories: PropTypes.object,
}

export default connect(null)(withRouter(Sidebar))
