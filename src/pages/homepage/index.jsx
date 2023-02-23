import { useEffect, useReducer, useState } from "react";
import FavoriteItem from "../../component/favorite-item";
import RecipeItem from "../../component/recipe-item";
import Search from "../../component/search";
import './style.css'

const dummydata = 'dummydata'

const reducer = (state, action) => {
    switch (action.type) {
        case 'value':
            return state

             

        default:
            return state
    }


}
const initialState = {
    filteredValue: ''
}
const Homepage = () => {

    //loading state

    const [loadingState, setLoadingState] = useState(false);

    //save result that we receive from api
    const [recipes, setRecipes] = useState([]);

    //favorites data state

    const [favorites, setFavorites] = useState([]);

    //state for api is succefull or not 

    const [apiCalledSucces, setApiCalledSucces] = useState(false);

    //use reducer functionality
    const [filteredState, dispatch] = useReducer(reducer, initialState)


    const getDataFromSearchComponent = (getData) => {
        //keep the loading state as true before we are calling the api

        setLoadingState(true);
        console.log(getData, 'getData');

        //calling the api
        async function getRecipes() {
            const apiResponse = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=4b10639ff5254754a5122b4f521f0cde&query=${getData}`)
            const result = await apiResponse.json();
            const { results } = result;

            if (results && results.length > 0) {
                setLoadingState(false);
                setRecipes(results);
                setApiCalledSucces(true);
            }

        };

        getRecipes()
    };

    // console.log(loadingState, recipes, 'loadingState, recipes');

    const addToFavorites = (getCurrentRecipeItem) => {
        //  console.log(getCurrentRecipeItem);
        let cpyFavorites = [...favorites];
        const index = cpyFavorites.findIndex(item => item.id === getCurrentRecipeItem.id);

        if (index === -1) {
            cpyFavorites.push(getCurrentRecipeItem)
            setFavorites(cpyFavorites)
            //save the favorites in local storage
            localStorage.setItem('favorites', JSON.stringify(cpyFavorites))
        } else {
            alert('Item is already present in favorites')
        }
    };


    useEffect(() => {
        console.log('runs only once on page');
        const extraFavoritesFromLocalStorageOnPageLoad = JSON.parse(localStorage.getItem('favorites'));
        console.log(extraFavoritesFromLocalStorageOnPageLoad);

    }, []);

    const removeFromFavorites = (getCurrentId) => {
        let cpyFavorites = [...favorites];
        cpyFavorites = cpyFavorites.filter(item => item.id !== getCurrentId);
        setFavorites(cpyFavorites);
        localStorage.setItem('favorites', JSON.stringify(cpyFavorites))

    }
    console.log(filteredState,'filteredState');

    return (
        <div className="homepage">
            <Search
                getDataFromSearchComponent={getDataFromSearchComponent}
                dummydata={dummydata}
                apiCalledSucces={apiCalledSucces}
                setApiCalledSucces={setApiCalledSucces}
            />
            {/** show favorites item */}
            <div className="favorites-wrapper">
                <h1 className="favorites-title">
                    Favorites
                </h1>
                <div className="search-favorites">
                    <input
                    onChange={()=> dispatch({type : 'filterFavorites'})} 
                    name="searchfavorites" placeholder="Search Favorites" />
                </div>
                <div className="favorites">
                    {
                        favorites && favorites.length > 0 ?
                            favorites.map((item, i) => (
                                <FavoriteItem
                                    key={i}
                                    removeFromFavorites={() => removeFromFavorites(item.id)}
                                    id={item.id}
                                    image={item.image}
                                    title={item.title} />
                            )) : null
                    }

                </div>

            </div>

            {/*show loading state */}

            {
                loadingState && <div className="loading">loading recipes ! Please wait</div>
            }

            {/*show loading state */}
            {/**map through all the recipes */}
            <div className="items">
                {
                    recipes && recipes.length > 0 ?
                        recipes.map((item, i) => (
                            <RecipeItem
                                key={i}
                                addToFavorites={() => addToFavorites(item)}
                                id={item.id}
                                image={item.image}
                                title={item.title}
                            />
                        ))
                        : null}
            </div>


            {/**map through all the recipes */}
        </div>
    )
}

export default Homepage;