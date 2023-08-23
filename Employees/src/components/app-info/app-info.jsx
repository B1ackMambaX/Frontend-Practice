import './app-info.css';

const AppInfo = (props) => {
    const {total, increaseCounter} = props;
    return (
        <div className="app-info">
            <h1>Учет сотрудников в компании CompanyName</h1>
            <h2>Общее число сотрудников: {total}</h2>
            <h2>Премию получат: {increaseCounter}</h2>
        </div>
    );
};

export default AppInfo;