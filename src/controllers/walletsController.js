import db from '../database/connection.js';
import * as walletValidation from '../validation/walletValidation.js';

export async function insertMovimentation(req, res) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  const validation = walletValidation.newRegister.validate(req.body);
  if (validation.error) return res.sendStatus(422);

  try {
    const thisTokenUser = await db.collection('sessions').findOne({ token });
    if (!thisTokenUser) return res.sendStatus(401);
    await db
      .collection('wallets')
      .insertOne({ ...req.body, userId: thisTokenUser.userId,date: new Date()});
    return res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}
