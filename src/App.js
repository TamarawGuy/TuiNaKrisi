import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Nav from "./Shared/Nav";
import PrivateRoute from './utils/PrivateRouter';
import { AuthProvider } from './context/AuthContext';
import Login from './Login/Login';
import General from './General/General';
import Group from './Group/Group';
import Individual from './Individual/Individual';

function App() {

    return (
        <div className="App">
            <Router>
                <AuthProvider>
                    <Nav />
                    <div className='container'>

                        <PrivateRoute exact component={General} path='/' />
                        <PrivateRoute exact component={Group} path='/group' />
                        <PrivateRoute exact component={Individual} path='/individual' />

                        <Route component={Login} path='/login' />
                    </div>
                </AuthProvider>
            </Router>
        </div>
    );
}

export default App;
