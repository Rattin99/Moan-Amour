
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import Business from './Business';
import Title from './Title';

const App = () => {
    return ( 
        <Router>
            <div className="main-container">
                <Switch>
                    <Route exact path ='/'>
                        <Title></Title>
                    </Route>
                    <Route exact path ="/Business">
                        <Business></Business>
                    </Route>
                </Switch>
           </div>
        </Router>
     );
}
 
export default App;