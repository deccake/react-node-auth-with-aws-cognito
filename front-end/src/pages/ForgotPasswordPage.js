import {useState} from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

export const ForgotPasswordPage = ()=>{
    const [emailValue,setEmailValue] = useState('')
    const [errorMessage,setErrorMessage] = useState('')
    const [success,setSuccess] = useState(false)

    const history = useHistory()

    const onSubmitLink = async ()=>{
        try {
            await axios.put(`/api/forgot-password/${emailValue}`)
            setSuccess(true)
            setTimeout(()=>{
                history.push(`/reset-password?email=${encodeURIComponent(emailValue)}`)
            },3000)
        } catch (error) {
            setErrorMessage(error.message)
        }
    }

    return success ? (
        <div className="content-container">
            <h1>Success</h1>
            <p>Check your email for reset link</p>
        </div>
    ):(
        <div className="content-container">
            <h1>Forgot Password</h1>
            <p>Enter your email we will send you reset link</p>
            {errorMessage && <div className='fail'>{errorMessage}</div>}
            <input type="text"
            placeholder='someone@gmail.com'
            value={emailValue}
            onChange={e => setEmailValue(e.target.value)}
            />
            <button
            disabled={!emailValue}
            onClick={onSubmitLink}
            >Send Reset Link</button>
        </div>
    )
    
}