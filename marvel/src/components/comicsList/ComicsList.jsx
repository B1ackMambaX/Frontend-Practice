import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './comicsList.scss';

const ComicsList = () => {
    const { loading, error, getAllComics } = useMarvelService();
    const [comics, setComics] = useState([]),
          [isUpdating, setIsUpdating] = useState(false),
          [offset, setOffset] = useState(0),
          [comicsEnded, setComicsEnded] = useState(false);

    useEffect(() => onRequest(0, true), []);

    const onComicsLoaded = (newComics) => {
        const isEnded = newComics.length < 8;

        setComics(comics => [...comics, ...newComics]);
        setOffset(offset => offset + 8);
        setIsUpdating(false);
        setComicsEnded(isEnded);
    };

    const onRequest = (offset, initial) => {
        initial ? setIsUpdating(false) : setIsUpdating(true);
        getAllComics(offset).then(onComicsLoaded);
    };


    function getComicsItems() {
        const ListItems = comics.map(({id, title, price, thumbnail}, i) => {
            let imageStyle = null;
            if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imageStyle = {objectFit: 'fill'};
            }

            return (
                <li key={i} className="comics__item">
                    <Link to={`/comics/${id}`}>
                        <img style={imageStyle} src={thumbnail} alt={title} className="comics__img"/>
                        <div className="comics__heading">{title}</div>
                        <div className="comics__price">{price}</div>
                    </Link>
                </li>
            );
        });
        return <ul className="comics__wrapper">{ListItems}</ul>
    }

    const spinner = (loading && !isUpdating) ? <Spinner/> : null,
          errorMessage = error ? <ErrorMessage/> : null;


    return (
        <div className="comics">
            <div className="container">
                {spinner || errorMessage || getComicsItems()}
                <button 
                className="btn btn_big comics__btn" 
                onClick={() => onRequest(offset, false)} 
                style={{display: comicsEnded ? 'none' : 'block'}} 
                disabled={isUpdating}>
                    {isUpdating ? 'LOADING...' : 'LOAD MORE'}</button>
            </div>
        </div>
    );
};

export default ComicsList;