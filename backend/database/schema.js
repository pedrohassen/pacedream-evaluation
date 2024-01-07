const mongoose = require('mongoose');

const PricingSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  propertyId: { type: mongoose.Schema.Types.ObjectId, unique: true },
  method: { type: Number },
  monday: { type: Number },
  tuesday: { type: Number },
  wednesday: { type: Number },
  thursday: { type: Number },
  friday: { type: Number },
  saturday: { type: Number },
  sunday: { type: Number },
}, {
  toJSON: {
    transform(_doc, ret) {
      ret.cleanPricing = {
        method: ret.method,
        monday: ret.monday,
        tuesday: ret.tuesday,
        wednesday: ret.wednesday,
        thursday: ret.thursday,
        friday: ret.friday,
        saturday: ret.saturday,
        sunday: ret.sunday,
      };
      delete ret._id;
      delete ret.__v;
      delete ret.propertyId;
    },
  },
});

const PropertySchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  name: { type: String },
}, {
  toJSON: {
    transform(_doc, ret) {
      ret.properties = {
        id: ret._id,
        name: ret.name,
      };
      delete ret._id;
      delete ret.__v;
    },
  },
});

const Pricing = mongoose.model('Pricing', PricingSchema);
const Property = mongoose.model('Property', PropertySchema);

module.exports = { Pricing, Property };
