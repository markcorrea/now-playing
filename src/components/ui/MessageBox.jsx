import React from 'react'

export default class MessageBox extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.show()
    }, 2000)
  }

  render() {
    return (
      <div className={'status-box s-' + this.props.type}>
        {this.props.message}
        <div className='close-icon' onClick={this.props.show}>
          <i className='fa fa-times' />
        </div>
      </div>
    )
  }
}
