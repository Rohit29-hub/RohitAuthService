const mongoose = require('mongoose');
const URI = process.env.MONGODB_URI
const connectMongoDB = async () => {
    try{
        await mongoose.connect(URI)
        .then(()=>{
            console.log('Mongodb connected !')
        })
    }catch(err){
        console.log(err.message);
    }
}


module.exports = connectMongoDB;