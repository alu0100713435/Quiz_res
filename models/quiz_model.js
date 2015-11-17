var AbstractQuiz = require('../models/abstract_quiz_model.js');

function Quiz() {

  AbstractQuiz.call(this);

  this.q.push(

    { pregunta: '¿Cual es la capital de Butan?',
      respuesta: function(x) {
        return (/^\s*Timbu\s*$/i).exec(x);
      }
    },

    {
      pregunta: '¿Cual es el gentilicio de la gente de Chad(pais)?',
      respuesta: function(x) {
        return (/\s*Chadiense\s*$/i).exec(x);
      }
    },

    { pregunta: '¿Cual es la principal religion de Turkmenistan?',
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
    }

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