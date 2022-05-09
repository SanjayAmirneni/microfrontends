import React from "react";
import ReactDom from "react-dom";
import { createMemoryHistory, createBrowserHistory} from 'history';
import App from "./App";

//Mount function to start the app
const mount = (el, {onNavigate, defaultHistory}) =>{

    const history = defaultHistory || createMemoryHistory();

    if(onNavigate) {
        history.listen(onNavigate);
    }

    ReactDom.render(
        <App history={history} />,
        el
    );

    return {
        onParentNavigate({ pathname: nextPathname}){
            const { pathname } = history.location;

            if(pathname !== nextPathname) {
                history.push(nextPathname);
            }
        }
    }
}


//If we are in development and in isolation,
//call mount immediately
if(process.env.NODE_ENV === 'development'){
const devRootEl = document.querySelector('#_marketing-dev-root');

if(devRootEl){
mount(devRootEl, {defaultHistory: createBrowserHistory() });}
}


//If we are runnign through container
//and we should export the mount function
export { mount };