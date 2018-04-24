var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/*
 *  Power BI Visualizations
 *
 *  Copyright (c) Microsoft Corporation
 *  All rights reserved.
 *  MIT License
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the ""Software""), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */
// External
/// <reference path="./../node_modules/@types/jasmine/index.d.ts" />
/// <reference path="./../node_modules/@types/jasmine-jquery/index.d.ts" />
// Testrunner
/// <reference path="./../node_modules/webdriver-client-test-runner/src/webdriver-client-test-runner/typedefs/exports.d.ts" />
var config = require('../configuration/embedded-reports-urls.config.json');
var debugMode = process.argv.indexOf("--debug") !== -1;
var powerbi;
(function (powerbi) {
    var extensibility;
    (function (extensibility) {
        var visual;
        (function (visual) {
            var test;
            (function (test) {
                var imageComparison;
                (function (imageComparison) {
                    var dafaultExistTimeout = 20000, defaultPause = 3500, pauseBeforeLoaderWasAppeared = 500, pauseBeforeCheckingLoader = 1000, defaultElement = "div.visual", loaderElement = "div.circle", defaultFrameElement = "svg", iframeSandboxElement = "iframe.visual-sandbox", pagePaginationElements = ".logoBar .navigation-wrapper > a";
                    function paginatePages(loop, remainedPages) {
                        return __awaiter(this, void 0, void 0, function () {
                            var paginationLinkEl, paginationIconEl, err_1;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 6, , 7]);
                                        return [4 /*yield*/, browser.elements(pagePaginationElements)];
                                    case 1:
                                        paginationLinkEl = (_a.sent()).value;
                                        return [4 /*yield*/, browser.elementIdElement(paginationLinkEl[2].ELEMENT, "i")];
                                    case 2:
                                        paginationIconEl = _a.sent();
                                        if (!(remainedPages > 0)) return [3 /*break*/, 5];
                                        return [4 /*yield*/, browser
                                                .elementIdClick(paginationLinkEl[2].ELEMENT)];
                                    case 3:
                                        _a.sent();
                                        return [4 /*yield*/, loop(remainedPages)];
                                    case 4:
                                        _a.sent();
                                        _a.label = 5;
                                    case 5: return [3 /*break*/, 7];
                                    case 6:
                                        err_1 = _a.sent();
                                        throw new Error(err_1);
                                    case 7: return [2 /*return*/];
                                }
                            });
                        });
                    }
                    function checkIFrame(element, existTimeout) {
                        return __awaiter(this, void 0, void 0, function () {
                            var frameElement, frameTimeout, iFrameEl, err_2;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!element ||
                                            (element && !element.frame)) {
                                            return [2 /*return*/];
                                        }
                                        frameElement = (element && element.frame) || defaultFrameElement;
                                        frameTimeout = existTimeout || dafaultExistTimeout;
                                        _a.label = 1;
                                    case 1:
                                        _a.trys.push([1, 5, , 6]);
                                        return [4 /*yield*/, browser.waitForExist(iframeSandboxElement, dafaultExistTimeout - 5000)];
                                    case 2:
                                        _a.sent();
                                        return [4 /*yield*/, browser.element(iframeSandboxElement)];
                                    case 3:
                                        iFrameEl = _a.sent();
                                        return [4 /*yield*/, browser
                                                .frame(iFrameEl.value)
                                                .waitForExist(frameElement, frameTimeout)
                                                .frameParent()];
                                    case 4:
                                        _a.sent();
                                        return [3 /*break*/, 6];
                                    case 5:
                                        err_2 = _a.sent();
                                        throw new Error(err_2);
                                    case 6: return [2 /*return*/];
                                }
                            });
                        });
                    }
                    function takeScreenshot(pause, page, screenshotElement) {
                        return __awaiter(this, void 0, void 0, function () {
                            var err_3;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 2, , 3]);
                                        return [4 /*yield*/, browser
                                                .pause(pause)
                                                .assertAreaScreenshotMatch({
                                                name: "visual_page_" + page,
                                                ignore: "antialiasing",
                                                elem: screenshotElement
                                            })];
                                    case 1:
                                        _a.sent();
                                        return [3 /*break*/, 3];
                                    case 2:
                                        err_3 = _a.sent();
                                        throw new Error(err_3);
                                    case 3: return [2 /*return*/];
                                }
                            });
                        });
                    }
                    function checkDataLoading() {
                        return __awaiter(this, void 0, void 0, function () {
                            var loaders, err_4;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 4, , 5]);
                                        return [4 /*yield*/, browser.elements(loaderElement)];
                                    case 1:
                                        loaders = (_a.sent()).value;
                                        if (!loaders.length) {
                                            return [2 /*return*/];
                                        }
                                        return [4 /*yield*/, browser.pause(pauseBeforeCheckingLoader)];
                                    case 2:
                                        _a.sent();
                                        return [4 /*yield*/, checkDataLoading()];
                                    case 3:
                                        _a.sent();
                                        return [3 /*break*/, 5];
                                    case 4:
                                        err_4 = _a.sent();
                                        throw new Error(err_4);
                                    case 5: return [2 /*return*/];
                                }
                            });
                        });
                    }
                    config.forEach(function (item) {
                        describe(item.name || "Name is not specified", function () {
                            var _loop_1 = function (env) {
                                it(env, function (done) {
                                    var url = item.environments && item.environments[env];
                                    var isUrl = /^https\:\/\/(app|dxt|msit|powerbi-df)\.(powerbi|analysis-df\.windows)\.(com|net)\/view/.test(url);
                                    var page = 0;
                                    expect(isUrl).toBe(true);
                                    browser
                                        .timeouts("script", 60000)
                                        .timeouts("implicit", 1000)
                                        .timeouts("page load", 60000);
                                    var urlPromise = browser.url(url);
                                    urlPromise
                                        .then(function () {
                                        setTimeout(function () {
                                            browser
                                                .getText("span.navigation-wrapper.navigation-wrapper-big a")
                                                .then(function (value) {
                                                var pages = +(value[1].split("of").pop() || 1);
                                                (function loop(remainedPages) {
                                                    return __awaiter(this, void 0, void 0, function () {
                                                        var element, awaitElement, screenshotElement, existTimeout, pause, err_5;
                                                        return __generator(this, function (_a) {
                                                            switch (_a.label) {
                                                                case 0:
                                                                    element = item.element || null;
                                                                    if (element &&
                                                                        Object.prototype.toString.call(item.element) === "[object Array]") {
                                                                        element = element[page];
                                                                    }
                                                                    awaitElement = (element && element.await) || defaultElement;
                                                                    screenshotElement = (element && element.snapshot) || defaultElement;
                                                                    existTimeout = item.existTimeout || dafaultExistTimeout;
                                                                    pause = item.pause || defaultPause;
                                                                    _a.label = 1;
                                                                case 1:
                                                                    _a.trys.push([1, 8, , 9]);
                                                                    return [4 /*yield*/, urlPromise];
                                                                case 2:
                                                                    _a.sent();
                                                                    return [4 /*yield*/, browser
                                                                            .waitForExist(awaitElement, existTimeout)
                                                                            .pause(pauseBeforeLoaderWasAppeared)];
                                                                case 3:
                                                                    _a.sent();
                                                                    return [4 /*yield*/, checkDataLoading()];
                                                                case 4:
                                                                    _a.sent();
                                                                    return [4 /*yield*/, checkIFrame(element, existTimeout)];
                                                                case 5:
                                                                    _a.sent();
                                                                    return [4 /*yield*/, takeScreenshot(pause, ++page, screenshotElement)];
                                                                case 6:
                                                                    _a.sent();
                                                                    return [4 /*yield*/, paginatePages(loop, --remainedPages)];
                                                                case 7:
                                                                    _a.sent();
                                                                    return [3 /*break*/, 9];
                                                                case 8:
                                                                    err_5 = _a.sent();
                                                                    if (debugMode) {
                                                                        console.error(err_5.message);
                                                                    }
                                                                    return [3 /*break*/, 9];
                                                                case 9:
                                                                    browser.call(done);
                                                                    return [2 /*return*/];
                                                            }
                                                        });
                                                    });
                                                })(pages);
                                            });
                                        }, 2000);
                                    });
                                });
                            };
                            for (var env in item.environments) {
                                _loop_1(env);
                            }
                        });
                    });
                })(imageComparison = test.imageComparison || (test.imageComparison = {}));
            })(test = visual.test || (visual.test = {}));
        })(visual = extensibility.visual || (extensibility.visual = {}));
    })(extensibility = powerbi.extensibility || (powerbi.extensibility = {}));
})(powerbi || (powerbi = {}));
//# sourceMappingURL=test.js.map