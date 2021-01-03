const app = (() => {
    const _outputContainer = document.querySelector(".container__output");
    const _loadingContainer = document.querySelector(".container__loading");
    const _generateMealButton = document.querySelector(".container__generate__button");
    const _outputThumb = document.querySelector(".container__output__left__thumb");
    const _outputMealCategory = document.querySelector(".container__output__left__general__cate__content");
    const _outputMealArea = document.querySelector(".container__output__left__general__area__content");
    const _outputMealTags = document.querySelector(".container__output__left__general__tags__content");
    const _outputIngredientsContainer = document.querySelector(".container__output__left__ingredients");
    const _outputDescriptionContainer = document.querySelector(".container__output__right__desc");
    const _outputVideoContainer = document.querySelector(".container__output__video");

    _generateMealButton.addEventListener("click", async (event) => {
        showLoadingContainer();
        hideOutputContainer();

        let meal = await fetchRandomMeal();

        
        if ( meal.meals) {
            hideLoadingContainer();
            showOutputContainer();
            renderOutputContainerElements(meal.meals[0]);
        } else {
            
        }
    })

    async function fetchRandomMeal() {
        let response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php")
        let data = await response.json();
        return data
    }

    function renderOutputContainerElements(meal) {
        renderOutputThumb(meal.strMealThumb);
        renderOutputGeneralContent(meal);
        renderOutputIngredients(meal);
        renderOutputDescription(meal);
        renderOutputVideo(meal);
    }

    function renderOutputThumb(backgroundImageUrl) {
        _outputThumb.style.backgroundImage = `url(${backgroundImageUrl})`;
    }

    function renderOutputGeneralContent(meal) {
        if (meal.strCategory) {
            _outputMealCategory.parentElement.classList.remove("hidden");
            _outputMealCategory.textContent = meal.strCategory;
        } else {
            if (!_outputMealCategory.parentElement.classList.contains("hidden"))
                _outputMealCategory.parentElement.classList.add("hidden");
        }

        if (meal.strArea) {
            _outputMealArea.parentElement.classList.remove("hidden");
            _outputMealArea.textContent = meal.strArea;
        } else {
            if (!_outputMealArea.parentElement.classList.contains("hidden"))
                _outputMealArea.parentElement.classList.add("hidden");
        }

        if (meal.strTags) {
            _outputMealTags.parentElement.classList.remove("hidden");
            _outputMealTags.textContent = meal.strTags;
        } else {
            if (!_outputMealTags.parentElement.classList.contains("hidden"))
                _outputMealTags.parentElement.classList.add("hidden");
        }
    }

    function renderOutputIngredients(meal) {

        clearOutputIngredients();

        let ingredientTitle = document.createElement("h2");

        ingredientTitle.classList.add("container__output__left__ingredients__title");

        ingredientTitle.textContent = "Ingredients";

        _outputIngredientsContainer.appendChild(ingredientTitle);

        for ( let i = 1; i < 20; i++ ) {
            if (meal["strIngredient" + i]) {
                let ingredientContainer = document.createElement("p");
                let ingredientDisplay = document.createElement("span");
                let measurementDisplay = document.createElement("span");

                ingredientContainer.classList.add("container__output__left__ingredients__container")
                ingredientDisplay.classList.add("container__output__left__ingredients__container__label");
                measurementDisplay.classList.add("container__output__left__ingredients__container__content");

                ingredientDisplay.textContent = capitalizeString(meal["strIngredient" + i]);
                measurementDisplay.textContent = ` - ${capitalizeString(meal["strMeasure" + i])}`;

                ingredientContainer.append(ingredientDisplay, measurementDisplay);
                _outputIngredientsContainer.append(ingredientContainer);
            } else {
                break;
            }
        }
    }

    function clearOutputIngredients() {
        _outputIngredientsContainer.textContent = "";
    }

    function renderOutputDescription(meal) {

        clearOutputDescription();

        let mealTitle = document.createElement("h2");
        let mealDescription = document.createElement("p");

        mealTitle.classList.add("container__output__right__desc__title");
        mealDescription.classList.add("container__output__right__desc__content");

        mealTitle.textContent = meal.strMeal;
        mealDescription.textContent = meal.strInstructions;

        _outputDescriptionContainer.append(mealTitle, mealDescription);
    }

    function clearOutputDescription() {
        _outputDescriptionContainer.textContent = "";
    }

    function renderOutputVideo(meal) {

        clearOutputVideo();

        let title = document.createElement("h2");
        let iframe = document.createElement("iframe");

        iframe.classList.add("container__output__video__iframe");
        title.classList.add("container__output__video__title");
        
        iframe.src = formatYoutubeLinkToEmbed(meal.strYoutube);
        iframe.width = "900";
        iframe.height = "400";

        title.textContent = "Recipe Video";

        _outputVideoContainer.append(title, iframe);

    }

    function clearOutputVideo() {
        _outputVideoContainer.textContent = "";
    }

    function formatYoutubeLinkToEmbed(youtubeLink) {
        if (youtubeLink)
            return youtubeLink.replace("watch?v=", "embed/");
        return "";
    }


    function capitalizeString(text) {
        return text[0].toUpperCase() + text.slice(1);
    }

    
    function showOutputContainer() {
        _outputContainer.classList.remove("hidden");
    }

    function hideOutputContainer() {
        _outputContainer.classList.add("hidden");
    }

    function showLoadingContainer() {
        _loadingContainer.classList.remove("hidden");
    }

    function hideLoadingContainer() {
        _loadingContainer.classList.add("hidden");
    }
})();