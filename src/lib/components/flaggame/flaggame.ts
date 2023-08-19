import { distance } from "fastest-levenshtein";

const EASY_GDP_THRESHOLD = 150;

export enum Difficulty {
  EASY = 0,
  MEDIUM,
  HARD
}

export interface FlagResult {
  usr: Country,
  ans: Country
}

export interface Country {
  name: string,
  code: string,
}

export function countryEquals(a: Country, b: Country) {
  return a.code === b.code;
}

export function genCountry(): CountryJSON {
  let index = Math.floor(Math.random()*worldCountries.length);
  let country = worldCountries[index];
  return country;
}

export function genCountryEasy(): CountryJSON {
  let country: CountryJSON;
  do {
    country = genCountry();
  } while (!country.gdpRank || country.gdpRank > EASY_GDP_THRESHOLD)
  return country;
}

export function genOptions(c: Country, num: number, easy: boolean) {
  let options: Country[] = [c];
  while (options.length < num) {
    let nextC: Country;
    do { 
      nextC = easy?genCountryEasy():genCountry();
    } while (options.some(val => { //avoid duplicates
      val.code === nextC.code
    }));
    options.push(nextC);
  }

  shuffleArray(options);
  return options;
}

function shuffleArray<T>(arr: T[]) { //https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
}

interface CountryJSON {
  code: string,
  continent?: string,
  iso: boolean,
  name: string,
  gdpRank?: number
}

export function search(query: string, num: number): Country[] {
  if (query === "") {
    return [];
  }

  let scores: [Country, number][] = [];
  let cleanedQ = query.replace(/^\s*/, "").replace(/\s*$/, "").toLowerCase();

  worldCountries.forEach(c => {
    let cname = c.name.toLowerCase();
    let score = searchScore(query, cname);
    
    let abbreviation = c.name.match(/\b([A-Z])/g)?.join('').toLowerCase();
    let abbreviationScore = (abbreviation && abbreviation.length > 1)?(searchScore(cleanedQ, abbreviation)-100):Infinity;

    score = Math.min(score, abbreviationScore);
    
    if (score === Infinity) {
      score = distance(query, cname) + 100; //Penalise spelling mistakes.
    }

    scores.push([c, score]);
  });

  scores.sort(([c1, n1], [c2, n2]) => {
    let ord = n1-n2;
    if (ord === 0) {
      return c1.name.localeCompare(c2.name);
    } else {
      return ord;
    }
  });

  return scores.slice(0, 5).map(([c,n]) => c);
}

function searchScore(search: string, value: string) { //Search using a given string and count the characters that do not belong to the search (excluding the end of the string).
  let mismatchScore = 0;
  let searchIndex = 0;

  for (let valueChar of value) {
      if (valueChar === search[searchIndex]) {
          searchIndex++;
          if (searchIndex === search.length) {
              break;
          }
      } else {
          mismatchScore += 1;
      }
  }

  if (searchIndex === search.length) {
      return mismatchScore;
  } else {
      return Infinity;
  }
}

