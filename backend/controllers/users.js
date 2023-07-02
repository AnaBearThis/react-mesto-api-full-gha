const bcrypt = require('bcrypt');
const jsonWebToken = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new Error('Запрашиваемая страница не найдена');
      } else {
        res.send(user);
      }
    })
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new Error('Запрашиваемая страница не найдена');
      } else {
        res.send(user);
      }
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hashedPass) => {
      User.create({
        name,
        about,
        avatar,
        email,
        password: hashedPass,
      })
        .then((user) => {
          res.status(201).send(user);
        })
        .catch((err) => {
          next(err);
        });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select('+password')
    .orFail(() => {
      throw new Error('Неверные данные пользователя');
    })
    .then((user) => {
      bcrypt.compare(password, user.password)
        .then((isValid) => {
          if (isValid) {
            const jwt = jsonWebToken.sign({
              _id: user._id,
            // eslint-disable-next-line dot-notation
            }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
            console.log(JWT_SECRET);
            res.cookie('jwt', jwt, {
              maxAge: 604800,
              httpOnly: true,
              sameSite: true,
            });
            console.log(res.req);
            res.send(user);
          } else {
            throw new Error('Неверные данные пользователя');
          }
        })
        .catch(next);
    })
    .catch(next);
};

module.exports.updateUserInfo = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new Error('Запрашиваемая страница не найдена');
      } else {
        res.send(user);
      }
    })
    .catch(next);
};

module.exports.updateAvatar = (req, res, next) => {
  const avatar = req.body;

  User.findByIdAndUpdate(req.user._id, avatar, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new Error('Запрашиваемая страница не найдена');
      } else {
        res.send(user);
      }
    })
    .catch(next);
};
