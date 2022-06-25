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

    const add = (rating, text) =>{
        
        const newFeedback = {id: uuid(), rating: rating, text: text}
        setFeedback(x=>[ newFeedback, ...x])
    }

    const remove = (id) =>{
        console.log("Hello!!!")
        if (window.confirm("Are you sure you want to delete this?")){
            setFeedback(arr=>arr.filter((el)=>el.id!==id))
        }
    }

    return <FeedbackContext.Provider value = {{
            feedback,
            remove,
            add
    }}>
        {children}

    </FeedbackContext.Provider>
}

export default FeedbackContext