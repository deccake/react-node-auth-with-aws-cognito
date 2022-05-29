import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useToken } from "../auth/useToken"
import { EmailVerificationFail } from "./EmailVerificationFail"
import { EmailVerificationSuccess } from "./EmailVerificationSuccess"

export const EmailVerificationLandingPage = ()=>{
    const [isLoading,setIsLoading] = useState(true)
    const [isSuccess,setIsSuccess] = useState(false)
    const {verificationString} = useParams()
    const [,setToken] = useToken()

   

    useEffect(()=>{
        console.log('verificationString',verificationString)
        const loadVerification = async ()=>{
            try {
                const res = await axios.put(`/api/verify-email`,{
                    verificationString
                })
                console.log('res',res)
                const {token} = res.data;
                setToken(token)
                setIsSuccess(true)
                setIsLoading(false)    
            } catch (error) {
                console.log('error',error)
                setIsSuccess(false)
                setIsLoading(false)    
            }
            
        }
        loadVerification()
    },[setToken,verificationString])

    if(isLoading) return <p>Loading...</p>
    if(!isSuccess) return <EmailVerificationFail />

    return <EmailVerificationSuccess />
}