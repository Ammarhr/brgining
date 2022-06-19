const client = require('../database');

type User = {
	user_name: string,
	user_password: string,
	email: string,
};

class User_Collection {

	async getUser(): Promise<User[]> {
		let sql = 'select * from users;'

		return client.query(sql).then((results: any) => {
			return results.rows;
		}).catch((err: any) => {
			console.log(err,'something went wrong');
		})
	};

	async createUser(user: User): Promise<User[]> {

		let sql = 'select * from users where user_name=$1;'
		let safeValue = [user.user_name];

		return client.query(sql,safeValue).then((results: any) => {

			if (results.rows <= 0) {
				let sql = 'insert into users (user_name, user_password, email) VALUES ($1, $2, $3) RETURNING*;';
				let safeValue = [user.user_name,user.user_password,user.email];

				return client.query(sql,safeValue).then(async (result: any) => {

					return result.rows
				}).catch((err: any) => {
					console.log(err);
				});
			} else {
				throw console.error('the user is already exists');
			}
		}).catch((err: any) => {
			console.log(err);
		})
	}
};

module.exports = new User_Collection();