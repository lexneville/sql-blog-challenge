const express = require("express");
const mysql = require("mysql");
const app = express();

app.set("view engine", "hbs");

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "password",
    port: "3306", // Port mysql
    database: "blog_db",
});

db.connect( (error) => {
    if (error) {
        console.log (error);
    } else {
        console.log("MySQL connected!");
    }
});

app.get("/", (request, response) => {
    db.query("SELECT * FROM posts", (error, result) => {
        if (error) {
            console.log("Error in the query");
        } else {
            response.render("index", {
                db_return: result
            });
        }
    });
});
//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=


//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

app.listen(3000, () => {
    console.log("Server is running");
});