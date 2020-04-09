import fs from 'fs';
import path from 'path';

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

export function getDurationInMilliseconds(startTime) {
  const NANOSEC_PER_SEC = 1e9;
  const NANOSEC_TO_MILLSEC = 1e6;
  const diff = process.hrtime(startTime);

  return (diff[0] * NANOSEC_PER_SEC + diff[1]) / NANOSEC_TO_MILLSEC;
}

export function writeToFile(data) {
  const filePath = path.join(__dirname, '../', 'logs.txt');
  const writeStream = fs.createWriteStream(filePath, { flags: 'a' });
  writeStream.write(data);
  writeStream.on('error', (err) => {
    console.error(err);
  });
}

export function readFromFile() {
  const filePath = path.join(__dirname, '../', 'logs.txt');
  const readStream = fs.createReadStream(filePath, { flags: 'a+' });

  return readStream;
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
