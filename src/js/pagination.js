const PaginationModule = (function(){

    let elements = {
        container: document.querySelector("#pages"),
        backButton: "",
        nextButton: "",
    };

    let properties = {
        totalPages: 0,
        actualPage: 0,
    };

    const updatePage = function(newProperties) {
        properties = {
            ...properties,
            ...newProperties
        }

        styleActualPage();
    };

    const checkActualPage = function() {
        return properties.actualPage;
    }

    const createPagination = function(dataArr) {
        const pageButtons = document.createElement("ul");
        pageButtons.classList.add("pagination__pages");
        const pagesList = createNumberButtons(dataArr);
        elements.backButton = elements.backButton || createBackNextButton("\< back"); 
        elements.nextButton = elements.nextButton || createBackNextButton("next \>");
        // Added content again becouse IE11 loose content after re-createPagination
        elements.backButton.textContent = "\< back";
        elements.nextButton.textContent = "next \>";

        pageButtons.appendChild(elements.backButton);
        pageButtons.appendChild(pagesList);
        pageButtons.appendChild(elements.nextButton);
        elements.container.appendChild(pageButtons);
    };

    const createBackNextButton = function(text) {
        const listItem = document.createElement("li");
        const anchor = document.createElement("a");
        anchor.textContent = text;
        listItem.classList.add("pagination__pages--others");
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
        elements.container.innerHTML = ""; 
    }

    const styleActualPage = function() { // set style to actualy used page number
        if(elements.container.querySelector(`[data-actual='true']`)) resetStyleOfPrevious();

        let actualPageButton = elements.container.querySelector(`[data-page='${properties.actualPage + 1}']`);
        actualPageButton.classList.add("selected");
        actualPageButton.dataset.actual = "true";
        styleBackNextButtons();
    }

    const resetStyleOfPrevious = function() { // reset style previous selected site number after select another
        let previousUsedPage = elements.container.querySelector(`[data-actual='true']`);
        previousUsedPage.classList.remove("selected");
        previousUsedPage.dataset.actual = "false"
    }

    const styleBackNextButtons = function() { //Enable buutons back and next
        if(properties.actualPage <= 0) {
            elements.backButton.classList.remove("enabled");
            elements.backButton.dataset.enabled = "false";
        } else {
            elements.backButton.classList.add("enabled");
            elements.backButton.dataset.enabled = "true";
        }
        
        if (properties.totalPages <= properties.actualPage) {
            elements.nextButton.classList.remove("enabled");
            elements.nextButton.dataset.enabled = "false";
        } else {
            elements.nextButton.classList.add("enabled");
            elements.nextButton.dataset.enabled = "true";
        }
    }

    return {
        elements,
        checkActualPage,
        updatePage,
        clearPagination,
        createPagination,
        styleActualPage
    }

})();

export default PaginationModule