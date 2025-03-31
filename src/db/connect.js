const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/Railway", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connection successful');
}).catch((e) => {
    console.log('Connection not successful', e);
});