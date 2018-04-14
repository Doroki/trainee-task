
const TableModule = (function() {

    const tableElements = {
        header: document.querySelector("#header"),
        body: document.querySelector("#table-content"),
    }

    let tableProperties = {
        sortMethod: "" // keep method of actual sorted table (used to remove sort style class of previous element)
    }

    const addDataToTable = function(workersData) { // Start to create content of table
        const tbodyFragment = document.createDocumentFragment();
        const tableRows = createTableRow(workersData);
        tbodyFragment.appendChild(tableRows);
        tableElements.body.innerHTML = "";
        tableElements.body.appendChild(tbodyFragment);
    };

    
    const createTableRow = function(workersArr) {
        const tableRows = document.createDocumentFragment();

        workersArr.map(worker => {
            const row = document.createElement("tr");
            const tableCells = createTableCell(worker);
            row.appendChild(tableCells);
            tableRows.appendChild(row);
        });

        while(tableRows.childElementCount < 5) { //create empty rows to fill rest of the table by 5 elements (provided if there is less)
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

    const clearTable = function() {  // Function to clear tabel content before implement data sorted other way
        tableElements.body.innerHTML = "";
    }

    const sortSign = function(element, sign) {
        if(element === null) element = tableElements.header.querySelector("[data-sort='id']");

        if(tableProperties.sortMethod !== "") { // Remove old sorting sign if any was used before
            const previousSorted = tableElements.header.querySelector("[data-is-sorted='true']");
            previousSorted.classList.remove(`sorted-${tableProperties.sortMethod}`);
            previousSorted.dataset.isSorted = false;
        }

        element.classList.add(`sorted-${sign}`);
        element.dataset.isSorted = true;
        tableProperties.sortMethod = sign;
    };   

    return {
        header: tableElements.header,
        addDataToTable,
        clearTable,
        sortSign
    };

})();

export default TableModule;