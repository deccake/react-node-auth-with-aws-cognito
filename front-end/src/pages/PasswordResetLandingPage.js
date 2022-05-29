import axios from 'axios'
import {useState} from 'react'
import { useParams } from 'react-router-dom'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { useQueryParams } from '../util/useQueryParams'
import { PasswordResetFail } from './PasswordResetFail'
import { PasswordResetSuccess } from './PasswordResetSuccess'

export const PasswordResetLandingPage = ()=>{
    const [isFailure,setIsFailure] = useState(false)
    const [isSuccess,setIsSuccess] = useState(false)


    const [newPasswordValue,setNewPasswordValue] = useState('')
    const [confirmPasswordValue,setConfirmPasswordValue] = useState('')
    const [errorMessage,setErrorMessage] = useState(false);
    const [passwordResetCode,setPasswordResetCode] = useState('')

    const {email} = useQueryParams()

    const history = useHistory()

    const onResetPasswordClick = async ()=>{
        try {
            await axios.put(`/api/users/${passwordResetCode}/reset-password`,{newPassword:newPasswordValue,email})
            setIsSuccess(true)  
        } catch (error) {
            setIsFailure(true)
        }
    }
    

    if(isFailure) return <PasswordResetFail />
    if(isSuccess) return <PasswordResetSuccess />

    return (
        <div className="content-container">
            <h1>Reset Password</h1>
            {errorMessage && <div className='fail'>{errorMessage}</div>}
            <input type="password"
               placeholder="new password" 
               value={newPasswordValue}
               onChange={e => setNewPasswordValue(e.target.value)}
            />
            <input type="password"
               placeholder="confirm password" 
               value={confirmPasswordValue}
               onChange={e => setConfirmPasswordValue(e.target.value)}
            />
             <input type="password"
               placeholder="password reset code" 
               value={passwordResetCode}
               onChange={e => setPasswordResetCode(e.target.value)}
            />
            <button
            disabled={!newPasswordValue || !confirmPasswordValue || !passwordResetCode || newPasswordValue !== confirmPasswordValue}
            onClick={onResetPasswordClick}
            >Reset Password</button>

        </div>
    )
}