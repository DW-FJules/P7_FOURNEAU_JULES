const db = require("../config/db");

class Post {
  static save(post) {
    let sql = `INSERT INTO post (text, imageUrl, authorId)
      VALUES ('${post.text}',"${imageUrl}", '${post.authorId}')`;
    return db.execute(sql);
  }

  static findOne(id) {
    let sql = `SELECT * FROM post WHERE id='${id}'`;
    return db.execute(sql);
  }
  static deleteOne(id) {
    let sql = `DELETE FROM post WHERE id='${id}'`;
    return db.execute(sql);
  }
}

module.exports = Post;
