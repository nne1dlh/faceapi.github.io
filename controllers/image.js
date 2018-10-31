const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: 'cab95ed9cd0f43b3b69e8cd7ca22677f'
});

const handleAPICall = (req, res) => {
	app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
	.then(data => {
		res.json(data);
	})
	.catch(err=> res.status(400).json('unable to work with API'))
}


const handleImage = (req, res, postgres) => {
	const id = req.body.id;
	//const {id} = req.body;
	postgres('users').where('id', '=', id)
	.increment('entries', 1)
	.returning ('entries')
	.then(resp  => {
		res.json(resp[0]);
	})
	.catch(err => res.status(400).json('uanble to get entries'))
}

module.exports = {
	handleImage: handleImage, 
	handleAPICall
}