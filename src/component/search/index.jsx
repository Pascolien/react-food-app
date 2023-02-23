import { useEffect, useState } from 'react';
import './style.css'

//useState
//useRender -> compex state 

const Search = (props)=>{
    console.log(props);
    const {getDataFromSearchComponent,apiCalledSucces, setApiCalledSucces} = props;
        const[inputValue, setInputValue] = useState('') //initial value

        const handleInputValue = (event)=>{
            const {value} =event.target;
            //set the update state
            setInputValue(value)
        }
        console.log(inputValue);

        const handleSubmit = (event)=>{
            event.preventDefault()
            getDataFromSearchComponent(inputValue)
        }

        useEffect(()=>{
            if(apiCalledSucces){
                setInputValue('')
                setApiCalledSucces(false)
            }
        },[apiCalledSucces])
    return (
        <form onSubmit={handleSubmit} className="Search">
            <input name="search" onChange={handleInputValue} value={inputValue} placeholder="Seach Recipes" id="search"/>
            <button type="submit">Search</button>
        </form>
    );
};

export default Search;