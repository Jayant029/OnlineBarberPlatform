import mongoose from "mongoose";
const { Schema } = mongoose;

const bookSchema = new Schema(
  {
    date: { type: Date, required: true },
    gigId: { type: String,required: true },
    selleruserId : {type: String,required: true},
    buyeruserId: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    status: {type: String,enum: ['pending', 'accepted', 'rejected'],default: 'pending'},
    new: {type:Boolean,default:false}
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("BookingModel", bookSchema);
