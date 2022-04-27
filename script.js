const search=document.getElementById("search");
submit=document.getElementById("submit");
random=document.getElementById("random");
meals=document.getElementById("meals");
resultHeading=document.getElementById("result-heading");
single_meal=document.getElementById("single-meal");

// Search Meal and fetch from API
function searchMeal(event){
    event.preventDefault();
    // Clear single meal
    single_meal.innerHTML="";
    // Get search term
    const term=search.value;
    // Check for empty
    if(term.trim()){
        // fetch is get request
        fetch('https://www.themealdb.com/api/json/v1/1/search.php?s='+term)
        .then(response => response.json())
        .then(data=>{
            resultHeading.innerHTML='<h2>Search results for "'+term+'":</h2>';
            if(data.meals===null){
                resultHeading.innerHTML="<p>There are no search results. Try again!</p>"
            }
            else{
                meals.innerHTML=data.meals.map(meal=>
                "<div class='meal'><img src='"+meal.strMealThumb+"'/><div class='meal-info' data-mealID='"+meal.idMeal+"'><h3>"+meal.strMeal+"</h3></div></div>"
                )
                .join('');
            }
        });
        // Clear search text
        search.value='';
    }
    else{
        alert("Please enter a search term");
    }
}

// Fetch meal by ID
function getMealById(mealID){
    fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i='+mealID)
    .then(response=>response.json())
    .then(data=>{
        const meal=data.meals[0];
        addMealToDom(meal);
    })
}

// Fetch random meal
function getRandomMeal(){
    // Clear meals and heading
    meals.innerHTML='';
    resultHeading.innerHTML='';
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then(response=>response.json())
    .then(data=>{
        const meal=data.meals[0];
        addMealToDom(meal);
    })
}

//Add meal to DOM
function addMealToDom(meal){
    single_meal.innerHTML="<div class='single-meal'><h1>"+meal.strMeal+"</h1><img src='"+meal.strMealThumb+"'/><div class='single-meal-info'><p>"+meal.strCategory +"</p><p>"+meal.strArea+"</p></div><div class='main'><p>"+meal.strInstructions+"</p></div></div>";
}

// Event Listener
submit.addEventListener('submit',searchMeal);
random.addEventListener('click',getRandomMeal);
meals.addEventListener('click',event=>{
    const mealInfo=event.composedPath() 
    .find(item=>{
        if(item.classList){
            return item.classList.contains('meal-info');
        }
        else{
            return false;
        }
    });
    if(mealInfo){
        const mealId=mealInfo.getAttribute('data-mealid');
        getMealById(mealId);
    }
})