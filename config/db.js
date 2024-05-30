const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const autoIncrement = require('mongoose-auto-increment');

const Urls = new Schema({
    original_url: String,
    short_url: Number
})

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        // autoIncrement.initialize(conn);
        console.log("MongdDB connected!")

    } catch (error) {
        console.log("Error! MongoDB NOT connected.")
        process.exit(1);
    }
}


const model = mongoose.model("url_shortener", Urls, "url_shortener");

module.exports = { connectDB , model}

// Urls.plugin(autoIncrement.plugin, {
//     model: 'Urls',
//     field: 'short_url',
//     startAt: 1,
//     incrementBy : 1
// })