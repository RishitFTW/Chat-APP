import express from 'express'
const app= express();
import dotnev from 'dotenv'
import mongoose from 'mongoose';
import userRoutes from './routes/user.route.js'

dotnev.config();


app.use(express.json());

const port= process.env.PORT || 5000;
const URI= process.env.MONGODB_URI;

try {
    mongoose.connect(URI)
    console.log('MONGODB connected');
} catch (error) {
    console.log(error);
}



app.use('/api/user',userRoutes);

app.get('/', (req,res)=>{
    res.send('Hello')
})



app.listen(port,()=>{
    console.log("server is aup")
})