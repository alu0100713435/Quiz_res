var AbstractQuiz = require('../models/abstract_quiz_model.js');

function Pregunta(){
  this.pregunta;
  this.resp;
}

function PreguntaLarga(x) {
  Pregunta.call(this);

  this.pregunta = x;
  this.resp = "<textarea name='respuesta' placeholder='Respuesta' rows='4' cols='50'></textarea>";
}

PreguntaLarga.prototype = new Pregunta();

PreguntaLarga.prototype.constructor = PreguntaLarga;

PreguntaLarga.prototype.get_area = function(){
  return this.resp;
}

PreguntaLarga.prototype.get_pregunta = function(){
  return this.pregunta;
}

function PreguntaCorta(x) {
  Pregunta.call(this);

  this.pregunta = x;
  this.resp = "<input type='text' name='respuesta' placeholder='Responda aquí'' />";
}

PreguntaCorta.prototype = new Pregunta();

PreguntaCorta.prototype.constructor = PreguntaCorta;

PreguntaCorta.prototype.get_area = function(){
  return this.resp;
}

PreguntaCorta.prototype.get_pregunta = function(){
  return this.pregunta;
}

function Respuesta(x){

  // Si es entero o cadena
  if(typeof(x)==='string' || typeof(x)==='number'){
    return function(res){return res === x;};
  }

  // Si es una expresión regular
  else if(x instanceof RegExp === true){
    return function(res){return res.match(x);};
  }

  // Si es una funcion
  else {
    return x;
  }
}

function Quiz() {

  AbstractQuiz.call(this);

  this.q.push(

    { pregunta: new PreguntaCorta('¿Cual es la capital de Butan?'),
      respuesta: new Respuesta(/^\s*Timbu\s*$/i)
    },

    {
      pregunta: new PreguntaLarga('¿Cual es el gentilicio de la gente de Chad(pais)?'),
      respuesta: new Respuesta(/^\s*Chadiense\s*$/i)
    }

    /*{ pregunta: '¿Cual es la principal religion de Turkmenistan?',
      respuesta: function(x) {
        return (/\s*Musulman\s*$/i).exec(x);
      }
    },

    { pregunta: '¿Cual es la nacionalidad de Albert Einsten?',
      respuesta: function(x) {
        return (/\s*Aleman\s*$/i).exec(x);
      }
    },
    
    { pregunta: '¿Quien era Alan Turing?',
      respuesta: function(x) {
        return (/\s*Alguien\s*$/i).exec(x);
      }
    }*/

  );

  // insertar unas cuantas preguntas sobre
  // la tabla de multiplicar
  var self  = this;
  for(var i = 0; i<3;i++) {
    (function() {
      var n1 = Math.randomInt(9)+1;
      var n2 = Math.randomInt(9)+1;
      self.q.push(
        { pregunta: '¿ '+n1+'x'+n2+" ?",
          respuesta: function(x) {
            return (x == n1*n2);
        }
      })
    })();
  }
}

Quiz.prototype = new AbstractQuiz();
Quiz.prototype.constructor = Quiz;

Quiz.prototype.numQuestions = function() {
  return this.q.length;
}

Quiz.prototype.getQ = function(x){
  return this.q[x]['pregunta'];
}

module.exports = Quiz;