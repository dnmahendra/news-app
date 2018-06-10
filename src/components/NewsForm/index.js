import React, { Component } from 'react'
import { connect } from 'react-redux'
import TextInput from './TextInput'
import SelectInput from './SelectInput'
import TextArea from './TextArea'
import { Field, reduxForm } from 'redux-form'
import { handleAddNews, handleEditNews } from '../../actions/news'
import { Redirect } from 'react-router-dom'
import queryString from 'query-string'
import merge from 'lodash/merge'
import '../../styles/form.css'

class NewsForm extends Component {
  constructor () {
    super()
    this.state = {
      toHome: false,
    }
  }
  onSubmit = (values, dispatch) => {
    const { match } = this.props
    if (/edit-news/.test(match.path)) {
      const key = this.props.match.params.key
      dispatch(handleEditNews(values, key))
    } else {
      dispatch(handleAddNews(values))
    }

    this.setState({ toHome: true })
  }

  render () {
    if (this.state.toHome) {
      return (
        <Redirect to='/' />
      )
    }
    const categories = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology']
    const { handleSubmit } = this.props
    return (
      <form className="form-container" onSubmit={handleSubmit(this.onSubmit)}>
        <Field
          name="newsTitle"
          label="Title"
          component={TextInput}
          type="text"
        />
        <Field
          name="newsCategory"
          label="Category"
          component={SelectInput}
          options={categories}
        />
        <Field
          name="newsContent"
          label="Content"
          component={TextArea}
          type="textarea"
        />
        <Field
          name="newsThumbnail"
          label="Thumbnail"
          component={TextInput}
          type="text"
        />
        <Field
          name="newsAuthor"
          label="Author"
          component={TextInput}
          type="text"
        />
        <Field
          name="publishDate"
          label="Publish Date"
          component={TextInput}
          type="datetime-local"
        />
      <button className="btn" type="submit">
        Submit
      </button>
      </form>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  let initialValues = {
    newsTitle: '',
    newsCategory: '',
    newsContent: '',
    newsThumbnail: '',
    newsAuthor: '',
    publishDate: ''
  }
  if (/add-news/.test(ownProps.match.path)) {
    const params = queryString.parse(ownProps.location.search)

    if (params.category) {
      initialValues = merge(initialValues, {newsCategory: params.category})
    }
  } else if (/edit-news/.test(ownProps.match.path)) {
    const article = state.news.newsList.filter((item) => item.key === ownProps.match.params.key)[0]

    const _article = {
      newsTitle: article.title || '',
      newsContent: article.description || '',
      newsCategory: article.category,
      newsAuthor: article.author || '',
      newsThumbnail: article.urlToImage || '',
      publishDate: article.publishedAt || '',
    }

    initialValues = merge(initialValues, _article)
  }

  return {
    initialValues
  }
}

let newsForm = reduxForm({
  form: 'news'
})(NewsForm)

export default connect(mapStateToProps)(newsForm)
