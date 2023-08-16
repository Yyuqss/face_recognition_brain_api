const handleProfile_email = (req, res, db, bcrypt) => {
    const { email } = req.params;
    db.select('*').from('users').where({
        email: email
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
    handleProfile_email: handleProfile_email
};