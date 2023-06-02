import React from 'react'
import './Avatar.scss'
import avatarImg from './../../assests/hacker.png'

function Avatar({src}) {
  return (
    <div className='avatar'>
        <img src={src? src : avatarImg} alt="user_img" />
    </div>
  )
}

export default Avatar