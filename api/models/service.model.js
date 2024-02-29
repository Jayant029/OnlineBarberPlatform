// models/Service.js
import mongoose from "mongoose";
const { Schema } = mongoose;

const serviceSchema = new Schema(
{
  name: {type: String,required: true,},
  price: {type: Number,required: true,},
  userId: {type: String,required: true}
},
{
    timestamps: true,
}
);

export default mongoose.model("Service", serviceSchema);