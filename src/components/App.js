import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Nav from './Nav'
import Home from './Home'
import NewsForm from './NewsForm'
import LoadingBar from 'react-redux-loading'

class App extends Component {
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
                <Switch>
                  <Route path='/' exact component={Home} />
                  <Route path='/category/:category' component={Home} />
                  <Route path='/add-news' component={NewsForm} />
                  <Route path="/edit-news/:key" component={NewsForm} />
                </Switch>
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
