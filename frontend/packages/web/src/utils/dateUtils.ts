import { getAllTimezones, getTimezone } from 'countries-and-timezones';

export const getTimeZoneLabel = (zone: string) => {
  const timezone = getTimezone(zone);

  return timezone ? `GMT${timezone.utcOffsetStr} (${timezone.name})` : '';
};

export const getTimeZones = () => {
  const timezones = getAllTimezones();

  return Object.keys(timezones)
    .filter((zone) => !zone.includes('GMT'))
    .sort((a, b) => {
      const offsetA = timezones[a as keyof typeof timezones].utcOffsetStr;
      const offsetB = timezones[b as keyof typeof timezones].utcOffsetStr;

      if (offsetA[0] !== offsetB[0] || offsetA[0] === '-') return offsetA > offsetB ? -1 : 1;
      return offsetA > offsetB ? 1 : -1;
    });
};
