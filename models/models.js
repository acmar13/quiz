var path = require('path');

//Postgres DATABASE_URL=postgres://user:password@host:port/database
//SQLite DATABASE_URL=sqlite://:@:/
var url     = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name = (url[6]||null);
var user    = (url[2]||null);
var pwd     = (url[3]||null);
var protocol= (url[1]||null);
var dialect = (url[1]||null);
var port    = (url[5]||null);
var host    = (url[4]||null);
var storage = process.env.DATABASE_STORAGE;


//cargar modelo ORM
var Sequelize = require('sequelize');

//cargar DB SQLite

var sequelize = new Sequelize(DB_name,user,pwd,
    { dialect: protocol,
      protocol:protocol,
      port:     port,
      host:     host,
     storage:   storage, //solo SQLite (.env)
     omitNull:  true    // solo postgres
    }
);

//Importar la definición de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname,'quiz'));
exports.Quiz=Quiz; //exporta definición de la tabla Quiz.

// sequelize.sync() crea e inicializa la tabla de preguntas en DB
sequelize.sync().success(function(){
    //success(..) ejecuta el manejador una vz creada la tabla
    Quiz.count().success(function(count){
        if(count==0){
            Quiz.create({ pregunta:'Capital de Italia',
                          respuesta:'Roma'
                        })
            .success(function(){console.log('Base de Datos inicializada')});
        }
    })
    
});