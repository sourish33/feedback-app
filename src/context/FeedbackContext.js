import { createContext, useEffect, useState } from "react";
import uuid from "react-uuid";

const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) =>{

    const [feedback, setFeedback] = useState([])
    const [loading, setLoading] = useState(false)

    const [editFeedback, setEditFeedback] = useState({
        item: {},
        edit: false
    })

    useEffect(()=>{
        fetchFeedback()
    }, [])

    // function timeout(ms) {
    //     return new Promise(resolve => setTimeout(resolve, ms));
    // }

    //Fetch feedback
    const fetchFeedback = async () =>{
        setLoading(true)
        const response = await fetch('/feedback?_sort=id&order=desc')
        const data = await response.json()
        //await timeout(3000) //forces wait for 3 sec
        setFeedback(data)
        setLoading(false)
    }

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
            const newFeedback = {id: uuid(), rating: rating, text: text}
            setFeedback(x=>[ newFeedback, ...x])
            return
        } 
        const updatedFeedback = feedback.map(el => el.id === id ? {id, text, rating} : el)
        setFeedback(updatedFeedback)
    }

    const remove = (id) =>{
        if (window.confirm("Are you sure you want to delete this?")){
            setFeedback(arr=>arr.filter((el)=>el.id!==id))
        }
    }

    return <FeedbackContext.Provider value = {{
            feedback,
            editFeedback,
            loading,
            remove,
            add,
            updateFeedback,
            closeFeedbackEditing
    }}>
        {children}

    </FeedbackContext.Provider>
}

export default FeedbackContext