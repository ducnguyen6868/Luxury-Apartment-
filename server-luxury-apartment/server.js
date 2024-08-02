const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

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
