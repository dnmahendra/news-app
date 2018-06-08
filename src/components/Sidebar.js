import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import '../styles/sidebar.css'

class Sidebar extends Component {
  render () {
    const { categories } = this.props

    let renderList
    if (categories) {
      renderList = Object.keys(categories).map((category) => {
        return (
          <div className="category-group">
            <div className="category-content" key={category}>
              <div className="category-name">{category}</div>
              <div classname="category-count">{categories[category]}</div>
            </div>
            <div className="add-icon">
              <FontAwesomeIcon icon={faPlusCircle} size='2x' />
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

export default Sidebar
