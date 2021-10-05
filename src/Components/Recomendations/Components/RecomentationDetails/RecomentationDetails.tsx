import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import React, { useState, useEffect } from "react";
import { FlatList, ImageBackground, Modal, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import Api from "../../../../Utils/Api";
import { config } from "../../../../Utils/ConfigDeviceView";
import { IsMock } from "../../../../Utils/IsMock";
import { Storage_Token } from "../../../../Utils/KeyStorage";
import { Loader } from "../../../Loader/Loader";
import Weekschedule from "../../../Weekschedule/Weekschedule";
const scheduledMock = require('../../../../Mock/Scheduled.json')
const gridMock = require('../../../../Mock/Grid.json')

const RecomendationDetails = (props: any): JSX.Element => {
    const [scheduled, setScheduled] = useState<Array<any>>([]);
    const [grid, setGrid] = useState<any>();
    const [gridMonth, setGridMonth] = useState<any>();
    const [duration, setDuration] = useState<any>();

    const [modalVisible, setModalVisible] = useState(false);
    const { recomendationDetails } = props;
    const [loader, setLoader] = useState<boolean>(false);


    useEffect(() => {

        //const duration = recomendationDetails.EspecialistaIndicado[0].servicos.find((servico: any) => servico.servico == recomendationDetails.DetalhesDoTratamento[0].tratamento).duracao

        //getDuration(duration, recomendationDetails.DetalhesDoTratamento[0].tratamento)
        async function get() {

            setScheduled(await getScheduled());


            setGrid(await getGrid());

        }
        get()

    }, [])

    const getDuration = (duration: any, tratament: string) => {
        const durations = duration.split(":");
        if (durations[0] != '00') {
            setDuration({
                type: "hours",
                value: parseInt(durations[0])

            })
            return;
        }

        setDuration({
            type: "minutes",
            value: parseInt(durations[1])

        })

    }

    const getScheduled = (): Promise<Array<any>> => {
        return new Promise((resolve) => {
            /*
            setToken(data);
            Api({
                method: 'get',
                url: `agendados/${recomendationDetails.EspecialistaIndicado[0]._id.$oid}`,
                headers: {
                    bearer: token
                }
                }).then(async (res) => {
                    if (IsMock) {
                        resolve(scheduledMock);
                    } else {
                        resolve(res.data);
                    }
                    
                    resolve({});
                }).catch((erro) => {
                    resolve(scheduledMock);
                });
            })*/
            AsyncStorage.getItem(Storage_Token).then((data: any) => {

                var myHeaders = new Headers();
                myHeaders.append("Bearer", data);

                var requestOptions = {
                    method: 'GET',
                    headers: myHeaders,
                    redirect: 'follow'
                };

                fetch(`https://aimclient.herokuapp.com/agendados/${recomendationDetails.EspecialistaIndicado[0]._id.$oid}`, requestOptions)
                    .then(response => response.text())
                    .then(result => {
                        resolve(JSON.parse(result))
                    })
                    .catch(error => console.log('error', error));
            });

        })
    }

    const getGrid = (): Promise<Array<any>> => {
        return new Promise((resolve) => {
            /*Api({
                method: 'get',
                //url: `grade/${recomendationDetails.EspecialistaIndicado[0]._id.$oid}`,
                headers: {
                    bearer: token
                }
            }).then(async (res) => {
                if (IsMock) {
                    resolve(gridMock);
                } else {
                    resolve(res.data);
                }
                resolve({});
            }).catch((erro) => {
            });*/
            resolve(gridMock);
        })
    }

    const generateDaysMonth = async () => {
        setLoader(true);
        var names = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];
        var date = new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate()
        );

        var result: Array<any> = [];

        while (date.getMonth() == new Date().getMonth()) {


            if (grid.result[names[date.getDay()]] === 'aberto') {
                result.push(
                    {
                        day: date.getDate(),
                        dayWeek: names[date.getDay()],
                        month: date.getMonth() + 1
                    }
                );

            }
            date.setDate(date.getDate() + 1);
        }
        let daysMonth = result.map((day: any) => {


            return (
                {
                    ...day,
                    officeHour1: getOfficeHour(day, grid.result[`${day.dayWeek}-abr1`], grid.result[`${day.dayWeek}-fec1`]),
                    officeHour2: getOfficeHour(day, grid.result[`${day.dayWeek}-abr2`], grid.result[`${day.dayWeek}-fec2`])
                }

            )
        });
        setGridMonth(daysMonth);
        setModalVisible(!modalVisible);
        setLoader(false);
    }

    const getOfficeHour = (day: any, open: any, close: any) => {

        let officeHour = [open]

        let exit = false
        while (!exit) {
            let hour = moment(officeHour[officeHour.length - 1], 'HH:mm').add(30, 'minutes').format('HH:mm')

            officeHour.push(hour);

            if (officeHour[officeHour.length - 1] == close) {
                exit = true;
            }
        }

        return officeHour.map(hour => ({
            hour: hour,
            active: verifyAdd(day.day, hour)
        }));
    }

    const verifyAdd = (day: any, hour: any) => {
        const dayScheduled = scheduled.filter((shd: any) => shd.data == `${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`)

        if (dayScheduled.length > 0) {
            if ((dayScheduled.filter((shd: any) => shd.horario == hour).length > 0)) {
                return false
            }
        }
        return true;
    }

    const renderItem = (item: any) => {

        return (
            <View
                style={{ borderRadius: 15 }}
            >

                <Weekschedule

                    item={item}
                />
            </View>
        )
    };

    return (
        <>
            <View style={styles.mainCardView}>
                <View style={styles.containerImage}>
                    <ImageBackground
                        source={
                            {
                                uri: recomendationDetails.DetalhesDoTratamento[0].arquivo
                            }
                        }
                        style={styles.imageBackground}>

                        <View style={styles.textImageContent}>
                            <Text style={styles.textImageTitle}>{recomendationDetails.DetalhesDoTratamento[0].tratamento}</Text>
                            <Text style={styles.textImageSubTitle}>{recomendationDetails.DetalhesDoTratamento[0].quantidade}</Text>
                        </View>

                    </ImageBackground>
                </View>

                <View style={styles.textContainer}>

                    <View style={styles.textStep}>
                        <Text style={styles.textTitleContent}>
                            {recomendationDetails.DetalhesDoTratamento[0].title1}
                        </Text>
                        <Text style={styles.textDescription}>
                            {recomendationDetails.DetalhesDoTratamento[0].txt1}
                        </Text>
                    </View>

                    <View style={styles.textStep}>
                        <Text style={styles.textTitleContent}>
                            {recomendationDetails.DetalhesDoTratamento[0].title2}
                        </Text>
                        <Text style={styles.textDescription}>
                            {recomendationDetails.DetalhesDoTratamento[0].txt2}
                        </Text>
                    </View>

                    <View style={styles.textSpecialist}>
                        <Text style={styles.textTitleContent}>Especialista em Psicanálise</Text>
                        <Text style={styles.textDescription}> {recomendationDetails.EspecialistaIndicado[0].nome} </Text>
                    </View>

                    <View style={styles.textStep}>
                        <Text style={styles.textTitleContent}>Endereço</Text>
                        <Text style={styles.textAddress}>
                            {recomendationDetails.EspecialistaIndicado[0].endereco} -
                            {recomendationDetails.EspecialistaIndicado[0].cidade} - {recomendationDetails.EspecialistaIndicado[0].estado} -
                            {recomendationDetails.EspecialistaIndicado[0].cep}
                        </Text>
                    </View>
                </View>
                <View style={styles.buttonContainer}>

                    <TouchableHighlight
                        style={styles.button}
                        underlayColor='#ccc'
                        onPress={() => {
                            generateDaysMonth()
                        }}
                    >
                        <Text style={styles.textButton}> AGENDAR </Text>
                    </TouchableHighlight>
                </View>

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

                                <Text style={styles.shedule}>Horários disponíves</Text>

                                <TouchableHighlight
                                    onPress={() => setModalVisible(!modalVisible)}
                                >
                                    <Text style={styles.textStyle}>X</Text>
                                </TouchableHighlight>

                            </View>

                            <FlatList
                                data={gridMonth}
                                renderItem={renderItem}

                            />
                        </View>


                    </View>
                </Modal>
            </View>
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
    mainCardView: {
        height: config.deviceWidth * 1.2,
        borderRadius: 15,
        backgroundColor: Colors.white,
        shadowColor: Colors.shadow,
        shadowOpacity: 1,
        shadowRadius: 8,
        elevation: 8,
        marginTop: 6,
        marginBottom: 16,
        marginLeft: 16,
        marginRight: 16
    },
    containerImage: {
        flexDirection: "column",
        height: '30%',
        borderRadius: 15
    },
    imageBackground: {
        flex: 1,
        resizeMode: "cover",
        alignItems: "flex-start",
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
        fontSize: 15
    },
    textAddress: {
        color: "#0F7FFF",
        shadowColor: "#00000029",
        shadowOpacity: 1,
        shadowRadius: 8,
        fontSize: 12
    },
    textContainer: {

    },
    textStep: {
        margin: 8
    },

    textSpecialist: {
        margin: 8,
        paddingTop: 8
    },
    textTitleContent: {
        color: "#F59F95",
        fontSize: 10
    },
    textDescription: {
        marginTop: 5,
        color: "#6A6A6A",
        opacity: 1,
        fontSize: 12
    },
    textImageContent: {
        display: "flex",
        top: 0,
        alignItems: "center",
        margin: 10
    },
    buttonContainer: {
        bottom: 0,
        position: "absolute",
        width: '100%'
    },
    button: {
        height: config.deviceHeight * 0.08,
        backgroundColor: '#F6A096',
        justifyContent: "center",
        alignItems: "center",
        borderBottomEndRadius: 15,
        borderBottomStartRadius: 15

    },
    textButton: {
        color: "#FFFFFF",
        letterSpacing: 1.8

    },
    shedule: {
        color: "#2694A3",
        fontWeight: "bold",
        fontSize: 24,
    },
});

export default RecomendationDetails;