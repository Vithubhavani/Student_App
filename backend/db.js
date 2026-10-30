
const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Graylinx@123",
    database: "studentdb"
});

db.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Database connected");
    }
});

module.exports = db;
