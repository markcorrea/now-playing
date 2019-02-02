import React from 'react'

export default class Loader extends React.Component {
  render() {
    return (
      <div className='spinner'>
        <i className='fa fa-cog fa-spin' />
      </div>
    )
  }
}
