import bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';
import { v4 as uuid } from 'uuid';
import db from '../database/connection.js';
import * as usersValidation from '../validation/usersValidation.js';

export async function upsert(req, res) {
  const validation = usersValidation.validateLogIn.validate(req.body);
  if (validation.error) return res.sendStatus(400);
  const { email, password } = req.body;
  try {
    const user = await db.collection('users').findOne({ email });
    if (!bcrypt.compareSync(password, user.password) || !user)
      return res.sendStatus(401);

    const token = uuid();
    await db
      .collection('sessions')
      .updateOne(
        { userId: user._id },
        { $set: { token, userId: user._id } },
        { upsert: true }
      );
    return res.status(200).send({ token, user: user.name });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}
export async function remove(req, res) {
  const userId = new ObjectId(req.locals);
  try {
    await db.collection('sessions').deleteMany({ userId });
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}
