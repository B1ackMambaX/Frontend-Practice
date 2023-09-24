import { useState } from "react";
import { Helmet } from "react-helmet";

import RandomChar from "../randomChar/RandomChar";
import CharactersList from "../charactersList/CharactersList";
import CharactersInfo from "../charactersInfo/CharactersInfo";
import SearchForm from "../searchForm/SearchForm";
import ErrorBoundary from "../errorBoundary/errorBoundary";

import decoration from '../../resources/img/bg_asset.png';


const MainPage = () => {
    const [selectedChar, setSelectedChar] = useState(null);

    function onCharSelected(id) {
        setSelectedChar(id);
    };

    return (
        <main>
            <Helmet>
                <meta name="description" content="Main page with the catalog of characters" />
                <title>Marvel information portal</title>
            </Helmet>
            <RandomChar/>
            <div className="characters">
                <img src={decoration} alt="decoration" className="characters__decoration" />
                <div className="container">
                    <div className="characters__wrapper">
                        <CharactersList onCharSelected={onCharSelected}/>
                        <div className="characters__aside">
                            <ErrorBoundary>
                                <CharactersInfo charId={selectedChar}/>
                            </ErrorBoundary>
                            <SearchForm/>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default MainPage;