export const COUNTRY_NAME_VARIANTS = {
  'united states': ['usa', 'united states of america', 'us', 'u.s.a.', 'u.s.', 'america'],
  'united kingdom': ['uk', 'great britain', 'britain', 'england', 'u.k.', 'gb'],
  'czech republic': ['czechia'],
  'democratic republic of the congo': ['drc', 'dr congo', 'congo-kinshasa'],
  'republic of the congo': ['congo', 'congo-brazzaville'],
  'ivory coast': ["côte d'ivoire", 'cote divoire'],
  'myanmar': ['burma'],
  'eswatini': ['swaziland'],
  'north korea': ["democratic people's republic of korea", 'dprk'],
  'south korea': ['republic of korea'],
  'the bahamas': ['bahamas'],
  'the gambia': ['gambia'],
  'cape verde': ['cabo verde'],
  'east timor': ['timor-leste'],
  'vatican city': ['holy see'],
  'syria': ['syrian arab republic'],
  'laos': ["lao people's democratic republic"],
  'brunei': ['brunei darussalam'],
  'iran': ['islamic republic of iran'],
  'moldova': ['republic of moldova'],
  'russia': ['russian federation', 'rossiya'],
  'tanzania': ['united republic of tanzania'],
  'venezuela': ['bolivarian republic of venezuela'],
  'vietnam': ['viet nam', 'socialist republic of vietnam'],
  'bolivia': ['plurinational state of bolivia'],
  'federated states of micronesia': ['micronesia'],
  'saint kitts and nevis': ['st. kitts and nevis'],
  'saint lucia': ['st. lucia'],
  'saint vincent and the grenadines': ['st. vincent and the grenadines'],
  'são tomé and príncipe': ['sao tome and principe'],
  'antigua and barbuda': ['antigua & barbuda'],
  'trinidad and tobago': ['trinidad & tobago'],
  'macedonia': ['north macedonia'],
  'palestine': ['palestinian territories'],
  'taiwan': ['taiwan, province of china'],
  'reunion': ['réunion']
};

export const LASTFM_COUNTRY_NAMES = {
  'russia': 'Russian Federation',
  'usa': 'United States',
  'us': 'United States',
  'america': 'United States',
  'uk': 'United Kingdom',
  'u.k.': 'United Kingdom',
  'great britain': 'United Kingdom',
  'britain': 'United Kingdom',
  'czechia': 'Czech Republic',
  'drc': 'Democratic Republic of the Congo',
  'congo': 'Republic of the Congo',
  "côte d'ivoire": 'Ivory Coast',
  'burma': 'Myanmar',
  'swaziland': 'Eswatini',
  'dprk': 'North Korea',
  'timor-leste': 'East Timor',
  'cabo verde': 'Cape Verde',
  'syrian arab republic': 'Syria',
  "lao people's democratic republic": 'Laos',
  'viet nam': 'Vietnam',
  'micronesia': 'Federated States of Micronesia',
  'st. kitts and nevis': 'Saint Kitts and Nevis',
  'st. lucia': 'Saint Lucia',
  'st. vincent and the grenadines': 'Saint Vincent and the Grenadines',
  'sao tome and principe': 'São Tomé and Príncipe',
  'antigua & barbuda': 'Antigua and Barbuda',
  'trinidad & tobago': 'Trinidad and Tobago',
  'north macedonia': 'Macedonia',
  'palestinian territories': 'Palestine'
};

export const normalizeCountryName = (name) => {
  if (!name) return '';
  
  const lowerName = name.toLowerCase().trim();
  
  for (const [standardName, variants] of Object.entries(COUNTRY_NAME_VARIANTS)) {
    if (variants.includes(lowerName) || standardName === lowerName) {
      return standardName;
    }
  }
  
  return lowerName
    .replace(/^the\s+/, '')
    .replace(/\s+of\s+.+$/, '')
    .trim();
};

export const getLastfmCountryName = (name) => {
  const normalized = normalizeCountryName(name);
  return LASTFM_COUNTRY_NAMES[normalized] || name;
};