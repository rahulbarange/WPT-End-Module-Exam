
const express = require('express');
const app = express();
// const cors = require('cors');
// app.use(cors());
const mysql = require('mysql2');
const db={
	host:'localhost',
	user:'root',
	password:'cdac',
	database:'nodeConnect',
	port:3306,
};
const con=mysql.createConnection(db);
const bodyParser = require('body-parser');

app.use(express.static('abc'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
//whether you want nested objects support  or not



var result;

app.post('/poc1', function (req, res) {
	
		console.log("reading input " + req.body.v1 +  "  second " + req.body.v2)
		
    	var xyz ={ v1:37, v2:35};
        res.send(xyz);
    });


app.get('/poc2', function (req, res) {
    
	
        console.log("reading input " + req.query.xyz);
		
    	var xyz ={ v1:37, v2:35};

		res.send(xyz);

		});

app.get('/addbook',(req,res)=>{
	let bookid=req.query.bookid;
	let bookname=req.query.bookname;
	let price=req.query.price;

	let output={status:false, bookdetail:{bookid:'',bookname:'',price:''}};
	console.log(bookid);
	con.query('insert into book values(?,?,?)',[bookid,bookname,price],
	(error,rows)=>{
		if(error){
			console.log('error occured');
		}
		else{
			if(rows.affectedRows>0){
				output.status=true;
				output.bookdetail=rows[0];
				console.log(rows);
			}else{
				console.log('insert failed');
			}
		}
		res.send(output)
	}
	
	)
});

app.get('/showall',(req,res)=>{
	let output={status:false, bookdetail:{bookid:'',bookname:'',price:''}};
	con.query('select * from book',[],(error,rows)=>{
		console.log(rows);
		
		res.send(rows);
	});
});


app.listen(8081, function () {
    console.log("server listening at port 8081...");
});