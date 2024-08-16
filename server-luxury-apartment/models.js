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
    contactInfo:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    }
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