import { getGoogleUser } from "../util/getGoogleUser";
import { updateOrCreateUserFromOauth } from "../util/updateOrCreateUserFromOauth";
import jwt from 'jsonwebtoken'

export const getGoogleOauthCallbackRoute = {
    path:'/auth/google/callback',
    method:'get',
    handler: async (req,res) =>{
        const {code} = req.query;
        const oauthUserInfo = await getGoogleUser({code})
        const {_id:id,email,isVerified,info} = await updateOrCreateUserFromOauth({oauthUserInfo})

        jwt.sign({id,email,isVerified,info},process.env.JWT_SECRET,{expiresIn:'2d'},(err,token) => {
            if(err) return res.sendStatus(500)

            return res.redirect(`http://localhost:3001/login?token=${token}`)
        })
    }
}