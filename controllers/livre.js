var Livre = require("../models/livre");
const { param, body, validationResult } = require("express-validator");


// Create
exports.create = [
  // Check validation
  body("id")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Id must be specified.")
    .isNumeric()
    .withMessage("Id must be a number."),

  body("bookTitle")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Book name must be specified.")
    .isAlphanumeric()
    .withMessage("Book name has non-alphanumeric characters."),

  body("bookPublisher")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Book publisher must be specified.")
    .isAlphanumeric()
    .withMessage("Book publisher has non-alphanumeric characters."),

  body("bookType")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Book type must be specified."),

  body("releaseDate", "Invalid date of release")
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),

  // Process Request
  (req, res, next) => {

    const errors = validationResult(req);


    var livre = new Livre({
      _id: req.body.id,
      bookTitle: req.body.bookTitle,
      bookPublisher: req.body.bookPublisher,
      bookType: req.body.bookType,
      releaseDate: req.body.releaseDate,
    });

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      livre.save(function (err) {
        if (err) {
          return res.status(500).json(err);
        }
        return res.status(201).json("Book created successfully !");
      });
    }
  },
];

// Read
exports.getAll = function (req, res, next) {
  Livre.find().exec(function (err, result) {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json(result);
  });
};

exports.getById = [
  param("id")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Id must be specified.")
    .isNumeric()
    .withMessage("Id must be a number."),

  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      Livre.findById(req.params.id).exec(function (err, result) {
        if (err) {
          return res.status(500).json(err);
        }
        return res.status(200).json(result);
      });
    }
  },
];

// Delete
exports.delete = [
  param("id")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Id must be specified.")
    .isNumeric()
    .withMessage("Id must be a number."),

  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      Livre.findByIdAndRemove(req.params.id).exec(function (err, result) {
        if (err) {
          return res.status(500).json(err);
        }
        return res.status(200).json("Book deleted successfully !");
      });
    }
  },
];

// Update
exports.update = [
  param("id")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Id must be specified.")
    .isNumeric()
    .withMessage("Id must be a number."),

  body("bookTitle")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Book title must be specified.")
    .isAlphanumeric()
    .withMessage("Book title has non-alphanumeric characters."),

  body("bookPublisher")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Book publisher must be specified.")
    .isAlphanumeric()
    .withMessage("Book publisher has non-alphanumeric characters."),

  body("bookType")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Book type must  be specified."),


  body("releaseDate", "Invalid date of release")
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),

  (req, res, next) => {
    // Extract the validation errors from a request.

    //======== les message d'error seront enregistre dans la var errors
    const errors = validationResult(req);

    //===== preparer l'obj
    var livre = new Livre({
      _id: req.params.id,
      bookTitle: req.body.bookTitle,
      bookPublisher: req.body.bookPublisher,
      bookType: req.body.bookType,
      releaseDate: req.body.releaseDate,
    });


    //======== 

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      Livre.findByIdAndUpdate(req.params.id, livre, function (err, result) {
        if (err) {
          return res.status(500).json(err);
        }
        return res.status(201).json("Book updated successfully !");
      });
    }
  },
];