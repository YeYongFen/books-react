import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { getFiles , bulidBookMap } from './common/bookUtils'
import { Provider } from './common/context'





getFiles().then(item=>{
    const bookMap = bulidBookMap(item);
    const Root = (
        <Provider value={{bookList:item , bookMap}}>
            <App  />
        </Provider>
    )
    ReactDOM.render(Root, document.getElementById('root'));
})


