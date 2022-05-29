import { useEffect } from "react"
import { useHistory } from "react-router-dom"
import { useQueryParams } from "../util/useQueryParams"

export const PleaseVerifyEmailPage = ()=> {
    const history = useHistory()
    const {email} = useQueryParams()

    useEffect(()=>{
        setTimeout(()=>{
            history.push(`/verify-email?email=${encodeURIComponent(email)}`)
        },3000)
    },[history,email])

    return(
        <div className="content-container">
            <h1>Thanks for signup</h1>
            <p>A verification code is sent to your email address please verify before you make any changes</p>
        </div>
    )
}