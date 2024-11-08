import { Food, Category } from "./food.js";
("use strict");

//----------------------JQuery Styling For NavBar-----------------\\

let navbarWidth = document.getElementById("navbar").offsetWidth;
let navbarItemsWidth = document.getElementById("navbarItems").offsetWidth;
let mainNav = $("#mainNav");
let openBtn = $(".open-btn");
let closeBtn = $(".close-btn");
let searchList = $("#searchList");
mainNav.css({ left: -navbarItemsWidth, overflow: "hidden" });
openBtn.on("click", () => {
  mainNav.animate({ left: 0 }, 500);
  openBtn.css("display", "none");
  closeBtn.css("display", "block");
  searchList.slideDown(1000);
});
function onCloseNavBar() {
  mainNav.animate({ left: -navbarItemsWidth }, 500);
  closeBtn.css("display", "none");
  openBtn.css("display", "block");
  searchList.slideUp(1000);
}
closeBtn.on("click", onCloseNavBar);
$("#foodContent,section#details,section#categories").css(
  "padding-left",
  navbarWidth * 1.6
);
$("#foodContent,section#details,section#categories").css(
  "padding-right",
  navbarWidth * 0.6
);

//-------------------------Food Content---------------------------------------\\
let foodContent = document.getElementById("foodContent");
let searchBar = document.getElementById("searchBar");

async function getData(url) {
  let response = await fetch(url);
  let data = await response.json();
  return data;
}

//------------------------Food Item Through ID-------------------\\

async function getFoodItemFromID(id) {
  let data = await getData(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  let mealIngredients = [];
  for (let x = 1; x < 20; x++) {
    let ingredient = data.meals[0][`strIngredient${x}`];
    let measure = data.meals[0][`strMeasure${x}`];
    if (ingredient && measure) {
      mealIngredients.push(`${measure + " " + ingredient}`);
    }
  }
  let item = new Food(
    data.meals[0].idMeal,
    data.meals[0].strMeal,
    data.meals[0].strMealThumb,
    data.meals[0].strInstructions,
    data.meals[0].strArea,
    data.meals[0].strCategory,
    mealIngredients,
    data.meals[0].strTags,
    data.meals[0].strSource,
    data.meals[0].strYoutube
  );
  return item;
}

function displayFoodItemsData(data) {
  foodContent.innerHTML = "";
  let meals = data.meals;
  $("#loader").removeClass("d-none").addClass("d-flex");
  for (let i = 0; i < meals.length; i++) {
    let item = new Food(
      meals[i].idMeal,
      meals[i].strMeal,
      meals[i].strMealThumb
    );
    let foodItem = item.displayFoodItem();
    foodContent.classList.add("page-design");
    foodContent.append(foodItem);
    foodItem.addEventListener("click", async (e) => {
      foodContent.innerHTML = "";
      foodContent.classList.remove("page-design");
      foodContent.classList.add("bg-black");
      let itemData = await getFoodItemFromID(item.id);
      $("#loader").removeClass("d-none").addClass("d-flex");
      $("#foodContent").append(itemData.displayFoodItemDetails());
      $("#loader").addClass("d-none");
    });
    $("#loader").addClass("d-none");
  }
}

async function displayFirstData() {
  let data = await getData(
    "https://www.themealdb.com/api/json/v1/1/search.php?s="
  );
  console.log(data);
  displayFoodItemsData(data);
}
displayFirstData();

//-----------------------Food Category-----------------------------\\
function createContainerRowElement() {
  let containerElement = document.createElement("div");
  containerElement.classList.add("container", "bg-black");
  let rowElement = document.createElement("div");
  rowElement.classList.add("row");
  containerElement.append(rowElement);
  return containerElement;
}

//--------------No Need For Creating Class for Category------------------\\
$("#categoriesBtn").on("click", async () => {
  foodContent.innerHTML = "";
  searchBar.innerHTML = "";
  let categoriesObj = await getData(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );
  let categoriesData = categoriesObj.categories;
  console.log(categoriesData);
  $("#loader").removeClass("d-none").addClass("d-flex");
  for (let i = 0; i < categoriesData.length; i++) {
    let category = new Category(
      categoriesData[i].strCategory,
      categoriesData[i].strCategoryThumb,
      categoriesData[i].strCategoryDescription
    );
    let categoryItem = category.displayCategoryItem();
    foodContent.classList.add("page-design");
    foodContent.appendChild(categoryItem);
    categoryItem.addEventListener("click", async (e) => {
      foodContent.innerHTML = "";
      let data = await getData(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoriesData[i].strCategory}`
      );
      displayFoodItemsData(data);
    });
  }
  $("#loader").addClass("d-none");
  onCloseNavBar();
});

$("#areaBtn").on("click", async () => {
  foodContent.innerHTML = "";
  searchBar.innerHTML = "";
  foodContent.classList.remove("page-design");
  foodContent.classList.add("bg-black");
  foodContent.classList.remove();
  let areaObjects = await getData(
    "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
  );
  let areas = areaObjects.meals;
  let containerElement = createContainerRowElement();
  $("#loader").removeClass("d-none").addClass("d-flex");
  for (let i = 0; i < areas.length; i++) {
    let areaElement = document.createElement("div");
    areaElement.classList.add(
      "col-md-3",
      "text-white",
      "text-center",
      "px-7",
      "py-3",
      "cursor-pointer"
    );
    areaElement.innerHTML = `
      <i class="fa-solid fa-house-laptop fa-4x"></i>
      <h3 class="text-2xl fw-bolder">${areas[i].strArea}</h3>`;
    containerElement.firstElementChild.append(areaElement);
    areaElement.addEventListener("click", async () => {
      foodContent.innerHTML = "";
      let data = await getData(
        `https://www.themealdb.com/api/json/v1/1/filter.php?a=${areas[i].strArea}`
      );
      displayFoodItemsData(data);
    });
  }
  $("#loader").addClass("d-none");
  foodContent.append(containerElement);
  onCloseNavBar();
});

