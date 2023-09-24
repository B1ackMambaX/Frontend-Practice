import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './CharacterPage.scss';


const CharacterPage = ({charID}) => {
    const {loading, error, getCharacter} = useMarvelService();
    const [char, setChar] = useState();

    useEffect(() => updateChar(), [charID]);

    const updateChar = () => {
        if (!charID) return;
        getCharacter(charID).then(setChar);
    }

    const spinner = loading ? <Spinner/> : null,
          errorMessage = error ? <ErrorMessage/> : null,
          content = !(loading || error) ? <Content {...char}/> : null;

    return (
        <div className="character-page">
            <div className="container">
                {spinner || errorMessage || content}
            </div>
        </div>
    );
};

const Content = ({name, description, thumbnail}) => {
    return (
        <div className="character-page__wrapper">
            <Helmet>
                <title>{name}</title>
                <meta name='description' content={`Info about ${name}`}></meta>
            </Helmet>
            <img src={thumbnail} alt={name} className="character-page__photo"/>
        
            <div className="character-page__descr">
                <h2 className="heading">{name}</h2>
                <p className="character-page__info">{description}</p>
            </div>
        </div>
    );
};

export default CharacterPage;