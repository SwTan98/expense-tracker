var express = require('express');
var cors = require('cors');
var logger = require('morgan');
var multer = require('multer')
var upload = multer()

const { ApolloServer, gql } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const { composeMongoose } = require('graphql-compose-mongoose');
const { schemaComposer } = require('graphql-compose')

// LOADING MONGO URI
require('dotenv').config()

// MONGO DB
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
var db = mongoose.connection;


db.on('error', console.error.bind(console, 'connection error:'));

var userSchema = new mongoose.Schema({
  username: String,
  password: String,
})
var recordSchema = new mongoose.Schema(
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
var app = express();

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


// RESTFUL ROUTES

app.post('/record', upload.none(), function (req, res, next) {

  console.log(req.body)

  if (Object.keys(req.body).length === 0) {
      res.status(400).json({
          "error": "Please dont send empty"
      })
      return next
  }
  
  RecordModel.create({
    category: req.body.category,
    desc: req.body.desc,
    amount: req.body.amount,
    type: req.body.type,
    date: req.body.date,
  }, function (err, record) {
    if (err) return next(err);

    res.status(201).json({
      "message": "Uploaded",
      "data": record
    })
  })
    
})

app.get('/record', function (req, res) {
  RecordModel.find({}, function (err, record) {
    res.json({
      "data" : record
    })
  })
})

app.get('/record/:id', function (req, res) {
  console.log(res.params)
  RecordModel.findById(req.params.id, function (err, record) {
    res.json({
        "data" : record
    })
  })
})

app.put('/record/:id', upload.none(), function (req, res) {
  RecordModel.findByIdAndUpdate(
    req.params.id,
    {
      category: req.body.category,
      desc: req.body.desc,
      amount: req.body.amount,
      type: req.body.type,
      date: req.body.date,
    },
    function (err, data) {
      if (err) throw err
        res.json({ data })
    }
  )
})

app.delete('/record/:id', function (req, res) {
  RecordModel.findByIdAndRemove(req.params.id, function (err, data) {
    res.json({ data })
  })
})

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.json({
    "error": err
  });
  });


module.exports = app;
