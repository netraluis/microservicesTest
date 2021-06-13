import mongoose from 'mongoose';

// An interface that describes the properties
// that are requried to create a new User
interface UserAttrs {
  email: string;
  password: string;
}

// An interface that describes the properties
// that a User Model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// An interface that describes the properties
// that a User Document has
interface UserDoc extends UserAttrs, mongoose.Document {
  
}

const userSchemaFields: Record<keyof UserAttrs, any> = {
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}

const UserSchema = new mongoose.Schema<UserDoc,UserModel>(userSchemaFields);
UserSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', UserSchema);



export { User };
