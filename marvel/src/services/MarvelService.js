import { useHttp } from "../hooks/http.hook";

const  useMarvelService = () => {
	const { loading, request, error, clearError } = useHttp();
	const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
	const _apiKey = 'apikey=0ca16c1c57181584efd6de809a480297';
	const _baseCharsOffset = 210;
	const _baseComicsOffset = 0;

    const getAllCharacters = async (offset = _baseCharsOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
		return res.data.results.map(_transformCharacter);
    };

	const getCharacter = async (id) => {
		const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
		return _transformCharacter(res.data.results[0]);
	};

	const getCharacterByName = async (name) => {
		const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
		return res.data.results;
	};

	const getAllComics = async (offset = _baseComicsOffset ) => {
		const res = await request(`${_apiBase}/comics?limit=8&offset=${offset}&${_apiKey}`);
		return res.data.results.map(_transformComic);
	};

	const getComic = async (id) => {
		const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
		return _transformComic(res.data.results[0]);
	};

	const _transformCharacter = (char) => {
		return {
			name: char.name,
			description: char.description ? char.description : 'There is no description for this character',
			thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
			homepage: char.urls[0].url,
			wiki: char.urls[1].url,
			id: char.id,
			comics: char.comics.items
		};
	};

	const _transformComic = (comic) => {
		return {
			id: comic.id,
			title: comic.title,
			price: comic.prices[0].price ? `${comic.prices[0].price}$` : 'NOT AVAILABLE',
			thumbnail: comic.thumbnail.path + '.' + comic.thumbnail.extension,
			pages: comic.pageCount ? comic.pageCount : 'There is no information about pages',
			description: comic.description ? comic.description : 'There is no description',
			language: comic.textObjects[0] ? comic.textObjects[0].language : 'en-us'
		};
	};

	return {loading, 
			error,
			getAllCharacters, 
			getCharacter, 
			clearError, 
			getAllComics, 
			getComic, 
			getCharacterByName};
}

export default useMarvelService;
