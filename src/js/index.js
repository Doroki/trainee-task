import TableModule from "./table";


const MainModule = (function () {

    let workers = [];
    const dataPages = [];

    const getJSONData = function () { // Fetch data from JSON file and same to "offers"
        fetch('./dane.json')
            .then(response => response.json())
            .then(data => saveData(data));
    };

    const saveData = function(data) {
        workers = data;
        sortData("lastName");
        splitDataToPages(workers);
        TableModule.addDataToTable(dataPages[0]);
    }

    const sortData = function( key="id", sortMethod="asc") {
        workers.sort((a, b) => {
            if(a[key] > b[key]) {
                return (sortMethod="asc") ? 1 : -1;
            };
        });
    }

    const splitDataToPages = function(workersArr) {
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

    TableModule.pages.addEventListener("click", (e) => {
        if(!e.target.dataset.page) return;
        let pageNumber = e.target.dataset.page;
        pageNumber = parseInt(pageNumber) - 1;
        console.log(e.target.dataset.pages)
        TableModule.addDataToTable(dataPages[pageNumber]);
    });

    // return {

    // };


    getJSONData();

})();

