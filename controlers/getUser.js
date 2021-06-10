const { takeUser } = require('../helpers/dbhelpers');

const getUser = async (req, res, next) => {
  try {
    const { id } = req.query;
    const user = await takeUser(id);
    if (user.length === 0) {
      const error = new Error('El usuario no existe');
      error.httpStatus = 400;
      throw error;
    }
    res.status(200);
    res.send(user);
  } catch (error) {
    next(error);
  }
};

module.exports = getUser;
