const User = require('../model/userModel');
const Admin = require('../model/adminModel');
module.exports = {
    //login
    login: async (req, res) => {
        try {
            const admin = await Admin.findOne({ email: req.body.email });
            if (!admin) {
                return res.status(422).json({ message: 'User not found' });
            }
            if (admin.password !== req.body.password) {
                return res.status(422).json({ message: 'Password is incorrect' });
            }
            res.status(201).json({ message: 'Login successful' });
        } catch (error) {
            res.status(422).json({ message: error.message });

        }
    },

    // Add users
    addUser: async (req,res) => {
        const findUser = await User.findOne({ email: req.body.email });
        console.log(findUser);
        if (findUser) {
            return res.status(422).json({ message: 'User already exists' });
        }
        const user = new User(req.body);
        try{
            await user.save();
            res.status(201).json({ message: 'User Added Successfully' });
        }catch(e){
            res.status(422).send(e);
        }
    },
    // Get all users
    getAllUsers: async (req,res) => {
        try{
            const users = await User.find({});
            res.send(users);
        }catch(e){
            res.status(422).send(e);
        }
    },
    deleteUser: async (req, res) => {
        try {
            const user = await User.findByIdAndDelete(req.body.u_id);
            if (!user) {
                return res.status(422).json({ message: 'User not found' });
            }
            res.status(201).json({ message: 'User deleted successfully' });
        } catch (error) {
            res.status(422).json({ message: error.message });
        }
    },
    filterUser: async (req, res) => {
        try {
            const users = await User.find({ name: req.body.name });
            res.send(users);
        } catch (error) {
            res.status(422).json({ message: error.message });
        }
    },
}