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
require("../../mock-open-scd.js");
var Templates_js_1 = require("../../../src/editors/Templates.js");
describe('DA wizarding editing integration', function () {
    if (customElements.get('templates-editor') === undefined)
        customElements.define('templates-editor', Templates_js_1["default"]);
    var doc;
    var parent;
    var templates;
    var dOTypeList;
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, fetch('/test/testfiles/templates/dotypes.scd')
                        .then(function (response) { return response.text(); })
                        .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                case 1:
                    doc = _b.sent();
                    return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["<mock-open-scd\n        ><templates-editor .doc=", "></templates-editor\n      ></mock-open-scd>"], ["<mock-open-scd\n        ><templates-editor .doc=", "></templates-editor\n      ></mock-open-scd>"])), doc))];
                case 2:
                    parent = _b.sent();
                    templates = parent.getActivePlugin();
                    return [4 /*yield*/, parent.updateComplete];
                case 3:
                    _b.sent();
                    dOTypeList = ((_a = templates.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('filtered-list[id="dotypelist"]'));
                    return [2 /*return*/];
            }
        });
    }); });
    describe('defines a editDaWizard to edit an existing DA', function () {
        var nameField;
        var primayAction;
        var deleteButton;
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        (dOTypeList.querySelector('mwc-list-item[value="#Dummy.LLN0.Mod"]')).click();
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 1:
                        _e.sent();
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                    case 2:
                        _e.sent(); // await animation
                        ((_b = (_a = parent.wizardUI) === null || _a === void 0 ? void 0 : _a.dialog) === null || _b === void 0 ? void 0 : _b.querySelector('mwc-list-item[value="#Dummy.LLN0.Mod>stVal"]')).click();
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 3:
                        _e.sent();
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                    case 4:
                        _e.sent(); // await animation
                        nameField = ((_c = parent.wizardUI.dialog) === null || _c === void 0 ? void 0 : _c.querySelector('wizard-textfield[label="name"]'));
                        primayAction = ((_d = parent.wizardUI.dialog) === null || _d === void 0 ? void 0 : _d.querySelector('mwc-button[slot="primaryAction"]'));
                        deleteButton = (Array.from(parent.wizardUI.dialog.querySelectorAll('mwc-menu > mwc-list-item')).find(function (item) { return item.innerHTML.includes('Remove'); }));
                        return [2 /*return*/];
                }
            });
        }); });
        it('looks like the latest snapshot', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, testing_1.expect(parent.wizardUI.dialog).to.equalSnapshot()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('edits DA attributes name', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        testing_1.expect(doc.querySelector('DOType[id="Dummy.LLN0.Mod"] > DA[name="stVal"]')).to.exist;
                        nameField.value = 'newCtlVal';
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 1:
                        _a.sent();
                        primayAction.click();
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 2:
                        _a.sent();
                        testing_1.expect(doc.querySelector('DOType[id="Dummy.LLN0.Mod"] > DA[name="stVal"]')).to.not.exist;
                        testing_1.expect(doc.querySelector('DOType[id="Dummy.LLN0.Mod"] > DA[name="newCtlVal"]')).to.exist;
                        return [2 /*return*/];
                }
            });
        }); });
        it('deletes the DA element on delete button click', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        testing_1.expect(doc.querySelector('DOType[id="Dummy.LLN0.Mod"] > DA[name="stVal"]')).to.exist;
                        testing_1.expect(doc.querySelectorAll('DOType[id="Dummy.LLN0.Mod"] > DA').length).to.equal(14);
                        deleteButton.click();
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 1:
                        _a.sent();
                        testing_1.expect(doc.querySelector('DOType[id="Dummy.LLN0.Mod"] > DA[name="stVal"]')).to.not.exist;
                        testing_1.expect(doc.querySelectorAll('DOType[id="Dummy.LLN0.Mod"] > DA').length).to.equal(13);
                        return [2 /*return*/];
                }
            });
        }); });
        it('does not edit DA element without changes', function () { return __awaiter(void 0, void 0, void 0, function () {
            var originData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        originData = (doc.querySelector('DOType[id="Dummy.LLN0.Mod"] > DA[name="stVal"]')).cloneNode(true);
                        primayAction.click();
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 1:
                        _a.sent();
                        testing_1.expect(originData.isEqualNode(doc.querySelector('DOType[id="Dummy.LLN0.Mod"] > DA[name="stVal"]'))).to.be["true"];
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('defines a createDaWizard to create a new DA element', function () {
        var nameField;
        var descField;
        var sAddrField;
        var bTypeSelect;
        var valKindSelect;
        var valImportSelect;
        var fcSelect;
        var primayAction;
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        (dOTypeList.querySelector('mwc-list-item[value="#Dummy.LLN0.Mod"]')).click();
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 1:
                        _j.sent();
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                    case 2:
                        _j.sent(); // await animation
                        (Array.from(parent.wizardUI.dialog.querySelectorAll('mwc-menu > mwc-list-item')).find(function (item) { return item.innerHTML.includes('Data attribute'); })).click();
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 3:
                        _j.sent();
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                    case 4:
                        _j.sent(); // await animation
                        nameField = ((_a = parent.wizardUI.dialog) === null || _a === void 0 ? void 0 : _a.querySelector('wizard-textfield[label="name"]'));
                        descField = ((_b = parent.wizardUI.dialog) === null || _b === void 0 ? void 0 : _b.querySelector('wizard-textfield[label="desc"]'));
                        sAddrField = ((_c = parent.wizardUI.dialog) === null || _c === void 0 ? void 0 : _c.querySelector('wizard-textfield[label="sAddr"]'));
                        bTypeSelect = ((_d = parent.wizardUI.dialog) === null || _d === void 0 ? void 0 : _d.querySelector('wizard-select[label="bType"]'));
                        valKindSelect = ((_e = parent.wizardUI.dialog) === null || _e === void 0 ? void 0 : _e.querySelector('wizard-select[label="valKind"]'));
                        valImportSelect = ((_f = parent.wizardUI.dialog) === null || _f === void 0 ? void 0 : _f.querySelector('wizard-checkbox[label="valImport"]'));
                        fcSelect = ((_g = parent.wizardUI.dialog) === null || _g === void 0 ? void 0 : _g.querySelector('wizard-select[label="fc"]'));
                        primayAction = ((_h = parent.wizardUI.dialog) === null || _h === void 0 ? void 0 : _h.querySelector('mwc-button[slot="primaryAction"]'));
                        return [2 /*return*/];
                }
            });
        }); });
        it('looks like the latest snapshot', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, testing_1.expect(parent.wizardUI.dialog).to.equalSnapshot()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('creates a new DA element', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        testing_1.expect(doc.querySelector('DOType[id="Dummy.LLN0.Mod"] > DA[name="newDAElement"]')).to.not.exist;
                        nameField.value = 'newDAElement';
                        fcSelect.value = 'ST';
                        bTypeSelect.value = 'Struct';
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 1:
                        _a.sent();
                        primayAction.click();
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 2:
                        _a.sent();
                        testing_1.expect(doc.querySelector('DOType[id="Dummy.LLN0.Mod"] > ' +
                            'DA[name="newDAElement"]:not([desc]):not([sAddr])[bType="Struct"]' +
                            '[type="Dummy_origin"]:not([valKind]):not([valImport])')).to.exist;
                        return [2 /*return*/];
                }
            });
        }); });
        it('creates yet another new DA element', function () { return __awaiter(void 0, void 0, void 0, function () {
            var name, desc, sAddr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        name = 'newDAElement2';
                        desc = 'newDAdesc';
                        sAddr = 'myNewAddr';
                        testing_1.expect(doc.querySelector('DAType[id="#Dummy.LLN0.Mod"] > DA[name="newDAElement2"]')).to.not.exist;
                        nameField.value = name;
                        descField.nullable = false;
                        descField.value = desc;
                        sAddrField.nullable = false;
                        sAddrField.value = sAddr;
                        bTypeSelect.value = 'BOOLEAN';
                        valKindSelect.nullable = false;
                        valKindSelect.value = 'RO';
                        valImportSelect.nullable = false;
                        valImportSelect.maybeValue = 'true';
                        fcSelect.value = 'ST';
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 1:
                        _a.sent();
                        primayAction.click();
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 2:
                        _a.sent();
                        testing_1.expect(doc.querySelector("DOType[id=\"Dummy.LLN0.Mod\"] >" +
                            ("DA[name=\"" + name + "\"][desc=\"" + desc + "\"][sAddr=\"" + sAddr + "\"][bType=\"BOOLEAN\"]") +
                            ":not([type])[valKind=\"RO\"][valImport=\"true\"]")).to.exist;
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
var templateObject_1;
