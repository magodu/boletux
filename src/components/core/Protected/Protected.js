import { Navigate } from 'react-router-dom';

//import { InputProps } from '../../../models/appTypes';

//const Protected: React.FC<{ isLoggedIn: boolean; children: InputProps }> = ({ isLoggedIn, children }) => {
//const Protected: React.FC<InputProps> = (isLoggedIn, props) => {
    
const Protected = ({ isLoggedIn, children }) => {

    if (!isLoggedIn) {
        return <Navigate to="/" replace />;
    }
    return children;
}

export default Protected;
