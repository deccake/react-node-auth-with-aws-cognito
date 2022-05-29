import axios from "axios"
import { oAuthClient } from "./oAuthClient"

const getAccessAndBearerTokenUrl = ({access_token})=>{
    return `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`
}

export const getGoogleUser = async ({code}) => {
    const {tokens} = await oAuthClient.getToken(code)
    const res = await axios.get(
        getAccessAndBearerTokenUrl({access_token:tokens.access_token}),
        {
            headers:{
                Authorization:`Bearer ${tokens.id_token}`
            }
        }
    )

    return res.data

}