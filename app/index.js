import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import Mapbox from 'react-native-mapbox-gl';
import { MapView } from 'react-native-mapbox-gl';
import debounce from 'debounce';

import AccessCodes from './config.js';
import Stop from "./components/stop.js";
import Radius from "./components/radius.js";

import stops from './data/stops.js';

Mapbox.setAccessToken(AccessCodes.mapbox);

export default class WalkTo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            trainListArr: []
        };

        this.loadTrains = this.loadTrains.bind(this);
    }

    // Load and display incoming trains
    loadTrains() {
        var rawTrains = [];
        var incomingTrainData;
        let that = this;

        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:5000', true);

        // When data is pulled from server: get coords and color of coordinating stop and add incoming train to array.
        xhr.onload = function() {
            incomingTrainData = JSON.parse(xhr.responseText);

            for (stop in incomingTrainData) {
                var lat, long;

                for (listStop of stops.data) {
                    if (listStop[0] == stop) {
                        lat = parseFloat(listStop[4]);
                        long = parseFloat(listStop[5]);
                    }
                }

                for (train of incomingTrainData[stop]) {
                    if (incomingTrainData[stop].indexOf(train) < 3) {
                        var stopColor;

                        switch (String(stop[0]).substring(0, 1)) {
                            case "1":
                                stopColor = "red";
                                break;
                            case "2":
                                stopColor = "red";
                                break;
                            case "3":
                                stopColor = "red";
                                break;
                            case "4":
                                stopColor = "green";
                                break;
                            case "5":
                                stopColor = "green";
                                break;
                            case "6":
                                stopColor = "green";
                                break;
                            case "N":
                                stopColor = "yellow";
                                break;
                            case "Q":
                                stopColor = "yellow";
                                break;
                            case "R":
                                stopColor = "yellow";
                                break;
                            case "A":
                                stopColor = "blue";
                                break;
                            case "C":
                                stopColor = "blue";
                                break;
                            case "E":
                                stopColor = "blue";
                                break;
                            case "B":
                                stopColor = "orange";
                                break;
                            case "D":
                                stopColor = "orange";
                                break;
                            case "F":
                                stopColor = "orange";
                                break;
                            case "M":
                                stopColor = "orange";
                                break;
                            case "G":
                                stopColor = "lightgreen";
                                break;
                            case "J":
                                stopColor = "#cd7f32";
                                break;
                            case "Z":
                                stopColor = "#cd7f32";
                                break;
                            case "L":
                                stopColor = "grey";
                                break;
                            case "S":
                                stopColor = "grey";
                                break;
                            case "7":
                                stopColor = "purple";
                                break;
                            case "9":
                                stopColor = "purple";
                                break;
                            case "H":
                                stopColor = "blue";
                                break;
                        }

                        rawTrains.push(
                            {
                                id: stop + train.toString(),
                                color: stopColor,
                                lat: lat,
                                long: long
                            }
                        );
                    }
                }
            }

            // Convert array into an array of custom React Native components.
            var trainListArr = rawTrains.map(trainInfo => (
                <Radius
                    key={trainInfo.id}
                    id={trainInfo.id}
                    color={trainInfo.color}
                    lat={trainInfo.lat}
                    long={trainInfo.long}
                    size={75}
                />
            ))
            // Set array of Radius annotation to state, then placed as child of MapView.
            that.setState({ trainListArr })
        };
        xhr.send();
    }

    render() {
        initStops = [];

        for (stop of stops.data){
            if (stop[4] && stop[5] && (stop[0].slice([stop[0].length - 1], [stop[0].length]) != "N" && stop[0].slice([stop[0].length - 1], [stop[0].length]) != "S")) {

                var stopColor;
                var textColor = "white";

                switch (String(stop[0]).substring(0, 1)) {
                    case "1":
                        stopColor = "red";
                        break;
                    case "2":
                        stopColor = "red";
                        break;
                    case "3":
                        stopColor = "red";
                        break;
                    case "4":
                        stopColor = "green";
                        break;
                    case "5":
                        stopColor = "green";
                        break;
                    case "6":
                        stopColor = "green";
                        break;
                    case "N":
                        stopColor = "yellow";
                        textColor = "black";
                        break;
                    case "Q":
                        stopColor = "yellow";
                        textColor = "black";
                        break;
                    case "R":
                        stopColor = "yellow";
                        textColor = "black";
                        break;
                    case "A":
                        stopColor = "blue";
                        break;
                    case "C":
                        stopColor = "blue";
                        break;
                    case "E":
                        stopColor = "blue";
                        break;
                    case "B":
                        stopColor = "orange";
                        break;
                    case "D":
                        stopColor = "orange";
                        break;
                    case "F":
                        stopColor = "orange";
                        break;
                    case "M":
                        stopColor = "orange";
                        break;
                    case "G":
                        stopColor = "lightgreen";
                        break;
                    case "J":
                        stopColor = "#cd7f32";
                        break;
                    case "Z":
                        stopColor = "#cd7f32";
                        break;
                    case "L":
                        stopColor = "grey";
                        break;
                    case "S":
                        stopColor = "grey";
                        break;
                    case "7":
                        stopColor = "purple";
                        break;
                    case "H":
                        stopColor = "blue";
                        break;
                }

                initStops.push(
                    {
                        id: stop[0],
                        color: stopColor,
                        text: String(stop[0]).substring(0, 1),
                        textColor: textColor,
                        lat: parseFloat(stop[4]),
                        long: parseFloat(stop[5])
                    }
                )
            }
        }

        stopListArr = initStops.map(stopInfo => (
            <Stop
                key={stopInfo.id}
                id={stopInfo.id}
                line={stopInfo.text}
                color={stopInfo.color}
                textColor={stopInfo.textColor}
                lat={stopInfo.lat}
                long={stopInfo.long}
            />
        ))

        return (
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    styleURL={AccessCodes.mbstyle}
                    logoIsHidden={true}
                    compassIsHidden={true}

                    initialCenterCoordinate={{ latitude: 40.744683, longitude: -73.984853 }}
                    initialZoomLevel={14}
                    initialDirection={0}
                    rotateEnabled={true}
                    scrollEnabled={true}
                    zoomEnabled={true}

                    showsUserLocation={true}
                    userTrackingMode={Mapbox.userTrackingMode.follow}
                    onRegionDidChange={ () => {debounce(this.loadTrains(), 2000)} }
                >
                    {stopListArr}
                    {this.state.trainListArr}
                </MapView>
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
