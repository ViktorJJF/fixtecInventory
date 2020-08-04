require("dotenv").config();
const mongoose = require("mongoose");
const initMongo = require("../config/mongo");
const fs = require("fs");
initMongo();

const CLEANFIRST = true;

async function beginSeed() {
  console.log("empezando seeder...");
  const files = fs.readdirSync(".");
  for (const file of files) {
    if (file.includes(".seeder")) {
      let modelName = formatFileName(file);
      let model = require("../models/" + modelName);
      let data = require("./" + file);
      await seedCollection(model, await data);
    }
  }
  console.log("SEEDING TERMINADO...");
}

function formatFileName(file) {
  var indexes = [];
  for (var i = 0; i < file.length; i++) {
    if (file[i] === ".") indexes.push(i);
  }
  let model = file.substring(indexes[0] + 1, indexes[1]);
  return model;
}

async function seedCollection(model, data = [], cleanBefore = true) {
  //delete collection
  let result = [];
  let collectionName = model.collection.collectionName;
  if (CLEANFIRST && cleanBefore) {
    try {
      await mongoose.connection.dropCollection(collectionName);
      console.log("se eliminó: ", collectionName);
    } catch {
      console.log(`el modelo ${collectionName} ya había sido eliminado`);
    }
  }
  //seed collection
  try {
    result = await model.insertMany(data);
    console.log(`Seed terminado en ${collectionName}`);
    return result;
  } catch (error) {
    console.log(
      "algo salio mal con el seed en " + collectionName + "...",
      error
    );
  }
}

beginSeed();