export const worldCountries: CountryJSON[] = [
  // {
  //   "code": "ac",
  //   "continent": "Africa",
  //   "iso": false,
  //   "name": "Ascension Island"
  // },
  {
    "code": "ad",
    "continent": "Europe",
    "iso": true,
    "name": "Andorra",
    "gdpRank": 173
  },
  {
    "code": "ae",
    "continent": "Asia",
    "iso": true,
    "name": "United Arab Emirates",
    "gdpRank": 31
  },
  {
    "code": "af",
    "continent": "Asia",
    "iso": true,
    "name": "Afghanistan",
    "gdpRank": 121
  },
  {
    "code": "ag",
    "continent": "North America",
    "iso": true,
    "name": "Antigua and Barbuda",
    "gdpRank": 192
  },
  {
    "code": "ai",
    "continent": "North America",
    "iso": true,
    "name": "Anguilla",
    "gdpRank": 210
  },
  {
    "code": "al",
    "continent": "Europe",
    "iso": true,
    "name": "Albania",
    "gdpRank": 129
  },
  {
    "code": "am",
    "continent": "Asia",
    "iso": true,
    "name": "Armenia",
    "gdpRank": 141
  },
  {
    "code": "ao",
    "continent": "Africa",
    "iso": true,
    "name": "Angola",
    "gdpRank": 60
  },
  {
    "code": "aq",
    "iso": true,
    "name": "Antarctica"
  },
  {
    "code": "ar",
    "continent": "South America",
    "iso": true,
    "name": "Argentina",
    "gdpRank": 25
  },
  {
    "code": "as",
    "continent": "Oceania",
    "iso": true,
    "name": "American Samoa",
    "gdpRank": 203
  },
  {
    "code": "at",
    "continent": "Europe",
    "iso": true,
    "name": "Austria",
    "gdpRank": 32
  },
  {
    "code": "au",
    "continent": "Oceania",
    "iso": true,
    "name": "Australia",
    "gdpRank": 12
  },
  {
    "code": "aw",
    "continent": "South America",
    "iso": true,
    "name": "Aruba",
    "gdpRank": 174
  },
  {
    "code": "ax",
    "continent": "Europe",
    "iso": true,
    "name": "Aland Islands"
  },
  {
    "code": "az",
    "continent": "Asia",
    "iso": true,
    "name": "Azerbaijan",
    "gdpRank": 76
  },
  {
    "code": "ba",
    "continent": "Europe",
    "iso": true,
    "name": "Bosnia and Herzegovina",
    "gdpRank": 116
  },
  {
    "code": "bb",
    "continent": "North America",
    "iso": true,
    "name": "Barbados",
    "gdpRank": 165
  },
  {
    "code": "bd",
    "continent": "Asia",
    "iso": true,
    "name": "Bangladesh",
    "gdpRank": 40
  },
  {
    "code": "be",
    "continent": "Europe",
    "iso": true,
    "name": "Belgium",
    "gdpRank": 24
  },
  {
    "code": "bf",
    "continent": "Africa",
    "iso": true,
    "name": "Burkina Faso",
    "gdpRank": 123
  },
  {
    "code": "bg",
    "continent": "Europe",
    "iso": true,
    "name": "Bulgaria",
    "gdpRank": 70
  },
  {
    "code": "bh",
    "continent": "Asia",
    "iso": true,
    "name": "Bahrain",
    "gdpRank": 96
  },
  {
    "code": "bi",
    "continent": "Africa",
    "iso": true,
    "name": "Burundi",
    "gdpRank": 172
  },
  {
    "code": "bj",
    "continent": "Africa",
    "iso": true,
    "name": "Benin",
    "gdpRank": 126
  },
  {
    "code": "bm",
    "continent": "North America",
    "iso": true,
    "name": "Bermuda",
    "gdpRank": 157
  },
  {
    "code": "bn",
    "continent": "Asia",
    "iso": true,
    "name": "Brunei Darussalam",
    "gdpRank": 103
  },
  {
    "code": "bo",
    "continent": "South America",
    "iso": true,
    "name": "Bolivia",
    "gdpRank": 98
  },
  {
    "code": "br",
    "continent": "South America",
    "iso": true,
    "name": "Brazil",
    "gdpRank": 9
  },
  {
    "code": "bs",
    "continent": "North America",
    "iso": true,
    "name": "Bahamas",
    "gdpRank": 146
  },
  {
    "code": "bt",
    "continent": "Asia",
    "iso": true,
    "name": "Bhutan",
    "gdpRank": 177
  },
  // {
  //   "code": "bv",
  //   "iso": true,
  //   "name": "Bouvet Island"
  // },
  {
    "code": "bw",
    "continent": "Africa",
    "iso": true,
    "name": "Botswana",
    "gdpRank": 125
  },
  {
    "code": "by",
    "continent": "Europe",
    "iso": true,
    "name": "Belarus",
    "gdpRank": 89
  },
  {
    "code": "bz",
    "continent": "North America",
    "iso": true,
    "name": "Belize",
    "gdpRank": 185
  },
  {
    "code": "ca",
    "continent": "North America",
    "iso": true,
    "name": "Canada",
    "gdpRank": 7
  },
  {
    "code": "cc",
    "continent": "Asia",
    "iso": true,
    "name": "Cocos (Keeling) Islands"
  },
  {
    "code": "cd",
    "continent": "Africa",
    "iso": true,
    "name": "Democratic Republic of the Congo",
    "gdpRank": 85
  },
  {
    "code": "cefta",
    "iso": false,
    "name": "Central European Free Trade Agreement"
  },
  {
    "code": "cf",
    "continent": "Africa",
    "iso": true,
    "name": "Central African Republic",
    "gdpRank": 178
  },
  {
    "code": "cg",
    "continent": "Africa",
    "iso": true,
    "name": "Republic of the Congo",
    "gdpRank": 133
  },
  {
    "code": "ch",
    "continent": "Europe",
    "iso": true,
    "name": "Switzerland",
    "gdpRank": 19
  },
  {
    "code": "ci",
    "continent": "Africa",
    "iso": true,
    "name": "Ivory Coast",
    "gdpRank": 78
  },
  {
    "code": "ck",
    "continent": "Oceania",
    "iso": true,
    "name": "Cook Islands",
    "gdpRank": 208
  },
  {
    "code": "cl",
    "continent": "South America",
    "iso": true,
    "name": "Chile",
    "gdpRank": 44
  },
  {
    "code": "cm",
    "continent": "Africa",
    "iso": true,
    "name": "Cameroon",
    "gdpRank": 94
  },
  {
    "code": "cn",
    "continent": "Asia",
    "iso": true,
    "name": "China",
    "gdpRank": 1
  },
  {
    "code": "co",
    "continent": "South America",
    "iso": true,
    "name": "Colombia",
    "gdpRank": 42
  },
  {
    "code": "cr",
    "continent": "North America",
    "iso": true,
    "name": "Costa Rica",
    "gdpRank": 83
  },
  {
    "code": "cu",
    "continent": "North America",
    "iso": true,
    "name": "Cuba",
    "gdpRank": 67
  },
  {
    "code": "cv",
    "continent": "Africa",
    "iso": true,
    "name": "Cape Verde",
    "gdpRank": 184
  },
  {
    "code": "cw",
    "continent": "South America",
    "iso": true,
    "name": "Curaçao",
    "gdpRank": 179
  },
  {
    "code": "cx",
    "continent": "Asia",
    "iso": true,
    "name": "Christmas Island"
  },
  {
    "code": "cy",
    "continent": "Europe",
    "iso": true,
    "name": "Cyprus",
    "gdpRank": 113
  },
  {
    "code": "cz",
    "continent": "Europe",
    "iso": true,
    "name": "Czech Republic",
    "gdpRank": 47
  },
  {
    "code": "de",
    "continent": "Europe",
    "iso": true,
    "name": "Germany",
    "gdpRank": 3
  },
  // {
  //   "code": "dg",
  //   "iso": false,
  //   "name": "Diego Garcia"
  // },
  {
    "code": "dj",
    "continent": "Africa",
    "iso": true,
    "name": "Djibouti",
    "gdpRank": 170
  },
  {
    "code": "dk",
    "continent": "Europe",
    "iso": true,
    "name": "Denmark",
    "gdpRank": 39
  },
  {
    "code": "dm",
    "continent": "North America",
    "iso": true,
    "name": "Dominica",
    "gdpRank": 204
  },
  {
    "code": "do",
    "continent": "North America",
    "iso": true,
    "name": "Dominican Republic",
    "gdpRank": 66
  },
  {
    "code": "dz",
    "continent": "Africa",
    "iso": true,
    "name": "Algeria",
    "gdpRank": 57
  },
  // {
  //   "code": "ea",
  //   "iso": false,
  //   "name": "Ceuta & Melilla"
  // },
  {
    "code": "ec",
    "continent": "South America",
    "iso": true,
    "name": "Ecuador",
    "gdpRank": 63
  },
  {
    "code": "ee",
    "continent": "Europe",
    "iso": true,
    "name": "Estonia",
    "gdpRank": 100
  },
  {
    "code": "eg",
    "continent": "Africa",
    "iso": true,
    "name": "Egypt",
    "gdpRank": 34
  },
  {
    "code": "eh",
    "continent": "Africa",
    "iso": true,
    "name": "Western Sahara"
  },
  {
    "code": "er",
    "continent": "Africa",
    "iso": true,
    "name": "Eritrea",
    "gdpRank": 180
  },
  {
    "code": "es",
    "continent": "Europe",
    "iso": true,
    "name": "Spain",
    "gdpRank": 14
  },
  {
    "code": "es-ct",
    "iso": false,
    "name": "Catalonia"
  },
  {
    "code": "es-ga",
    "iso": false,
    "name": "Galicia"
  },
  {
    "code": "et",
    "continent": "Africa",
    "iso": true,
    "name": "Ethiopia",
    "gdpRank": 68
  },
  {
    "code": "eu",
    "iso": false,
    "name": "Europe"
  },
  {
    "code": "fi",
    "continent": "Europe",
    "iso": true,
    "name": "Finland",
    "gdpRank": 45
  },
  {
    "code": "fj",
    "continent": "Oceania",
    "iso": true,
    "name": "Fiji",
    "gdpRank": 167
  },
  {
    "code": "fk",
    "continent": "South America",
    "iso": true,
    "name": "Falkland Islands"
  },
  {
    "code": "fm",
    "continent": "Oceania",
    "iso": true,
    "name": "Federated States of Micronesia"
  },
  {
    "code": "fo",
    "continent": "Europe",
    "iso": true,
    "name": "Faroe Islands"
  },
  {
    "code": "fr",
    "continent": "Europe",
    "iso": true,
    "name": "France",
    "gdpRank": 6
  },
  {
    "code": "ga",
    "continent": "Africa",
    "iso": true,
    "name": "Gabon",
    "gdpRank": 117
  },
  {
    "code": "gb",
    "continent": "Europe",
    "iso": true,
    "name": "United Kingdom",
    "gdpRank": 5
  },
  {
    "code": "gb-eng",
    "continent": "Europe",
    "iso": false,
    "name": "England"
  },
  {
    "code": "gb-nir",
    "continent": "Europe",
    "iso": false,
    "name": "Northern Ireland"
  },
  {
    "code": "gb-sct",
    "continent": "Europe",
    "iso": false,
    "name": "Scotland"
  },
  {
    "code": "gb-wls",
    "continent": "Europe",
    "iso": false,
    "name": "Wales"
  },
  {
    "code": "gd",
    "continent": "North America",
    "iso": true,
    "name": "Grenada",
    "gdpRank": 195
  },
  {
    "code": "ge",
    "continent": "Asia",
    "iso": true,
    "name": "Georgia",
    "gdpRank": 119
  },
  {
    "code": "gg",
    "continent": "Europe",
    "iso": true,
    "name": "Guernsey"
  },
  {
    "code": "gh",
    "continent": "Africa",
    "iso": true,
    "name": "Ghana",
    "gdpRank": 75
  },
  {
    "code": "gi",
    "continent": "Europe",
    "iso": true,
    "name": "Gibraltar"
  },
  {
    "code": "gl",
    "continent": "North America",
    "iso": true,
    "name": "Greenland",
    "gdpRank": 175
  },
  {
    "code": "gm",
    "continent": "Africa",
    "iso": true,
    "name": "Gambia",
    "gdpRank": 182
  },
  {
    "code": "gn",
    "continent": "Africa",
    "iso": true,
    "name": "Guinea",
    "gdpRank": 118
  },
  {
    "code": "gq",
    "continent": "Africa",
    "iso": true,
    "name": "Equatorial Guinea",
    "gdpRank": 132
  },
  {
    "code": "gr",
    "continent": "Europe",
    "iso": true,
    "name": "Greece",
    "gdpRank": 53
  },
  // {
  //   "code": "gs",
  //   "continent": "Antarctica",
  //   "iso": true,
  //   "name": "South Georgia and the South Sandwich Islands"
  // },
  {
    "code": "gt",
    "continent": "North America",
    "iso": true,
    "name": "Guatemala",
    "gdpRank": 69
  },
  {
    "code": "gu",
    "continent": "Oceania",
    "iso": true,
    "name": "Guam",
    "gdpRank": 162
  },
  {
    "code": "gw",
    "continent": "Africa",
    "iso": true,
    "name": "Guinea-Bissau",
    "gdpRank": 191
  },
  {
    "code": "gy",
    "continent": "South America",
    "iso": true,
    "name": "Guyana",
    "gdpRank": 143
  },
  {
    "code": "hk",
    "continent": "Asia",
    "iso": true,
    "name": "Hong Kong",
    "gdpRank": 41
  },
  // {
  //   "code": "hm",
  //   "iso": true,
  //   "name": "Heard Island and McDonald Islands"
  // },
  {
    "code": "hn",
    "continent": "North America",
    "iso": true,
    "name": "Honduras",
    "gdpRank": 107
  },
  {
    "code": "hr",
    "continent": "Europe",
    "iso": true,
    "name": "Croatia",
    "gdpRank": 81
  },
  {
    "code": "ht",
    "continent": "North America",
    "iso": true,
    "name": "Haiti",
    "gdpRank": 120
  },
  {
    "code": "hu",
    "continent": "Europe",
    "iso": true,
    "name": "Hungary",
    "gdpRank": 55
  },
  {
    "code": "ic",
    "iso": false,
    "name": "Canary Islands"
  },
  {
    "code": "id",
    "continent": "Asia",
    "iso": true,
    "name": "Indonesia",
    "gdpRank": 16
  },
  {
    "code": "ie",
    "continent": "Europe",
    "iso": true,
    "name": "Ireland",
    "gdpRank": 29
  },
  {
    "code": "il",
    "continent": "Asia",
    "iso": true,
    "name": "Israel",
    "gdpRank": 28
  },
  {
    "code": "im",
    "continent": "Europe",
    "iso": true,
    "name": "Isle of Man"
  },
  {
    "code": "in",
    "continent": "Asia",
    "iso": true,
    "name": "India",
    "gdpRank": 4
  },
  {
    "code": "io",
    "continent": "Asia",
    "iso": true,
    "name": "British Indian Ocean Territory"
  },
  {
    "code": "iq",
    "continent": "Asia",
    "iso": true,
    "name": "Iraq",
    "gdpRank": 46
  },
  {
    "code": "ir",
    "continent": "Asia",
    "iso": true,
    "name": "Iran",
    "gdpRank": 13
  },
  {
    "code": "is",
    "continent": "Europe",
    "iso": true,
    "name": "Iceland",
    "gdpRank": 112
  },
  {
    "code": "it",
    "continent": "Europe",
    "iso": true,
    "name": "Italy",
    "gdpRank": 8
  },
  {
    "code": "je",
    "continent": "Europe",
    "iso": true,
    "name": "Jersey"
  },
  {
    "code": "jm",
    "continent": "North America",
    "iso": true,
    "name": "Jamaica",
    "gdpRank": 136
  },
  {
    "code": "jo",
    "continent": "Asia",
    "iso": true,
    "name": "Jordan",
    "gdpRank": 92
  },
  {
    "code": "jp",
    "continent": "Asia",
    "iso": true,
    "name": "Japan",
    "gdpRank": 2
  },
  {
    "code": "ke",
    "continent": "Africa",
    "iso": true,
    "name": "Kenya",
    "gdpRank": 64
  },
  {
    "code": "kg",
    "continent": "Asia",
    "iso": true,
    "name": "Kyrgyzstan",
    "gdpRank": 153
  },
  {
    "code": "kh",
    "continent": "Asia",
    "iso": true,
    "name": "Cambodia",
    "gdpRank": 111
  },
  {
    "code": "ki",
    "continent": "Oceania",
    "iso": true,
    "name": "Kiribati",
    "gdpRank": 212
  },
  {
    "code": "km",
    "continent": "Africa",
    "iso": true,
    "name": "Comoros",
    "gdpRank": 194
  },
  {
    "code": "kn",
    "continent": "North America",
    "iso": true,
    "name": "Saint Kitts and Nevis",
    "gdpRank": 197
  },
  {
    "code": "kp",
    "continent": "Asia",
    "iso": true,
    "name": "North Korea",
    "gdpRank": 134
  },
  {
    "code": "kr",
    "continent": "Asia",
    "iso": true,
    "name": "South Korea",
    "gdpRank": 11
  },
  {
    "code": "kw",
    "continent": "Asia",
    "iso": true,
    "name": "Kuwait",
    "gdpRank": 58
  },
  // {
  //   "code": "ky",
  //   "continent": "North America",
  //   "iso": true,
  //   "name": "Cayman Islands",
  //   "gdpRank": 160
  // },
  {
    "code": "kz",
    "continent": "Asia",
    "iso": true,
    "name": "Kazakhstan",
    "gdpRank": 56
  },
  {
    "code": "la",
    "continent": "Asia",
    "iso": true,
    "name": "Laos",
    "gdpRank": 130
  },
  {
    "code": "lb",
    "continent": "Asia",
    "iso": true,
    "name": "Lebanon",
    "gdpRank": 88
  },
  {
    "code": "lc",
    "continent": "North America",
    "iso": true,
    "name": "Saint Lucia",
    "gdpRank": 183
  },
  {
    "code": "li",
    "continent": "Europe",
    "iso": true,
    "name": "Liechtenstein",
    "gdpRank": 158
  },
  {
    "code": "lk",
    "continent": "Asia",
    "iso": true,
    "name": "Sri Lanka",
    "gdpRank": 72
  },
  {
    "code": "lr",
    "continent": "Africa",
    "iso": true,
    "name": "Liberia",
    "gdpRank": 171
  },
  {
    "code": "ls",
    "continent": "Africa",
    "iso": true,
    "name": "Lesotho",
    "gdpRank": 181
  },
  {
    "code": "lt",
    "continent": "Europe",
    "iso": true,
    "name": "Lithuania",
    "gdpRank": 80
  },
  {
    "code": "lu",
    "continent": "Europe",
    "iso": true,
    "name": "Luxembourg",
    "gdpRank": 71
  },
  {
    "code": "lv",
    "continent": "Europe",
    "iso": true,
    "name": "Latvia",
    "gdpRank": 99
  },
  {
    "code": "ly",
    "continent": "Africa",
    "iso": true,
    "name": "Libya",
    "gdpRank": 91
  },
  {
    "code": "ma",
    "continent": "Africa",
    "iso": true,
    "name": "Morocco",
    "gdpRank": 59
  },
  {
    "code": "mc",
    "continent": "Europe",
    "iso": true,
    "name": "Monaco",
    "gdpRank": 159
  },
  {
    "code": "md",
    "continent": "Europe",
    "iso": true,
    "name": "Moldova",
    "gdpRank": 142
  },
  {
    "code": "me",
    "continent": "Europe",
    "iso": true,
    "name": "Montenegro",
    "gdpRank": 161
  },
  {
    "code": "mg",
    "continent": "Africa",
    "iso": true,
    "name": "Madagascar",
    "gdpRank": 139
  },
  {
    "code": "mh",
    "continent": "Oceania",
    "iso": true,
    "name": "Marshall Islands",
    "gdpRank": 209
  },
  {
    "code": "mk",
    "continent": "Europe",
    "iso": true,
    "name": "North Macedonia",
    "gdpRank": 140
  },
  {
    "code": "ml",
    "continent": "Africa",
    "iso": true,
    "name": "Mali",
    "gdpRank": 124
  },
  {
    "code": "mm",
    "continent": "Asia",
    "iso": true,
    "name": "Myanmar",
    "gdpRank": 82
  },
  {
    "code": "mn",
    "continent": "Asia",
    "iso": true,
    "name": "Mongolia",
    "gdpRank": 127
  },
  {
    "code": "mo",
    "continent": "Asia",
    "iso": true,
    "name": "Macau",
    "gdpRank": 104
  },
  {
    "code": "mp",
    "continent": "Oceania",
    "iso": true,
    "name": "Northern Mariana Islands",
    "gdpRank": 196
  },
  {
    "code": "mr",
    "continent": "Africa",
    "iso": true,
    "name": "Mauritania",
    "gdpRank": 152
  },
  // {
  //   "code": "ms",
  //   "continent": "North America",
  //   "iso": true,
  //   "name": "Montserrat",
  //   "gdpRank": 214
  // },
  {
    "code": "mt",
    "continent": "Europe",
    "iso": true,
    "name": "Malta",
    "gdpRank": 131
  },
  {
    "code": "mu",
    "continent": "Africa",
    "iso": true,
    "name": "Mauritius",
    "gdpRank": 149
  },
  {
    "code": "mv",
    "continent": "Asia",
    "iso": true,
    "name": "Maldives",
    "gdpRank": 166
  },
  {
    "code": "mw",
    "continent": "Africa",
    "iso": true,
    "name": "Malawi",
    "gdpRank": 148
  },
  {
    "code": "mx",
    "continent": "North America",
    "iso": true,
    "name": "Mexico",
    "gdpRank": 15
  },
  {
    "code": "my",
    "continent": "Asia",
    "iso": true,
    "name": "Malaysia",
    "gdpRank": 33
  },
  {
    "code": "mz",
    "continent": "Africa",
    "iso": true,
    "name": "Mozambique",
    "gdpRank": 128
  },
  {
    "code": "na",
    "continent": "Africa",
    "iso": true,
    "name": "Namibia",
    "gdpRank": 144
  },
  {
    "code": "nc",
    "continent": "Oceania",
    "iso": true,
    "name": "New Caledonia",
    "gdpRank": 150
  },
  {
    "code": "ne",
    "continent": "Africa",
    "iso": true,
    "name": "Niger",
    "gdpRank": 137
  },
  {
    "code": "nf",
    "continent": "Oceania",
    "iso": true,
    "name": "Norfolk Island"
  },
  {
    "code": "ng",
    "continent": "Africa",
    "iso": true,
    "name": "Nigeria",
    "gdpRank": 30
  },
  {
    "code": "ni",
    "continent": "North America",
    "iso": true,
    "name": "Nicaragua",
    "gdpRank": 135
  },
  {
    "code": "nl",
    "continent": "Europe",
    "iso": true,
    "name": "Netherlands (Holland)",
    "gdpRank": 18
  },
  {
    "code": "no",
    "continent": "Europe",
    "iso": true,
    "name": "Norway",
    "gdpRank": 26
  },
  {
    "code": "np",
    "continent": "Asia",
    "iso": true,
    "name": "Nepal",
    "gdpRank": 102
  },
  {
    "code": "nr",
    "continent": "Oceania",
    "iso": true,
    "name": "Nauru",
    "gdpRank": 213
  },
  {
    "code": "nu",
    "continent": "Oceania",
    "iso": true,
    "name": "Niue"
  },
  {
    "code": "nz",
    "continent": "Oceania",
    "iso": true,
    "name": "New Zealand",
    "gdpRank": 49
  },
  {
    "code": "om",
    "continent": "Asia",
    "iso": true,
    "name": "Oman",
    "gdpRank": 65
  },
  {
    "code": "pa",
    "continent": "North America",
    "iso": true,
    "name": "Panama",
    "gdpRank": 79
  },
  {
    "code": "pe",
    "continent": "South America",
    "iso": true,
    "name": "Peru",
    "gdpRank": 51
  },
  {
    "code": "pf",
    "continent": "Oceania",
    "iso": true,
    "name": "French Polynesia",
    "gdpRank": 163
  },
  {
    "code": "pg",
    "continent": "Oceania",
    "iso": true,
    "name": "Papua New Guinea",
    "gdpRank": 108
  },
  {
    "code": "ph",
    "continent": "Asia",
    "iso": true,
    "name": "Philippines",
    "gdpRank": 37
  },
  {
    "code": "pk",
    "continent": "Asia",
    "iso": true,
    "name": "Pakistan",
    "gdpRank": 43
  },
  {
    "code": "pl",
    "continent": "Europe",
    "iso": true,
    "name": "Poland",
    "gdpRank": 21
  },
  // {
  //   "code": "pn",
  //   "continent": "Oceania",
  //   "iso": true,
  //   "name": "Pitcairn"
  // },
  {
    "code": "pr",
    "continent": "North America",
    "iso": true,
    "name": "Puerto Rico",
    "gdpRank": 62
  },
  {
    "code": "ps",
    "continent": "Asia",
    "iso": true,
    "name": "Palestine",
    "gdpRank": 122
  },
  {
    "code": "pt",
    "continent": "Europe",
    "iso": true,
    "name": "Portugal",
    "gdpRank": 50
  },
  {
    "code": "pw",
    "continent": "Oceania",
    "iso": true,
    "name": "Palau",
    "gdpRank": 211
  },
  {
    "code": "py",
    "continent": "South America",
    "iso": true,
    "name": "Paraguay",
    "gdpRank": 97
  },
  {
    "code": "qa",
    "continent": "Asia",
    "iso": true,
    "name": "Qatar",
    "gdpRank": 52
  },
  {
    "code": "ro",
    "continent": "Europe",
    "iso": true,
    "name": "Romania",
    "gdpRank": 48
  },
  {
    "code": "rs",
    "continent": "Europe",
    "iso": true,
    "name": "Serbia",
    "gdpRank": 84
  },
  {
    "code": "ru",
    "continent": "Europe",
    "iso": true,
    "name": "Russia",
    "gdpRank": 10
  },
  {
    "code": "rw",
    "continent": "Africa",
    "iso": true,
    "name": "Rwanda",
    "gdpRank": 147
  },
  {
    "code": "sa",
    "continent": "Asia",
    "iso": true,
    "name": "Saudi Arabia",
    "gdpRank": 17
  },
  {
    "code": "sb",
    "continent": "Oceania",
    "iso": true,
    "name": "Solomon Islands",
    "gdpRank": 190
  },
  {
    "code": "sc",
    "continent": "Africa",
    "iso": true,
    "name": "Seychelles",
    "gdpRank": 187
  },
  {
    "code": "sd",
    "continent": "Africa",
    "iso": true,
    "name": "Sudan",
    "gdpRank": 105
  },
  {
    "code": "se",
    "continent": "Europe",
    "iso": true,
    "name": "Sweden",
    "gdpRank": 23
  },
  {
    "code": "sg",
    "continent": "Asia",
    "iso": true,
    "name": "Singapore",
    "gdpRank": 36
  },
  // {
  //   "code": "sh",
  //   "continent": "Africa",
  //   "iso": true,
  //   "name": "Saint Helena, Ascension and Tristan da Cunha"
  // },
  {
    "code": "si",
    "continent": "Europe",
    "iso": true,
    "name": "Slovenia",
    "gdpRank": 87
  },
  // {
  //   "code": "sj",
  //   "continent": "Europe",
  //   "iso": true,
  //   "name": "Svalbard and Jan Mayen"
  // },
  {
    "code": "sk",
    "continent": "Europe",
    "iso": true,
    "name": "Slovakia",
    "gdpRank": 61
  },
  {
    "code": "sl",
    "continent": "Africa",
    "iso": true,
    "name": "Sierra Leone",
    "gdpRank": 169
  },
  {
    "code": "sm",
    "continent": "Europe",
    "iso": true,
    "name": "San Marino",
    "gdpRank": 189
  },
  {
    "code": "sn",
    "continent": "Africa",
    "iso": true,
    "name": "Senegal",
    "gdpRank": 109
  },
  {
    "code": "so",
    "continent": "Africa",
    "iso": true,
    "name": "Somalia",
    "gdpRank": 155
  },
  {
    "code": "sr",
    "continent": "South America",
    "iso": true,
    "name": "Suriname",
    "gdpRank": 176
  },
  {
    "code": "ss",
    "continent": "Africa",
    "iso": true,
    "name": "South Sudan",
    "gdpRank": 164
  },
  {
    "code": "st",
    "continent": "Africa",
    "iso": true,
    "name": "Sao Tome and Principe"
  },
  {
    "code": "sv",
    "continent": "North America",
    "iso": true,
    "name": "El Salvador",
    "gdpRank": 106
  },
  {
    "code": "sx",
    "continent": "North America",
    "iso": true,
    "name": "Sint Maarten",
    "gdpRank": 201
  },
  {
    "code": "sy",
    "continent": "Asia",
    "iso": true,
    "name": "Syria",
    "gdpRank": 138
  },
  {
    "code": "sz",
    "continent": "Africa",
    "iso": true,
    "name": "Eswatini",
    "gdpRank": 168
  },
  // {
  //   "code": "ta",
  //   "iso": false,
  //   "name": "Tristan da Cunha"
  // },
  // {
  //   "code": "tc",
  //   "continent": "North America",
  //   "iso": true,
  //   "name": "Turks and Caicos Islands",
  //   "gdpRank": 200
  // },
  {
    "code": "td",
    "continent": "Africa",
    "iso": true,
    "name": "Chad",
    "gdpRank": 145
  },
  {
    "code": "tf",
    "continent": "Africa",
    "iso": true,
    "name": "French Southern Territories"
  },
  {
    "code": "tg",
    "continent": "Africa",
    "iso": true,
    "name": "Togo",
    "gdpRank": 154
  },
  {
    "code": "th",
    "continent": "Asia",
    "iso": true,
    "name": "Thailand",
    "gdpRank": 27
  },
  {
    "code": "tj",
    "continent": "Asia",
    "iso": true,
    "name": "Tajikistan",
    "gdpRank": 156
  },
  {
    "code": "tk",
    "continent": "Oceania",
    "iso": true,
    "name": "Tokelau"
  },
  {
    "code": "tl",
    "continent": "Asia",
    "iso": true,
    "name": "Timor-Leste",
    "gdpRank": 186
  },
  {
    "code": "tm",
    "continent": "Asia",
    "iso": true,
    "name": "Turkmenistan",
    "gdpRank": 74
  },
  {
    "code": "tn",
    "continent": "Africa",
    "iso": true,
    "name": "Tunisia",
    "gdpRank": 95
  },
  {
    "code": "to",
    "continent": "Oceania",
    "iso": true,
    "name": "Tonga",
    "gdpRank": 205
  },
  {
    "code": "tr",
    "continent": "Asia",
    "iso": true,
    "name": "Turkey",
    "gdpRank": 22
  },
  {
    "code": "tt",
    "continent": "South America",
    "iso": true,
    "name": "Trinidad and Tobago",
    "gdpRank": 115
  },
  {
    "code": "tv",
    "continent": "Oceania",
    "iso": true,
    "name": "Tuvalu",
    "gdpRank": 215
  },
  {
    "code": "tw",
    "continent": "Asia",
    "iso": true,
    "name": "Taiwan",
    "gdpRank": 20
  },
  {
    "code": "tz",
    "continent": "Africa",
    "iso": true,
    "name": "Tanzania",
    "gdpRank": 73,
  },
  {
    "code": "ua",
    "continent": "Europe",
    "iso": true,
    "name": "Ukraine",
    "gdpRank": 54
  },
  {
    "code": "ug",
    "continent": "Africa",
    "iso": true,
    "name": "Uganda",
    "gdpRank": 93
  },
  {
    "code": "un",
    "iso": false,
    "name": "United Nations"
  },
  {
    "code": "us",
    "continent": "North America",
    "iso": true,
    "name": "United States of America",
    "gdpRank": 0
  },
  {
    "code": "uy",
    "continent": "South America",
    "iso": true,
    "name": "Uruguay",
    "gdpRank": 86
  },
  {
    "code": "uz",
    "continent": "Asia",
    "iso": true,
    "name": "Uzbekistan",
    "gdpRank": 77
  },
  {
    "code": "va",
    "continent": "Europe",
    "iso": true,
    "name": "Holy See"
  },
  {
    "code": "vc",
    "continent": "North America",
    "iso": true,
    "name": "Saint Vincent and the Grenadines",
    "gdpRank": 199
  },
  {
    "code": "ve",
    "continent": "South America",
    "iso": true,
    "name": "Venezuela",
    "gdpRank": 90
  },
  {
    "code": "vg",
    "continent": "North America",
    "iso": true,
    "name": "Virgin Islands (British)"
  },
  {
    "code": "vi",
    "continent": "North America",
    "iso": true,
    "name": "Virgin Islands (U.S.)"
  },
  {
    "code": "vn",
    "continent": "Asia",
    "iso": true,
    "name": "Vietnam",
    "gdpRank": 38
  },
  {
    "code": "vu",
    "continent": "Oceania",
    "iso": true,
    "name": "Vanuatu",
    "gdpRank": 198
  },
  {
    "code": "ws",
    "continent": "Oceania",
    "iso": true,
    "name": "Samoa",
    "gdpRank": 202
  },
  {
    "code": "xk",
    "continent": "Europe",
    "iso": false,
    "name": "Kosovo",
    "gdpRank": 151
  },
  {
    "code": "ye",
    "continent": "Asia",
    "iso": true,
    "name": "Yemen",
    "gdpRank": 110
  },
  {
    "code": "za",
    "continent": "Africa",
    "iso": true,
    "name": "South Africa",
    "gdpRank": 35
  },
  {
    "code": "zm",
    "continent": "Africa",
    "iso": true,
    "name": "Zambia",
    "gdpRank": 114
  },
  {
    "code": "zw",
    "continent": "Africa",
    "iso": true,
    "name": "Zimbabwe",
    "gdpRank": 101
  }
];