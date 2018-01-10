var fs = require('fs-extra');
var jsonConcat = require("json-concat");

var localizationSourceFilesEN = [
  "./src/i18n/en.json",
];

var localizationSourceFilesHR = [
  "./src/i18n/fr.json",
];

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
mergeAndSaveJsonFiles(localizationSourceFilesHR, "./src/assets/i18n/fr.json");
