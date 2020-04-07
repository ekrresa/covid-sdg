export function resolveToDays(dateFormat, duration) {
  switch (dateFormat) {
    case 'months':
      return duration * 30;
    case 'weeks':
      return duration * 7;
    default:
      return duration;
  }
}

export default function getProjectedInfections(
  duration,
  periodType,
  currentlyInfected
) {
  const resolvedDuration = resolveToDays(periodType, duration);
  const factor = Math.floor(resolvedDuration / 3);

  return currentlyInfected * 2 ** factor;
}