$("#ingredientsBtn").on("click", async () => {
  foodContent.innerHTML = "";
  searchBar.innerHTML = "";
  $();
  foodContent.classList.remove("page-design");
  foodContent.classList.add("bg-black");
  let ingredientsObjects = await getData(
    "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
  );
  let ingredients = ingredientsObjects.meals;
  let containerElement = createContainerRowElement();
  $("#loader").removeClass("d-none").addClass("d-flex");
  for (let i = 0; i < 24; i++) {
    let ingredientElement = document.createElement("div");
    ingredientElement.classList.add(
      "col-md-3",
      "text-white",
      "text-center",
      "px-7",
      "py-3",
      "cursor-pointer"
    );
    ingredientElement.innerHTML = `
      <i class="fa-solid fa-drumstick-bite fa-4x"></i>
      <h3 class="text-2xl fw-bolder">${ingredients[i].strIngredient}</h3>
      <p class="text-lg">${
        ingredients[i].strDescription != null
          ? ingredients[i].strDescription.slice(1, 100)
          : ""
      }</p>`;
    containerElement.firstElementChild.append(ingredientElement);
    ingredientElement.addEventListener("click", async () => {
      foodContent.innerHTML = "";
      let data = await getData(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients[i].strIngredient}`
      );
      displayFoodItemsData(data);
    });
  }
  $("#loader").addClass("d-none");

  foodContent.append(containerElement);
  onCloseNavBar();
});

$("#searchBtn").on("click", () => {
  foodContent.innerHTML = "";
  searchBar.innerHTML = "";
  let searchInputsDiv = document.createElement("div");
  searchInputsDiv.classList.add(
    "py-10",
    "flex",
    "justify-center",
    "bg-black",
    "col-span-full"
  );
  searchInputsDiv.innerHTML = `
      <input
      id="inputName"
      type="text"
      placeholder="Search By Name"
      class="p-2 bg-black border-2 rounded-md w-1/3 mx-7 text-white"
    />
    <input
      id="inputFirstLetter"
      type="text"
      placeholder="Search By First Letter"
      class="p-2 bg-black border-2 rounded-md w-1/3 mx-7 text-white"
    />
  `;
  $("#searchBar").append(searchInputsDiv);
  $("#inputName").on("input", async (e) => {
    let data = await getData(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${e.target.value}`
    );
    console.log(data);
    displayFoodItemsData(data);
  });
  $("#inputFirstLetter").on("input", async (e) => {
    let data = await getData(
      `https://www.themealdb.com/api/json/v1/1/search.php?f=${e.target.value}`
    );
    console.log(data);
    displayFoodItemsData(data);
  });
  onCloseNavBar();
});

