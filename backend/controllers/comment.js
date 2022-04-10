const Comment = require("../models/comment");

exports.create = (req, res, next) => {
  // DEFINI LES CHAMPS REMPLI
  const comment = {
    content: req.body.content,
    authorId: req.body.authorId,
    postId: req.body.postId,
    username: req.body.username
  };
  Comment.save(comment)
    .then((result) => {
      const id = result[0].insertId;
      res.status(200).json({
        id,
        ...comment,
      });
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

exports.getAll = (req, res, next) => {
  Comment.findAll(req.params.postId)
    .then((result) => {
      const comments = result[0];
      res.status(200).json(comments);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

exports.delete = (req, res, next) => {
  Comment.deleteOne(req.params.id)
    .then(() => {
      res.status(200).json("Commentaire supprimé !");
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};
