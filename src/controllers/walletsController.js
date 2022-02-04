import { ObjectId } from 'mongodb';
import db from '../database/connection.js';
import * as walletValidation from '../validation/walletValidation.js';

export async function insertMovimentation(req, res) {
  const validation = walletValidation.newRegister.validate(req.body);
  if (validation.error) return res.sendStatus(400);
  const { userId } = res.locals;
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
  const { userId } = res.locals;
  try {
    const walletActivity = await db
      .collection('wallets')
      .find({ userId }, { projection: { userId: 0 } })
      .toArray();
    if (!walletActivity.length) return res.sendStatus(204);
    return res.status(200).send(walletActivity);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}
export async function deleteMovimentation(req, res) {
  const { id } = req.params;
  try {
    const result = await db
      .collection('wallets')
      .deleteOne({ _id: new ObjectId(id) });
    if (!result.deletedCount) return res.sendStatus(404);
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}
export async function updateMovimentation(req, res) {
  const validation = walletValidation.register.validate(req.body);
  if (validation.error) return res.sendStatus(400);
  const { id } = req.params;
  try {
    const result = await db
      .collection('wallets')
      .updateOne({ _id: new ObjectId(id) }, { $set: req.body });
    if (!result.modifiedCount) return res.sendStatus(404);
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}
