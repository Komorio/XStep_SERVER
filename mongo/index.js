var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () { console.log("Mongo On"); });


var UsersSchema = mongoose.Schema({
  id : {type : String},
  name: {type : String},
  passwd : {type : String},
  level : {type : String},
  iconToken : {type: String},
  titleToken: {type :String},
  exp : {type : Number},
  iconToken : {type: String},
  highClear : {type : Number},
  token : {type: String}
});

var GameSchema = mongoose.Schema({
  musicName : {type: String},
  recordTotal : {type :String},
  perPlay : {type : String},
  freeStyle : {type :String},
  challenge : {type :String},
  playedUser : {type: String},
  musicToken : {type : String},
  userToken : {type: String}
});

var MessageSchema = mongoose.Schema({
  phone : {type: String, required: true},
  data : {type: String, required: true},
  nowDate : {type : String},
  userToken : {type: String},
  docNum : {type: Number},
  token : {type: String}
});


Users = mongoose.model('users', UsersSchema);
Message = mongoose.model('message', MessageSchema);
Game = mongoose.model('game', GameSchema);

exports.Game = Game;
exports.Users = Users;
exports.Message = Message;
