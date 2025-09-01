const User = require('./models/User');
const bcrypt = require('bcrypt');
async function makeAdmin() {
    try {
        let user = await User.findOne({email: 'nafis7@gmail.com'});
        if (user) {
            console.log("User updated...............")
        } else {
            user = new User();
            user.firstName = 'Nafis',
                user.lastName = 'Ansari',
                user.email = 'nafis7@gmail.com'
            let encryptedPassword = bcrypt.hashSync('Nafis@123', 10);
                user.password = encryptedPassword,
            user.userType = 'Admin';
            await user.save();
            console.log("User Saved Successfully...............");
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports = makeAdmin;