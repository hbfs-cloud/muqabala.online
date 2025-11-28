// Filter Constants - synchronized with PHP backend
// ISO 3166-1 alpha-2 country codes

export const COUNTRIES = {
  DZ: 'Algérie',
  MA: 'Maroc',
  TN: 'Tunisie',
  FR: 'France',
  BE: 'Belgique',
  CH: 'Suisse',
  CA: 'Canada',
  SN: 'Sénégal',
  CI: "Côte d'Ivoire",
  ML: 'Mali',
  MR: 'Mauritanie',
  EG: 'Égypte',
  SA: 'Arabie Saoudite',
  AE: 'Émirats Arabes Unis',
  QA: 'Qatar',
  KW: 'Koweït',
  LB: 'Liban',
  SY: 'Syrie',
  JO: 'Jordanie',
  PS: 'Palestine',
  IQ: 'Irak',
  YE: 'Yémen',
  OM: 'Oman',
  BH: 'Bahreïn',
  TR: 'Turquie',
  GB: 'Royaume-Uni',
  US: 'États-Unis',
  DE: 'Allemagne',
  IT: 'Italie',
  ES: 'Espagne',
  NL: 'Pays-Bas',
  SE: 'Suède',
  NO: 'Norvège',
  DK: 'Danemark',
  PK: 'Pakistan',
  AF: 'Afghanistan',
  BD: 'Bangladesh',
  IN: 'Inde',
  MY: 'Malaisie',
  ID: 'Indonésie',
  GP: 'Guadeloupe',
  MQ: 'Martinique',
  GF: 'Guyane française',
  RE: 'Réunion',
  YT: 'Mayotte',
  NC: 'Nouvelle-Calédonie',
  PF: 'Polynésie française'
}

export const EDUCATION_LEVELS = {
  none: 'Aucun diplôme',
  primary: 'Primaire',
  middle_school: 'Collège',
  high_school: 'Lycée / Bac',
  bac_1_2: 'Bac+1/2',
  bac_3: 'Licence / Bac+3',
  bac_5: 'Master / Bac+5',
  doctorate: 'Doctorat',
  other: 'Autre'
}

export const RELIGIOUS_PRACTICE = {
  beginner: 'Débutant(e)',
  practicing: 'Pratiquant(e)',
  very_practicing: 'Très pratiquant(e)',
  scholar: 'Étudiant(e) en sciences religieuses'
}

// Helper functions
export function getCountryName(code) {
  return COUNTRIES[code?.toUpperCase()] || code
}

export function getEducationLabel(code) {
  return EDUCATION_LEVELS[code] || code
}

export function getPracticeLabel(code) {
  return RELIGIOUS_PRACTICE[code] || code
}

export function getCountriesArray() {
  return Object.entries(COUNTRIES).map(([code, name]) => ({
    value: code,
    label: name
  }))
}

export function getEducationArray() {
  return Object.entries(EDUCATION_LEVELS).map(([code, label]) => ({
    value: code,
    label
  }))
}
