import { EmailVerificationFail } from "./EmailVerificationFail"
import { EmailVerificationSuccess } from "./EmailVerificationSuccess"
import {useState} from 'react'
import { useQueryParams } from "../util/useQueryParams"
import axios from "axios"
import { useToken } from "../auth/useToken"

export const EmailVerificationCodePage = ()=>{
    const [isSuccess,setIsSuccess] = useState(false)
    const [isFailure,setIsFailure] = useState(false)
    const [,setToken] = useToken()

    const {email} = useQueryParams()

    const [verificationString,setVerificationString] = useState('')


    const onSubmitVerificationString = async ()=>{
        try {
            const res = await axios.put('/api/verify-email',{email,verificationString})
            const {token} = res.data
            setToken(token)
            setIsSuccess(true)
        } catch (error) {
            console.log(error)
            setIsFailure(true)
        }
    }


    if(isSuccess) return <EmailVerificationSuccess />
    if(isFailure) return <EmailVerificationFail />

    return (
        <div className="content-container">
            <h1>Please verify your email</h1>
            <p>You should have recevied verification code at email. Please enter it here</p>
            <input type="text"
            placeholder="eg. 123456"
            value={verificationString}
            onChange={e => setVerificationString(e.target.value)}
            />
            <button onClick={onSubmitVerificationString}>Submit</button>
        </div>
    )
}