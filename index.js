const download = require('download')
const fs = require('graceful-fs')
const parse = require('csv-parse/lib/sync')

const fileUrls = [
  'https://ebird.org/barchartData?r=US-VT-001&bmo=1&emo=12&byr=1900&eyr=2020&fmt=tsv',
  'https://ebird.org/barchartData?r=US-VT-003&bmo=1&emo=12&byr=1900&eyr=2020&fmt=tsv',
  'https://ebird.org/barchartData?r=US-VT-005&bmo=1&emo=12&byr=1900&eyr=2020&fmt=tsv',
  'https://ebird.org/barchartData?r=US-VT-007&bmo=1&emo=12&byr=1900&eyr=2020&fmt=tsv',
  'https://ebird.org/barchartData?r=US-VT-009&bmo=1&emo=12&byr=1900&eyr=2020&fmt=tsv',
  'https://ebird.org/barchartData?r=US-VT-011&bmo=1&emo=12&byr=1900&eyr=2020&fmt=tsv',
  'https://ebird.org/barchartData?r=US-VT-013&bmo=1&emo=12&byr=1900&eyr=2020&fmt=tsv',
  'https://ebird.org/barchartData?r=US-VT-015&bmo=1&emo=12&byr=1900&eyr=2020&fmt=tsv',
  'https://ebird.org/barchartData?r=US-VT-017&bmo=1&emo=12&byr=1900&eyr=2020&fmt=tsv',
  'https://ebird.org/barchartData?r=US-VT-019&bmo=1&emo=12&byr=1900&eyr=2020&fmt=tsv',
  'https://ebird.org/barchartData?r=US-VT-021&bmo=1&emo=12&byr=1900&eyr=2020&fmt=tsv',
  'https://ebird.org/barchartData?r=US-VT-023&bmo=1&emo=12&byr=1900&eyr=2020&fmt=tsv',
  'https://ebird.org/barchartData?r=US-VT-025&bmo=1&emo=12&byr=1900&eyr=2020&fmt=tsv',
  'https://ebird.org/barchartData?r=US-VT-027&bmo=1&emo=12&byr=1900&eyr=2020&fmt=tsv'
]

const counties = {
  '001': 'Addison',
  '003': 'Bennington',
  '005': 'Caledonia',
  '007': 'Chittenden',
  '009': 'Essex',
  '011': 'Franklin',
  '013': 'Grand Isle',
  '015': 'Lamoille',
  '017': 'Orange',
  '019': 'Orleans',
  '021': 'Rutland',
  '023': 'Washington',
  '025': 'Windham',
  '027': 'Windsor'
}

// Note that the files are saved as .xls, but are formatted as tsv files
function tsvToJson () {
  const allData = {}
  Object.keys(counties).forEach(key => {
    let input = fs.readFileSync(`dist/ebird_US-VT-${key}__1900_2020_1_12_barchart.xls`)
    // Don't ask. Trimming each line and shimming is hideously annoying.
    input = Buffer.from(Buffer.from(input).toString().replace(/"/g, "'").split('\n').map(line => line.trim()).join('\n'))
    const records = parse(input, {
      columns: false,
      relax_column_count: true,
      delimiter: '\t',
      header: null,
      skip_empty_lines: true,
      from_line: 15,
      escape: '\\'
    })
    const json = {
      taxa: records.length - 1,
      sampleSize: records[0].slice(1),
      species: {}
    }
    records.slice(1).forEach(line => {
      // Quick hack, brittle
      const [name, scientificName] = line[0].slice(0, -6).split(" (<em class='sci'>")
      json.species[name] = {
        scientificName,
        occurence: line.slice(1)
      }
    })
    allData[counties[key]] = json
  })
  console.log(allData)
  fs.writeFile('allData.json', JSON.stringify(allData))
  // return allData
}

tsvToJson()

// This won't work due to needing to log in to Cornell. Manually download these, for now.
async function downloadFiles () {
  await Promise.all(fileUrls.map(url => download(url, 'dist')))
}
