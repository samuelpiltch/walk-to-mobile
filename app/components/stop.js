import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { Annotation } from 'react-native-mapbox-gl'

export default class WalkTo extends Component {

    render() {
        return (
                <Annotation
                    id={this.props.id}
                    coordinate={{ latitude: this.props.lat, longitude: this.props.long }}
                    style={{alignItems: 'center', justifyContent: 'center', position: 'absolute'}}
                >
                    <View style={[styles.stop, {backgroundColor: this.props.color}]}>
                        <Text style={[styles.text, {color: this.props.textColor}]}>{this.props.line}</Text>
                    </View>
                </Annotation>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e6e4e0',
        flex: 1
    },
    stop: {
        height: 20,
        width: 20,
        borderRadius: 10,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: 'white',
        fontSize: 14,
        fontWeight: '800'
    }
});
