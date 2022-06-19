import express from 'express';
import cors from 'cors';
const user = require('./collection/user')
const client = require('./database');
const Port = 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.get('/',(req,res) => {

	console.log(req.body);

	res.send('Hello from ts course')
});

app.get('/users',(req,res) => {
	console.log(req.body);
	user.getUser().then((results: any) => {
		res.send(results)
	})
});

app.post('/signup',(req,res) => {
	console.log(req.body);
	user.createUser(req.body).then((results: any)=>{
		res.send(results);
	})
});

client.connect().then(() => {
	app.listen(Port,() => {

		console.log(`listening to the port ${Port}`);

	})
})
