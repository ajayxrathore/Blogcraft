import {Schema,model} from 'mongoose'

const blogSchema = new Schema({
    title:{
        type: String,
        required:[true,'Title cannot be blank'],
        index:true,
        minLength:[3,'Title must be atleast 3 characters']
    },
    content:{
        type:String,
        minLength:[50,'Content of the blog must be atleast 50 character']
    },
    image:{
        type:String,
        required:true
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
},
    {timestamps:true}
)

export const Blog = model('Blog',blogSchema)
