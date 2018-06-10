import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import LoadingBar from 'react-redux-loading'
import Nav from './Nav'
import Home from './Home'
import NewsForm from './NewsForm'
import { fetchNewsData } from '../actions/shared'

class App extends Component {
  componentDidMount() {
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
                  <Route path='/add-news' component={NewsForm} />
                  <Route path="/edit-news/:key" component={NewsForm} />
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
