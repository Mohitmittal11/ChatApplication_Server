const validate = require("../SchemaValidation/allSchemaValidator");
const createHttpError = require("http-errors");

module.exports = function (validator) {
  return async function (req, res, next) {
    try {
      let requestData = await req.body;


      const validated = await validate[validator].validateAsync(requestData);
      requestData = validated;
      next();
    } catch (err) {
      if (err)
        return next(
          createHttpError(
            409,
            res.status(422).json({ errorMessage: err.message })
          )
        );
      next(createHttpError(500));
    }
  };
};
