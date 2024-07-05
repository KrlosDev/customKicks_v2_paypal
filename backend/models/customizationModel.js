import mongoose from 'mongoose';

const customizationSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
    },
    cellphone: {
      type: String,
    },
    email: {
      type: String,
    },
    customizationDetails: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Customization = mongoose.model('Customization', customizationSchema);

export default Customization;
