import React from "react"
import Card from "./shared/Card"
import { useState, useContext, useEffect } from "react"
import Button from "./shared/Button"
import RatingSelect from "./RatingSelect"
import FeedbackContext from '../context/FeedbackContext'

function FeedbackForm() {

    const {add, editFeedback, closeFeedbackEditing} = useContext(FeedbackContext)
    const [text, setText] = useState("")
    const [rating, setRating] = useState(10)

    const getRating = (ratingVal) => {
        // console.log("About to set rating to", ratingVal)
        setRating(ratingVal)
    }
    const sendNewRatingInfo = (e)  =>{
        e.preventDefault()
        if (editFeedback.edit){
            add(rating, text, editFeedback.item.id)
            closeFeedbackEditing()
        } else {
        add(rating, text)
        }
        setText("")
    }
    const handleTextChange = (e) => {
        setText(e.target.value)
    }

    useEffect(()=>{
        // console.log(editFeedback)
        if (editFeedback.edit){
            setRating(editFeedback.item.rating)
            setText(editFeedback.item.text)
        }
    }, [editFeedback])

    return (
        <Card>
            <h2>How would you rate your experience?</h2>
            <RatingSelect getRating={getRating}/>
            <form onSubmit={sendNewRatingInfo}>
                <div className="input-group">
                    <input
                        onChange={handleTextChange}
                        type="text"
                        placeholder="Write your response"
                        value={text}
                    />
                    <Button type="submit" version="secondary" isDisabled={text.length<11 ? true :false} sendNewRatingInfo = {sendNewRatingInfo}>
                        Send
                    </Button>
                </div>
            </form>
            <div className="message">{text.length>0 && text.length<11? "At least 10 characters required" : null} </div>
        </Card>
    )
}

export default FeedbackForm
