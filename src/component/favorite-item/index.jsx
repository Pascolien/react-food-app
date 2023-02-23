import './style.css'

const FavoriteItem = (props)=>{

    const {id,image,removeFromFavorites,title } = props;

 

    return(
        <div key={id} className="favorite-item">
            <div>
                <img src={image} alt="image of recupe"/>
            </div>

            <p>{title}</p>
            <button type="button" onClick={removeFromFavorites}>Remove from favorites</button>
        </div>
    );
};

export default FavoriteItem;