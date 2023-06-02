import React from 'react'
import './Follower.scss'
import Avatar from '../Avatar/Avatar'

function Follower() {
  return (
    <div className='follower'>
        <Avatar />
        <div className="aside">
          <h4>Robin Shrivastav</h4>
          <h5 className='followLink hover-link'>Follow</h5>
        </div>
    </div>
  )
}

export default Follower