import {ObjectID} from 'mongodb'
import jwt, { decode } from 'jsonwebtoken'
import {getDbConnection} from '../db'

export const updateUserInfoRoute = {
    path:'/api/users/:userId',
    method:'put',
    handler:async (req,res)=>{
        const {authorization} = req.headers;
        const {userId} = req.params;

        const updates = (({
            hairColor,
            favoriteFood,
            bio
        }) => ({
            hairColor,
            favoriteFood,
            bio
        }))(req.body)

        if(!authorization){
            return res.status(401).json({message:'No authorization header sent '})
        }

        const token = authorization.split(' ')[1]

        jwt.verify(token,process.env.JWT_SECRET,async (err,decode)=>{
            if(err) return res.status(500).json({message:'Not able to verify token'})
            const {id,isVerified} = decode;

            if(id !== userId){
                return res.status(403).json({message:'Not allowed to update'})
            }

            if(!isVerified){
                return res.status(403).json({message:'You need to verify your email before update'})
            }

            const db= getDbConnection(process.env.DATABASE_NAME)

            const result = await db.collection('users').findOneAndUpdate(
                {_id:ObjectID(id)},
                {
                    $set:{
                        info:updates
                    }
                },
                {
                    returnOriginal:false
                }
            )

            const {info,email} = result.value;

            jwt.sign({
                id,
                email,
                isVerified,
                info
            },
            process.env.JWT_SECRET,
            {expiresIn:'2d'},
            (err, token) => {
                if(err) return res.status(500).json(err)

                return res.status(200).json({token})
            }
            )
        })

        // const {fairColor,favoriteFood,bio} = req.body;

        // const db = getDbConnection(process.env.DATABASE_NAME)

        // const {authoraisation} = req.headers;


    }
}