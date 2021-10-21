import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View } from 'react-native';
import moment from 'moment';
import { StringUtils } from '../../Utils/StringUtils';
import { DateUtils } from '../../Utils/DateUtils';
import IconWeek from './Components/IconWeek';
import { Loader } from '../Loader/Loader';
import Api from '../../Utils/Api';
import { Storage_Token } from '../../Utils/KeyStorage';

const Weekschedule = (props: any): JSX.Element => {
  const { item } = props;
  const [loader, setLoader] = useState<boolean>(false);

  const agendar = (item: any, hour: any) => {
    var data = new FormData();
    const splitHour = hour.split(':');
    const dateIso = moment(
      new Date(
        new Date().getFullYear(),
        item.item.month,
        item.item.day,
        splitHour[0],
        splitHour[1]
      )
    ).format('YYYY-MM-DDTHH:mm:ss.sss-0300');
    data.append('dataiso', dateIso);

    setLoader(true);
    AsyncStorage.getItem(Storage_Token).then((storageData) => {
      Api({
        method: 'post',
        url: `agendar/${props.tratamento}/Ivaipora`,
        headers: {
          bearer: storageData,
        },
        data: data,
      })
        .then(async (res) => {
          console.log(`res`, res);

          setLoader(false);
        })
        .catch((err) => console.log(err));
    });
  };

  return (
    <>
      <Loader loading={loader} />
      <View style={styles.container}>
        <View style={styles.containerWeek}>
          <View style={styles.containerDay}>
            <Text style={styles.dayNumberSelected}>
              {DateUtils.toNameMonth(item.item.month)} {item.item.day}
            </Text>
            <Text style={styles.daySelected}>
              {StringUtils.capitalized(item.item.dayWeek)}
            </Text>
          </View>

          <View style={styles.grid}>
            {props.item.item.officeHour1.map(
              (item: any) =>
                !item.unavailable && (
                  <IconWeek
                    key={item.id}
                    hour={item.hour}
                    onPress={() => agendar(props.item, item.hour)}
                  />
                )
            )}
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: '#02456C',
    marginBottom: 15,
    borderRadius: 15,
  },
  containerWeek: {
    marginBottom: 15,
  },
  containerDay: {
    marginBottom: 5,
  },
  dayNumberSelected: {
    marginLeft: 5,
    color: '#02456C',
    fontSize: 14,
    letterSpacing: 2.1,
  },
  daySelected: {
    marginLeft: 5,
    color: '#2694A3',
    fontSize: 18,
    fontWeight: 'bold',
    opacity: 1,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default Weekschedule;
