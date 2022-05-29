import {getDbConnection} from '../db'
import jwt from 'jsonwebtoken'
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { awsUserPool } from '../util/awsUserPool';

export const signUpRoute = {
    path:'/api/signup',
    method:'post',
    handler: async (req,res)=>{
        const {email,password} = req.body;

        const attributes = [
            new CognitoUserAttribute({Name:'email',Value:email})
        ]

        awsUserPool.signUp(email,password,attributes,null,async (err,awsResult)=>{
            if(err){
                console.log(err)
                return res.status(500).json({message:'Unable to signup user'})
            }

            const db = getDbConnection(process.env.DATABASE_NAME)

            const startingInfo = {
                hairColor:'',
                favoriteFood:'',
                bio:''
            }

            const result = await db.collection('users').insertOne({
                email,
                info:startingInfo
            })

            const {insertedId} = result;

            jwt.sign({id:insertedId ,email,isVerified:false,info:startingInfo},process.env.JWT_SECRET,{expiresIn:'2d'},(err,token)=>{
                if(err) return res.sendStatus(500)

                return res.status(200).json({token})
            })

        })
    }
}