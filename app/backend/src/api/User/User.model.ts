import { instanceMethod, InstanceType, pre, prop, Typegoose } from 'typegoose';
import { BcryptService } from '../../service/bcrypt';
import { ExtractClassShape } from '../../typings';
import { DBCollection } from '../../util/constants';

export type UserDoc = ExtractClassShape<UserModel>;

export type UserInstance = InstanceType<UserModel>;

@pre<UserModel>('save', async function(next): Promise<void> {
  const doc = this;
  const [err, hash] = await BcryptService.hash(doc.password);
  if (err) return next(err);
  doc.password = hash as string;
  return next();
})
class UserModel extends Typegoose {
  @prop() public email!: string;
  @prop() public password!: string;

  @instanceMethod
  public comparePassword(this: UserInstance, password: string): Promise<[Error?, boolean?]> {
    return BcryptService.compareHash(password, this.password);
  }
}

const options = { schemaOptions: { collection: DBCollection.User } };
export const User = new UserModel().getModelForClass(UserModel, options);
