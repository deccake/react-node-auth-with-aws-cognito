import {ObjectID} from 'mongodb'
import jwt from 'jsonwebtoken'
import {getDbConnection} from '../db'
import { CognitoUser } from 'amazon-cognito-identity-js'
import { awsUserPool } from '../util/awsUserPool'


export const verifyEmailRoute = {
    path:'/api/verify-email',
    method:'put',
    handler: async (req,res)=>{
        console.log('in verify email route')
        const {verificationString,email} = req.body


        new CognitoUser({Username:email,Pool:awsUserPool})
            .confirmRegistration(verificationString,true, async (err)=>{
                if(err) return res.status(401).json({message:'verification code is not correct'})

                const db = getDbConnection(process.env.DATABASE_NAME)

                const result = await db.collection('users').findOneAndUpdate({email},{
                    $set:{isVerified:true}
                },
                {returnOriginal:false}
                )

                const {_id:id,info} = result.value;

                jwt.sign({id,email,isVerified:true,info},process.env.JWT_SECRET,{expiresIn:'2d'},(err,token)=>{
                    if(err) return res.status(500)
        
                    return res.status(200).json({token})
                })

            })
    }
}