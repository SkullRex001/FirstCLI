import mongoose from 'mongoose'

const TodoScheama = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true
    },
    detail : {
        type : String,
        required : true,
        trim : true
    },
    status : {
        type : String,
        required : true,
        enum : ['completed' , 'pending'],
        default : 'pending',
        trime : true
    }
} , {timestamps : true});

const Todos = mongoose.model('Todos' , TodoScheama);

export default Todos;