//-----------------------Contact Us Part------------------------\\\

$("#contactBtn").on("click", () => {
  foodContent.classList.remove("page-design");
  foodContent.classList.add("bg-black");
  foodContent.innerHTML = `
        <div class="container ">
        <div class="row py-5 g-4" id="rowData">
          <div
            class="contact min-vh-100 d-flex justify-content-center align-items-center"
          >
            <div class="container w-75 text-center">
              <div class="row g-4">
                <div class="col-md-6">
                  <input
                    id="nameInput"
                    type="text"
                    class="form-control"
                    placeholder="Enter Your Name"
                  />
                  <div
                    id="nameAlert"
                    class="alert alert-danger w-100 mt-2 d-none"
                  >
                    Special characters and numbers not allowed
                  </div>
                </div>
                <div class="col-md-6">
                  <input
                    id="emailInput"
                    type="email"
                    class="form-control"
                    placeholder="Enter Your Email"
                  />
                  <div
                    id="emailAlert"
                    class="alert alert-danger w-100 mt-2 d-none"
                  >
                    Email not valid *exemple@yyy.zzz
                  </div>
                </div>
                <div class="col-md-6">
                  <input
                    id="phoneInput"
                    type="text"
                    class="form-control"
                    placeholder="Enter Your Phone"
                  />
                  <div
                    id="phoneAlert"
                    class="alert alert-danger w-100 mt-2 d-none"
                  >
                    Enter valid Phone Number
                  </div>
                </div>
                <div class="col-md-6">
                  <input
                    id="ageInput"
                    type="number"
                    class="form-control"
                    placeholder="Enter Your Age"
                  />
                  <div
                    id="ageAlert"
                    class="alert alert-danger w-100 mt-2 d-none"
                  >
                    Enter valid age
                  </div>
                </div>
                <div class="col-md-6">
                  <input
                    id="passwordInput"
                    type="password"
                    class="form-control"
                    placeholder="Enter Your Password"
                  />
                  <div
                    id="passwordAlert"
                    class="alert alert-danger w-100 mt-2 d-none"
                  >
                    Enter valid password *Minimum eight characters, at least one
                    letter and one number:*
                  </div>
                </div>
                <div class="col-md-6">
                  <input
                    id="repasswordInput"
                    onkeyup="inputsValidation()"
                    type="password"
                    class="form-control"
                    placeholder="Repassword"
                  />
                  <div
                    id="repasswordAlert"
                    class="alert alert-danger w-100 mt-2 d-none"
                  >
                    Enter valid repassword
                  </div>
                </div>
              </div>
              <button
                id="submitBtn"
                disabled="true"
                class="btn btn-outline-danger px-2 mt-3"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
  `;
  onCloseNavBar();
  function CheckInputWithRegex(regex, idAlert, target) {
    regex.test(target.value) == true
      ? $(`${idAlert}`).addClass("d-none").removeClass("d-block")
      : $(`${idAlert}`).removeClass("d-none").addClass("d-block");
  }
  $("#nameInput").on("input", (e) => {
    CheckInputWithRegex(/^[a-zA-Z]*$/, "#nameAlert", e.target);
  });
  $("#emailInput").on("input", (e) => {
    CheckInputWithRegex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "#emailAlert",
      e.target
    );
  });
  $("#phoneInput").on("input", (e) => {
    CheckInputWithRegex(/^[0-9]{11}$/, "#phoneAlert", e.target);
  });
});
