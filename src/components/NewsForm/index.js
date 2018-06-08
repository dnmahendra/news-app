import React, { Component } from 'react'
import TextInput from './TextInput'
import PropTypes from 'prop-types'
import {
  Field,
  reduxForm
} from 'redux-form'

class NewsForm extends Component {
  onSubmit = (values, dispatch) => {
  }

  render () {
    const { handleSubmit } = this.props

    return (
      <form>
        <Field
          name="newsTitle"
          label="Title"
          component={TextInput} />
        <Field
          name="newsSubTitle"
          label="Subtitle"
          component={TextInput} />
        <Field
          name="newsContent"
          label="Content"
          component={TextInput} />
        <Field
          name="newsThumbnail"
          label="Thumbnail"
          component={TextInput} />
        <Field
          name="newsAuthor"
          label="Author"
          component={TextInput} />
        <Field
          name="publishDate"
          label="Publish Date"
          component={TextInput} />
        <button style={{ margin: 10 }} block warning onPress={handleSubmit(this.onSubmit)}>
          <text>Submit</text>
        </button>
      </form>
    )
  }
}

NewsForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object
}

export default reduxForm({ form: 'news' })(NewsForm)
