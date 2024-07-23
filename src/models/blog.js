import mongoose from "mongoose";

// databse
// model
// api routes -> add, fetcj / get, update, delete

const BlogSchema = new mongoose.Schema({
    title: String,
    description: String,
});

const Blog = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);

export default Blog;