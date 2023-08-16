const handleProfile_id = (req, res, db, bcrypt) => {
    const { id } = req.params;
    db.select('*').from('users').where({
        id: id
    })
        .then(user => {
            if (user.length) {
                res.json(user[0])
            } else {
                res.json('Not found')
            }
        })
        .catch(err => res.status(404).json('User not found'));
}

module.exports = {
    handleProfile_id: handleProfile_id
};