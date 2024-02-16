"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
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
exports.__esModule = true;
var testing_1 = require("@open-wc/testing");
require("../../../mock-wizard-editor.js");
require("../../../../src/editors/substation/ied-editor.js");
describe('IED editor component wizarding editing integration', function () {
    var doc;
    var parent;
    var iededitor;
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        var ied;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('/test/testfiles/valid2007B4.scd')
                        .then(function (response) { return response.text(); })
                        .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                case 1:
                    doc = _a.sent();
                    ied = doc.querySelector('IED[name="IED2"]');
                    return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["<mock-wizard-editor\n          ><ied-editor .element=", "></ied-editor\n        ></mock-wizard-editor>"], ["<mock-wizard-editor\n          ><ied-editor .element=", "></ied-editor\n        ></mock-wizard-editor>"])), ied))];
                case 2:
                    parent = (_a.sent());
                    iededitor = parent.querySelector('ied-editor');
                    return [4 /*yield*/, parent.updateComplete];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('opens select wizard showing GSEControl of one IED', function () { return __awaiter(void 0, void 0, void 0, function () {
        var gseControlList;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    ((_a = iededitor.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('mwc-fab[class="selectgse"]')).click();
                    return [4 /*yield*/, parent.updateComplete];
                case 1:
                    _c.sent();
                    return [4 /*yield*/, parent.wizardUI.updateComplete];
                case 2:
                    _c.sent();
                    testing_1.expect(parent.wizardUI.dialog).to.exist;
                    gseControlList = ((_b = parent.wizardUI.dialog) === null || _b === void 0 ? void 0 : _b.querySelector('filtered-list'));
                    return [4 /*yield*/, gseControlList.updateComplete];
                case 3:
                    _c.sent();
                    testing_1.expect(gseControlList.items.length).to.equal(doc.querySelectorAll('IED[name="IED2"] GSEControl').length);
                    return [2 /*return*/];
            }
        });
    }); });
    it('opens select wizard showing ReportControl of one IED', function () { return __awaiter(void 0, void 0, void 0, function () {
        var reportControlList;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    ((_a = iededitor.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('mwc-fab[class="selectreport"]')).click();
                    return [4 /*yield*/, parent.updateComplete];
                case 1:
                    _c.sent();
                    return [4 /*yield*/, parent.wizardUI.updateComplete];
                case 2:
                    _c.sent();
                    testing_1.expect(parent.wizardUI.dialog).to.exist;
                    reportControlList = ((_b = parent.wizardUI.dialog) === null || _b === void 0 ? void 0 : _b.querySelector('filtered-list'));
                    return [4 /*yield*/, reportControlList.updateComplete];
                case 3:
                    _c.sent();
                    testing_1.expect(reportControlList.items.length).to.equal(doc.querySelectorAll('IED[name="IED2"] ReportControl').length);
                    return [2 /*return*/];
            }
        });
    }); });
    it('opens wizard showing References of one IED', function () { return __awaiter(void 0, void 0, void 0, function () {
        var referencesList;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    ((_a = iededitor.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('mwc-fab[class="delete"]')).click();
                    return [4 /*yield*/, parent.updateComplete];
                case 1:
                    _c.sent();
                    return [4 /*yield*/, parent.wizardUI.updateComplete];
                case 2:
                    _c.sent();
                    testing_1.expect(parent.wizardUI.dialog).to.exist;
                    referencesList = (_b = parent.wizardUI.dialog) === null || _b === void 0 ? void 0 : _b.querySelectorAll('mwc-list-item');
                    testing_1.expect(referencesList).to.be.not.undefined;
                    testing_1.expect(referencesList.length).to.equal(7);
                    return [2 /*return*/];
            }
        });
    }); });
});
var templateObject_1;