import React from 'react';
import './App.scss';
import ImageLoader from './components/ImageLoader';
import Menu from './components/menu';

function App() {
    
    return (
        <>
            <Menu visibledevice={"menu visible-above-960"} />
            <div className="App container">
                <Menu visibledevice={ "menu visible-below-960"}/>
                <ImageLoader/>
            </div>
        </>
    );
}

export default App;
