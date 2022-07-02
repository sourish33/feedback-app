
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import AboutIconLink from "./components/AboutIconLink"
import FeedbackForm from "./components/FeedbackForm"
import FeedbackList from "./components/FeedbackList"
import FeedbackStats from "./components/FeedbackStats"
import Header from "./components/Header"
import AboutPage from "./components/pages/AboutPage"
import { FeedbackProvider } from "./context/FeedbackContext"






function App() {

    return (
        <FeedbackProvider>
        <Router>  
            <Header/>      
            <div className="container">
                <Routes>
                    <Route
                        path='/'
                        element={
                            <>
                                <FeedbackForm/>
                                <FeedbackStats/>
                                <FeedbackList/>
                                <AboutIconLink/>
                            </>
                        }
                    />
                    <Route path="/about" element={<AboutPage/>}/>
                </Routes>

            </div>
        </Router>
        </FeedbackProvider>

    )
    }


export default App