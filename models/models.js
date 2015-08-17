var path = require('path');

//cargar modelo ORM
var Sequelize = require('sequelize');

//cargar DB SQLite
var sequelize = new Sequelize(null,null,null,
                              {dialect: "sqlite",storage: "quiz.sqlite"});
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
                        });
            .success(function(){console.log('Base de Datos inicializada')});
        }
    })
    
    });