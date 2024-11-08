export class Food {
  constructor(
    id,
    name,
    image,
    instruction,
    area,
    category,
    recipes,
    tags,
    src,
    videoLink
  ) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.instruction = instruction;
    this.area = area;
    this.category = category;
    this.recipes = recipes;
    this.tags = tags;
    this.src = src;
    this.videoLink = videoLink;
  }
  displayFoodItem() {
    let element = document.createElement("div");
    element.classList.add("food-item", "relative", "group");
    element.innerHTML = `
         <img class="w-full rounded-lg" src="${this.image}" alt="" />
        <div
          class="food-item-info group-hover:top-0 transition-all ease-in duration-300 overflow-hidden absolute top-[100%] bottom-0 left-0 right-0 bg-[#f9f6f6ca] rounded-lg flex justify-start items-center"
        >
          <h3 class="text-3xl text-black font-bold">${this.name}</h3>
        </div>`;
    return element;
  }
  displayFoodCategoryItem() {
    let element = document.createElement("div");
    element.classList.add("food-item", "relative", "group");
    element.innerHTML = `
         <img class="w-full rounded-lg" src="${this.image}" alt="" />
        <div
          class="food-item-info group-hover:top-0 transition-all ease-in duration-300 overflow-hidden absolute top-[100%] bottom-0 left-0 right-0 bg-[#f9f6f6ca] rounded-lg flex justify-start items-center"
        >
          <h3 class="text-3xl text-black font-bold">${this.name}</h3>
        </div>`;
    return element;
  }
  displayFoodItemDetails() {
    let ingredientsArr = [];
    for (let i = 0; i < this.recipes.length; i++) {
      let recipeItem = `<li class="alert alert-info m-2 p-1">${this.recipes[i]}</li>`;
      ingredientsArr.push(recipeItem);
    }
    let tagsItems = [];
    let tagsArr = [];
    if (this.tags != null) {
      tagsArr = this.tags.split(",");
    }

    for (let i = 0; i < tagsArr.length; i++) {
      let tagItem = `<li class="alert alert-danger m-2 p-1">${tagsArr[i]}</li>`;
      tagsItems.push(tagItem);
    }
    console.log(tagsItems);
    let element = document.createElement("div");
    element.classList.add("container");
    element.innerHTML = `      <div class="details row bg-black text-white py-10">
        <div class="col-md-4 image-info">
          <img src="${this.image}" alt="" class="w-full rounded-xl py-2" />
          <h1 class="fs-2 font-bold">${this.name}</h1>
        </div>
        <div class="col-md-8 details-info">
          <h2 class="fs-2 fw-bold py-2">instructions</h2>
          <p>
          ${this.instruction}
          </p>
          <h3 class="fs-2 fw-bold py-2">Area: ${this.area}</h3>
          <h3 class="fs-2 fw-bold py-2">Category: ${this.category}</h3>
          <h3 class="fs-2 fw-bold py-2">Recipes:</h3>
          <div class="recipes">
          </div>
          <ul class="d-flex g-3 flex-wrap px-0">
            ${ingredientsArr.join("")}
          </ul>
          <h3 class="fs-2 fw-bold py-2">${
            tagsItems.length != 0 ? "Tags:" : "No Tags"
          }</h3>
          <ul class="list-unstyled d-flex g-3 flex-wrap">
            ${tagsItems.join("")}
          </ul>
          <ul class="tags d-flex g-3 flex-wrap">
            <li
              class="bg-green-700 m-1 p-2 rounded-md cursor-pointer hover:bg-green-800"
            >
              <a target='blank' href=${this.src}>Source</a>
            </li>
            <li
              class="bg-red-700 m-1 p-2 rounded-md hover:bg-red-800 cursor-pointer"
            >
              <a target='blank' href="${this.videoLink}">Youtube</a>
            </li>
          </ul>
        </div>
      </div>`;
    return element;
  }
}
export class Category {
  constructor(name, image, desc) {
    this.name = name;
    this.image = image;
    this.desc = desc;
  }
  displayCategoryItem() {
    let element = document.createElement("div");
    element.classList.add("category-item", "relative", "group");
    element.innerHTML = `
         <img class="w-full rounded-lg" src="${this.image}" alt="" />
        <div
          class="category-item-info text-center group-hover:top-0 transition-all ease-in duration-300 overflow-hidden absolute top-[100%] bottom-0 left-0 right-0 bg-[#f9f6f6ca] rounded-lg flex flex-col justify-start items-center"
        >
          <h3 class="text-2xl text-black font-bold">${this.name}</h3>
          <p class="text-lg text-black ">${this.desc.slice(0, 120)}</p>
        </div>`;
    return element;
  }
}
