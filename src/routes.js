import { Router } from 'express';
import convert from 'xml-js';

import covid19ImpactEstimator from './estimator';
import { readFromFile } from './helpers';

const router = Router();
router.post('/xml', (req, res) => {
  const inputData = req.body;
  const result = covid19ImpactEstimator(inputData);

  const xml = convert.js2xml(result, {
    compact: true,
    ignoreComment: true,
    spaces: 4
  });

  res.status(200).type('application/xml').send(xml);
});

router.post('/json', (req, res) => {
  const inputData = req.body;
  const result = covid19ImpactEstimator(inputData);
  res.status(200).send(result);
});

router.get('/logs', (req, res) => {
  const result = readFromFile();

  result.on('data', (chunk) => {
    res.status(200).send(chunk.toString());
  });
});

router.post('/', (req, res) => {
  const inputData = req.body;
  const result = covid19ImpactEstimator(inputData);
  res.status(200).send(result);
});

export default router;
