import getProjectedInfections, { resolveToDays } from './helpers';

export default function severeImpactEstimator(inputData) {
  const output = {};

  output.currentlyInfected = inputData.reportedCases * 50;

  output.infectionsByRequestedTime = getProjectedInfections(
    inputData.timeToElapse,
    inputData.periodType,
    output.currentlyInfected
  );

  output.severeCasesByRequestedTime = 0.15 * output.infectionsByRequestedTime;

  const bedsAvailable = 0.35 * inputData.totalHospitalBeds;

  output.hospitalBedsByRequestedTime =
    bedsAvailable - output.severeCasesByRequestedTime;

  output.casesForICUByRequestedTime = 0.05 * output.infectionsByRequestedTime;

  output.casesForVentilatorsByRequestedTime =
    0.02 * output.infectionsByRequestedTime;

  output.dollarsInFlight =
    output.infectionsByRequestedTime *
    inputData.region.avgDailyIncomePopulation *
    inputData.region.avgDailyIncomeInUSD *
    resolveToDays(inputData.periodType, inputData.timeToElapse);

  return output;
}
