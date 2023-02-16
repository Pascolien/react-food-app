import { useState } from "react";
import Search from "../../component/search";

const dummydata='dummydata'

const Homepage = ()=>{

    //loading state

    const [loadingState,setLoadingState] = useState(false)

    //save result that we receive from api
    const [recipes,setRecipes] = useState([])


    const getDataFromSearchComponent = (getData)=>{
        //keep the loading state as true before we are calling the api

        setLoadingState(true);
        console.log(getData,'getData');

        //calling the api
    async function getRecipes(){
        const apiResponse = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=4b10639ff5254754a5122b4f521f0cde&query=${getData}`)
        const result =await apiResponse.json();
        const {results} = result;
        
        if(results && results.length >0){
           setLoadingState(false);
           setRecipes(results); 
        }
        console.log(result);
    };

    getRecipes()
    };

    console.log(loadingState,recipes, 'loadingState, recipes');
    return (
        <div className="homepage">
            <Search 
            getDataFromSearchComponent = {getDataFromSearchComponent} 
            dummydata = {dummydata}
            />

            {/*show loading state */}

            {
                loadingState && <div>loading recipes ! Please wait</div>
            }
        </div>
    )
}

export default Homepage;