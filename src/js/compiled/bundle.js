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

var _pagination = __webpack_require__(2);

var _pagination2 = _interopRequireDefault(_pagination);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MainModule = function () {

    var Data = {
        workers: [],
        dataPages: [],
        dataSortMethod: "",
        dataSortBy: ""
    };

    var getJSONData = function getJSONData() {
        // get Data.workers data from JSON
        fetch('./dane.json').then(function (response) {
            return response.json();
        }).then(function (data) {
            return saveData(data);
        });
    };

    var saveData = function saveData(data) {
        // save data to Array and sort in by default (id)
        Data.workers = data;
        sortData();
        _table2.default.sortSign(null, Data.dataSortMethod); // Set default sorting at the begining, by ID and ascending
    };

    var sortData = function sortData() {
        var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "id";
        var sortMethod = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "asc";

        resetPreviousData();
        Data.dataSortMethod = sortMethod;
        Data.dataSortBy = key;

        Data.workers.sort(function (a, b) {
            if (a[key] < b[key]) {
                return sortMethod === "asc" ? -1 : 1;
            } else if (a[key] > b[key]) {
                return sortMethod === "asc" ? 1 : -1;
            } else {
                return 0;
            }
        });
        splitDataToPages(Data.workers);
        _table2.default.addDataToTable(Data.dataPages[0]);
    };

    var splitDataToPages = function splitDataToPages(workersArr) {
        // Split saved data to pages for condition - there is more data objects than 5
        if (Data.workers.length < 6) return;

        var mappingIterator = -1; // iterator created to help designate index of new page (Array)
        workersArr.map(function (worker) {
            if (workersArr.indexOf(worker) % 5 === 0) {
                // With every 5th element create new Page/Array and push it to main Array with index of iterator
                mappingIterator++;
                var newPage = [];
                Data.dataPages.push(newPage);
                Data.dataPages[mappingIterator].push(worker);
            } else {
                Data.dataPages[mappingIterator].push(worker);
            }
        });

        _pagination2.default.createPagination(Data.dataPages);
    };

    var resetPreviousData = function resetPreviousData() {
        // Clear function to clear Pages and table with previous sorted data
        _table2.default.clearTable();
        _pagination2.default.clearPagination();
        Data.dataPages = [];
    };

    var setSortMethod = function setSortMethod(sortBy) {
        // set sort Method to des (descending) if you click second time, the same category. In order case will always be asc (ascenging)
        var newSortMethod = void 0;

        if (Data.dataSortMethod === "asc" && sortBy === Data.dataSortBy) {
            newSortMethod = "dsc";
        } else {
            newSortMethod = "asc";
        }

        return newSortMethod;
    };

    var events = function events() {
        _pagination2.default.container.addEventListener("click", function (e) {
            if (!e.target.dataset.page) return;
            var pageNumber = e.target.dataset.page;
            pageNumber = parseInt(pageNumber) - 1;
            // TableModule.updateProperties({actualPage: pageNumber})
            _table2.default.addDataToTable(Data.dataPages[pageNumber]);
        });

        _table2.default.header.addEventListener("click", function (e) {
            if (!e.target.dataset.sort) return;
            var sortBy = e.target.dataset.sort;
            var sortMethod = setSortMethod(sortBy);

            sortData(sortBy, sortMethod);
            _table2.default.addDataToTable(Data.dataPages[0]);
            _table2.default.sortSign(e.target, Data.dataSortMethod);
        });
    };

    return {
        init: function init() {
            getJSONData();
            events();
        }
    };
}();

MainModule.init();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var TableModule = function () {

    var tableElements = {
        header: document.querySelector("#header"),
        body: document.querySelector("#table-content")
    };

    var tableProperties = {
        sortMethod: "" // keep method of actual sorted table (used to remove sort style class of previous element)
    };

    var addDataToTable = function addDataToTable(workersData) {
        // Start to create content of table
        var tbodyFragment = document.createDocumentFragment();
        var tableRows = createTableRow(workersData);
        tbodyFragment.appendChild(tableRows);
        tableElements.body.innerHTML = "";
        tableElements.body.appendChild(tbodyFragment);
    };

    var createTableRow = function createTableRow(workersArr) {
        var tableRows = document.createDocumentFragment();

        workersArr.map(function (worker) {
            var row = document.createElement("tr");
            var tableCells = createTableCell(worker);
            row.appendChild(tableCells);
            tableRows.appendChild(row);
        });

        while (tableRows.childElementCount < 5) {
            //create empty rows to fill rest of the table by 5 elements (provided if there is less)
            var emptyRow = createEmptyRow();
            tableRows.appendChild(emptyRow);
        }

        return tableRows;
    };

    var createEmptyRow = function createEmptyRow() {
        var row = document.createElement("tr");
        var tableCells = createTableCell({
            id: "",
            firstName: "",
            lastName: "",
            dateOfBirth: "",
            company: "",
            note: ""
        });
        row.appendChild(tableCells);
        return row;
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

    var clearTable = function clearTable() {
        // Function to clear tabel content before implement data sorted other way
        tableElements.body.innerHTML = "";
    };

    var sortSign = function sortSign(element, sign) {
        if (element === null) element = tableElements.header.querySelector("[data-sort='id']");

        if (tableProperties.sortMethod !== "") {
            // Remove old sorting sign if any was used before
            var previousSorted = tableElements.header.querySelector("[data-is-sorted='true']");
            previousSorted.classList.remove("sorted-" + tableProperties.sortMethod);
            previousSorted.dataset.isSorted = false;
        }

        element.classList.add("sorted-" + sign);
        element.dataset.isSorted = true;
        tableProperties.sortMethod = sign;
    };

    return {
        header: tableElements.header,
        addDataToTable: addDataToTable,
        clearTable: clearTable,
        sortSign: sortSign
    };
}();

exports.default = TableModule;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var PaginationModule = function () {

    var properties = {
        container: document.querySelector("#pages")

    };

    var createPagination = function createPagination(dataArr) {
        var pageButtons = document.createElement("ul");
        pageButtons.classList.add("pagination__pages");
        var backButton = createBackNextButton("\< back");
        var nextButton = createBackNextButton("next \>");
        var pagesList = createNumberButtons(dataArr);

        pageButtons.appendChild(backButton);
        pageButtons.appendChild(pagesList);
        pageButtons.appendChild(nextButton);

        properties.container.appendChild(pageButtons);
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

    var clearPagination = function clearPagination() {
        // Function to clear pagination pages before implement data sorted other way
        properties.container.innerHTML = "";
    };

    return {
        container: properties.container,
        clearPagination: clearPagination,
        createPagination: createPagination
    };
}();

exports.default = PaginationModule;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map