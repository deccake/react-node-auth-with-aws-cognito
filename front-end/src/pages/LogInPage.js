import axios from "axios"
import { useState,useEffect } from "react"
import { useHistory } from "react-router-dom"
import { useToken } from "../auth/useToken"
import { useQueryParams } from "../util/useQueryParams"

export const LogInPage = ()=>{
    const [, setToken] = useToken()
    const [errorMessage,setErrorMessage] = useState('')

    const [emailValue,setEmailValue] = useState('')
    const [passwordValue,setPasswordValue] = useState('')
    const [googleOauthUrl,setGoogleOauthUrl] = useState('')

    const {token:oauthToken} = useQueryParams()
    const history = useHistory()

    useEffect(()=>{
        if(oauthToken){
            setToken(oauthToken)
            history.push('/')
        }

        return () => {

        }
    },[history,setToken,oauthToken])

    useEffect(()=>{
        const loadOauthUrl = async ()=>{
            try {
                const res = await axios.get('/auth/google/url')
                const {url} = res.data;
                setGoogleOauthUrl(url)                
            } catch (error) {
                console.log(error)
            }
        }
        loadOauthUrl()
        return () => {
             setGoogleOauthUrl('') 
        }
    },[])


    const onLogInClicked = async ()=>{
        try {
            const {data:{token}} = await axios.post('api/login',{
                email:emailValue,
                password:passwordValue
            })
            setToken(token)
            history.push('/')    
        } catch (error) {
            setErrorMessage(error.message)
        }
        
    }

    return(
        <div className="content-container">
            <h1>Log In</h1>
            {errorMessage && <div className="fail">{errorMessage}</div>}
            <input type="text" placeholder="someone@gmail.com"
                value={emailValue}
                onChange={e => setEmailValue(e.target.value)}
             />
             <input type="password" placeholder="password" 
             value={passwordValue}
             onChange={e => setPasswordValue(e.target.value)}
             />
             <button 
             disabled={!emailValue || !passwordValue}
             onClick={onLogInClicked}>Log In</button>
             <button onClick={()=> history.push('/forgot-password')}>Forgot your Password?</button>
             <button onClick={()=> history.push('/signup')}>Don't have an account? Sign Up</button>
             <button
             disabled={!googleOauthUrl}
             onClick={()=> window.location.href = googleOauthUrl}
             >Log In With Google</button>
        </div>
    )
}