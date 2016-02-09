import React from 'react';
import Component from './Component.jsx';
import DAL from '../core/dal.js';

export default class App extends React.Component {
    componentWillMount() {
        DAL.getJenkins().then(()=>{
            console.log(arguments);
        });
    }

    render() {
        return <Component />;
    }
}
