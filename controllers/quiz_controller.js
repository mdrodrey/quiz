var models = require('../models/models.js');

<<<<<<< HEAD

// Autoload :id
exports.load = function(req, res, next, quizId) {
    models.Quiz.find(quizId).then(function(quiz) {
        if (quiz) {
            req.quiz = quiz;
            next();
        }
        else {
            next(new Error('No existe quizId=' + quizId))
        }
    }).catch(function(error) {
        next(error)
    });
};



exports.index = function(req, res) {

    var swhere = (req.query.textoAbuscar || "").replace(/\s{1,}/g, "%");
    models.Quiz.findAll({
        where: ["pregunta like ?", "%" + swhere + "%"]
    }).then(
        function(quizes) {
            res.render('quizes/index.ejs', {
                quizes: quizes,
                errors: []
            });
        }
    )
};


exports.show = function(req, res) {
    models.Quiz.find(req.params.quizId).then(function(quiz) {
        res.render('quizes/show', {
            quiz: req.quiz,
            errors: []
        });
=======
exports.question = function(req, res) {
    models.Quiz.findAll().then(function(quiz) {
    res.render('quizes/question', {pregunta : quiz[0].pregunta});
>>>>>>> 756d27aff18edf16608346a5a350e5ba5942411a
    })
};

exports.answer = function(req, res) {
<<<<<<< HEAD

    models.Quiz.find(req.params.quizId).then(function(quiz) {

        if (req.query.respuesta === req.quiz.respuesta) {
            res.render('quizes/answer', {
                quiz: req.quiz,
                respuesta: 'Correcto',
                errors: []
            });
        }
        else {
            res.render('quizes/answer', {
                quiz: req.quiz,
                respuesta: 'Incorrecto',
                errors: []
            });
        }

=======
    
     models.Quiz.findAll().then(function(quiz) {
         
    if (req.query.respuesta === quiz[0].respuesta) {
        res.render('quizes/answer', {respuesta : 'Correcto' });
    } else {
        res.render('quizes/answer', {respuesta : 'Incorrecto' });   
    }
    
>>>>>>> 756d27aff18edf16608346a5a350e5ba5942411a
    })
};

exports.new = function(req, res) {
    var quiz = models.Quiz.build({
        pregunta: "Pregunta",
        respuesta: "Respuesta"
    });

    res.render('quizes/new', {
        quiz: quiz,
        errors: []
    });
};

exports.create = function(req, res) {
    var quiz = models.Quiz.build(req.body.quiz);
    quiz.validate().then(
            function(err) {
                if (err) {
                    res.render('quizes/new', {
                        quiz: quiz,
                        errors: err.errors
                    });
                }
                else {
                    quiz // save: guarda en DB campos pregunta y respuesta de quiz
                        .save({
                            fields: ["pregunta", "respuesta"]
                        })
                        .then(function() {
                            res.redirect('/quizes')
                        })
                } // res.redirect: Redirección HTTP a lista de preguntas
            }
        );

};
