import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './randomChar.scss';
import decoration from '../../resources/img/decoration.png';


const RandomChar = () => {
    const {loading, error, getCharacter, clearError} = useMarvelService();
    const [character, setCharacter] = useState({});

    useEffect(() => updateChar(), []);

    const onCharLoaded = ({name, thumbnail, wiki, description, homepage}) => {
        setCharacter({name, thumbnail, wiki, description, homepage})
    };
    
    const updateChar = () => {
        clearError();
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        getCharacter(id).then(onCharLoaded);
    };


    const errorMessage = error ? <ErrorMessage/> : null,
          spinner = loading ? <Spinner/> : null,
          content = !(loading || error) ? <View character={character}/> : null;

    return (
        <div className="random-character">
            <div className="container">
                <div className="random-character__wrapper">
                    <div className="random-character__info">
                        {spinner}
                        {errorMessage}
                        {content}
                    </div>


                    <div className="random-character__try">
                        <h2 className="random-character__today">Random character for today!<br/>Do you want to get to know him better?</h2>
                        <div className="random-character__choose">Or choose another one</div>
                        <button className="btn btn_secondary random-character__btn" onClick={updateChar}>TRY IT</button>
                        <img src={decoration} alt="decoration" className="random-character__decoration"/>
                    </div>
                </div>
            </div>
        </div>
    );
};

const View = ({character}) => {
    const {name, description, thumbnail, homepage, wiki} = character;
    let imageStyle = null;
    
    if (thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
        imageStyle = {objectFit: 'contain'};
    }

    return (
        <>
            <img src={thumbnail} alt="Random character" className="random-character__photo" style={imageStyle}/>
            
            <div>
                <h2 className="heading">{name}</h2>
                <p className="random-character__descr">{ description ? description.slice(0, 210) + '...' : null}</p>
                <div className="random-character__btn-group">
                    <a rel="noreferrer" target="_blank" href={homepage} className="btn">HOMEPAGE</a>
                    <a rel="noreferrer" target="_blank" href={wiki} className="btn btn_grey">WIKI</a>
                </div>
            </div>
        </>
    );
};

export default RandomChar;