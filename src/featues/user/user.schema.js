import mongoose from 'mongoose';

export const userSchema = new mongoose.Schema({
    name: {type: String, maxLength:[25, "Name can't be greater than 25 character"]},
    email: {type: String, unique: true, required: true,
        match: [/.+\@.+\../, 'Please enter a valid email']
    },
    password: {type: String,
        // validate: {
        //     validator: function(value){
        //         return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,15}$/.test(value)
        //     },
        //     message: "Password should be between 8-12 character and have a special character"
        // }
    },
    type: { type: String, enum: ['customer', 'seller']}
})