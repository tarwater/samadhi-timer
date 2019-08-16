import React, {Component} from 'react';
import {StyleSheet, View, Text, Easing} from 'react-native';
import {AnimatedCircularProgress} from "react-native-circular-progress";
import globalStyle from './../styles/global'

const indicatorSize = 300;

const styles = StyleSheet.create({
    container: {
        width: indicatorSize,
        height: indicatorSize,
        borderRadius: indicatorSize / 2,
    },

    innerText: {
        fontSize: 100,
        color: globalStyle.colors.textColor
    }
});

class ProgressIndicator extends Component {

    constructor(props) {
        super(props);
        this.state = {
            countdownSecs: 6
        }
    }


    componentDidMount() {
        this.countDown();
    }

    countDown = () => {
        if (this.state.countdownSecs > 0) {
            this.setState(prev => {
                return {
                    countdownSecs: prev.countdownSecs - 1
                }
            });
            setTimeout(this.countDown, 1000);
        } else {
            this.circularProgress.animate(100, this.props.duration, Easing.linear);
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <AnimatedCircularProgress size={indicatorSize} width={7} fill={0} tintColor={globalStyle.colors.orange}
                                          backgroundColor={globalStyle.colors.gray} lineCap={"round"}
                                          ref={ref => this.circularProgress = ref}>
                    { // AnimatedCircularProgress only accepts a function as a child
                        () => (
                            <Text style={styles.innerText}>
                                {this.state.countdownSecs > 0 ? this.state.countdownSecs : ""}
                            </Text>
                        )
                    }
                </AnimatedCircularProgress>
            </View>
        )
    }
}

export default ProgressIndicator;