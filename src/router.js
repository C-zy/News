import React from 'react';
import App from './App'
import {BrowserRouter,Route,Redirect} from 'react-router-dom';
// import Lists from './components/Lists';
import Header from './components/Header';
import Detail from './components/Detail';
import Lists from './components/Lists';

export default class router extends React.Component{
    render(){
        return(
            <BrowserRouter>
                <Route path='/app/' render={()=>(
                    <Header>
                        <Route path="/app/:tag" component={Lists}></Route>
                    </Header>
                )}></Route>
                {/* <Route exact path='/app/:tog' component={Header} /> */}
                <Redirect from="/" to="/app/__all__" />
                <Route path='/detail/:id' component={Detail} />
            </BrowserRouter>
        )
    }
}