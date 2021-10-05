import React, { useContext, useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Colors } from "react-native/Libraries/NewAppScreen";
import Api from "../../Utils/Api";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Storage_Token } from "../../Utils/KeyStorage";
import { LineChart, RadarChart as RadarChartWrapper } from "react-native-charts-wrapper";
import { config } from "../../Utils/ConfigDeviceView";
import { IsMock } from "../../Utils/IsMock";
import FloatingButton from "../FloatingButton/FloatingButton";
import { Loader } from "../Loader/Loader";
import { GlobalContext } from "../../Contexts/GlobalContext";
const home = require('../../Mock/Home.json')

const RadarChart = (): JSX.Element => {
    //const { setLoader } = useContext(GlobalContext);
    const [radarChart, setRadarChart] = useState<any>();
    const [loading, setLoading] = useState<boolean>(true);


    useEffect(() => {
        AsyncStorage.getItem(Storage_Token).then((token) => {

            if (token) {
                Api({
                    method: 'get',
                    url: 'home',
                    headers: {
                        bearer: token
                    }
                }).then(async (res) => {
                    if (IsMock) {
                        setRadarChart(home);
                    } else {
                        setRadarChart(res.data);
                    }
                    setLoading(false);
                }).catch(() => {
                    //setRadarChart(home);
                    setLoading(false);
                });
            }
        });

    }, []);

    const calcMedia = () => {
        return ((parseFloat(radarChart.RadarChartCard[0].corpo) +
            parseFloat(radarChart.RadarChartCard[0].mente) +
            parseFloat(radarChart.RadarChartCard[0].emocoes)) / 3).toFixed(1).replace('.', ',');
    }

    const convertDate = (date: string) => {
        const dateConvert: Array<string> = date.split("-");
        return `${dateConvert[2]}/${dateConvert[1]}/${dateConvert[0]}`;
    }
    return (
        <View>
            <Loader
                loading={loading}
            />

            <ScrollView>
                {
                    !loading &&
                    <>
                        <View style={styles.mainCardView}>
                            <View style={styles.profileContent}>
                                <Image
                                    style={styles.image}
                                    source={{
                                        uri: radarChart.HeaderRadarCard[0].foto
                                    }} />
                                <View>
                                    <Text style={styles.nameProfile}>{radarChart.HeaderRadarCard[0].nome}</Text>
                                    <Text style={styles.subProfile}>Meu Corpo 36Oº</Text>
                                    <Text style={styles.lastAnalysis}>Ultima análise às 5:37 PM, hoje</Text>
                                </View>

                            </View>

                            <LinearGradient
                                colors={["#F1C4BF", "#F1C4BF", "#C7A8A5"]}
                            >
                                <View style={styles.score}>
                                    <View style={styles.scoreContent}>
                                        <Text style={styles.scoreNumber}>{calcMedia()}</Text>
                                        <Text style={styles.scoreText}>Minha Pontuação</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.averageNumber}>{radarChart.MediaDaPopulacao[0].mediafinal.toFixed(1).replace('.', ',')}</Text>
                                        <Text style={styles.averageText}>Média da população</Text>
                                    </View>


                                </View>

                            </LinearGradient>


                            <View style={styles.container}>
                                <RadarChartWrapper style={styles.chart}
                                    data={{

                                        dataSets: [
                                            {
                                                values: [
                                                    {
                                                        value: parseFloat(radarChart.RadarChartCard[0].corpo),
                                                    },
                                                    {
                                                        value: parseFloat(radarChart.RadarChartCard[0].mente)
                                                    },
                                                    {
                                                        value: parseFloat(radarChart.RadarChartCard[0].emocoes)
                                                    }
                                                ],
                                                label: "Corpo, Mente e Emoções"
                                            }
                                        ]
                                    }}
                                />
                            </View>


                            <View style={styles.buttonContent}>

                                <TouchableOpacity
                                    style={styles.buttonCard}
                                    onPress={() => { }}
                                >
                                    <Text style={styles.textButtonCard}>CONTINUAR TESTES</Text>
                                </TouchableOpacity>
                            </View>

                        </View>

                        <View style={styles.mainCardView}>

                            <View style={styles.historyHeader}>
                                <Text style={styles.nameProfile}>MEU HISTÓRICO</Text>
                                <Text style={styles.subTitle}>Sua evolução na linha do tempo</Text>
                                <Text style={styles.dateHistory}>De {convertDate(radarChart.LinesChartCard[radarChart.LinesChartCard.length - 1].data)} à {convertDate(radarChart.LinesChartCard[0].data)}</Text>
                            </View>

                            {/*
                                <LinearGradient
                                    colors={["#F1C4BF", "#F1C4BF", "#C7A8A5"]}
                                >
                                    <View style={styles.score}>
                                        <View style={styles.scoreContent}>
                                            <Text style={styles.scoreNumber}>5</Text>
                                            <Text style={styles.scoreText}>Minha Pontuação</Text>
                                        </View>
                                        <View>
                                            <Text style={styles.averageNumber}>7,2</Text>
                                            <Text style={styles.averageText}>Média da população</Text>
                                        </View>

                                    </View>
                                </LinearGradient>
                            */}

                            <View style={
                                {
                                    flex: 1,
                                    backgroundColor: '#F5FCFF',
                                    marginTop: 20,
                                    marginBottom: 25

                                }
                            }>
                                <LineChart style={styles.chart}
                                    data={{
                                        dataSets: [{
                                            label: "",
                                            values: [
                                                {
                                                    y: parseFloat(radarChart.LinesChartCard[0].resultado),
                                                },
                                                {
                                                    y: parseFloat(radarChart.LinesChartCard[1].resultado)

                                                },
                                                { y: parseFloat(radarChart.LinesChartCard[2].resultado) }
                                            ]
                                        }]
                                    }}
                                />
                            </View>

                            <View style={styles.buttonContent}>

                                <TouchableOpacity
                                    style={styles.buttonCard}
                                    onPress={() => { }}
                                >
                                    <Text style={styles.textButtonCard}>NÃO ESTÁ SE SAINDO BEM?</Text>
                                </TouchableOpacity>
                            </View>

                        </View>

                    </>
                }
            </ScrollView>

            <FloatingButton />
        </View>
    );

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        marginTop: 20,

    },
    chart: {
        flex: 1
    },
    mainCardView: {
        height: config.deviceWidth * 1,
        borderRadius: 15,
        backgroundColor: Colors.white,
        shadowColor: Colors.shadow,
        shadowOpacity: 1,
        shadowRadius: 8,
        elevation: 8,
        marginTop: 6,
        marginBottom: 6,
        marginLeft: 16,
        marginRight: 16
    },

    profileContent: {
        flexDirection: 'row',
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 50,
        marginTop: 6,
        marginBottom: 6,
        marginLeft: 16,
        marginRight: 16,
    },
    subProfile: {
        fontSize: 12,
        color: "#3C3C3C"

    },
    lastAnalysis: {
        fontSize: 10,
        color: "#3C3C3C"

    },
    score: {
        width: '100%',
        height: config.deviceWidth * 0.15,
        marginTop: 4,
        opacity: 1,
        flexDirection: 'row',
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    scoreContent: {
        marginRight: 60
    },
    scoreNumber: {
        fontWeight: "bold",
        color: "#04486E",
        fontSize: 28,
        opacity: 1,
    },
    scoreText: {
        color: "#04486E",
        fontSize: 10,
        opacity: 1
    },

    nameProfile: {
        marginTop: 5,
        color: '#238E9E',
        opacity: 1,
        fontSize: 12,
        fontWeight: "bold"

    },

    averageNumber: {
        color: "#3C3C3C",
        fontWeight: "bold",
        fontSize: 28,
        opacity: 0.67
    },
    averageText: {
        color: "#3C3C3C",
        fontSize: 10,
        opacity: 1
    },
    buttonContent: {
        position: "absolute",
        bottom: 0,
        width: '100%'
    },
    buttonCard: {
        backgroundColor: '#2693A2',
        width: '100%',
        borderBottomEndRadius: 15,
        borderBottomStartRadius: 15,

    },
    textButtonCard: {
        marginTop: 10,
        marginBottom: 10,
        color: Colors.white,
        textAlign: "center"

    },
    historyHeader: {
        marginLeft: 35
    },
    subTitle: {
        color: "#208699",
        fontSize: 12,
        opacity: 1
    },
    dateHistory: {
        color: '#3C3C3C',
        fontSize: 12,
        opacity: 1
    },


    //Login

});

export default RadarChart;