import React, { Component } from 'react'

class TextInput extends Component {
  render () {
    const { input, label, type } = this.props

    return (
      <div>
        <label className='label'>{label}</label>
        <input
          value={input.value}
          onChange={input.onChange}
          name={input.name}
          className='input'
          onBlur={input.onBlur}
          onFocus={input.onFocus}
          type={type}
        />
      </div>
    )
  }
}

TextInput.propTypes = {

}

export default TextInput
