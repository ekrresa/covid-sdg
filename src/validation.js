import Joi from '@hapi/joi';

const schema = Joi.object({
  region: Joi.object().keys({
    name: Joi.string().required(),
    avgAge: Joi.number(),
    avgDailyIncomeInUSD: Joi.number().required(),
    avgDailyIncomePopulation: Joi.number().required()
  }),
  periodType: Joi.string().valid('days', 'weeks', 'months').required(),
  timeToElapse: Joi.number().required(),
  reportedCases: Joi.number().required(),
  population: Joi.number().required(),
  totalHospitalBeds: Joi.number().required()
});

function validateBody(req, res, next) {
  const { error } = schema.validate(req.body, {
    abortEarly: false,
    allowUnknown: true
  });

  if (!error) {
    next();
  } else {
    res.status(422).send({ error });
  }
}

export default validateBody;
