// module.exports = {
//     mysql: { 
//         mysqlHost: "140.114.88.137",
//         mysqlUser: "user_80956",
//         mysqlPassword: "m+c3zHYVaFBSz#w6",
//         mysqlDatabase: 'mhealth_with_line'
//     } 
// }
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : "140.114.88.137",
  user     : "user_80956",
  password : "m+c3zHYVaFBSz#w6",
  database : 'mhealth_with_line'
});

module.exports = connection;

var express = require('express');
var router = express.Router();
var connection = require('../db/sql.js');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/list', function(req, res, next) {
     connection.query("select * from user",function(error, results, fields){
         res.json(results);
     })
});


module.exports = router;