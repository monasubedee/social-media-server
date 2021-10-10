import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../utils/config.js';

const auth = async(req,res,next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedData = jwt.verify(token,JWT_SECRET_KEY);

        req.userData = decodedData;
        
        next();
        
    } catch (error) {
        console.log(error);
        return res.status(401).json({message:"Auth Failed"})
    }
}


export default auth;