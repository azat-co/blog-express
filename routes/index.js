exports.article = require('./article');
exports.user = require('./user');

/*
 * GET home page.
 */

exports.index = function(req, res, next){
  req.collections.articles.find({published: true}).toArray(function(error, articles){
    if (error) return next(error);
    res.render('index', { articles: articles});
  })
};



