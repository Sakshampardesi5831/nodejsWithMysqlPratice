const mysql=require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Root@123",
    database: "cm",
});

connection.connect((err) => {
    if(err){
        console.log("Some Error in Connection"+err.message);
    }else{
        console.log("Connection Established");
    }
})

module.exports=connection;