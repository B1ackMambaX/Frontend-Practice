import { Component } from 'react';
import './employees-add-form.css';

class EmployeesAddForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            salary: ''
        }
    }

    onValueChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    submitTrigger = (e) => {
        const {onAdd} = this.props,
              {name, salary} = this.state;
    
        e.preventDefault();

        if(name.length > 2 && salary.length !== 0) {
            onAdd(name, +salary);
        
            this.setState({
                name: '',
                salary: ''
            });
        }
    }

    render() {
        const {name, salary} = this.state;
        return (
            <div className="app-add-form">
                <h3>Добавьте нового сотрудника</h3>
                <form className="add-form d-flex"  onSubmit={this.submitTrigger}>
                    <input type="text"
                        className="form-control new-post-label"
                        name="name"
                        value={name}
                        placeholder="Как его зовут?" 
                        onChange={this.onValueChange}/>
                    <input type="number"
                        className="form-control new-post-label"
                        name="salary"
                        value={salary}
                        placeholder="З/П в $?"
                        onChange={this.onValueChange}/>
    
                    <button type="submit" className="btn btn-outline-light">Добавить</button>
                </form>
            </div>
        );
    }
};

export default EmployeesAddForm;