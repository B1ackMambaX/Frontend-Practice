import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import useMarvelService from "../../services/MarvelService";

import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import Skeleton from "../skeleton/Skeleton";

import './charactersInfo.scss';

const CharactersInfo = (props) => {
	const {loading, error, getCharacter, clearError} = useMarvelService();
	const [char, setChar] = useState(null);

	// eslint-disable-next-line
	useEffect(() => updateChar(), [props.charId]);

	const updateChar = () => {
		clearError();
		const { charId } = props;
		if (!charId) return;
		getCharacter(charId).then(setChar);
	};
	const errorMessage = error ? <ErrorMessage /> : null,
		  spinner = loading ? <Spinner /> : null,
		  skeleton = char || loading || error ? null : <Skeleton />,
		  content = !(loading || error || !char) ? <View char={char} /> : null;

	return (
		<div className="characters__descr">
			{skeleton}
			{spinner}
			{errorMessage}
			{content}
		</div>
	);
};

const View = ({ char }) => {
	const { name, description, thumbnail, homepage, wiki, comics } = char;
	let listItems = [];
	if (comics.length === 0) {
		listItems.push(<div>There is no comics with this character</div>)
	} else {
		for (let i = 0; i < comics.length; i++) {
			if(i === 9) break;
			listItems.push(<li key={i}>{comics[i].name}</li>);
		}
	}

	
	return (
		<>
			<div className="characters__basics">
				<img src={thumbnail} alt={name} />
				<div>
					<h2 className="heading">{name}</h2>
					<div className="characters__btns-group">
						<a rel="noreferrer" target="_blank" href={homepage} className="btn">
							HOMEPAGE
						</a>
						<a rel="noreferrer" target="_blank" href={wiki} className="btn btn_grey">
							WIKI
						</a>
					</div>
				</div>
			</div>

			<p className="characters__info">{description}</p>
			<h3 className="characters__comics">Comics:</h3>
			<ul className="characters__comics-list">
				{listItems}
			</ul>
		</>
	);
};

CharactersInfo.propTypes = {
	charId: PropTypes.number,
};
export default CharactersInfo;