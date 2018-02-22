'use strict';

const {MongoClient, ObjectId} = require('mongodb');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const url = 'mongodb://localhost:27017';
const app = express();
const port = 4245;
const perPage = 20;

app.use(cors({
  origin: '*',
  credentials: true,
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const connect = async (name) => {
  const db = await MongoClient.connect(url);
  const dbo = db.db("understanding");
  await dbo.createCollection(name);
  return {db, dbo};
}

const indexGetter = name => async (req, res) => {
  const {db, dbo} = await connect(name);
  let objs, count;
  try {
    const q = {};
    const sort = {[req.query.sort || '_id']: 1};
    const skip = +(req.query.skip || 0);
    objs = await dbo.collection(name).find(q).sort(sort)
                                     .limit(perPage).skip(skip).toArray();
    count = await dbo.collection(name).find(q).count();
  } catch (er) {
    db.close();
    res.json({data: [], count: 0, error: er.message});
    return;
  }
  db.close();
  res.json({data: objs, count});
}

const showGetter = name => async (req, res) => {
  let obj;
  const {db, dbo} = await connect(name);
  try {
    obj = await dbo.collection(name)
                   .findOne({_id: ObjectId(req.params.id)});
  } catch (er) {
    db.close();
    res.json({error: er.message});
    return ;
  }
  db.close();
  res.json({data: obj});
}

const poster = (name, valid) => async (req, res) => {
  const {db, dbo} = await connect(name);
  try {
    if (valid && !valid(req.body)) throw new Error("ivalid data");
    const r = await dbo.collection(name).insertOne(req.body)
  } catch (er) {
    db.close();
    res.json({ok: false, error: er.message});
    return ;
  }
  db.close();
  res.json({ok: true});
};

const deleter = name => async (req, res) => {
  const {db, dbo} = await connect(name);
  try {
    const q = {_id: ObjectId(req.params.id)};
    await dbo.collection(name).deleteOne(q);
  } catch (er) {
    db.close();
    res.json({ok: false, error: er.message});
    return;
  }
  db.close();
  res.json({ok: true});
};

app.get('/api/tests',         indexGetter('tests'));
app.get('/api/tests?/:id',    showGetter('tests'));
app.post('/api/tests?',       poster('tests'));
app.delete('/api/tests?/:id', deleter('tests'));

app.listen(port, ()=> console.log(`Listening on port ${port} since ${new Date()}`));

