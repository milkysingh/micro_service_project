import mongoose from 'mongoose';
import { Password } from '../services/password';
const { Schema } = mongoose;
// An interface describing the properties that are required to create a new User
interface UserAttrs {
  email: string;
  password: string;
}
//An interface describes the properties that a User Model has.
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// An interface which describes the properties on a User Doc

interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
  updatedAt: string;
}

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};
userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashedPassword = await Password.hashPassword(this.get('password'));
    this.set('password', hashedPassword);
  }
  done();
});
const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
