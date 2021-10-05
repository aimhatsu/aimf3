import React from "react";
import { Image, PixelRatio, StyleSheet, Text, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { LogoMIA } from '../../Assets/';

const AppBar = (): JSX.Element => {
    return (
        <>
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                colors={["#01426A", "#2694A3"]}

            >

                <View style={styles.header} >
                    <View style={styles.imageContent}>
                        <Image style={styles.image} source={LogoMIA} />
                    </View>
                </View>
            </LinearGradient>
        </>

    );
};

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: PixelRatio.getPixelSizeForLayoutSize(50.18),
        display: "flex",
        justifyContent: "center"

    },
    textColor: {
        color: "#FFF",
        fontWeight: "bold"
    },
    text: {
        color: "#FFF",
        fontSize: 10,
        fontWeight: "bold"
    },
    imageContent: {
        width: 15,
        marginLeft: 15,
        textDecorationColor: "#FFF",
        color: "#FFF"
    },
    image:{
        height: 100,
        width: 210,
        resizeMode: "cover",
    }
});

export default AppBar;