import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './comicPage.scss';


const ComicPage = (props) => {
    const { id } = props;
    const [comic, setComic] = useState(null);
    const {loading, error, getComic} = useMarvelService();

    useEffect(() => UpdateComic(), [id]);

    const UpdateComic = () => {
        if (!id) return;
        getComic(id).then(setComic);
    };

    const spinner = loading ? <Spinner/> : null,
          errorMessage = error ? <ErrorMessage/> : null,
          content = !(loading || error) ? <Content {...comic}/> : null;
    return (
        <div className="comic-page">
            <div className="container">
                <div className="comic-page__wrapper">
                    {spinner || errorMessage || content}
                </div>
            </div>
        </div>
    );
};

const Content = ({title, price, thumbnail, description, pages, language}) => {
    return (
        <>
            <Helmet>
                <meta name="description" content={`${title} comics page`} />
                <title>{title}</title>
            </Helmet>
            <img src={thumbnail} alt={title} className="comic-page__img"/>

            <div className="comic-page__descr">
                <div className="comic-page__header">
                    <h2 className="heading">{title}</h2>
                    <Link to={'/comics'} className="comic-page__backlink">Back to all</Link>
                </div>

                <p className="comic-page__info">{description}</p>
                <div className="comic-page__pages">{`${pages} pages`}</div>
                <div className="comic-page__lang">{`Language: ${language}`}</div>
                <div className="comic-page__price">{price}</div>
            </div>
        </>
    );
};

export default ComicPage;