import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
// const roles = require('./collection/user_config')
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

app.post('/signup',async (req,res) => {

	let new_User = {
		user_password: await bcrypt.hash(req.body.user_password,5),
		email: await req.body.email,
		user_name: await req.body.user_name,
		role : 'Regular_User',
	}

	user.createUser(new_User).then((results: any) => {
		res.send(results);
	})
});

client.connect().then(() => {
	app.listen(Port,() => {

		console.log(`listening to the port ${Port}`);

	})
})
