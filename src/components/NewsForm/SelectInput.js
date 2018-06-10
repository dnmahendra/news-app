import React, { Component } from 'react'

class SelectInput extends Component {
  render () {
    const { input, label, options } = this.props
    let renderOptions
    if (options) {
      renderOptions = options.map((option) => {
        return (
          <option key={option} value={option}>{option}</option>
        )
      })
    }
    return (
      <div>
        <label className='label'>{label}</label>
        <select
          className="select-input"
          name={input.name}
          value={input.value}
          onChange={input.onChange}
          onBlur={input.onBlur}
          onFocus={input.onFocus}
        >
          {renderOptions}
        </select>
      </div>
    )
  }
}

SelectInput.propTypes = {

}

export default SelectInput
