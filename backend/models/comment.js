const db = require("../config/db");

class Comment {
  static save(comment) {
    let sql = `INSERT INTO comment (content, authorId, postId, username)
      VALUES ('${comment.content}', '${comment.authorId}', '${comment.postId}', '${comment.username}')`;
    return db.execute(sql);
  }

  static findAll(postId) {
    let sql = `SELECT * FROM comment WHERE postId = ${postId}`;
    return db.execute(sql);
  }

  static deleteOne(id) {
    let sql = `DELETE FROM comment WHERE id='${id}'`;
    return db.execute(sql);
  }
}

module.exports = Comment;
