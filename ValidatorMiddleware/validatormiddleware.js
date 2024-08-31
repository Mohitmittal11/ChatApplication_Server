const createHttpError = require("http-errors");
const validate = require("../SchemaValidation/allSchemaValidator");

module.exports = function (validator) {
  return async function (req, res, next) {
    try {
      let requestData = await req.body;
      console.log("Request body is ", requestData);

      const validated = await validate[validator].validateAsync(requestData);
      requestData = validated;
      next();
    } catch (err) {
      if (err)
        return next(
          createHttpError(
            422,
            res.status(422).json({ errorMessage: err.message })
          )
        );

      next(createHttpError(500));
    }
  };
};
