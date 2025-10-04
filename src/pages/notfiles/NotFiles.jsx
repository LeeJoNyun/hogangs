import { useNavigate } from 'react-router-dom';

const NotFiles = () => {
    const navigate = useNavigate();

    return (
        <div className="not-files">
            <div className="inner">
                <h2>Hey, nothing to see here, turn around</h2>
                <strong
                    onClick={() => {
                        navigate('/');
                    }}
                >
                    GO HOME
                </strong>
                <img src="/notfiles/404.webp" alt="" />
            </div>
            <div className="shape"></div>
        </div>
    );
};

export default NotFiles;
