const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
 //this is default middle ware patterns that are used in express apps
    try{
        // const decoded = jst.verify(req.body.token, process.env.JWT_KEY); //this also decodes and checks the JWT token
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;
        next();
    }
    catch(error){
        return res.status(401).json({
            message: 'Auth failed' 
        });
    }
};