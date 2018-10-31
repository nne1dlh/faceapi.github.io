const handleProfileGet = (req, res, postgres) => {
	const idc = req.params.id;
	console.log(idc);
	postgres.select('*').from('users').where({
		id: idc
	})
		.then(usr => {
		if(usr.length) {
			res.json(usr[0]);
		} else {
			res.status(400).json('not found')
		}
		
	}).catch(err => res.status(400).json('error getting user'));

	// console.log('pissa', found);
	// console.log(!found);
	// if(!found) {
	// 	res.status(400).json('not found');
	// }
}

module.exports = {
	handleProfileGet
}