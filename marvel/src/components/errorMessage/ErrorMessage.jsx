import error from './error.gif';

const ErrorMessage = () => {
    return <img src={error} alt="Error" style={{display: 'block', objectFit: 'contain', width: '200px', height: '180px', margin: '0 auto'}} />
};

export default ErrorMessage;