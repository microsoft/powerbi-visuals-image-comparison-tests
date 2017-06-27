const path = require("path");

module.exports = {
    jasmine: {
        defaultTimeoutInterval: 60000
    },
    specs: [
        "./../build/test.js"
    ],
    capabilities: [{
        browserName: "chromium",
        chromeOptions: {
            binary: getBrowserBinPath("chromium"),
            args: ['--disable-extensions']
}
    }],
    webdrivercss: {
        screenshotRoot: "./../screenshots/",
        failedComparisonsRoot: "./../screenshots/",
        misMatchTolerance: 1
    },
    files: [
        "./../node_modules/jasmine-core/lib/jasmine-core/jasmine.js",
        "./../node_modules/jasmine-core/lib/jasmine-core/jasmine-html.js",
        "./../node_modules/jasmine-core/lib/jasmine-core/boot.js",
        "./../node_modules/jasmine-jquery/lib/jasmine-jquery.js"
    ]
};

function getBrowserBinPath(name) {
    let browsersConfig = require("browsers-binaries-standalone").create(path.join(__dirname, "./browsers.config.js"));
    let browser = browsersConfig.filter(x => x.name.toLowerCase() === name)[0];
    const browserPath = browser && browser.getExecutablePath();
    if (!browserPath) {
        throw new Error("Unable to find '" + name + "' binaries ti run tests.");
    }
    return browserPath;
}