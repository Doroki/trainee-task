
const TableModule = (function() {

    const tableElements = {
        header: document.querySelector("#header"),
        body: document.querySelector("#table-content"),
        pages: document.querySelector("#pages")
    }

    let tableProperties = {
        totalPages: 0,
        actualPage: 0,
        sortedBy: "",
        sortMethod: ""
    }

    const updateProperties = function(newProperies) {
        tableProperties = {
            ...tableProperties,
            ...newProperies
        };
    };

    const addDataToTable = function(workersData) {
        tableElements.body.innerHTML = "";
        const tbodyFragment = document.createDocumentFragment();
        const tableRows = createTableRow(workersData);
        tbodyFragment.appendChild(tableRows);
        tableElements.body.innerHTML = "";
        tableElements.body.appendChild(tbodyFragment);
    };
    
    const createTableCell = function(workerObj) {
        const tableCells = document.createDocumentFragment();

        for (const data in workerObj) {
            if (workerObj.hasOwnProperty(data)) {
                const dataValue = workerObj[data];
                const cell = document.createElement("td")
                cell.textContent = dataValue;

                tableCells.appendChild(cell);
            }
        }
        return tableCells;
    };

    const createTableRow = function(workersArr) {
        const tableRows = document.createDocumentFragment();

        workersArr.map(worker => {
            const row = document.createElement("tr");
            const tableCells = createTableCell(worker);
            row.appendChild(tableCells);
            tableRows.appendChild(row);
        });

        while(tableRows.childElementCount < 5) { //create empty rows to fill table by 5 elements
            const emptyRow = createEmptyRow();
            tableRows.appendChild(emptyRow);
        }

        return tableRows;
    };

    const createEmptyRow = function() {
        const row = document.createElement("tr");
        const tableCells = createTableCell({
            id: "",
            firstName: "",
            lastName: "",
            dateOfBirth: "",
            company: "",
            note: ""
        });
        row.appendChild(tableCells);
        return row;
    }

    const clearTable = function() {
        tableElements.body.innerHTML = "";
        tableElements.pages.innerHTML = "";
    }

    const pagination = function(dataArr) {
        const pageButtons = document.createElement("ul")
        pageButtons.classList.add("pagination__pages");
        const backButton = createBackNextButton("\< back")
        const nextButton = createBackNextButton("next \>");
        const pagesList = createNumberButtons(dataArr)
        
        pageButtons.appendChild(backButton);
        pageButtons.appendChild(pagesList);
        pageButtons.appendChild(nextButton);

        tableElements.pages.appendChild(pageButtons);
    };

    const createBackNextButton = function(text) {
        const listItem = document.createElement("li");
        const anchor = document.createElement("a");
        anchor.textContent = text;
        anchor.classList.add("pagination__pages--others");
        listItem.appendChild(anchor);
        return listItem;
    }

    const createNumberButtons = function(dataArr) {
        const pagesList = document.createDocumentFragment();

        dataArr.forEach(element => {
            const listItem = document.createElement("li");
            const numberElement = document.createElement("a");
            const pageNumber = dataArr.indexOf(element) + 1;

            numberElement.textContent = `${pageNumber}`; 
            numberElement.dataset.page = `${pageNumber}`;
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
        addDataToTable,
        pagination,
        clearTable
    };

})();

export default TableModule;