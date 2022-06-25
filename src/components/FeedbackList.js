import React from 'react'
import { useContext } from 'react'
import FeedbackItem from './FeedbackItem'
import FeedbackContext from '../context/FeedbackContext'

function FeedbackList() {

  const {feedback} = useContext(FeedbackContext)

    const feedbackList = (feedback && feedback.length>0) ? (feedback.map(el=>{
        return <FeedbackItem key={el.id} item={el} />
    })) : (<h1>No feedback yet</h1>)
  return (
    <div>
      {feedbackList}
    </div>
  )
}


export default FeedbackList
