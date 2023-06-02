import React from 'react'
import './Post.scss'
import Avatar from '../Avatar/Avatar'
import postImg3  from './../../assests/nature2.avif'
import {AiOutlineHeart} from 'react-icons/ai'

function Post({post}) {
  return (
    <div className='post'>
        <div className="heading">
            <Avatar />
            <h4>Anuj kumar Sharma</h4>
        </div>
        <div className="content">
            <img src={postImg3} alt="post img" />
        </div>
        <div className="footer">
            <div className="like">
                <div className='likesCount'>
                    <AiOutlineHeart className='likeIcon hover-link'/>
                    <h4>4 likes</h4>
                </div>
                <div className="postTime">
                    <p>01-06-2023</p>
                </div>
            </div>
            <div className="postCaption">
                <p>Nature is a wondrous tapestry of beauty and balance, captivating our senses and nourishing our souls. It encompasses the vast landscapes, vibrant flora, and diverse fauna that surround us. From towering mountains to serene forests. </p>
            </div>
        </div>
    </div>
  )
}

export default Post