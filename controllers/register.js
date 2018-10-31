const handleReg = (req, res, postgres, bcrypt) => {
	const {email, fname, lname, passwd} = req.body;
	if(!email || !fname || !lname || !passwd){
		return res.status(400).json('incomplete form');
	}
	const hash = bcrypt.hashSync(passwd);
		postgres.transaction(trx => {
			trx.insert({
				hash: hash,
				email: email
			})
			.into('login')
			.returning('email')
			.then(loginEmail => {
				return trx('users')
				.returning('*')
				.insert({
					email: loginEmail[0],
					fname: fname,
					lname: lname,
					joined: new Date()
				})
				.then(user => {
					res.json(user[0]);
				})
			})
			.then(trx.commit)
			.catch(trx.rollback)

		})
		.catch(err => res.status(400).json("unable to register"));
}

module.exports = {
	handleRegister: handleReg
}