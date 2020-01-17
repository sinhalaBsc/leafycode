/*
 * this is database models for todo app
 *
 * */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let todoSchema = new Schema({
   //description: String,
   description:{
      type:String,
      required:true // data required, "" not accept	   
   },
   //done: Boolean,
   done:{ // to set default value
     type:Boolean,
     default:false
   },
   time:String	
});

module.exports = mongoose.model("Todo",todoSchema);

