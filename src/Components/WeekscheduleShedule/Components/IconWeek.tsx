import React from "react";
import { Dimensions, StyleSheet, Text, TouchableHighlight } from "react-native";

const IconWeek = (): JSX.Element => {
    return (
        <TouchableHighlight
            style={styles.itemWeeks}
            underlayColor='#ccc'
            onPress={() => { }}
        >
            <Text style={styles.iconWeeks}> 11:30 </Text>
        </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
    iconWeeks: {
        color: "#228B9D",
        fontWeight: "bold"
    },
    itemWeeks: {
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        width: Dimensions.get('window').width * 0.15,
        height: Dimensions.get('window').width * 0.15,
        backgroundColor: '#2694A326',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: "#228B9D",
        borderWidth: 1.5,
        borderStyle: "dashed",
        margin: 4
    }

});

export default IconWeek;