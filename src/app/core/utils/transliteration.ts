// Map of Latin -> Cyrillic
const LAT_TO_CYR_PAIRS: Array<[string, string]> = [
  ['a', 'а'],
  ['b', 'б'],
  ['v', 'в'],
  ['g', 'г'],
  ['d', 'д'],
  ['e', 'е'],
  ['yo', 'ё'],
  ['zh', 'ж'],
  ['z', 'з'],
  ['i', 'и'],
  ['j', 'й'],
  ['k', 'к'],
  ['l', 'л'],
  ['m', 'м'],
  ['n', 'н'],
  ['o', 'о'],
  ['p', 'п'],
  ['r', 'р'],
  ['s', 'с'],
  ['t', 'т'],
  ['u', 'у'],
  ['f', 'ф'],
  ['h', 'х'],
  ['c', 'ц'],
  ['ch', 'ч'],
  ['sh', 'ш'],
  ['sch', 'щ'],
  ['y', 'ы'],
  ['e', 'э'],
  ['yu', 'ю'],
  ['ya', 'я'],
];

// Map of Cyrillic > Latin
const CYR_TO_LAT: Record<string, string> = {
  а: 'a',
  б: 'b',
  в: 'v',
  г: 'g',
  д: 'd',
  е: 'e',
  ё: 'yo',
  ж: 'zh',
  з: 'z',
  и: 'i',
  й: 'j',
  к: 'k',
  л: 'l',
  м: 'm',
  н: 'n',
  о: 'o',
  п: 'p',
  р: 'r',
  с: 's',
  т: 't',
  у: 'u',
  ф: 'f',
  х: 'h',
  ц: 'c',
  ч: 'ch',
  ш: 'sh',
  щ: 'sch',
  ы: 'y',
  э: 'e',
  ю: 'yu',
  я: 'ya',
};

// Convert Latin -> Cyrillic
export function transliterateToCyrillic(s: string): string {
  let res = s;
  const pairs = LAT_TO_CYR_PAIRS.slice().sort((a, b) => b[0].length - a[0].length);

  for (const [lat, cyr] of pairs) {
    const re = new RegExp(lat, 'g');
    res = res.replace(re, cyr);
  }

  return res;
}

// Convert Cyrillic -> Latin
export function transliterateToLatin(s: string): string {
  return s
    .split('')
    .map((ch) => CYR_TO_LAT[ch] || ch)
    .join('');
}

export function generateQueryVariants(q: string): string[] {
  return [q, transliterateToCyrillic(q), transliterateToLatin(q)].filter(Boolean);
}
