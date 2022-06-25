import { createContext, useState } from "react";
import uuid from "react-uuid";

const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) =>{

    const [feedback, setFeedback] = useState([
        {
            id: 101,
            text: "This is from context",
            rating: 3
        },
        {
            id: 102,
            text: "This too is from context",
            rating: 4
        },
        {
            id: 103,
            text: "As is this from context",
            rating: 7
        }
    ])

    const [editFeedback, setEditFeedback] = useState({
        item: {},
        edit: false
    })

    const updateFeedback = (item) =>{
        setEditFeedback({
            item, 
            edit: true
        })
    }

    const closeFeedbackEditing = () =>{
        setEditFeedback(x=>{
            const newEditFeedback = {...x, edit: false}
            return newEditFeedback
        })
    }

    const add = (rating, text, id=null) =>{
        if (!id) {
            console.log('going into id null, id: '+id)
            const newFeedback = {id: uuid(), rating: rating, text: text}
            setFeedback(x=>[ newFeedback, ...x])
            return
        } 
        console.log('going into id NOT null, id: '+id)
        const updatedFeedback = feedback.map(el => el.id === id ? {id, text, rating} : el)
        setFeedback(updatedFeedback)
    }

    const remove = (id) =>{
        console.log("Hello!!!")
        if (window.confirm("Are you sure you want to delete this?")){
            setFeedback(arr=>arr.filter((el)=>el.id!==id))
        }
    }

    return <FeedbackContext.Provider value = {{
            feedback,
            editFeedback,
            remove,
            add,
            updateFeedback,
            closeFeedbackEditing
    }}>
        {children}

    </FeedbackContext.Provider>
}

export default FeedbackContext