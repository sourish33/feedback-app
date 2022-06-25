
import { useContext } from 'react'
import FeedbackContext from '../context/FeedbackContext'

function FeedbackStats() {

  const {feedback} = useContext(FeedbackContext)

    let avgRating = parseInt(feedback.reduce((acc,cur)=>acc+cur.rating, 0)/feedback.length)
    avgRating = isNaN(avgRating) ? 0 : avgRating.toFixed(1).replace(/[.,]0$/,'')
  return (
    <div className='feedback-stats'>
        <h4>{feedback.length} Reviews</h4>
        <h4>Average Rating: {avgRating}</h4>
    </div>
  )
}


export default FeedbackStats
