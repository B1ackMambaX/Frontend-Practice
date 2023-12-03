import { useState } from "react";
import { v4 as uuid } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { useHttp } from "../../hooks/http.hook";
import { heroCreated } from "../heroesList/heroesSlice";

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {
    const {heroesLoadingStatus, filters, filtersLoadingStatus} = useSelector(state => state.filters);
    const dispatch = useDispatch();
    const {request} = useHttp();
    const [name, setName] = useState(''),
          [description, setDescription] = useState(''),
          [element, setElement] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
        if (!name || !description || !element) return;
        const hero = {
            id: uuid(),
            name,
            description, 
            element
        };

        request("https://dashboard-fakeapi.vercel.app/heroes", "POST", JSON.stringify(hero))
            .then(() => dispatch(heroCreated(hero)))
            .then(() => {
                setName('');
                setDescription('');
                setElement('');
            })
            .catch((err) => console.log(err));
    };

    const renderFilters = () => {
        if (filtersLoadingStatus === 'loading') {
            return <option value="">Загрузка элементов...</option>
        } else if (filtersLoadingStatus === 'error') {
            return <option value="">Ошибка загрузки</option>
        } else {
            return filters.map((filter, i) => {
                if (filter.value === 'all') return null;
                return <option key={i} value={filter.value}>{filter.label}</option>
            })
        }
    };

    
    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={submitHandler}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?"
                    onChange={(e) => setName(e.target.value)}
                    value={name}/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="text" 
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    name="element"
                    onChange={(e) => setElement(e.target.value)}
                    value={element}>
                    <option value="" >Я владею элементом...</option>
                    {renderFilters()}
                </select>
            </div>

            <button type="submit" className="btn btn-primary" disabled={heroesLoadingStatus === 'loading'}>
                {heroesLoadingStatus === 'loading' ? 'Загрузка...' : 'Создать'}
            </button>
        </form>
    )
}

export default HeroesAddForm;