import React from 'react'
import { useContext } from 'react'
import FeedbackItem from './FeedbackItem'
import FeedbackContext from '../context/FeedbackContext'
import Spinner from './shared/Spinner'

function FeedbackList() {

  const {feedback, loading} = useContext(FeedbackContext)

    const feedbackList = (feedback && feedback.length>0) ? (feedback.map(el=>{
        return <FeedbackItem key={el._id} item={el} />
    })) : (<h1>No feedback yet</h1>)
  return (
    <div>
      {loading? <Spinner/> : feedbackList}
    </div>
  )
}


export default FeedbackList
