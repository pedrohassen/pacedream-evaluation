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
});

const PropertySchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  name: { type: String },
  pricing: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pricing' }],
});

const Pricing = mongoose.model('Pricing', PricingSchema);
const Property = mongoose.model('Property', PropertySchema);

module.exports = { Pricing, Property };
