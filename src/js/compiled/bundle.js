/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _table = __webpack_require__(1);

var _table2 = _interopRequireDefault(_table);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MainModule = function () {

    var workers = [];
    var dataPages = [];

    var getJSONData = function getJSONData() {
        // Fetch data from JSON file and same to "offers"
        fetch('./dane.json').then(function (response) {
            return response.json();
        }).then(function (data) {
            return saveData(data);
        });
    };

    var saveData = function saveData(data) {
        workers = data;
        sortData("lastName");
        splitDataToPages(workers);
        _table2.default.addDataToTable(dataPages[0]);
    };

    var sortData = function sortData() {
        var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "id";
        var sortMethod = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "asc";

        workers.sort(function (a, b) {
            if (a[key] > b[key]) {
                return (sortMethod = "asc") ? 1 : -1;
            };
        });
    };

    var splitDataToPages = function splitDataToPages(workersArr) {
        var mappingIterator = -1;

        workersArr.map(function (worker) {
            if (workersArr.indexOf(worker) % 5 === 0) {
                mappingIterator++;
                var newPage = [];
                dataPages.push(newPage);
                dataPages[mappingIterator].push(worker);
            } else {
                dataPages[mappingIterator].push(worker);
            }
        });

        _table2.default.pagination(dataPages);
    };

    _table2.default.pages.addEventListener("click", function (e) {
        if (!e.target.dataset.page) return;
        var pageNumber = e.target.dataset.page;
        pageNumber = parseInt(pageNumber) - 1;
        console.log(e.target.dataset.pages);
        _table2.default.addDataToTable(dataPages[pageNumber]);
    });

    // return {

    // };


    getJSONData();
}();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var TableModule = function () {

    var tableElements = {
        header: document.querySelector("#header"),
        body: document.querySelector("#table-content"),
        pages: document.querySelector("#pages")
    };

    var tableProperties = {
        totalPages: 0,
        actualPage: 0,
        sortedBy: "",
        sortMethod: ""
    };

    var updateProperties = function updateProperties(newProperies) {
        tableProperties = _extends({}, tableProperties, newProperies);
    };

    var addDataToTable = function addDataToTable(workersData) {
        var tbodyFragment = document.createDocumentFragment();
        var tableRows = createTableRow(workersData);
        tbodyFragment.appendChild(tableRows);
        tableElements.body.innerHTML = "";
        tableElements.body.appendChild(tbodyFragment);
    };

    var createTableCell = function createTableCell(workerObj) {
        var tableCells = document.createDocumentFragment();

        for (var data in workerObj) {
            if (workerObj.hasOwnProperty(data)) {
                var dataValue = workerObj[data];
                var cell = document.createElement("td");
                cell.textContent = dataValue;

                tableCells.appendChild(cell);
            }
        }
        return tableCells;
    };

    var createTableRow = function createTableRow(workersArr) {
        var tableRows = document.createDocumentFragment();

        workersArr.map(function (worker) {
            var row = document.createElement("tr");
            var tableCells = createTableCell(worker);
            row.appendChild(tableCells);
            tableRows.appendChild(row);
        });
        return tableRows;
    };

    var pagination = function pagination(dataArr) {
        var pageButtons = document.createElement("ul");
        pageButtons.classList.add("pagination__pages");
        var backButton = createBackNextButton("\< back");
        var nextButton = createBackNextButton("next \>");
        var pagesList = createNumberButtons(dataArr);

        pageButtons.appendChild(backButton);
        pageButtons.appendChild(pagesList);
        pageButtons.appendChild(nextButton);

        tableElements.pages.appendChild(pageButtons);
    };

    var createBackNextButton = function createBackNextButton(text) {
        var listItem = document.createElement("li");
        var anchor = document.createElement("a");
        anchor.textContent = text;
        anchor.classList.add("pagination__pages--others");
        listItem.appendChild(anchor);
        return listItem;
    };

    var createNumberButtons = function createNumberButtons(dataArr) {
        var pagesList = document.createDocumentFragment();

        dataArr.forEach(function (element) {
            var listItem = document.createElement("li");
            var numberElement = document.createElement("a");
            var pageNumber = dataArr.indexOf(element) + 1;

            numberElement.textContent = "" + pageNumber;
            numberElement.dataset.page = "" + pageNumber;
            numberElement.classList.add("pagination__pages--numbers");

            listItem.appendChild(numberElement);
            pagesList.appendChild(listItem);
        });

        return pagesList;
    };

    return {
        header: tableElements.header,
        body: tableElements.body,
        pages: tableElements.pages,
        addDataToTable: addDataToTable,
        pagination: pagination
    };
}();

exports.default = TableModule;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map