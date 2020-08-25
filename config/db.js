const mysql = require('mysql');
const dotenv = require('dotenv')
dotenv.config({path: './config/config.env'});

const dbConnection = mysql.createConnection({
host     : process.env.MYSQL_HOST,
user     : process.env.MYSQL_USER,
password : process.env.MYSQL_PASSWORD,
database : process.env.MYSQL_DATABASE
});

dbConnection.connect((err) => {

    if(!err){
        console.log('MYSQL Database connection successful');
    }
    else{
        console.log("MySQL Database connection failure: ", err);
    }
});

module.exports = dbConnection;