const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();
const port = process.env.PORT || 5000;
const multer= require('multer');
const upload= multer();
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

const EmployeeSchema = mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    role: String,
    avatar: {
      type: String,
      default: 'logo.png'
    },
    phone: String,
    salary: Number
  }
);
const Employee = mongoose.model("Employee", EmployeeSchema);
module.exports = Employee;

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
  contactInfo: {
    type : mongoose.Schema.Types.ObjectId,
    ref: 'Employee'
  },
});

const Apartment = mongoose.model('Apartment', ApartmentSchema);

module.exports = Apartment;
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
const BookingSchema = mongoose.Schema({
  apartment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Apartment'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  time: {
    type: Date
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending'
  }
})
const Booking = mongoose.model('Booking', BookingSchema);
module.exports=Booking;
// Routes
app.get('/', async (req, res) => {
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
    const apartment = await Apartment.findById(req.params.id).populate('contactInfo');
    //console.log(apartment);
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
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.json({ success: false, message: 'Invalid email' });
    } else {
      if (password === user.password) {
        const token = jwt.sign({ userId: user._id }, 'secret', { expiresIn: '1h' });
        res.json({ success: true, token });
      } else {
        return res.json({ success: false, message: 'Invalid password' });
      }
    }

  } catch (err) {
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
app.get('/search', async (req, res) => {
  const { keyword } = req.query;
  //console.log("191",keyword);
  //res.json(keyword);
  try {
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
  } catch (err) {
    console.log(err);
  }
});
app.get('/user/:id', async (req, res) => {
  const userId = req.params.id;
  // console.log(userId);
  try {
    const infoUser = await User.findById(userId);
    res.json(infoUser);
  } catch (err) {
    console.log(err);
  }
});
// Start the server
app.post("/admin/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const employee = await Employee.findOne({
      email: email,
      password: password
    })
    if (employee) {
      res.json(employee);

    } else {
      res.json();
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("No recivie request");
  }
});
app.delete('/apartment/:id',async(req,res)=>{
  let id= req.params;
  id=id.id;
  // console.log(id);
  // console.log(typeof(id));
  try{
    await Apartment.findByIdAndDelete(id);
    console.log('Delete sucessfully !');
    res.json({result:'ok'});
  }catch(err){
    console.log("err",err);
    res.json({result:'error'});
  }
});
app.post('/add-apartment',upload.none(), async(req,res)=>{
  const {formData}= req.body;
  console.log(formData);
})
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
