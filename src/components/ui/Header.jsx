import React from 'react'
import { inject, observer } from 'mobx-react'
import userImage from '../../media/images/userMarcus.jpg'

@inject('TrendingController')
@observer

export default class Header extends React.Component {

    constructor(props) {
        super(props)
        this.TrendingController = props.TrendingController
    }

    render() {
        return (
            <div className='npheader'>
                <div className='logo'>
                    <i className="fa fa-headphones"></i>
                </div>
                <div className='header-now-playing-on'>
                    <span>#nowPlaying on:</span> {this.TrendingController.currentCity}
                </div>
                <div className='user-image'>
                    <img alt='user' src={userImage} />
                </div>
                <div className='welcome-message'><span className='primary-font'>Welcome,</span><span className='primary-font-b'> Marcus Corrêa!</span></div>
            </div>
        )
    }
}