import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState, Component } from 'react';
import { ScrollView } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import Api from '../../Utils/Api';
import { IsMock } from '../../Utils/IsMock';
import { Storage_Token } from '../../Utils/KeyStorage';
const schedule = require('../../Mock/Schedule.json');

LocaleConfig.locales['pt-br'] = {
  monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
  monthNamesShort: ['Jan.', 'Fev.', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
  dayNames: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
  dayNamesShort: ['Don', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
  today: ''
};
LocaleConfig.defaultLocale = 'pt-br';

export const CalendarDays = (): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false);

  const [calendar, setCalendar] = useState<any>();

  useEffect(() => {

    AsyncStorage.getItem(Storage_Token).then((token) => {

      if (token) {
        Api({
          method: 'get',
          url: 'agenda',
          headers: {
            bearer: token
          }
        }).then(async (res) => {
          if (IsMock) {
            setCalendar(schedule);
          } else {
            setCalendar(res.data);
          }
          setLoading(false);
        }).catch((e) => {
          setCalendar(schedule);
          setLoading(false);
        }).finally(() => generatedMarkedDates());
      }


    });
  }, []);


  const generatedMarkedDates = () => {
    /*const marked =
      calendar.map((calen: any) => ({ date: calen.data, marked: { marked: true } }))
    let s = '{';
    marked.forEach((m: any) => {
      s += `'${m.date}': {marked: true },`
    });
    s += "}"
    console.log("🚀 ~ ", s)
    return s;*/
    const marked =
      calendar.map((calen: any) => ({ date: calen.data, marked: { marked: true } }))
      let t = marked.map((d: any) => ({[`${d.date}`] : { marked: true }} ))
      return t
  }

  return (
    <ScrollView>
      {
        !loading &&
        <Calendar

          markedDates={{
            '2012-05-15': {marked: true, dotColor: '#50cebb'},

          }}

        />
      }
    </ScrollView>
  );

}
