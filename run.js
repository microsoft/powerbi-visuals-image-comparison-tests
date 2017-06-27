let browsersBinariesStandalone = require("browsers-binaries-standalone");
let path = require("path");
        
browsersBinariesStandalone
    .install(path.join(__dirname, "./configuration/browsers.config.js"))
    .then(function() {
        let webdriverStandaloneServer = require("webdriver-standalone-server");
        let webdriverClientTestRunner = require("webdriver-client-test-runner");
        let webDriver = new webdriverStandaloneServer.WebDriver(path.join(__dirname, "./configuration/WebDriver.config.js"));

        webDriver
            .autoStartServer(webdriverStandaloneServer.WebDriverType.Chrome, false)
            .then(() => webdriverClientTestRunner.TestRunner.run({
                    config: path.join(__dirname, "./configuration/test.config.js")
            }), webdriverClientTestRunner.Helpers.logError)
            .then(() => process.exit(0), (ex) => process.exit(1));
    });