const PaginationModule = (function(){

    const properties = {
        container: document.querySelector("#pages"),

    }

    const createPagination = function(dataArr) {
        const pageButtons = document.createElement("ul")
        pageButtons.classList.add("pagination__pages");
        const backButton = createBackNextButton("\< back")
        const nextButton = createBackNextButton("next \>");
        const pagesList = createNumberButtons(dataArr)
        
        pageButtons.appendChild(backButton);
        pageButtons.appendChild(pagesList);
        pageButtons.appendChild(nextButton);

        properties.container.appendChild(pageButtons);
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

    const clearPagination = function() {  // Function to clear pagination pages before implement data sorted other way
        properties.container.innerHTML = ""; 
    }

    return {
        container: properties.container,
        clearPagination,
        createPagination,
    }

})();

export default PaginationModule