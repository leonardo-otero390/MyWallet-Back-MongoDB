import bcrypt from 'bcrypt';
import db from '../database/connection.js';
import * as usersValidation from '../validation/usersValidation.js';

export async function insert(req, res) {
  const newUser = req.body;
  const validation = usersValidation.validateNew.validate(newUser);
  if (validation.error) return res.sendStatus(422);
  try {
    const emailSearch = await db
      .collection('users')
      .findOne({ email: newUser.email });
    if (emailSearch) return res.sendStatus(409);
    const passwordHash = bcrypt.hashSync(newUser.password, 10);
    await db
      .collection('users')
      .insertOne({ ...newUser, password: passwordHash });
    return res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}
