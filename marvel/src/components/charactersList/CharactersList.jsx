import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import useMarvelService from '../../services/MarvelService';

import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './characterList.scss';

const CharactersList = (props) => {
    const {loading, error, getAllCharacters} =  useMarvelService();
    const [characters, setCharacters] = useState([]),
          [newItemsLoading, setNewItemsLoading] = useState(false),
          [offset, setOffset] = useState(210),
          [charsEnded, setCharsEnded] = useState(false);

    // eslint-disable-next-line
    useEffect(() => onRequest(offset, true), []);

    const onListLoaded = (newCharacters) => {
        let ended = false;
        if (newCharacters.length < 9) {
            ended = true;
        }

        setCharacters(characters => [...characters, ...newCharacters]);
        setNewItemsLoading(false);
        setOffset(offset => offset + 9);
        setCharsEnded(ended);
    };


    const onRequest = (offset, initial) => {
        initial ? setNewItemsLoading(false) : setNewItemsLoading(true);
        getAllCharacters(offset).then(onListLoaded);
    };

    const charactersRefs = useRef([]);
    const selectItem = (index) => {
        charactersRefs.current.forEach(ref => ref.classList.remove('characters__item_selected'));
        charactersRefs.current[index].classList.add('characters__item_selected');
        charactersRefs.current[index].focus();
    };

    function getListItems() {
        const listItems = characters.map(({name, thumbnail, id}, i) => {
            let imageStyle = null;
            if (thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
                imageStyle = {objectFit: 'fill'}
            }

            return (
                <li className="characters__item" 
                key={id} 
                tabIndex={0}
                ref={el => charactersRefs.current[i] = el}
                onClick={() => {
                    props.onCharSelected(id);
                    selectItem(i);
                }} 
                onKeyDown={(e) => {
                    if (e.key === ' ' || e.key === 'Enter') {
                        props.onCharSelected(id);
                        selectItem(i);
                    }
                }}>
                    <img src={thumbnail} alt="character" className="characters__icon" style={imageStyle}/>
                    <h2 className="heading heading_white characters__heading">{name}</h2>
                </li>
            );
        });

        return (
            <ul className="characters__grid">
                {listItems}
            </ul>
        );
    };

    const errorMessage = error ? <ErrorMessage/> : null,
          spinner = (loading && !newItemsLoading) ? <Spinner/> : null;

    return(
        <div className="characters__list">
            {errorMessage || spinner || getListItems()}
            <button className="btn btn_big characters__btn" 
                    disabled={newItemsLoading}
                    style={{display: charsEnded ? 'none' : 'block'}}
                    onClick={() => onRequest(offset)}
            >{newItemsLoading ? 'LOADING...' : 'LOAD MORE'}</button>
        </div>
    );
};

CharactersList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
};

export default CharactersList;