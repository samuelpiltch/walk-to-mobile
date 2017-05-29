import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import Mapbox from 'react-native-mapbox-gl';
import { MapView } from 'react-native-mapbox-gl';

import AccessCodes from './config.js';

Mapbox.setAccessToken(AccessCodes.mapbox);

export default class WalkTo extends Component {

    render() {
        return (
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    styleURL={AccessCodes.mbstyle}
                    logoIsHidden={true}

                    initialCenterCoordinate={{ latitude: 40.744683, longitude: -73.984853 }}
                    initialZoomLevel={14}
                    initialDirection={0}
                    rotateEnabled={true}
                    scrollEnabled={true}
                    zoomEnabled={true}

                    showsUserLocation={true}
                    userTrackingMode={Mapbox.userTrackingMode.follow}
                />
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e6e4e0',
        flex: 1
    },
    map: {
        flex: 1
    }
});
