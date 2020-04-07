import getProjectedInfections from './helpers';

const covid19ImpactEstimator = (data) => {
  const impact = {};
  const severeImpact = {};

  impact.currentlyInfected = data.reportedCases * 10;
  severeImpact.currentlyInfected = data.reportedCases * 50;

  impact.infectionsByRequestedTime = getProjectedInfections(
    data.timeToElapse,
    data.periodType,
    impact.currentlyInfected
  );

  severeImpact.infectionsByRequestedTime = getProjectedInfections(
    data.timeToElapse,
    data.periodType,
    severeImpact.currentlyInfected
  );

  impact.severeCasesByRequestedTime = 0.15 * impact.infectionsByRequestedTime;
  severeImpact.severeCasesByRequestedTime =
    0.15 * severeImpact.infectionsByRequestedTime;

  const bedsAvailable = 0.35 * data.totalHospitalBeds;

  impact.hospitalBedsByRequestedTime =
    bedsAvailable - impact.severeCasesByRequestedTime;
  severeImpact.hospitalBedsByRequestedTime =
    bedsAvailable - severeImpact.severeCasesByRequestedTime;

  return {
    data: { ...data },
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;

// const input = {
//   region: {
//     name: 'Africa',
//     avgAge: 19.7,
//     avgDailyIncomeInUSD: 5,
//     avgDailyIncomePopulation: 0.71
//   },
//   periodType: 'days',
//   timeToElapse: 58,
//   reportedCases: 674,
//   population: 66622705,
//   totalHospitalBeds: 1380614
// };
