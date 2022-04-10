const db = require("../config/db");

class User {
  static save(user) {
    console.log(user);
    let sql = `INSERT INTO user (email, password, prenom, nom)
    VALUES ('${user.email}','${user.password}', '${user.prenom}', '${user.nom}')`;
    return db.execute(sql);
  }

  static findByEmail(email) {
    let sql = `SELECT * FROM user WHERE email='${email}'`;
    return db.execute(sql);
  }

  static findOne(id) {
    let sql = `SELECT * FROM user WHERE id='${id}'`;
    return db.execute(sql);
  }
}

module.exports = User;
