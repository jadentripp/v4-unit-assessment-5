const bcrypt = require('bcryptjs')

module.exports = {
    register: async (req, res) =>{
        const db = req.app.get('db')
        const {username, password, profile_pic} = req.body
        console.log(req.body)
        const [checkUsername] = await db.user.check_username(username)
        if(checkUsername){
            console.log('hit')
            return res.status(420).send('Username already in use')
        }
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        const [user] = await db.user.create_user(username, profile_pic, hash)
        delete user.password
        req.session.user = user
        console.log(req.session.user)
        return res.status(200).send(req.session.user)
    },
    login: async (req, res) => {
        const db = req.app.get('db')
        const {username, password} = req.body
        const [user] = await db.user.check_username(username)
        console.log(user)
        if(!user){
            return res.status(401).send('User not found')
        }
        const isAuthenticated = bcrypt.compareSync(password, user.password)
        if (!isAuthenticated){
            return res.status(403).send('Incorrect Password')
        }
        delete user.password
        req.session.user = user
        return res.status(200).send(req.session.user)
    },
    logout: (req, res) => {
        req.session.destroy()
        return res.sendStatus(200)
    },
    getUser: (req, res) => {
        if (!req.session.user){
            return res.status(401).send('User not found')
        }
        return res.status(200).send(req.session.user)
    }
   
}