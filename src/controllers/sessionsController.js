import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import db from '../database/connection.js';
import * as usersValidation from '../validation/usersValidation.js';

export async function insert(req, res) {
  const validation = usersValidation.validateLogIn.validate(req.body);
  if (validation.error) return res.status(400).send(validation.error.message);
  const { email, password } = req.body;
  try {
    const user = await db.collection('users').findOne({ email });
    if (!user) return res.sendStatus(404);
    if (!bcrypt.compareSync(password, user.password))
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
