import HttpError from "./HttpError.js";

const validateBody = (schema) => (req, _res, next) => {
  const { error } = schema.validate(req.body);

  if (error) {
    if (error.details[0].type === "object.min") {
      return next(HttpError(400, "Body must have at least one field"));
    }

    return next(
      HttpError(400, "Помилка від Joi або іншої бібліотеки валідації"),
    );
  }

  next();
};

export default validateBody;
