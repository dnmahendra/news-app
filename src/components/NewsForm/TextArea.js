import React, { Component } from 'react'

class TextArea extends Component {
  render () {
    const { input, label, type } = this.props

    return (
      <div>
        <label className='label'>{label}</label>
        <textarea
          value={input.value}
          onChange={input.onChange}
          name={input.name}
          className='text-area'
          onBlur={input.onBlur}
          onFocus={input.onFocus}
          type={type}
        />
      </div>
    )
  }
}

TextArea.propTypes = {

}

export default TextArea
