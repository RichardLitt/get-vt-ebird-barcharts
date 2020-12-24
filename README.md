# Get VT eBird Barcharts

This tool gets the eBird barchart data from eBird, and converts it into a JSON file, split by county, which shows the abundance for each week of a month (generalized into four weeks) of every species ever seen in that county.

Unfortunately, you need to manually save the barcharts. This takes around a minute of manual labor. To do so, open these links, and save the .xls files into `dist/`:

```
https://ebird.org/barchartData?r=US-VT-001&bmo=1&emo=12&byr=1900&eyr=2020&fmt=tsv
https://ebird.org/barchartData?r=US-VT-003&bmo=1&emo=12&byr=1900&eyr=2020&fmt=tsv
https://ebird.org/barchartData?r=US-VT-005&bmo=1&emo=12&byr=1900&eyr=2020&fmt=tsv
https://ebird.org/barchartData?r=US-VT-007&bmo=1&emo=12&byr=1900&eyr=2020&fmt=tsv
https://ebird.org/barchartData?r=US-VT-009&bmo=1&emo=12&byr=1900&eyr=2020&fmt=tsv
https://ebird.org/barchartData?r=US-VT-011&bmo=1&emo=12&byr=1900&eyr=2020&fmt=tsv
https://ebird.org/barchartData?r=US-VT-013&bmo=1&emo=12&byr=1900&eyr=2020&fmt=tsv
https://ebird.org/barchartData?r=US-VT-015&bmo=1&emo=12&byr=1900&eyr=2020&fmt=tsv
https://ebird.org/barchartData?r=US-VT-017&bmo=1&emo=12&byr=1900&eyr=2020&fmt=tsv
https://ebird.org/barchartData?r=US-VT-019&bmo=1&emo=12&byr=1900&eyr=2020&fmt=tsv
https://ebird.org/barchartData?r=US-VT-021&bmo=1&emo=12&byr=1900&eyr=2020&fmt=tsv
https://ebird.org/barchartData?r=US-VT-023&bmo=1&emo=12&byr=1900&eyr=2020&fmt=tsv
https://ebird.org/barchartData?r=US-VT-025&bmo=1&emo=12&byr=1900&eyr=2020&fmt=tsv
https://ebird.org/barchartData?r=US-VT-027&bmo=1&emo=12&byr=1900&eyr=2020&fmt=tsv
```

Then, run `node index.js`. This'll save everything to the `allData.json` file.

## License

MIT