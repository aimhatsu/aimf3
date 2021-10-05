import { StyleSheet } from "react-native";
import { config } from "./Utils/ConfigDeviceView";

export const styleslogin = StyleSheet.create({

    //Login
    searchSection: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    searchIcon: {
        padding: 10,
    },
    input: {
        marginLeft: 10,
        flex: 1,
        paddingRight: 10,
        paddingLeft: 0,
        backgroundColor: '#fff',
        color: '#424242',
    },
    formLoginContent: {
        margin: 50,
        backgroundColor: "#fff",
        height: "100%",
    },
    buttonLogin: {
        height: config.deviceHeight * 0.06,
        backgroundColor: '#5AAEB9',
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
        marginTop: 5


    },
    textButtonLogin: {
        color: "#FFFFFF",
    },
    //End Login

    appContainer: {
        backgroundColor: "#fff",
        width: "100%"
    }


});