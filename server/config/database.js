const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
    mongoose
        .connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            retryWrites: true,
            w: "majority"
        })
        .then(() => {
            console.log("DB Connection Success");
        })
        .catch((err) => {
            console.log("DB Connection Failed");
            console.log(err);
            process.exit(1);
        });

    mongoose.connection.on("error", (err) => {
        console.log("DB Connection Error");
        console.log(err);
    });

    mongoose.connection.on("disconnected", () => {
        console.log("MongoDB Disconnected");
    });
};