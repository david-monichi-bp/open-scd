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
var sinon_1 = require("sinon");
require("../../../src/addons/Wizards.js");
var foundation_js_1 = require("../../../src/foundation.js");
var subfunction_js_1 = require("../../../src/wizards/subfunction.js");
describe('Wizards for SCL Function element', function () {
    var doc;
    var element;
    var inputs;
    var primaryAction;
    var actionEvent;
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["<oscd-wizards .host=", "></oscd-wizards>"], ["<oscd-wizards .host=", "></oscd-wizards>"])), document))];
                case 1:
                    element = _a.sent();
                    return [4 /*yield*/, fetch('test/testfiles/zeroline/functions.scd')
                            .then(function (response) { return response.text(); })
                            .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                case 2:
                    doc = _a.sent();
                    actionEvent = sinon_1.spy();
                    window.addEventListener('editor-action', actionEvent);
                    return [2 /*return*/];
            }
        });
    }); });
    describe('define an create wizard that', function () {
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            var wizard;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        wizard = subfunction_js_1.createSubFunctionWizard(doc.querySelector('Function'));
                        element.workflow.push(function () { return wizard; });
                        return [4 /*yield*/, element.requestUpdate()];
                    case 1:
                        _b.sent();
                        inputs = Array.from(element.wizardUI.inputs);
                        primaryAction = ((_a = element.wizardUI.dialog) === null || _a === void 0 ? void 0 : _a.querySelector('mwc-button[slot="primaryAction"]'));
                        return [4 /*yield*/, element.wizardUI.requestUpdate()];
                    case 2:
                        _b.sent(); // make sure wizard is rendered
                        return [2 /*return*/];
                }
            });
        }); });
        it('looks like the the latest snapshot', function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testing_1.expect(element.wizardUI.dialog).dom.to.equalSnapshot()];
                case 1: return [2 /*return*/, _a.sent()];
            }
        }); }); });
        it('does not accept empty name attribute', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, primaryAction.click()];
                    case 1:
                        _a.sent();
                        testing_1.expect(actionEvent).to.not.have.been.called;
                        return [2 /*return*/];
                }
            });
        }); });
        it('triggers simple create action on primary action click', function () { return __awaiter(void 0, void 0, void 0, function () {
            var action, createAction;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        inputs[0].value = 'someNonEmptyName';
                        return [4 /*yield*/, element.requestUpdate()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, primaryAction.click()];
                    case 2:
                        _a.sent();
                        testing_1.expect(actionEvent).to.be.calledOnce;
                        action = actionEvent.args[0][0].detail.action;
                        testing_1.expect(action).to.satisfy(foundation_js_1.isCreate);
                        createAction = action;
                        testing_1.expect(createAction["new"].element).to.have.attribute('name', 'someNonEmptyName');
                        testing_1.expect(createAction["new"].element).to.not.have.attribute('desc');
                        testing_1.expect(createAction["new"].element).to.not.have.attribute('type');
                        return [2 /*return*/];
                }
            });
        }); });
        it('allows to create non required attributes desc and type', function () { return __awaiter(void 0, void 0, void 0, function () {
            var action, createAction;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        inputs[0].value = 'someNonEmptyName';
                        (_a = inputs[1].nullSwitch) === null || _a === void 0 ? void 0 : _a.click();
                        (_b = inputs[2].nullSwitch) === null || _b === void 0 ? void 0 : _b.click();
                        inputs[1].value = 'SomeDesc';
                        inputs[2].value = 'SomeType';
                        return [4 /*yield*/, element.requestUpdate()];
                    case 1:
                        _c.sent();
                        return [4 /*yield*/, primaryAction.click()];
                    case 2:
                        _c.sent();
                        testing_1.expect(actionEvent).to.be.calledOnce;
                        action = actionEvent.args[0][0].detail.action;
                        testing_1.expect(action).to.satisfy(foundation_js_1.isCreate);
                        createAction = action;
                        testing_1.expect(createAction["new"].element).to.have.attribute('name', 'someNonEmptyName');
                        testing_1.expect(createAction["new"].element).to.have.attribute('desc', 'SomeDesc');
                        testing_1.expect(createAction["new"].element).to.have.attribute('type', 'SomeType');
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('define an edit wizard that', function () {
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            var wizard;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        wizard = subfunction_js_1.editSubFunctionWizard(doc.querySelector('Bay[name="COUPLING_BAY"] > Function[name="bayName"] > SubFunction[name="myBaySubFunc"]'));
                        element.workflow.push(function () { return wizard; });
                        return [4 /*yield*/, element.requestUpdate()];
                    case 1:
                        _b.sent();
                        inputs = Array.from(element.wizardUI.inputs);
                        primaryAction = ((_a = element.wizardUI.dialog) === null || _a === void 0 ? void 0 : _a.querySelector('mwc-button[slot="primaryAction"]'));
                        return [4 /*yield*/, element.wizardUI.requestUpdate()];
                    case 2:
                        _b.sent(); // make sure wizard is rendered
                        return [2 /*return*/];
                }
            });
        }); });
        it('looks like the the latest snapshot', function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testing_1.expect(element.wizardUI.dialog).dom.to.equalSnapshot()];
                case 1: return [2 /*return*/, _a.sent()];
            }
        }); }); });
        it('does not accept empty name attribute', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        inputs[0].value = '';
                        return [4 /*yield*/, element.requestUpdate()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, primaryAction.click()];
                    case 2:
                        _a.sent();
                        testing_1.expect(actionEvent).to.not.have.been.called;
                        return [2 /*return*/];
                }
            });
        }); });
        it('does not trigger action without changes', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, primaryAction.click()];
                    case 1:
                        _a.sent();
                        testing_1.expect(actionEvent).to.not.have.been.called;
                        return [2 /*return*/];
                }
            });
        }); });
        it('does not trigger action if name attribute is not unique', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        inputs[0].value = 'mySubFunc2';
                        primaryAction.click();
                        return [4 /*yield*/, element.updateComplete];
                    case 1:
                        _a.sent();
                        testing_1.expect(actionEvent).to.not.have.been.called;
                        return [2 /*return*/];
                }
            });
        }); });
        it('triggers simple replace action updating name attribute', function () { return __awaiter(void 0, void 0, void 0, function () {
            var action, createAction;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        inputs[0].value = 'someNonEmptyName';
                        return [4 /*yield*/, element.requestUpdate()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, primaryAction.click()];
                    case 2:
                        _a.sent();
                        testing_1.expect(actionEvent).to.be.calledOnce;
                        action = actionEvent.args[0][0].detail.action;
                        testing_1.expect(action).to.satisfy(foundation_js_1.isReplace);
                        createAction = action;
                        testing_1.expect(createAction["new"].element).to.have.attribute('name', 'someNonEmptyName');
                        return [2 /*return*/];
                }
            });
        }); });
        it('triggers simple replace action updating desc attribute', function () { return __awaiter(void 0, void 0, void 0, function () {
            var action, createAction;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        inputs[1].value = 'someDesc';
                        return [4 /*yield*/, element.requestUpdate()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, primaryAction.click()];
                    case 2:
                        _a.sent();
                        testing_1.expect(actionEvent).to.be.calledOnce;
                        action = actionEvent.args[0][0].detail.action;
                        testing_1.expect(action).to.satisfy(foundation_js_1.isReplace);
                        createAction = action;
                        testing_1.expect(createAction["new"].element).to.have.attribute('desc', 'someDesc');
                        return [2 /*return*/];
                }
            });
        }); });
        it('triggers simple replace action updating type attribute', function () { return __awaiter(void 0, void 0, void 0, function () {
            var action, createAction;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        inputs[2].value = 'someType';
                        return [4 /*yield*/, element.requestUpdate()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, primaryAction.click()];
                    case 2:
                        _a.sent();
                        testing_1.expect(actionEvent).to.be.calledOnce;
                        action = actionEvent.args[0][0].detail.action;
                        testing_1.expect(action).to.satisfy(foundation_js_1.isReplace);
                        createAction = action;
                        testing_1.expect(createAction["new"].element).to.have.attribute('type', 'someType');
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
var templateObject_1;