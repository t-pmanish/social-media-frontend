import React, { useEffect, useState } from 'react'
import './Follower.scss'
import Avatar from '../Avatar/Avatar'
import { useDispatch, useSelector } from 'react-redux'
import { followAndUnfollowUser } from '../../redux/slices/feedSlice'
import { useNavigate } from 'react-router-dom'

function Follower({user}) {


  const dispatch = useDispatch()
  const navigate = useNavigate()
  const feedData = useSelector((store)=>store.feedReducer.feedData)
  const [isFollowing,setIsFollowing] = useState()

  useEffect(()=>{
    
     if(feedData?.followings?.find(item => item._id === user._id)){
      setIsFollowing(true)
     }else{
      setIsFollowing(false)
     }

  },[dispatch,feedData])


  const handleUserFollow = () =>{
      dispatch(followAndUnfollowUser({
        userIdToFollow:user._id
      }))
  }


  return (
    <div className='follower'>
        <Avatar src={user?.avatar?.url} />
        <div className="aside">
          <h4  className='hover-link' onClick={()=> navigate(`/profile/${user._id}`)} >{user?.name}</h4>
          <h5 className='followLink hover-link' onClick={handleUserFollow}>
            {isFollowing ? 'Unfollow':'Follow'}
          </h5>
        </div>
    </div>
  )
}

export default Follower