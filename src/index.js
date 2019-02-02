import React from 'react'
import { render } from 'react-dom'
import '../favicon.ico'
import './media/styles/main.scss'
import '@babel/polyfill'

import Trending from './components/Trending/Trending'
render(
  <div>
    <Trending />
  </div>,
  document.getElementById('root')
)
