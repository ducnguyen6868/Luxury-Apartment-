const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Apartment = require('./model/apartmentModel');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const uri = 'mongodb://127.0.0.1:27017/apartmentDB';
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

// const Apartment = mongoose.model('Apartment', ApartmentSchema);

// module.exports = Apartment;

const EmployeeSchema = mongoose.Schema(
  {
    name: String,
    email: String,
  }
);
const Employee= mongoose.model("Employee",EmployeeSchema);
module.exports=Employee;
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
app.get('/product', async (req, res) => {
  try {
    const apartments = await Apartment.find();
    res.json(apartments);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
app.get('/product/:code', async (req, res) => {
  try {
    const { code } = req.params;
    const apartment = await Apartment.findOne({ code });
    
    if (apartment) {
      res.json(apartment);
    } else {
      res.status(404).json({ message: 'Apartment not found' });
    }
  } catch (err) {
    res.status(400).json({ error: 'Error: ' + err });
  }
});

app.post('/product/:code', async (req, res) => {
  try {
    const { code } = req.params;
    const apartment = await Apartment.deleteOne({code})
    if (apartment) {
      res.json(apartment);
    } else {
      res.status(404).json({ message: 'Apartment not found' });
    }
  } catch (err) {
    res.status(400).json({ error: 'Error: ' + err });
  }
});

app.post('/fix-apartment/:code', async (req, res) => {
  try {
    const { type, price, name, description } = req.body;
    const { code } = req.params;
    const apartment = await Apartment.deleteOne({code})
    if (apartment) {
      res.json(apartment);
    } else {
      res.status(404).json({ message: 'Apartment not found' });
    }
    const newApartment = new Apartment({
      type,
      price,
      name,
      code,
      description
    });

    await newApartment.save();
    res.status(201).json({ message: 'Apartment added successfully!' });
  } catch (err) {
    res.status(400).json({ error: 'Error: ' + err });
  }
});

app.post('/add-apartment', async (req, res) => {
  try {
    const { type, price, name, code, description } = req.body;

    const newApartment = new Apartment({
      type,
      price,
      name,
      code,
      description
    });

    await newApartment.save();
    res.status(201).json({ message: 'Apartment added successfully!' });
  } catch (err) {
    res.status(400).json({ error: 'Error: ' + err });
  }
});

app.get('/contact',async(req,res)=>{
  try{
    const Employees= await Employee.find();
    res.json(Employees);
  }
  catch{
    res.status(400).json('Error: ' + err);
  }
  
});
app.get('/apartment/:id',async(req, res)=>{
  try{
    const apartment = await Apartment.findById(req.params.id);
    res.json(apartment);
    }
    catch(err){
      res.status(400).json('Error: ' + err);
    }
})
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
