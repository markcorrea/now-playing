import React, { Component } from 'react'
import { Provider } from 'mobx-react'
import { TrendingController } from './TrendingController'
import { TrendingList } from './TrendingList'
import Header from '../ui/Header.jsx'
import Footer from '../ui/Footer.jsx'

export default class Trending extends Component {
  constructor(props) {
    super(props)
    this.TrendingController = new TrendingController(this.store)
  }

  render() {
    return (
      <Provider TrendingController={this.TrendingController}>
        <div>
          <Header />
          <TrendingList />
          <Footer />
        </div>
      </Provider>
    )
  }
}
