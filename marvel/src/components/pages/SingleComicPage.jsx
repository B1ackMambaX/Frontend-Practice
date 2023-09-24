import { useParams } from "react-router-dom";

import ComicPage from "../comicPage/ComicPage";
import Banner from "../banner/Banner";

const SingleComicPage = () => {
    const { comicID } = useParams();

    return (
        <main>
            <Banner/>
            <ComicPage id={comicID}/>
        </main>
    );
};

export default SingleComicPage;
