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

let config = require('../configuration/embedded-reports-urls.config.json');
let debugMode: boolean = process.argv.indexOf("--debug") !== -1;

module powerbi.extensibility.visual.test.imageComparison {

    const dafaultExistTimeout: number = 20000,
        defaultPause: number = 3500,
        defaultElement: string = `div.visual`,
        defaultFrameElement: string = `svg`,
        iframeSandboxElement: string = `iframe.visual-sandbox`,
        pagePaginationElements: string = `.logoBar .navigation-wrapper > a`;

    async function paginatePages(loop: () => void): Promise<any> {
        try {
            let paginationLinkEl: WebdriverIO.Element[] =
                (await browser.elements(pagePaginationElements)).value;
            let paginationIconEl: WebdriverIO.RawResult<WebdriverIO.Element> =
                await browser.elementIdElement(paginationLinkEl[2].ELEMENT, `i`);

            let classedOfPaginationEl: WebdriverIO.RawResult<string> =
                await browser.elementIdAttribute(paginationIconEl.value.ELEMENT, `class`);

            if (classedOfPaginationEl.value.indexOf(`inactive`) !== -1 ||
                classedOfPaginationEl.value.indexOf("pbi-glyph-chevronrightmedium") === -1) {
                return;
            }

            await browser
                .elementIdClick(paginationLinkEl[2].ELEMENT);

            await loop();
        } catch (err) {
            throw new Error(err);
        }
    }

    async function checkIFrame(
        element: any,
        existTimeout: number): Promise<any> {
        if (!element ||
            (element && !element.frame)) {
            return;
        }

        let frameElement: string = (element && element.frame) || defaultFrameElement;
        let frameTimeout: number = existTimeout || dafaultExistTimeout;

        try {
            await browser.waitForExist(iframeSandboxElement, dafaultExistTimeout - 5000);

            let iFrameEl = await browser.element(iframeSandboxElement);
            await browser.frame(iFrameEl.value);

            await browser.waitForExist(frameElement, frameTimeout);
            await browser.frameParent();

            return;
        } catch(err) {
            throw new Error(err);
        }
    }

    async function takeScreenshot(
        pause: number,
        page: number,
        screenshotElement: string): Promise<any>  {

        try {
            await browser
                .pause(pause)
                .assertAreaScreenshotMatch({
                    name: `visual_page_${page}`,
                    ignore: `antialiasing`,
                    elem: screenshotElement
                });
        } catch(err) {
            throw new Error(err);
        }
    }

    config.forEach(item => {
        describe(item.name || "Name is not specified", () => {
            for (const env in item.environments) {
                it(env, (done) => {
                    const url: string = item.environments && item.environments[env];
                    const isUrl: boolean = /^https\:\/\/(app|dxt|msit|powerbi-df)\.(powerbi|analysis-df\.windows)\.(com|net)\/view/.test(url);
                    let page: number = 0;

                    expect(isUrl).toBe(true);

                    browser
                        .timeouts("script", 60000)
                        .timeouts("implicit", 60000)
                        .timeouts("page load", 60000);

                    let urlPromise: any = browser.url(url);
                    (async function loop(){
                        let element: any = item.element || null;
                        if (element &&
                            Object.prototype.toString.call(item.element) === `[object Array]`) {
                            element = element[page];
                        }

                        let awaitElement: string = (element && element.await) || defaultElement;
                        let screenshotElement: string = (element && element.snapshot) || defaultElement;
                        let existTimeout: number = item.existTimeout || dafaultExistTimeout;
                        let pause: number = item.pause || defaultPause;

                        try {
                            await urlPromise;
                            await browser.waitForExist(awaitElement, existTimeout);

                            await checkIFrame(element, existTimeout);
                            await takeScreenshot(pause, ++page, screenshotElement);
                            await paginatePages(loop);
                        } catch(err) {
                            if (debugMode) {
                                console.error(err.message);
                            }
                        }

                        browser.call(done);
                    })();
                });
            }
        });
    });

}