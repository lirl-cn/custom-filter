var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
import React from 'react';
import { Form, Button, Icon, Popover } from 'antd';
var FormItem = Form.Item;
import { hasErrors } from './util';
import './index.css';
var CustomFilter = /** @class */ (function (_super) {
    __extends(CustomFilter, _super);
    function CustomFilter(props) {
        var _this = _super.call(this, props) || this;
        _this.filterOnClick = function () {
            var _a = _this.props, name = _a.name, form = _a.form;
            var getFieldValue = form.getFieldValue;
            var value = getFieldValue(name) === undefined ? _this.state.initialValue : getFieldValue(name); //获取未点击确定前的值
            var filtered = _this.state.filtered;
            _this.setState({
                filtered: !filtered,
                value: value,
            });
        };
        _this.hideFilter = function () {
            _this.setState({ filtered: false });
        };
        _this.state = {
            filtered: false,
            initialValue: props.initialValue,
            value: props.initialValue,
        };
        return _this;
    }
    CustomFilter.prototype.componentDidMount = function () {
        // document.addEventListener('click', this.hideFilter)
    };
    CustomFilter.prototype.render = function () {
        var _this = this;
        var _a = this.state, initialValue = _a.initialValue, value = _a.value;
        var _b = this.props, name = _b.name, validator = _b.validator, title = _b.title, form = _b.form, overlayClassName = _b.overlayClassName, valuePropName = _b.valuePropName, validateTrigger = _b.validateTrigger;
        var setFieldsValue = form.setFieldsValue, getFieldDecorator = form.getFieldDecorator, getFieldValue = form.getFieldValue, getFieldsError = form.getFieldsError;
        var fieldValue = getFieldValue(name);
        var reg = fieldValue === undefined || fieldValue === null || fieldValue === '' || fieldValue === [] || fieldValue.value === ''; //该正则用于判断小图标是否需要更改颜色，如搜索项有值则变颜色
        var popoverProps = {
            content: React.createElement(FilterTableHeaderItem, { key: name, getFieldDecorator: getFieldDecorator, setFieldsValue: setFieldsValue, getFieldValue: getFieldValue, getFieldsError: getFieldsError, name: name, validator: validator, initialValue: initialValue, value: value, hideFilter: this.hideFilter, valuePropName: valuePropName || 'value', validateTrigger: validateTrigger || 'onChange', onOk: function (value) {
                    _this.setState({ value: value }, function () {
                        _this.props.onOk && _this.props.onOk(name, value, title);
                        _this.setState({ filtered: false });
                    });
                } }, this.props.children),
            style: { minWidth: 140 },
            trigger: "click",
            visible: this.state.filtered,
            placement: 'bottomRight',
            overlayStyle: {},
            overlayClassName: overlayClassName || '',
            arrowPointAtCenter: true,
            onVisibleChange: function (visible) {
                var _a;
                if (!visible) { //未点击确定按钮关闭浮层，则恢复至浮层打开前的值
                    console.log(value);
                    setFieldsValue((_a = {}, _a[name] = value, _a));
                }
                _this.setState({ filtered: visible });
            },
        };
        if (this.props.renderParent === true) {
            popoverProps.getPopupContainer = function (node) { return node.parentNode; };
        }
        return React.createElement("div", { className: 'lirl-custom-filter-container' },
            title,
            React.createElement(Popover, __assign({}, popoverProps),
                React.createElement(Icon, { onClick: this.filterOnClick, type: "filter", className: reg ? '' : 'anticon-filter-active' })));
    };
    return CustomFilter;
}(React.Component));
var FilterTableHeaderItem = /** @class */ (function (_super) {
    __extends(FilterTableHeaderItem, _super);
    function FilterTableHeaderItem(props) {
        var _this = _super.call(this, props) || this;
        _this.cannel = function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, _b, setFieldsValue, name, value;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = this.props, setFieldsValue = _b.setFieldsValue, name = _b.name, value = _b.value;
                        return [4 /*yield*/, setFieldsValue((_a = {}, _a[name] = value, _a))];
                    case 1:
                        _c.sent();
                        this.props.hideFilter();
                        return [2 /*return*/];
                }
            });
        }); };
        return _this;
    }
    FilterTableHeaderItem.prototype.render = function () {
        var _this = this;
        var _a = this.props, getFieldDecorator = _a.getFieldDecorator, name = _a.name, validator = _a.validator, initialValue = _a.initialValue, getFieldValue = _a.getFieldValue, getFieldsError = _a.getFieldsError, valuePropName = _a.valuePropName, validateTrigger = _a.validateTrigger;
        return React.createElement("div", { className: 'lirl-custom-filter-filter' },
            React.createElement(FormItem, null, getFieldDecorator(name, {
                rules: [{
                        validator: function (rule, value, callback) {
                            if (validator) {
                                validator(rule, value, callback);
                            }
                            else {
                                callback();
                            }
                        },
                    }],
                initialValue: initialValue,
                valuePropName: valuePropName,
                validateTrigger: validateTrigger,
            })(this.props.children)),
            React.createElement("div", { style: {
                    textAlign: 'right'
                } },
                React.createElement(Button, { disabled: hasErrors(getFieldsError([name])), onClick: function () { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.props.onOk(getFieldValue(name))];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); }, style: { marginRight: 10 }, type: 'primary' }, " \u786E\u5B9A "),
                React.createElement(Button, { onClick: this.cannel }, " \u53D6\u6D88 ")));
    };
    return FilterTableHeaderItem;
}(React.Component));
export default CustomFilter;
