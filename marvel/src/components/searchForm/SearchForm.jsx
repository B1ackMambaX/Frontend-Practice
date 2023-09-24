import { useState } from 'react';
import { Link } from 'react-router-dom';
import {Formik, Form, Field, ErrorMessage as FormikErrorMessage} from 'formik';
import useMarvelService from '../../services/MarvelService';

import './searchForm.scss';

const SearchForm = () => {
    const {loading, getCharacterByName} = useMarvelService();
    const [char, setChar] = useState(null);

    const onRequest = (name) => {
        getCharacterByName(name).then(setChar);
    };

    let content = null;
    if(char && char.length === 0) {
        content = <div className="search-form__message">The character was not found. Check the name and try again</div>;
    } else if (char && char.length !== 0) {
        content = <>
        <div className="search-form__message search-form__message_success">There is! Visit {char[0].name} page?</div>
        <Link to={`/characters/${char[0].id}`} className="search-form__link btn btn_grey">TO PAGE</Link>
        </>
    }

    return (
        <div className="search-form">
            <Formik 
                initialValues={{name: ''}}
                validate={values => {
                    const errors = {};
                    if (!values.name) {
                        errors.name = 'This field is required!'
                    }
                    return errors;
                }}
                onSubmit={values => onRequest(values.name)}
            >
                <Form>
                    <label className="search-form__label" htmlFor="name">Or find a character by name:</label>
                    <Field className="search-form__input" type="text" name="name" placeholder="Enter name"/>
                    <button className="btn search-form__btn" type="submit" disabled={loading}>{loading ? 'LOADING...' : 'FIND'}</button>
                    <FormikErrorMessage className="search-form__message" name="name" component="div"/>
                </Form>
            </Formik>
            <div className="search-form__results">
                {content}
            </div>
        </div>
    );
};
export default SearchForm;