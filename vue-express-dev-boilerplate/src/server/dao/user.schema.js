import dbMongoose from './db'

var Schema = dbMongoose.Schema;

var userSchema = new Schema({
    name: String,
    password: String,
    uuid: String,
    loginTime: String,
    lastMsg: Schema.Types.Mixed
});

var user = dbMongoose.model('user', userSchema);

export default user;