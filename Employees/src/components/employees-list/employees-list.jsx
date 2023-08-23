import EmployeesListItem from "../employees-list-item/employees-list-item";
import './employees-list.css';

const EmployeesList = ({data, onDelete, onToggleProp, onChangeSalary}) => {
    
    const listItems = data.map(item => {
        const {id, ...itemProps} = item;
        return (
            <EmployeesListItem 
                key={id} 
                {...itemProps}
                onDelete={() => onDelete(id)}
                onToggleIncrease={() => onToggleProp(id, 'increase')}
                onToggleRise={() => onToggleProp(id, 'rise')}
                onChangeSalary={(newSalary) => onChangeSalary(id, newSalary)}
            />
        );
    });

    return (
        <ul className="app-list list-group">
            {listItems}
        </ul>
    );
};

export default EmployeesList;