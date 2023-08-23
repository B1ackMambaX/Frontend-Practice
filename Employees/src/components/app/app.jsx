import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {name: 'John Smith', salary: 800, increase: false, rise: true, id: 1},
                {name: 'Alex Shepard', salary: 1600, increase: false, rise: false, id: 2},
                {name: 'Elon Musk', salary: 3000, increase: true, rise: false, id: 3}
            ],
            term: '',
            filter: 'all'
        };
        this.lastId = this.state.data[this.state.data.length - 1].id;
    }

    deleteEmployee = (id) => {
        this.setState(({data}) => {            
            return {
                data: data.filter(item => item.id !== id)
            }
        });
    }

    addEmployee = (name, salary) => {
        this.setState(({data}) => {
            return {
                data: [...data, {name, salary, increase: false, rise: false, id: ++this.lastId}]
            }
        });
    }

    onToggleProp = (id, prop) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if(item.id === id) {
                    return {...item, [prop]: !item[prop]}
                }
                return item;
            })
        }));
    }

    onChangeSalary = (id, newSalary) => {
        this.setState(({data}) => {
            return {
                data: data.map(item => {
                    if (item.id === id) {
                        return {...item, salary: newSalary};
                    }
                    return item;
                })
            };
        });
    }

    search = (items, term) => {
        if (term.length === 0) {
            return items;
        }
        return items.filter(item => {
            return item.name.indexOf(term) > -1;
        });
    }

    onUpdateSearch = (term) => {
        this.setState({term});
    }

    filter = (items, filter) => {
        switch (filter) {
            case 'rise':
                return items.filter(item => item.rise === true);
            case 'moreThen1000':
                return items.filter(item => item.salary > 1000);
            default:
                return items;
        }
    }

    onFilterSelect = (filter) => {
        this.setState({filter});
    }

    getIncreaseCounter = () => {
        return this.state.data.filter(item => item.increase === true).length;
    }

    render() {
        const {data, term, filter} = this.state,
              sortedData = this.filter(this.search(data, term), filter)

        return (
            <div className="app">
                <AppInfo total={this.state.data.length} increaseCounter={this.getIncreaseCounter()}/>
                <div className="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
                    <AppFilter filter={filter} onFilterSelect={this.onFilterSelect}/>
                </div>
                <EmployeesList 
                    data={sortedData} 
                    onDelete={this.deleteEmployee}
                    onToggleProp={this.onToggleProp}
                    onChangeSalary={this.onChangeSalary}
                />
                <EmployeesAddForm onAdd={this.addEmployee}/>
            </div>
        );
    }
};

export default App;