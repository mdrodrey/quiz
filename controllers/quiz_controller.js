var models = require('../models/models.js');


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
    })
};

exports.answer = function(req, res) {

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