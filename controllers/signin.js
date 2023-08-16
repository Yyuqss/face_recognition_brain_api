const handleSignin = (req, res, db, bcrypt) => {
    const { email, password } = req.body;
    db.select('email', 'hash').from('login')
        .where('email', '=', email)
        .then(data => {
            const isValid = bcrypt.compareSync(password, data[0].hash);
            if (isValid) {
                res.json("Success!");
            } else {
                res.status(400).json('Wrong password');
            }
        })
        .catch(err => res.status(400).json("Unable to get user"));
}

module.exports = {
    handleSignin: handleSignin
};