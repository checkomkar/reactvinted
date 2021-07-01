import React from 'react';
import './App.scss';
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators,  } from 'redux';
import { actionCreators, State } from './state';
import ImageLoader from './components/ImageLoader';

function App() {
    const dispatch = useDispatch()
    const { loadImages } = bindActionCreators(actionCreators, dispatch)
    const images = useSelector((state: State) => state)
    return (
        <div className="App container">
            <ImageLoader/>
        </div>
    );
}

export default App;
