import { createContext, useEffect, useState, useRef } from "react";

const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) =>{

    const [feedback, setFeedback] = useState([])
    const [loading, setLoading] = useState(false)
    const myRef = useRef(null)

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

    //scroll back to form upon trying to edit
    const executeScroll = () => {
        console.log("Execute scroll invoked")
        myRef.current.scrollIntoView() 
    }

    const sortByUpdatedAt = (arr) =>{
        return arr.sort((a, b) => (a.updatedAt > b.updatedAt) ? -1 : 1)
    }

    //Fetch feedback
    const fetchFeedback = async () =>{
        setLoading(true)
        const response = await fetch('https://aqueous-island-57820.herokuapp.com/feedback')
        const data = await response.json()
        //await timeout(3000) //forces wait for 3 sec
        // data.sort((a, b) => (a.id > b.id) ? -1 : 1)
        setFeedback(sortByUpdatedAt(data.feedbackItems))
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
            const response = await fetch('https://aqueous-island-57820.herokuapp.com/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reqbody)
            })
            const newFeedback = await response.json()
            setFeedback(x=>sortByUpdatedAt([ newFeedback, ...x]))
            return
        } 
        const reqbody = {text, rating}
        const response = await fetch(`https://aqueous-island-57820.herokuapp.com/feedback/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reqbody)
        })

        const {status, updated}= await response.json()
        if (status==="Success") {
         setFeedback(x=>sortByUpdatedAt([updated, ...x]))
        } else{
            console.log("Patch Request failed: ")
            console.log(status, updated)
        }
    }

    const remove = async (id) =>{
        if (window.confirm("Are you sure you want to delete this?")){
            await fetch(`https://aqueous-island-57820.herokuapp.com/feedback/${id}`, {
                method: 'DELETE',
            })
            setFeedback(arr=>arr.filter((el)=>el._id!==id).sort((a, b) => (a.updatedAt > b.updatedAt) ? -1 : 1))
        }
    }

    return <FeedbackContext.Provider value = {{
            feedback,
            editFeedback,
            loading,
            myRef,
            remove,
            add,
            updateFeedback,
            closeFeedbackEditing,
            executeScroll
    }}>
        {children}

    </FeedbackContext.Provider>
}

export default FeedbackContext