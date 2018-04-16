import 'promise-polyfill/src/polyfill';

import TableModule from "./table";
import PaginationModule from "./pagination";

const MainModule = (function () {

    let Data = {
        workers: [],
        dataPages: [],
        dataSortMethod: "",
        dataSortBy: ""
    }

    const getJSONData = function () { // get Data.workers data from JSON
        fetch('./dane.json')
            .then(response => response.json())
            .then(data => saveData(data));
    };

    const saveData = function(data) { // save data to Array and sort in by default (id)
        Data.workers = data;
        sortData();
        TableModule.sortSign(null, Data.dataSortMethod); // Set default sorting at the begining, by ID and ascending
        events();
    }

    const sortData = function( key="id", sortMethod="asc") {
        resetPreviousData();
        Data.dataSortMethod = sortMethod;
        Data.dataSortBy = key;

        Data.workers.sort((a, b) => {
            if(a[key] < b[key]) {
                return (sortMethod==="asc") ? -1 : 1;
            } else if(a[key] > b[key]) {
                return (sortMethod==="asc") ? 1 : -1;
            } else {
                return 0;
            }
        });
        splitDataToPages(Data.workers);
        TableModule.addDataToTable(Data.dataPages[0]);
        PaginationModule.updatePage({totalPages: Data.dataPages.length - 1});
    };

    const splitDataToPages = function(workersArr) { // Split saved data to pages for condition - there is more data objects than 5
        if(Data.workers.length < 6) return;

        let mappingIterator = -1; // iterator created to help designate index of new page (Array)
        workersArr.map(worker => {
            if((workersArr.indexOf(worker) % 5) === 0) { // With every 5th element create new Page/Array and push it to main Array with index of iterator
                mappingIterator++; 
                const newPage = [];
                Data.dataPages.push(newPage);
                Data.dataPages[mappingIterator].push(worker);
            } else {
                Data.dataPages[mappingIterator].push(worker);
            }
        });
        
        PaginationModule.createPagination(Data.dataPages);
    };

    const resetPreviousData = function() { // Clear function to clear Pages and table with previous sorted data
        TableModule.clearTable();
        PaginationModule.clearPagination();
        Data.dataPages = [];
    };

    const setSortMethod = function(sortBy) { // set sort Method to des (descending) if you click second time, the same category. In order case will always be asc (ascenging)
        let newSortMethod;

        if(Data.dataSortMethod === "asc" && sortBy === Data.dataSortBy) {
            newSortMethod = "dsc";
        } else {
            newSortMethod = "asc";
        }

        return newSortMethod;
    }

    const events = function() {
        PaginationModule.elements.container.addEventListener("click", e => {
            if(!e.target.dataset.page) return;
            let pageNumber = e.target.dataset.page;
            pageNumber = parseInt(pageNumber) - 1;
            PaginationModule.updatePage({actualPage: pageNumber});
            TableModule.addDataToTable(Data.dataPages[pageNumber]);
        });

        PaginationModule.elements.backButton.addEventListener("click", function(e) {
            if(this.dataset.enabled === "false") return;
            const previousPage = PaginationModule.checkActualPage() - 1;
            TableModule.addDataToTable(Data.dataPages[previousPage]);
            PaginationModule.updatePage({actualPage: previousPage});
        });

        PaginationModule.elements.nextButton.addEventListener("click", function(e){
            if(this.dataset.enabled === "false") return;
            const nextPage = PaginationModule.checkActualPage() + 1;
            TableModule.addDataToTable(Data.dataPages[nextPage]);
            PaginationModule.updatePage({actualPage: nextPage});
        });
    
        TableModule.header.addEventListener("click", e => {
            if(!e.target.dataset.sort) return;
            let sortBy = e.target.dataset.sort;
            let sortMethod = setSortMethod(sortBy);
    
            sortData(sortBy, sortMethod);
            TableModule.addDataToTable(Data.dataPages[0]);
            PaginationModule.updatePage({actualPage: 0});
            TableModule.sortSign(e.target, Data.dataSortMethod);
        });
    }

    return {
        init: function() {
            getJSONData();
        }
    };
})();

MainModule.init();

