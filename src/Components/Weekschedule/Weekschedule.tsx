import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { StringUtils } from "../../Utils/StringUtils";
import { DateUtils } from "../../Utils/DateUtils";
import IconWeek from "./Components/IconWeek";


const Weekschedule = (props: any): JSX.Element => {
    const { item } = props;

    const renderItem = (item: any) => {
        if (item.item.active) {
            return (
                <IconWeek hour={item.item.hour} />
            )

        }
        return (<></>)
    };

    return (
        <View style={styles.container}>
            <View style={styles.containerWeek}>

                <View style={styles.containerDay}>
                    <Text style={styles.dayNumberSelected} >
                        {DateUtils.toNameMonth(item.item.month)} {item.item.day}
                    </Text>
                    <Text style={styles.daySelected}>
                        {StringUtils.capitalized(item.item.dayWeek)}-feira
                    </Text>
                </View>

                <View>

                    <FlatList
                        data={props.item.item.officeHour1}
                        horizontal={true}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                    />
                    <FlatList
                        data={props.item.item.officeHour2}
                        horizontal={true}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                    />
                </View>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderColor: "#02456C",
        marginBottom: 15,
        borderRadius: 15
    },
    containerWeek: {
        marginBottom: 15

    },
    containerDay: {
        marginBottom: 5
    },
    dayNumberSelected: {
        marginLeft: 5,
        color: "#02456C",
        fontSize: 14,
        letterSpacing: 2.1
    },
    daySelected: {
        marginLeft: 5,
        color: "#2694A3",
        fontSize: 18,
        fontWeight: "bold",
        opacity: 1
    },

});

export default Weekschedule;