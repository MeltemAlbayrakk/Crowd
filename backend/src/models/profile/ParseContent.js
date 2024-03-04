import mongoose from 'mongoose';


const { Schema } = mongoose;

const ParseSchema = new Schema({
  resultArray: {
    type: Array,
    required: true,
  }, 
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User' 
    }
  });

  const ParseModel = mongoose.model('ParseContent', ParseSchema);

export default ParseModel;