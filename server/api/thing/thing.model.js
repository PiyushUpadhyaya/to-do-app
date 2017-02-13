'use strict';

import mongoose from 'mongoose';

var ThingSchema = new mongoose.Schema({
  name: String,
  user_name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('Thing', ThingSchema);
