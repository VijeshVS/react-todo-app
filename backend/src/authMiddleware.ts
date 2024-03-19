import jwt from 'jsonwebtoken'

export const authMiddleware = (req:any,res:any,next:any)=>{
    const auth_string = req.headers.authorization;
    const token = auth_string.split(" ")[1];
    if(!token) {
        return res.status(403).json({
            msg : "User not authorized"
        })
    }
    const response:any = jwt.decode(token);
    req.headers.userId = response.id;
    next();
}