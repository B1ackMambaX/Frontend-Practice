import './employees-list-item.css';

const EmployeesListItem = (props) => {
    const {name, salary, onDelete, onToggleIncrease, onToggleRise, onChangeSalary, increase, rise} = props;
    let listItemClass = 'list-group-item d-flex justify-content-between';

    if(increase) {
    listItemClass += ' increase';
    }
    if(rise) {
    listItemClass += ' like';
    }

    return(
        <li className={listItemClass}>
            <span onClick={onToggleRise} className="list-group-item-label">{name}</span>
            <input type="text" 
                   className="list-group-item-input" 
                   defaultValue={salary + '$'} 
                   onBlur={(e) => onChangeSalary(parseInt(e.target.value))}
            />
            <div className='d-flex justify-content-center align-items-center'>
                <button type="button"
                        className="btn-cookie btn-sm "
                        onClick={onToggleIncrease}>
                    <i className="fas fa-cookie"></i>
                </button>

                <button type="button"
                        className="btn-trash btn-sm "
                        onClick={onDelete}>
                    <i className="fas fa-trash"></i>
                </button>
                <i className="fas fa-star"></i>
            </div>
        </li>
    );
};

export default EmployeesListItem;