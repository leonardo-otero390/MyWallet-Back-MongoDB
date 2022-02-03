import db from '../database/connection.js';
import * as walletValidation from '../validation/walletValidation.js';

export async function insertMovimentation(req, res) {
  const validation = walletValidation.newRegister.validate(req.body);
  if (validation.error) return res.sendStatus(400);
  const userId = req.locals;
  try {
    await db.collection('wallets').insertOne({
      ...req.body,
      userId,
      date: new Date(),
    });
    return res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}
export async function find(req, res) {
  const userId = req.locals;
  try {
    const walletActivity = await db
      .collection('wallets')
      .find({ userId })
      .toArray();
    if (!walletActivity.length) return res.sendStatus(204);
    return res.status(200).send(walletActivity);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}
