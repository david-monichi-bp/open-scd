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
require("../../mock-wizard-editor.js");
var fcda_js_1 = require("../../../src/wizards/fcda.js");
var foundation_js_1 = require("../../../src/foundation.js");
describe('FCDA editing wizarding integration', function () {
    var doc;
    var element;
    var finder;
    var primaryAction;
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        var wizard;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["<mock-wizard-editor></mock-wizard-editor>"], ["<mock-wizard-editor></mock-wizard-editor>"]))))];
                case 1:
                    element = _b.sent();
                    return [4 /*yield*/, fetch('/test/testfiles/wizards/fcda.scd')
                            .then(function (response) { return response.text(); })
                            .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                case 2:
                    doc = _b.sent();
                    wizard = fcda_js_1.createFCDAsWizard(doc.querySelector('DataSet'));
                    element.dispatchEvent(foundation_js_1.newWizardEvent(wizard));
                    return [4 /*yield*/, element.requestUpdate()];
                case 3:
                    _b.sent();
                    finder = element.wizardUI.dialog.querySelector('finder-list');
                    primaryAction = ((_a = element.wizardUI.dialog) === null || _a === void 0 ? void 0 : _a.querySelector('mwc-button[slot="primaryAction"]'));
                    return [2 /*return*/];
            }
        });
    }); });
    describe('with a specific path', function () {
        var path = [
            'Server: IED1>P1',
            'LDevice: IED1>>CircuitBreaker_CB1',
            'LN0: IED1>>CircuitBreaker_CB1',
            'DO: #Dummy.LLN0>Beh',
            'DA: #Dummy.LLN0.Beh>stVal',
        ];
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        finder.paths = [path];
                        return [4 /*yield*/, element.requestUpdate()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('adds a new FCDA on primary action', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        testing_1.expect(doc.querySelector('DataSet > FCDA[ldInst="CircuitBreaker_CB1"]' +
                            '[prefix=""][lnClass="LLN0"]:not(lnInst)[doName="Beh"][daName="stVal"][fc="ST"]')).to.not.exist;
                        return [4 /*yield*/, primaryAction.click()];
                    case 1:
                        _a.sent();
                        testing_1.expect(doc.querySelector('DataSet > FCDA[ldInst="CircuitBreaker_CB1"]' +
                            '[prefix=""][lnClass="LLN0"]:not(lnInst)[doName="Beh"][daName="stVal"][fc="ST"]')).to.exist;
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('with a more complex path including SDOs and BDAs', function () {
        var path = [
            'Server: IED1>P1',
            'LDevice: IED1>>Meas',
            'LN: IED1>>Meas>My MMXU 1',
            'DO: #Dummy.MMXU>A',
            'SDO: #OpenSCD_WYE_phases>phsA',
            'DA: #OpenSCD_CMV_db_i_MagAndAng>cVal',
            'BDA: #OpenSCD_Vector_I_w_Ang>mag',
            'BDA: #OpenSCD_AnalogueValue_INT32>i',
        ];
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        finder.paths = [path];
                        return [4 /*yield*/, element.requestUpdate()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('adds a new FCDA on primary action', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        testing_1.expect(doc.querySelector('DataSet > FCDA[ldInst="Meas"]' +
                            '[prefix="My"][lnClass="MMXU"][lnInst="1"]' +
                            '[doName="A.phsA"][daName="cVal.mag.i"][fc="MX"]')).to.not.exist;
                        return [4 /*yield*/, primaryAction.click()];
                    case 1:
                        _a.sent();
                        testing_1.expect(doc.querySelector('DataSet > FCDA[ldInst="Meas"]' +
                            '[prefix="My"][lnClass="MMXU"][lnInst="1"]' +
                            '[doName="A.phsA"][daName="cVal.mag.i"][fc="MX"]')).to.exist;
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
var templateObject_1;
