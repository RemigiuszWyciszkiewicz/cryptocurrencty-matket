const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const remoteDbUrl = 'mongodb+srv://dbUser:remik@cluster0.tvq44.mongodb.net/coin-market?retryWrites=true&w=majority';
const localDbUrl = 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false';
mongoose
  .connect(localDbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('connected succesfully');
  })
  .catch((error) => {
    console.log('error ' + error);
  });

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  country: { type: String, required: true },
});

userSchema.pre('save', async function (next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

userSchema.methods.isValidPassword = async function (password) {
  const user = this;
  return await bcrypt.compare(password, user.password);
};

const User = mongoose.model('users', userSchema);

module.exports.User = User;
