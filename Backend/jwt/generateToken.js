import jwt from 'jsonwebtoken';

const generateToken=(id, res)=>{
    const token= jwt.sign({ id }, process.env.jWT_SECRETKEY,{
        expiresIn: "5d",
    });
    res.cookie("jwt", token, {
        httpOnly: true,
        secure: true,
        samsite: "strict"
    })
}

export default generateToken;