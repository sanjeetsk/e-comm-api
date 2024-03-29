import jwt from 'jsonwebtoken';

const jwtAuth = (req, res, next) =>{
    // Read the token
    const token = req.headers['authorization'];

    //if no token, return error
    if(!token){
        return res.status(401).send('Unauthorized');
    }

    //Check if token is valid
    try{
        const payload = jwt.verify(
            token, 
            process.env.JWT_SECRET
        );
        req.userId= payload.userId;
        console.log(payload);
    }
    catch(error){
        // return error
        return res.status(401).send('Unauthorized');
    }

    //next middleware
    next();
}

export default jwtAuth;