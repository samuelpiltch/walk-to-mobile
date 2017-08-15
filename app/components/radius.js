import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { Annotation } from 'react-native-mapbox-gl'

export default class Radius extends Component {

    render() {
        return (
                <Annotation
                    id={this.props.id}
                    coordinate={{ latitude: this.props.lat, longitude: this.props.long }}
                    style={{alignItems: 'center', justifyContent: 'center', position: 'absolute'}}
                >
                    <View
                        style={[styles.radius, {
                            backgroundColor: this.props.color,
                            height: this.props.size,
                            width: this.props.size,
                            borderRadius: this.props.size/2
                        }]}
                    >
                    </View>
                </Annotation>
        );
    }

}

const styles = StyleSheet.create({
    radius: {
        opacity: .15,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
