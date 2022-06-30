import { createContext, useEffect, useState } from "react";

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
        const response = await fetch('https://aqueous-island-57820.herokuapp.com/feedback')
        const data = await response.json()
        //await timeout(3000) //forces wait for 3 sec
        // data.sort((a, b) => (a.id > b.id) ? -1 : 1)
        setFeedback(data.feedbackItems)
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

    const add = async (rating, text, id=null) =>{
        if (!id) {
            const reqbody = {rating, text}
            //console.log("about to send", reqbody)
            const response = await fetch('feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reqbody)
            })
            const newFeedback = await response.json()
            setFeedback(x=>[ newFeedback, ...x].sort((a, b) => (a.updatedAt > b.updatedAt) ? -1 : 1))
            return
        } 
        const reqbody = {text, rating}
        // const updatedFeedback = feedback.map(el => el.id === id ? {id, text, rating} : el)
        const response = await fetch(`feedback/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reqbody)
        })

        await response.json()
        setFeedback(x=>{
            return x.map(el=>el._id===id ? {...el, text, rating}: el)
        })
        // setFeedback(x=>[ newFeedback, ...x].sort((a, b) => (a.id > b.id) ? -1 : 1))
    }

    const remove = async (id) =>{
        if (window.confirm("Are you sure you want to delete this?")){
            await fetch(`https://aqueous-island-57820.herokuapp.com/feedback/${id}`, {
                method: 'DELETE',
            })
            setFeedback(arr=>arr.filter((el)=>el._id!==id))
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