const Clarifai = require('clarifai') ;

//wstepnie bylo we frontendzie, ale bezpieczniej jest to miec w back-endzie
const app = new Clarifai.App({
  apiKey: '95c5d63ccb5e40ba9870f0980df5ccf8'
});
const handleApiCall = (req, res) => {
  app.models
.predict( Clarifai.FACE_DETECT_MODEL, req.body.input)
.then(data => {
  res.json(data)
})
.catch(err => res.status(400).json('unable to work with API'))
}


const handleImage = (req, res, db) => {
  const { id } = req.body;
  db('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(ent => {
      res.json(ent[0])
    })
    .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
  handleImage,
  handleApiCall
};