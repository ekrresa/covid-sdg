import { Router } from 'express';
import covid19ImpactEstimator from './estimator';

const router = Router();

router.post('/', (req, res) => {
  const inputData = req.body;
  const result = covid19ImpactEstimator(inputData);
  res.status(200).send(result);
});

export default router;
