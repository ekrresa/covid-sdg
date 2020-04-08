import { Router } from 'express';
import xml2js from 'xml2js';
import covid19ImpactEstimator from './estimator';
import { readFromFile } from './helpers';

const router = Router();

router.post('/xml', (req, res) => {
  const inputData = req.body;
  const result = covid19ImpactEstimator(inputData);

  const builder = new xml2js.Builder({
    renderOpts: { pretty: true }
  });

  const xmlString = builder.buildObject(result);
  res.set(('Content-Type', 'text/xml'));
  res.status(200).send(xmlString);
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
