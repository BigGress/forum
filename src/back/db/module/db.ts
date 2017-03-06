import * as mongoose from "mongoose";

eval("mongoose.Promise = global.Promise");
let db = mongoose.connect("mongodb://localhost:27017/forums")
let connection = db.connection;


connection.on("error", function(error) {
    console.error(error)
})

connection.on("open", function() {
    console.log("mongodb 启动");
});
export let table = mongoose;