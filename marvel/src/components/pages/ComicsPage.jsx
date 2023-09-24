import { Helmet } from "react-helmet";

import ComicsList from "../comicsList/ComicsList";
import Banner from '../banner/Banner';

const ComicsPage = () => {
    return (
        <main>
            <Helmet>
                <meta name="description" content="Page with the list of comics" />
                <title>Marvel information portal: Comics</title>
            </Helmet>
            <Banner/>
            <ComicsList/>
        </main>
    );
};

export default ComicsPage;