export default function getProjectedInfections(duration, currentlyInfected) {
  const factor = Math.floor(duration / 3);

  return currentlyInfected * 2 ** factor;
}
