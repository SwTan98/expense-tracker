const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const multer = require('multer')
const upload = multer()

const { ApolloServer, gql } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const { composeMongoose } = require('graphql-compose-mongoose');
const { schemaComposer } = require('graphql-compose')

// LOADING MONGO URI
require('dotenv').config()

// MONGO DB
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
const db = mongoose.connection;


db.on('error', console.error.bind(console, 'connection error:'));

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
})
const recordSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
    },
    amount: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: [ 'income', 'expense' ],
      required: true,
    },
    date: {
      type: Date,
      default: Date.now
    },
  }
)

const UserModel = mongoose.model('User', userSchema)
const RecordModel = mongoose.model('Record', recordSchema)

// EXPRESS
const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// APOLLO GRAPHQL

// STEP 2: CONVERT MONGOOSE MODEL TO GraphQL PIECES
const customizationOptions = {}; // left it empty for simplicity, described below
const UserTC = composeMongoose(UserModel);
const RecordTC = composeMongoose(RecordModel);

schemaComposer.Query.addFields({
  records: RecordTC.mongooseResolvers.findMany(),
  recordById: RecordTC.mongooseResolvers.findById(),
})

schemaComposer.Mutation.addFields({
  recordCreateOne: RecordTC.mongooseResolvers.createOne(),
  recordUpdateById: RecordTC.mongooseResolvers.updateById(),
  recordDeleteById: RecordTC.mongooseResolvers.removeById(),
  recordDeleteAll: RecordTC.mongooseResolvers.removeMany(),
})

const schema = schemaComposer.buildSchema()

const server = new ApolloServer({
  schema,
  cors: true,
  playground: true,
  introspection: true,
  tracing: true,
  path: '/',
});
    
server.applyMiddleware({ app });

module.exports = app;
