var fs = require('fs-extra');
var jsonConcat = require("json-concat");

var localizationSourceFilesEN = [
  "./src/i18n/en.json",
];

var localizationSourceFilesFR = [
  "./src/i18n/fr.json",
];

var localizationSourceFilesES = [
  "./src/i18n/es.json",
];

var localizationSourceFilesIT = [
  "./src/i18n/it.json",
]

function mergeAndSaveJsonFiles(src, dest) {
  fs.ensureDir('./src/assets/i18n', err => {
    if (err === null) {
      console.log('Directory exists or it was created. Congrats!');
    }
  });
  jsonConcat({ src: src, dest: dest },
    function (res) {
      console.log(res);
      console.log('Localization files successfully merged!');
    }
  );
}

function setEnvironment(configPath, environment) {
  fs.writeJson(configPath, {env: environment},
    function (res) {
      console.log('Environment variable set to ' + environment);
    }
  );
}

// Set environment variable to "development"
setEnvironment('./config/env.json', 'development');

// Merge all localization files into one
mergeAndSaveJsonFiles(localizationSourceFilesEN, "./src/assets/i18n/en.json");
mergeAndSaveJsonFiles(localizationSourceFilesFR, "./src/assets/i18n/fr.json");
mergeAndSaveJsonFiles(localizationSourceFilesIT, "./src/assets/i18n/it.json");
mergeAndSaveJsonFiles(localizationSourceFilesES, "./src/assets/i18n/es.json");
