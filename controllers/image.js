const handleImage = (req, res, db, bcrypt) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('*')
        .then(user => res.json(user[0]))
        .catch(err => res.status(400).json("Couldn't update entries"));
}

module.exports = {
    handleImage: handleImage
};