import React, { useState } from "react";
import { Modal, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import { CalendarDays } from "../Calendar/Calendar";

const FloatingButton = (): JSX.Element => {
    const [modalVisible, setModalVisible] = useState(false);


    return (
        <>
            <TouchableOpacity
                onPress={() => {
                    setModalVisible(!modalVisible);
                }}
                style={styles.TouchableOpacityStyle}
            >
                <Icon
                    name='add'
                    color='#fff'
                    size={25}
                />
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.headerModal}>
                            <TouchableHighlight
                                style={{
                                    right: -300
                                }}
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Text style={styles.textStyle}>X</Text>
                            </TouchableHighlight>

                        </View>
                        <CalendarDays />
                    </View>


                </View>
            </Modal>


        </>
    );

}


const styles = StyleSheet.create({

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        backgroundColor: "white",
        borderRadius: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '90%',
        height: '95%'
    },

    TouchableOpacityStyle: {
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        width: 50,
        height: 50,
        right: 30,
        bottom: 5,
        backgroundColor: "#F6A096",
        borderRadius: 50
    },

    headerModal: {
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 15,
        marginRight: 15,

        flexDirection: "row",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "90%",
    },
    textStyle: {
        fontSize: 15
    },
});

export default FloatingButton;