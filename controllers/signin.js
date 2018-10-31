const handleSignin = (req, res, postgres, bcrypt) => {
	//res.send('this server is working..'); can only send one res 
	//const password = req.body.passwd;
	const {email, passwd} = req.body;
	if(!email || !passwd) {
		return res.status(400).json('inccorrect form submission');
	}
	postgres.select('email', 'hash').from('login')
		.where('email', '=', req.body.email)
		.then(data => {
			console.log(data);
			console.log(data[0].hash);
			console.log(req.body.passwd);
			const isValid = bcrypt.compareSync(req.body.passwd, data[0].hash);
			console.log(isValid);
			if(isValid) {
				return postgres.select('*').from('users')
				.where('email', '=', req.body.email)
				.then(user => {
					res.json(user[0])
				})
				.catch(err => res.status(400).json('unable to get user...'))
			} else {
				res.status(400).json('bogus credentials jerky..')
			}
		})
		.catch(err => res.status(400).json('wrong credential from sigin..'))
}

module.exports = {
	handleSignin: handleSignin
}