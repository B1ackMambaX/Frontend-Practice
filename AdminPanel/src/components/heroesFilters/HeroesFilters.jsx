import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFilters } from "./filtersSlice";
import { filtersSetActive } from "./filtersSlice";
import Spinner from "../spinner/Spinner";
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {
    const {filters, filtersLoadingStatus, activeFilter} = useSelector(state => state.filters);
    const dispatch = useDispatch();

    useEffect(() => {
            dispatch(fetchFilters());
            //eslint-disable-next-line
    }, []);

    const onFilter = (e) => {
        const filter = e.target.getAttribute('data-filter');
        dispatch(filtersSetActive(filter));
    };

    const renderFilters = () => {
        if (filtersLoadingStatus === 'loading') {
            return <Spinner/>
        } else if (filtersLoadingStatus === 'error') {
            return <h5 className="text-center mt-5">Ошибка загрузки</h5>
        } else {
            return filters.map((filter, i) => {
                let btnClass = '';
                if (activeFilter === filter.value) {
                    btnClass = 'active';
                }
                return <button 
                        key={i} 
                        data-filter={filter.value} 
                        className={`btn ${filter.className} ${btnClass}`} 
                        onClick={onFilter}>{filter.label}</button>
            });
        }
    };

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {renderFilters()}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;