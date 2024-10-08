const mongoose = require('mongoose');


const connectDB=async ()=>{
  await mongoose.connect(
        `mongodb+srv://ficredinn:XTv9Ubdnj7TmkXE7@namastenode.bxhzd.mongodb.net/?retryWrites=true&w=majority&appName=NamasteNode`
    )
}



module.exports=connectDB
