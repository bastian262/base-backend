const express = require('express');
const cors = require('cors');
const { dbConection } = require('../database/config');

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT || 27017;
        this.usuariosPath = '/api/usuarios';
        this.questionPath = '/api/question';
        this.signInPath = '/api/signIn';
        this.mailerPath = '/api/mailer';
        // Middlewares
        this.middlewares();
        // Rutas de mi aplicación
        this.routes();
        // Conectar a bd
        this.conectarDB();
    }
    async conectarDB (){
        try{
            await dbConection();
        }catch(error){
            throw new Error(error.message);
        }
    }
    middlewares() {

        
        
        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio Público
        this.app.use( express.static('public') );


    }

    routes() {
        this.app.use( this.usuariosPath, require('../routes/usuarios'));
        this.app.use( this.questionPath, require('../routes/questions'));
        this.app.use( this.signInPath, require('../routes/signIn'));
        this.app.use( this.mailerPath, require('../routes/mailer'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}




module.exports = Server;
