import mongoose from "mongoose";

const connectToDB = async () => {
    const connectionUrl = 'mongodb+srv://nguyentuanhung4529871036:nguyentuanhung123@blog.yir2bsw.mongodb.net/?retryWrites=true&w=majority&appName=blog'

    mongoose
        .connect(connectionUrl)
        .then(() => console.log('blog database connected is successfully'))
        .catch((error) => console.log(error))
}

export default connectToDB;