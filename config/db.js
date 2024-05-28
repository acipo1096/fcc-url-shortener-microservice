const mongoose = require("mongoose");
const Schema = mongoose.Schema

const Urls = new Schema({
    id: Number,
    url: String
})

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("MongdDB connected!")
    } catch (error) {
        console.log("Error! MongoDB NOT connected.")
        process.exit(1);
    }
}

const model = mongoose.model("url_shortener", Urls, "url_shortener");

module.exports = { connectDB , model}