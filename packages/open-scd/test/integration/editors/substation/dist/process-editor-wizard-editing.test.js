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
require("../../../../src/editors/substation/process-editor.js");
var openAndCancelMenu = function (parent, element) {
    return new Promise(function (resolve) { return __awaiter(void 0, void 0, void 0, function () {
        var lnodMenuItem, secondaryAction;
        var _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    testing_1.expect(parent.wizardUI.dialog).to.be.undefined;
                    (_a = element === null || element === void 0 ? void 0 : element.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector("mwc-icon-button[icon='playlist_add']").click();
                    lnodMenuItem = (_b = element === null || element === void 0 ? void 0 : element.shadowRoot) === null || _b === void 0 ? void 0 : _b.querySelector("mwc-list-item[value='LNode']");
                    lnodMenuItem.click();
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                case 1:
                    _d.sent(); // await animation
                    testing_1.expect(parent.wizardUI.dialog).to.exist;
                    secondaryAction = ((_c = parent.wizardUI.dialog) === null || _c === void 0 ? void 0 : _c.querySelector('mwc-button[slot="secondaryAction"][dialogaction="close"]'));
                    secondaryAction.click();
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                case 2:
                    _d.sent(); // await animation
                    testing_1.expect(parent.wizardUI.dialog).to.be.undefined;
                    return [2 /*return*/, resolve()];
            }
        });
    }); });
};
describe('process-editor wizarding editing integration', function () {
    var doc;
    var parent;
    var element;
    describe('edit wizard', function () {
        var nameField;
        var descField;
        var typeField;
        var primaryAction;
        var secondaryAction;
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, _b, _c, _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0: return [4 /*yield*/, fetch('/test/testfiles/editors/substation/Process.scd')
                            .then(function (response) { return response.text(); })
                            .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                    case 1:
                        doc = _f.sent();
                        return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["<mock-wizard-editor\n            ><process-editor\n              .element=", "\n            ></process-editor\n          ></mock-wizard-editor>"], ["<mock-wizard-editor\n            ><process-editor\n              .element=", "\n            ></process-editor\n          ></mock-wizard-editor>"])), doc.querySelector('Process[name="ProcessGenConduct"]')))];
                    case 2:
                        parent = (_f.sent());
                        element = parent.querySelector('process-editor');
                        return [4 /*yield*/, ((_a = element === null || element === void 0 ? void 0 : element.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('mwc-icon-button[icon="edit"]')).click()];
                    case 3:
                        _f.sent();
                        return [4 /*yield*/, parent.updateComplete];
                    case 4:
                        _f.sent();
                        return [4 /*yield*/, parent.wizardUI.updateComplete];
                    case 5:
                        _f.sent();
                        nameField = ((_b = parent.wizardUI.dialog) === null || _b === void 0 ? void 0 : _b.querySelector('wizard-textfield[label="name"]'));
                        typeField = ((_c = parent.wizardUI.dialog) === null || _c === void 0 ? void 0 : _c.querySelector('wizard-textfield[label="type"]'));
                        secondaryAction = ((_d = parent.wizardUI.dialog) === null || _d === void 0 ? void 0 : _d.querySelector('mwc-button[slot="secondaryAction"]'));
                        primaryAction = ((_e = parent.wizardUI.dialog) === null || _e === void 0 ? void 0 : _e.querySelector('mwc-button[slot="primaryAction"]'));
                        return [2 /*return*/];
                }
            });
        }); });
        it('closes on secondary action', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        secondaryAction.click();
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                    case 1:
                        _a.sent(); // await animation
                        testing_1.expect(parent.wizardUI.dialog).to.not.exist;
                        return [2 /*return*/];
                }
            });
        }); });
        it('does not change name attribute if not unique within parent element', function () { return __awaiter(void 0, void 0, void 0, function () {
            var oldName;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        oldName = nameField.value;
                        nameField.value = 'ProcProcSubAA1';
                        primaryAction.click();
                        return [4 /*yield*/, parent.updateComplete];
                    case 1:
                        _b.sent();
                        testing_1.expect((_a = doc
                            .querySelector('Process[name="ProcessGenConduct"]')) === null || _a === void 0 ? void 0 : _a.getAttribute('name')).to.equal(oldName);
                        return [2 /*return*/];
                }
            });
        }); });
        it('changes name attribute on primary action', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        nameField.value = 'newName';
                        primaryAction.click();
                        return [4 /*yield*/, parent.updateComplete];
                    case 1:
                        _b.sent();
                        testing_1.expect((_a = doc.querySelector('Process')) === null || _a === void 0 ? void 0 : _a.getAttribute('name')).to.equal('newName');
                        return [2 /*return*/];
                }
            });
        }); });
        it('changes desc attribute on primary action', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        descField = ((_a = parent.wizardUI.dialog) === null || _a === void 0 ? void 0 : _a.querySelector('wizard-textfield[label="desc"]'));
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                    case 1:
                        _c.sent(); // await animation
                        descField.nullSwitch.click();
                        return [4 /*yield*/, parent.updateComplete];
                    case 2:
                        _c.sent();
                        descField.value = 'newDesc';
                        console.log(descField.value);
                        primaryAction.click();
                        return [4 /*yield*/, parent.updateComplete];
                    case 3:
                        _c.sent();
                        testing_1.expect((_b = doc
                            .querySelector('Process[name="ProcessGenConduct"]')) === null || _b === void 0 ? void 0 : _b.getAttribute('desc')).to.equal('newDesc');
                        return [2 /*return*/];
                }
            });
        }); });
        it('deletes desc attribute if wizard-textfield is deactivated', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                    case 1:
                        _b.sent(); // await animation
                        descField.nullSwitch.click();
                        return [4 /*yield*/, parent.updateComplete];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, primaryAction.click()];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, parent.updateComplete];
                    case 4:
                        _b.sent();
                        testing_1.expect((_a = doc
                            .querySelector('Process[name="ProcessGenConduct"]')) === null || _a === void 0 ? void 0 : _a.getAttribute('desc')).to.be["null"];
                        return [2 /*return*/];
                }
            });
        }); });
        it('changes type attribute on primary action', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                    case 1:
                        _b.sent();
                        typeField.nullSwitch.click();
                        return [4 /*yield*/, parent.updateComplete];
                    case 2:
                        _b.sent();
                        typeField.value = 'newType';
                        primaryAction.click();
                        return [4 /*yield*/, parent.updateComplete];
                    case 3:
                        _b.sent();
                        testing_1.expect((_a = doc
                            .querySelector('Process[name="ProcessGenConduct"]')) === null || _a === void 0 ? void 0 : _a.getAttribute('type')).to.equal('newType');
                        return [2 /*return*/];
                }
            });
        }); });
        describe('has a delete icon button that', function () {
            var deleteButton;
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            deleteButton = ((_a = element === null || element === void 0 ? void 0 : element.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('mwc-icon-button[icon="delete"]'));
                            return [4 /*yield*/, parent.updateComplete];
                        case 1:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('removes the Process element from the document', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            testing_1.expect(doc.querySelector('Process[name="ProcessGenConduct"]')).to.exist;
                            return [4 /*yield*/, deleteButton.click()];
                        case 1:
                            _a.sent();
                            testing_1.expect(doc.querySelector('Process[name="ProcessGenConduct"]')).to.not
                                .exist;
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe('Open add wizard', function () {
            var doc;
            var parent;
            var element;
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, fetch('/test/testfiles/editors/substation/Process.scd')
                                .then(function (response) { return response.text(); })
                                .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                        case 1:
                            doc = _a.sent();
                            return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_2 || (templateObject_2 = __makeTemplateObject(["<mock-wizard-editor\n              ><process-editor\n                .element=", "\n              ></process-editor\n            ></mock-wizard-editor>"], ["<mock-wizard-editor\n              ><process-editor\n                .element=",
                                    "\n              ></process-editor\n            ></mock-wizard-editor>"])), doc.querySelector('Process[name="ProcessGenConduct"]')))];
                        case 2:
                            parent = (_a.sent());
                            element = parent.querySelector('process-editor');
                            return [4 /*yield*/, parent.updateComplete];
                        case 3:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('Should open the same wizard for the second time', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, openAndCancelMenu(parent, element)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, openAndCancelMenu(parent, element)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    });
});
var templateObject_1, templateObject_2;