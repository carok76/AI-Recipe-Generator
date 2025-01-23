function generateRecipe(event) {
    event.preventDefault();

    let promptInput = document.querySelector("#prompt-input");

    recipeContainer.classList.remove("hidden");
    recipeContainer.innerHTML = `<p>Generating your recipe about ${promptInput.value}...</p>`;

    let apiKey = "o922906b22974ec99e9bc3858a42ft20";
    let context = "You are a creative cook with a love for good food. The recipe must be provided in basic HTML format. Example: <p>this is a recipe</p>. Don't add a <br /> after the last line. Make sure to follow the user instructions."
    let prompt = `User instructions are: Generate a recipe about ${promptInput.value}.`;
    let apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${prompt}&context=${context}&key=${apiKey}`;

    console.log("Generating Recipe");
    console.log(`${context}`);
    console.log(`${prompt}`);

    axios.get(apiUrl).then(displayRecipe).catch((error) => {
        console.error("Error generating recipe:", error);
        recipeContainer.innerHTML = "<p>Sorry, something went wrong. Please try again.</p>";
    });;
}

function displayRecipe(response) {
    if (response.data && response.data.answer) {
        let cleanedAnswer = response.data.answer.trim();
        cleanedAnswer = cleanedAnswer.replace(/(<br\s*\/?>\s*)+$/, "");

        let typewriter = new Typewriter(recipeContainer, {
            loop: false,
            delay: 20,
            autoStart: true,
        });

        typewriter.typeString(cleanedAnswer).start();
    } else {
        console.error("No valid recipe in response:", response);
        poemContainer.innerHTML = "<p>Sorry, no recipe was generated. Please try again.</p>";
    }
}

let recipeContainer = document.querySelector("#recipe");

let recipeFormElement = document.querySelector("#recipe-generator-form");
recipeFormElement.addEventListener("submit", generateRecipe);

