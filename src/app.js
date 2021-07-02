require('dotenv').config();
const Server = require('./models/server');

try{
    const server = new Server();

    server.listen();

}catch(err){
    console.log(err);
    throw new Error(err);
}