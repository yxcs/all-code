"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("../common/component");
var utils_1 = require("./utils");
var utils_2 = require("../common/utils");
component_1.VantComponent({
    props: {
        disabled: Boolean,
        multiple: Boolean,
        uploadText: String,
        useSlot: Boolean,
        useBeforeRead: Boolean,
        previewSize: {
            type: null,
            value: 90,
            observer: 'setComputedPreviewSize'
        },
        name: {
            type: [Number, String],
            value: ''
        },
        accept: {
            type: String,
            value: 'image'
        },
        fileList: {
            type: Array,
            value: [],
            observer: 'formatFileList'
        },
        maxSize: {
            type: Number,
            value: Number.MAX_VALUE
        },
        maxCount: {
            type: Number,
            value: 100
        },
        deletable: {
            type: Boolean,
            value: true
        },
        previewImage: {
            type: Boolean,
            value: true
        },
        previewFullImage: {
            type: Boolean,
            value: true
        },
        imageFit: {
            type: String,
            value: 'scaleToFill'
        }
    },
    data: {
        lists: [],
        computedPreviewSize: '',
        isInCount: true
    },
    methods: {
        formatFileList: function () {
            var _a = this.data, _b = _a.fileList, fileList = _b === void 0 ? [] : _b, maxCount = _a.maxCount;
            var lists = fileList.map(function (item) { return (__assign(__assign({}, item), { isImage: typeof item.isImage === 'undefined' ? utils_1.isImageFile(item) : item.isImage })); });
            this.setData({ lists: lists, isInCount: lists.length < maxCount });
        },
        setComputedPreviewSize: function (val) {
            this.setData({
                computedPreviewSize: utils_2.addUnit(val)
            });
        },
        startUpload: function () {
            var _this = this;
            if (this.data.disabled)
                return;
            var _a = this.data, _b = _a.name, name = _b === void 0 ? '' : _b, _c = _a.capture, capture = _c === void 0 ? ['album', 'camera'] : _c, _d = _a.maxCount, maxCount = _d === void 0 ? 100 : _d, _e = _a.multiple, multiple = _e === void 0 ? false : _e, maxSize = _a.maxSize, accept = _a.accept, lists = _a.lists, _f = _a.useBeforeRead // ??????????????? beforeRead
            , useBeforeRead = _f === void 0 ? false : _f // ??????????????? beforeRead
            ;
            var chooseFile = null;
            var newMaxCount = maxCount - lists.length;
            // ??????????????????????????????????????? chooseImage ?????????
            if (accept === 'image') {
                chooseFile = new Promise(function (resolve, reject) {
                    wx.chooseImage({
                        count: multiple ? (newMaxCount > 9 ? 9 : newMaxCount) : 1,
                        sourceType: capture,
                        success: resolve,
                        fail: reject
                    });
                });
            }
            else {
                chooseFile = new Promise(function (resolve, reject) {
                    wx.chooseMessageFile({
                        count: multiple ? newMaxCount : 1,
                        type: 'file',
                        success: resolve,
                        fail: reject
                    });
                });
            }
            chooseFile.then(function (res) {
                var file = multiple ? res.tempFiles : res.tempFiles[0];
                // ??????????????????
                if (file instanceof Array) {
                    var sizeEnable = file.every(function (item) { return item.size <= maxSize; });
                    if (!sizeEnable) {
                        _this.$emit('oversize', { name: name });
                        return;
                    }
                }
                else if (file.size > maxSize) {
                    _this.$emit('oversize', { name: name });
                    return;
                }
                // ?????????????????????????????????
                if (useBeforeRead) {
                    _this.$emit('before-read', {
                        file: file,
                        name: name,
                        callback: function (result) {
                            if (result) {
                                // ????????????
                                _this.$emit('after-read', { file: file, name: name });
                            }
                        }
                    });
                }
                else {
                    _this.$emit('after-read', { file: file, name: name });
                }
            });
        },
        deleteItem: function (event) {
            var index = event.currentTarget.dataset.index;
            this.$emit('delete', { index: index, name: this.data.name });
        },
        doPreviewImage: function (event) {
            if (!this.data.previewFullImage)
                return;
            var curUrl = event.currentTarget.dataset.url;
            var images = this.data.lists
                .filter(function (item) { return item.isImage; })
                .map(function (item) { return item.url || item.path; });
            this.$emit('click-preview', { url: curUrl, name: this.data.name });
            wx.previewImage({
                urls: images,
                current: curUrl,
                fail: function () {
                    wx.showToast({ title: '??????????????????', icon: 'none' });
                }
            });
        }
    }
});
