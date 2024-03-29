import mongoose from 'mongoose';
import { Password } from '../services/password';

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

const UserSchema = new mongoose.Schema<UserDoc,UserModel>(userSchemaFields, {
  toJSON: {
    transform(doc, ret){
      ret.id = ret._id;
      delete ret._id;
      delete ret.password;
    },
    versionKey: false
  }
});

UserSchema.pre('save', async function(done){
  if (this.isModified('password')){
    const hashed = await Password.toHash(this.get('password'))
    this.set('password', hashed)
  }
  done()
})

UserSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', UserSchema);



export { User };
