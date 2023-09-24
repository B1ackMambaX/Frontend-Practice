import { useParams } from "react-router-dom";

import Banner from "../banner/Banner";
import CharacterPage from "../characterPage/CharacterPage";


const SingleCharacter = () => {
    const {charID} = useParams();
    return (
        <main>
            <Banner/>
            <CharacterPage charID={charID}/>
        </main>
    );
};
export default SingleCharacter;