const textarea = document.getElementById("textarea1");



// Function to create a card element on load
function createCard(newToDo) {
    const newCardContainer = document.createElement("div");
    newCardContainer.className = "col s3";
  
    newCardContainer.innerHTML = `
      <div class="card horizontal">
          <div class="card-stacked">
              <div class="card-content">
                  <p>${newToDo}</p>
              </div>
              <div class="card-action">
                  <a href="#" onclick="removeCard(this)">Remove Item</a>
              </div>
          </div>
      </div>
    `;
  
    return newCardContainer;
}

// Function to add the retrieved cards to the parent container
function displayCards() {
    const parentElement = document.getElementById("todos");
  
    // Retrieve items from localStorage or create an empty array if none exists
    const existingItems = JSON.parse(localStorage.getItem("todos")) || [];
  
    // Iterate over the items and create corresponding card elements
    existingItems.forEach((item) => {
      const newCard = createCard(item);
      parentElement.appendChild(newCard);
    });
}

// EVENT LISTENER ON LOAD PAGE
window.addEventListener("load", displayCards);


// EVENT LISTENER PRESS ENTER
textarea.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addToDo();
  }
});


// ADD TODO
function addToDo() {
  const newToDo = document.getElementById("textarea1").value;
  const parentElement = document.getElementById("todos");

  const newCardContainer = document.createElement("div");
  newCardContainer.className = "col s3";

  newCardContainer.innerHTML = `
    <div class="card horizontal pink lighten-5" ondblclick="done(this)"">
        <div class="card-stacked">
            <div class="card-content">
                <p>${newToDo}</p>
            </div>
            <div class="card-action">
                <a href="#" class="black-text" onclick="removeCard(this)">Remove Item</a>
            </div>
        </div>
    </div>
  `;

  parentElement.appendChild(newCardContainer);

  // Retrieve existing items from localStorage or create an empty array if none exists
  const existingItems = JSON.parse(localStorage.getItem("todos")) || [];

  // Add the new item to the array
  existingItems.push(newToDo);

  // Store the updated array back in localStorage
  localStorage.setItem("todos", JSON.stringify(existingItems));

}


// REMOVE TODO
function removeCard(card) {
    const cardContainer = card.closest(".col.s3");
    cardContainer.remove();
  
    // Retrieve items from localStorage
    const existingItems = JSON.parse(localStorage.getItem("todos")) || [];
  
    // Identify the data associated with the removed card
    const removedData = cardContainer.querySelector("p").textContent;
  
    // Remove the corresponding data from the array
    const updatedItems = existingItems.filter((item) => item !== removedData);
  
    // Store the updated array back in localStorage
    localStorage.setItem("todos", JSON.stringify(updatedItems));
}


// TODO DONE
function done(element){
   element.classList.add("light-green", "darken-1");
}