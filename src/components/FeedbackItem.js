import { FaTimes, FaEdit } from 'react-icons/fa'
import React from 'react'
import Card from './shared/Card'
import { useContext } from 'react'
import FeedbackContext from '../context/FeedbackContext'



function FeedbackItem({item}) {

    const {id, rating, text} = item
    const {remove} = useContext(FeedbackContext)

  return (
    <Card>
        <div className="num-display">{rating}</div>
        <button onClick={()=>remove(id)} className="close">
            <FaTimes color='purple'/>
        </button>
        <button className="edit">
            <FaEdit color="purple"/>
        </button>
        <div className="text-display">
            {text}
        </div>
    </Card>
  )
}

export default FeedbackItem
