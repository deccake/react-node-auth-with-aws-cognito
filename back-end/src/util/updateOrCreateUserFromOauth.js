import { getDbConnection } from "../db"

export const updateOrCreateUserFromOauth = async ({oauthUserInfo}) => {
    const {
        id:googleId,
        verified_email:isVerfied,
        email
    } = oauthUserInfo

     const db = getDbConnection(process.env.DATABASE_NAME)   
     const existingUser = await db.collection('users').findOne({email})

     if(existingUser){
         const result = await db.collection('users').findOneAndUpdate({email},{
             $set:{
                 googleId,
                 isVerfied
             }
         },{
             returnOriginal:false
         }
         )
         return result.value;
     }else{
         const result = await db.collection('users').insertOne({
             email,
             isVerfied,
             info:{},
             googleId
         })

         return result.ops[0];
     }
}