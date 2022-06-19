const client = require('../database');

type User = {
	user_name: string,
	user_password: string,
	email: string,
	role:string
};

class User_Collection {

	async getUser(): Promise<User[]> {
		let sql = 'SELECT * FROM users;'

		return client.query(sql).then((results: any) => {
			return results.rows;
		}).catch((err: any) => {
			console.log(err,'something went wrong');
		})
	};

	async createUser(user: User): Promise<User[]> {

		let sql = 'SELECT * FROM users WHERE email=$1 OR user_name=$2;'
		let safeValue = [user.email, user.user_name];
		
		return client.query(sql,safeValue).then((results: any) => {

			if (results.rows <= 0) {
				let sql = 'INSERT INTO users (user_name, user_password, email, role) VALUES ($1, $2, $3, $4) RETURNING*;';
				let safeValue = [user.user_name,user.user_password,user.email,user.role];

				return client.query(sql,safeValue).then(async (result: any) => {

					return result.rows
				}).catch((err: any) => {
					console.log(err);
				});
			} else {
				throw console.error('the email or username is already exists');
			}
		}).catch((err: any) => {
			console.log(err);
		})
	};
// this is an admin functionality: he can change the regular_Users's roles. 
	async updateUserRole(user:User) : Promise<User[]>{

		let sql = 'SELECT * FROM users WHERE email=$1 OR user_name=$2;'
		let safeValue = [user.email, user.user_name];
		
		return client.query(sql,safeValue).then((results: any) => {

			if (results.rows > 0) {
				let sql = 'UPDATE users SET (role) VALUES ($4) WHERE email=$2 RETURNING*;';
				let safeValue = [user.user_name,user.user_password,user.email,user.role];

				return client.query(sql,safeValue).then(async (result: any) => {

					return result.rows
				}).catch((err: any) => {
					console.log(err);
				});
			} else {
				throw console.error('the user is not exists!');
			}
		}).catch((err: any) => {
			console.log(err);
		})
	}
};

module.exports = new User_Collection();