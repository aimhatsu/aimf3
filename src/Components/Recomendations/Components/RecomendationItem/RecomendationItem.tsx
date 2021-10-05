import React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { config } from "../../../../Utils/ConfigDeviceView";

const RecomendationItem = (props: any): JSX.Element => {
    const { item } = props;
    return (
        <>
            <View style={styles.mainCardSlide}>

                <View style={styles.containerImage}>
                    <ImageBackground
                        source={
                            {
                                uri: item.imagem
                            }
                        }
                        style={styles.imageBackground}>

                        <View style={styles.textImageContent}>
                            <Text style={styles.textImageTitle}>{item.tratamento}</Text>
                            <Text style={styles.textImageSubTitle}>{item.quantidade}</Text>
                        </View>

                    </ImageBackground>
                </View>

                <View style={styles.textContainer}>

                    <View style={styles.textStep}>
                        <Text style={styles.textTitleContent}>
                            {item.title1}
                        </Text>
                        <Text style={styles.textDescription}>
                            {item.txt1}
                        </Text>
                    </View>

                    <View style={styles.textStep}>
                        <Text style={styles.textTitleContent}>
                            {item.title2}
                        </Text>
                        <Text style={styles.textDescription}>
                            {item.txt2}
                        </Text>
                    </View>
                </View>

            </View>
        </>
    );
}

const styles = StyleSheet.create({
    mainCardSlide: {
        height: config.deviceHeight * 0.5,
        width: config.deviceWidth * 0.35,
        borderRadius: 15,
        backgroundColor: Colors.white,
        shadowColor: Colors.shadow,
        shadowOpacity: 1,
        shadowRadius: 8,
        elevation: 8,
        marginTop: 6,
        marginBottom: 6,
        marginLeft: 15,

    },
    containerImage: {
        flexDirection: "column",
        height: '40%',
    },
    imageBackground: {
        flex: 1,
        resizeMode: "cover",
        alignItems: "center",
    },
    textImageTitle: {
        color: "#2592A1",
        shadowColor: "#00000029",
        shadowOpacity: 1,
        shadowRadius: 8,
        fontWeight: "bold",

    },
    textImageSubTitle: {
        color: "#707070",
        shadowColor: "#00000029",
        shadowOpacity: 1,
        shadowRadius: 8,
        fontSize: 10
    },
    textContainer: {
        
    },
    textStep: {
        margin: 8
    },
    textTitleContent: {
        color: "#F59F95",
        fontSize: 7
    },
    textDescription: {
        marginTop: 5,
        color: "#6A6A6A",
        opacity: 1,
        fontSize: 9
    },
    textImageContent: {
        display: "flex",
        top: 0,
        alignItems: "center"
    },
});

export default RecomendationItem;