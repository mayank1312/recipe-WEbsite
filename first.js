const inputBox=document.querySelector(".input-box");
const btn=document.querySelector(".btn");
const recipeCont=document.querySelector(".recipe-container");
const recipeContent=document.querySelector(".recipe-Content");
const recipeClose=document.querySelector(".close")
const fetchRecipes= async (Input)=>{
    recipeCont.innerHTML="<h2>Fetching Recipes....</h2>";
    const data=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${Input}`);
    const response =await data.json();
    recipeCont.innerHTML="";
    response.meals.forEach(meal => {
        const recipeDiv=document.createElement("div");
        recipeDiv.classList.add("recipe");
        recipeDiv.innerHTML=`<img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p><span>${meal.strArea}</span> Dish</p>
        <p>Belongs to <span>${meal.strCategory}</span> category</p>
        `;
        const button=document.createElement("button");
        button.innerText="View Recipe";
        recipeDiv.appendChild(button);

        button.addEventListener("click",()=>{
            openRecipePopUp(meal);
        })
        recipeCont.appendChild(recipeDiv);
    });
}
const openRecipePopUp=(meal)=>{
      recipeContent.innerHTML=`
      <h2 class="recipeName">${meal.strMeal}</h2>
      <h3>INGREDIENTS:</h3>
      <ul class="ingredientsList">${fetchIngredients(meal)}</ul>
      <div class="instructions">
      <h3>INSTRUCTIONS</h3>
      <p >${meal.strInstructions}</p>
      </div>
      `

      recipeContent.parentElement.style.display="block";
}
const fetchIngredients=(meal)=>{
    let ingredientsList = "";
    for(let i=1;i<=20;i++){
        const ingredient=meal[`strIngredient${i}`];
        if(ingredient){
            const measurement=meal[`strMeasure${i}`];
            ingredientsList+=`<li>${measurement} ${ingredient}</li>`
        }else{
            break;
        }
    }
  return ingredientsList;
}
const closePopUp=()=>{
    recipeContent.parentElement.style.display="none";
}

recipeClose.addEventListener("click",()=>{
    closePopUp();
})
btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    const searchInput=inputBox.value.trim();
    fetchRecipes(searchInput);
});
