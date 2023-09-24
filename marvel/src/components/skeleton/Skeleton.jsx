import './skeleton.scss';

const Skeleton = () => {
    return (
        <>
            <div className="heading">Please select a character to see information</div>
            <div className="skeleton pulse">
                <div className="skeleton__header">
                    <div className="skeleton__circle"></div>
                    <div className="skeleton__mini"></div>
                </div>
                <div className="skeleton__block"></div>
                <div className="skeleton__block"></div>
                <div className="skeleton__block"></div>
            </div>
        </>
    );
};

export default Skeleton;