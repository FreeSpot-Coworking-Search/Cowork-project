const { insertNewUser } = require('../helpers/dbhelpers');

const postUser = async (req, res, next) => {
  try {
    const newUser = req.body;
    await insertNewUser(newUser);
    console.log(req.body);
    res.status(200);
    res.send(newUser);
  } catch (error) {
    next(error);
  }
};

module.exports = postUser;
