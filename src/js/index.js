import TableModule from "./table";


const MainModule = (function () {

    let workers = [];
    let dataPages = [];
    let dataSortMethod;

    const getJSONData = function () { // Fetch data from JSON file and same to "offers"
        fetch('./dane.json')
            .then(response => response.json())
            .then(data => saveData(data));
    };

    const saveData = function(data) {
        workers = data;
        sortData("id");
    }

    const resetPreviousData = function() {
        TableModule.clearTable();
        dataPages = [];
    };

    const sortData = function( key="id", sortMethod="asc") {
        resetPreviousData();
        dataSortMethod = sortMethod;

        workers.sort((a, b) => {
            if(a[key] < b[key]) {
                return (sortMethod==="asc") ? 1 : -1;
            } else if(a[key] > b[key]) {
                return (sortMethod==="asc") ? -1 : 1;
            }
        });
        splitDataToPages(workers);
        TableModule.addDataToTable(dataPages[0]);
    };

    const splitDataToPages = function(workersArr) {
        if(workers.length < 6) return;
        let mappingIterator = -1;

        workersArr.map(worker => {
            if((workersArr.indexOf(worker) % 5) === 0) {
                mappingIterator++;
                const newPage = [];
                dataPages.push(newPage);
                dataPages[mappingIterator].push(worker);
            } else {
                dataPages[mappingIterator].push(worker);
            }
        });

        TableModule.pagination(dataPages);
    }

    TableModule.pages.addEventListener("click", e => {
        if(!e.target.dataset.page) return;
        let pageNumber = e.target.dataset.page;
        pageNumber = parseInt(pageNumber) - 1;
        TableModule.addDataToTable(dataPages[pageNumber]);
    });

    TableModule.header.addEventListener("click", e => {
        if(!e.target.dataset.sort) return;
        let sortBy = e.target.dataset.sort;
        let sortMethod = (dataSortMethod === "asc") ? "dsc" : "asc";
        sortData(sortBy, sortMethod);
        TableModule.addDataToTable(dataPages[0]);
    });

    // return {

    // };


    getJSONData();

})();

