const db = require("../../config/db");
const userController = require("./user_controller");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config({ path: "../../config/.env" });

const maxAge = 3 * 24 * 60 * 60 * 1000; // l'"age" maximum avant expiration d'un token (3 jours en millisecondes)

const createToken = (id, mail) => {
  return jwt.sign({ id: id, mail: mail }, process.env.SECRET_TOKEN, {
    expiresIn: maxAge,
  });
};

module.exports.signUp = async (req, res) => {
  await userController.addUser(req, res);
};

module.exports.signIn = async (req, res) => {
  const { mail, password } = req.body;
  if (!mail || !password) {
    return res.status(400).json({ message: "mail and password required" });
  }
  const query = "SELECT * FROM User WHERE mail = ?";

  db.query(query, [mail], (err, results) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "Incorrect mail or password" });
    }

    const user = results[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ message: "Server error" });
      }

      if (!isMatch) {
        return res.status(401).json({ message: "Incorrect mail or password" });
      }

      const token = createToken(user.user_id, user.mail);

      return res.status(200).json({ token });
    });
  });
};
