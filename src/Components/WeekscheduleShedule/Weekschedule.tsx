import React from "react";
import { Dimensions, FlatList, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import IconWeek from "./Components/IconWeek";


const WeekscheduleShedule = (): JSX.Element => {

    const DATA = [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba'
        },
        {
            id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63'
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d72'
        },
        {
            id: '58694a90-3da1-471f-bd96-145571e29d72'
        },
        {
            id: 'sd7acbea-c1b1-46c2-aed5-3ad53abb28ba'
        },
        {
            id: 'sac68afc-c605-48d3-a4f8-fbd91aa97f63'
        },
        {
            id: 's8694a0f-3da1-471f-bd96-145571e29d72'
        },
        {
            id: 's8694a90-3da1-471f-bd96-145571e29d72'
        },
    ];

    const renderItem = () => (
        <IconWeek />
    );

    return (
        <View style={styles.weekschedule}>

            <View>
                <Text style={styles.dayNumberSelected} >
                    Setembro 6
                </Text>
                <Text style={styles.daySelected}>
                    Quinta-feira
                </Text>
            </View>

            <View>
                <FlatList
                    data={DATA}
                    horizontal={true}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    weekschedule: {
        margin: 15
    },
    dayNumberSelected: {
        color: "#02456C",
        fontSize: 14,
        letterSpacing: 2.1
    },
    daySelected: {
        color: "#2694A3",
        fontSize: 18,
        fontWeight: "bold",
        opacity: 1
    },

});

export default WeekscheduleShedule;