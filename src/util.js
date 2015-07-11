export const ONE_MINUTE = 60 * 1000;
export const ONE_HOUR = 60 * ONE_MINUTE;
export const ONE_DAY = 24 * ONE_HOUR;

/** Returns the relative time difference between now
  * and the input date as a friendly string
  * (eg. '5 minutes ago', '3 hours ago') or the
  * absolute date if the date is more than 24 hours ago
  */
export function relativeDateString(date: Date | number) {
	const age = Date.now() - date;
	if (age < ONE_MINUTE) {
		return 'seconds ago';
	} else if (age < ONE_HOUR) {
		return `${Math.round(age / ONE_MINUTE)} minutes ago`;
	} else if (age < ONE_DAY) {
		return `${Math.round(age / ONE_HOUR)} hours ago`;
	} else {
		return (new Date(date)).toDateString();
	}
}

