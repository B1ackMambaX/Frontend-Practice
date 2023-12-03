import { useHttp } from '../../hooks/http.hook';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { heroDeleted, fetchHeroes, filteredHeroesSelector } from './heroesSlice';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

import './heroes.scss';

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {

    const filteredHeroes = useSelector(filteredHeroesSelector);

    const heroesLoadingStatus = useSelector(state => state.heroes.heroesLoadingStatus);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(fetchHeroes());
        // eslint-disable-next-line
    }, []);

    const deleteHero = useCallback((id) => {
        request(`https://dashboard-fakeapi.vercel.app/heroes/${id}`, "DELETE")
            .then(() => dispatch(heroDeleted(id)))
            .catch((err) => console.log(err));
            // eslint-disable-next-line 
    }, [request]);

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }



    const renderHeroesList = () => {
        if (filteredHeroes.length === 0) {
            return <h5 key={1} className="text-center mt-5">Героев пока нет</h5>
        } else {
            return filteredHeroes.map(({id, ...props}) => {
                return <CSSTransition key={id} classNames={'card'} timeout={500}>
                            <HeroesListItem key={id} onDelete={() => deleteHero(id)} {...props}/>
                        </CSSTransition>
            });
        }
    };

    return (
        <ul>
            <TransitionGroup component={null}>
                {renderHeroesList()}
            </TransitionGroup>
        </ul>
    );
}

export default HeroesList;