import getProjectedInfections from './helpers';

const covid19ImpactEstimator = (data) => {
  const impact = {};
  const severeImpact = {};

  impact.currentlyInfected = data.reportedCases * 10;
  severeImpact.currentlyInfected = data.reportedCases * 50;

  impact.infectionsByRequestedTime = getProjectedInfections(
    28,
    impact.currentlyInfected
  );

  severeImpact.infectionsByRequestedTime = getProjectedInfections(
    28,
    severeImpact.currentlyInfected
  );

  return {
    data: { ...data },
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
