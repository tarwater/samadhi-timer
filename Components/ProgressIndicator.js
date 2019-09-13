import React, {Component} from 'react';
import {StyleSheet, View, Text, Easing} from 'react-native';
import {AnimatedCircularProgress} from "react-native-circular-progress";
import globalStyle from './../styles/global'

const indicatorSize = 300;
let interval;

const styles = StyleSheet.create({
    container: {
        width: indicatorSize,
        height: indicatorSize,
        borderRadius: indicatorSize / 2,
    },

    innerText: {
        fontSize: 90,
        color: globalStyle.colors.textColor
    }
});

class ProgressIndicator extends Component {

    constructor(props) {
        super(props);
        this.state = {
            countdownSecs: 5,
            timeRemainingMillis: props.duration,
            timeRemainingString: ""
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

    /**
     * This is a roundabout way to do this, but I was having trouble starting an interval timer that exactly matched the progress of the animation.
     * So instead, on every animation update, we are able to access the current progress and calculate the time remaining from that
     *
     * @param progress - the progress percentage, i.e. the timer is 10.22% full
     * @returns {string} - string representing how much time is remaining
     */
    getTimeFromProgress = (progress) => {

        if(progress >= 100){
            return "Good!"
        }

        let millisPassed = (progress / 100) * this.props.duration;
        let millisRemaining = this.props.duration - millisPassed;

        let minutesRemaining = Math.floor(millisRemaining / 1000 / 60);
        minutesRemaining = minutesRemaining < 10 && minutesRemaining > 0 ? "0" + minutesRemaining : minutesRemaining;
        minutesRemaining = minutesRemaining || "00";
        let secondsRemaining = Math.floor((millisRemaining / 1000) % 60);
        secondsRemaining = secondsRemaining < 10 && secondsRemaining > 0 ? "0" + secondsRemaining : secondsRemaining;
        secondsRemaining = secondsRemaining || "00";
        return minutesRemaining + ":" + secondsRemaining;
    };

    render() {
        return (
            <View style={styles.container}>
                <AnimatedCircularProgress size={indicatorSize} width={10} fill={0} tintColor={globalStyle.colors.orange}
                                          backgroundColor={globalStyle.colors.gray} lineCap={"round"}
                                          ref={ref => this.circularProgress = ref}>
                    { // AnimatedCircularProgress only accepts a function as a child
                        (fill) => (
                            <Text style={styles.innerText}>
                                {this.state.countdownSecs > 0 ? this.state.countdownSecs : this.getTimeFromProgress(fill)}
                            </Text>
                        )
                    }
                </AnimatedCircularProgress>
            </View>
        )
    }
}

export default ProgressIndicator;