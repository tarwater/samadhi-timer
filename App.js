import React, {Component} from 'react';
import {AppRegistry, Text, Image, View} from 'react-native';
import ProgressIndicator from "./Components/ProgressIndicator";

export default class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
        }
    }

    render() {
        return (
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                <ProgressIndicator duration={1 * 60 * 1000}/>
            </View>
        );
    }
}

// skip this line if using Create React Native App
AppRegistry.registerComponent('AwesomeProject', () => App);
