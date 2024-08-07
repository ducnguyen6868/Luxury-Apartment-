const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const uri = 'mongodb://localhost:27017/luxury-apartment';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// Define a schema and model
const LocationSchema = new mongoose.Schema({
  address: String,
  city: String,
  state: String,
  zipcode: String,
  country: String,
});

const FeaturesSchema = new mongoose.Schema({
  area: String,
  bedrooms: Number,
  bathrooms: Number,
  balconies: Number,
  floor: String,
  furnishing: String,
  parking: String,
});

const NearbyFacilitiesSchema = new mongoose.Schema({
  shoppingMalls: [String],
  schools: [String],
  hospitals: [String],
  publicTransport: [String],
});

const ContactInfoSchema = new mongoose.Schema({
  agentName: String,
  agentPhone: String,
  agentEmail: String,
});

const ApartmentSchema = new mongoose.Schema({
  name: String,
  location: LocationSchema,
  price: Number,
  description: String,
  features: FeaturesSchema,
  amenities: [String],
  images: [String],
  videoTour: String,
  nearbyFacilities: NearbyFacilitiesSchema,
  contactInfo: ContactInfoSchema,
});

const Apartment = mongoose.model('Apartment', ApartmentSchema);

module.exports = Apartment;

const EmployeeSchema = mongoose.Schema(
  {
    name: String,
    email: String,
  }
);
const Employee = mongoose.model("Employee", EmployeeSchema);
module.exports = Employee;
// UserSchema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: 'logo.png'
  }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;

// Routes
app.get('/', async (req, res) => {
  const {keyword}=req.query;
  console.log("105",keyword);
  try {
    const apartments = await Apartment.find();
    //res.json(apartments);
    res.json(apartments);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});
app.get('/contact', async (req, res) => {
  try {
    const Employees = await Employee.find();
    res.json(Employees);
  }
  catch {
    res.status(400).json('Error: ' + err);
  }

});
app.get('/apartment/:id', async (req, res) => {
  try {
    const apartment = await Apartment.findById(req.params.id);
    res.json(apartment);
  }
  catch (err) {
    res.status(400).json('Error: ' + err);
  }
})
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' });
  }
  //console.log(email , password); //OK
  try{
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'This user does not exist' });
    }else{
      if(password===user.password){
        const token = jwt.sign({ userId: user._id }, 'secret', { expiresIn: '1h' });
        res.json({ success: true, token });
      }else{
        return res.json({ success: false, message: 'Invalid password' });
      }
    }

  }catch(err){
    console.log("Error :", err);
  }
  //console.log(user); //OK
  // console.log(typeof password);
  // console.log(typeof user.password);
  //So sánh mật khẩu nhập vào và mật khẩu được mã hóa lưu trong CSDL
  //( Tạm thời chưa dùng tới)
  // const isMatch = await bcrypt.compare(password, user.password);
  // console.log(isMatch);
  // if (!isMatch) {
  //   return res.status(400).json({ success: false, message: 'Invalid credentials' });
  // }

 
});
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  //console.log(name, email,password);  //TEST OK
  try {
    const checkEmail = await User.findOne({ email: email });
    if (!checkEmail) {
      const user = await User.create({
        name: name,
        email: email,
        password: password
      });
      user.save();
      res.json(user);
    } else {
      res.json({ result: 'false' })
    }

  } catch (err) {
    console.log("Error :", err);
  }
});
app.get('/search',async(req,res)=>{
  const {keyword}=req.query;
  //console.log("191",keyword);
  //res.json(keyword);
  try{
    const apartment = await Apartment.find(
      {
        $or: [
          { name: { $regex: keyword, $options: 'i' } },
          { address: { $regex: keyword, $options: 'i' } },
          // { price: { $regex: keyword, $options: 'i' } },
          { area: { $regex: keyword, $options: 'i' } },
          { type: { $regex: keyword, $options: 'i' } },
          { district: { $regex: keyword, $options: 'i' } },
          { ward: { $regex: keyword, $options: 'i' } },
          ]
          }
    )
    res.json(apartment);
  }catch(err){
    console.log(err);
  }
});
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
