import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import LoadingBar from 'react-redux-loading'
import {
  fetchNewsData
} from '../actions/shared'
import Nav from './Nav'
import Home from './Home'

class App extends Component {
  componentDidMount () {
    const { dispatch } = this.props

    dispatch(fetchNewsData())
  }
  render() {
    const { loading } = this.props

    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className='container'>
            <Nav />
            {loading === true
              ? null
              : <Fragment>
                  <Route path='/' exact component={Home} />
                </Fragment>}
          </div>
        </Fragment>
      </Router>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.loading
  }
}

export default connect(mapStateToProps)(App)
