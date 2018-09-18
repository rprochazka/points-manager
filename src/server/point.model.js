const mongoose = require('mongoose');
const autoIncrement = require('mongoose-plugin-autoinc').autoIncrement;
// import { autoIncrement } from 'mongoose-plugin-autoinc';

const Schema = mongoose.Schema;

const pointSchema = new Schema(
  {
    pointId: { type: Number, unique: true },
    owner: { type: String, required: true },
    reason: { type: String, required: true },
    note: { type: String, required: false },
    points: { type: Number, required: true },
    submitter: { type: String, required: true },
    submittedDate: { type: Date, required: true },
    paid: { type: Boolean, required: false },
    paidDate: { type: Date, required: false },
    lastModifiedDate: { type: Date, required: true }
  },
  {
    collection: 'points',
    read: 'nearest'
  }
);

pointSchema.plugin(autoIncrement, { model: 'Point', field: 'pointId' });
const Point = mongoose.model('Point', pointSchema);

module.exports = Point;
