import {React, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Minesweeper from './Minesweeper';
import {ScrollView} from 'react-native-virtualized-view';
import {getSurvey, getUserInfo} from '../api/info';
import OverallAttendance from '../components/homepage/attendance';
import Menu from '../components/homepage/menu';
import TimeTable from '../components/homepage/timeTable';
import Icon from '../components/icons';
import Layout from '../components/layout/layout';
import {Colors, Fonts, pages} from '../constants/constants';
import AppStyles from '../constants/styles';
import {handleUnauthorizedAccess} from '../api/auth';

export default function SurveyPage({navigation}) {
  const [isLoading, setIsLoading] = useState(false);
  const [surveyData, setSurveyData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // const response = await getSurvey();

        const surveyData = [
          {
            end_date: '09/05/2024',
            id: '1',
            session: 'Feedback evensem',
            start_date: '01/05/2024',
            status: 'Not Completed',
            survey: 'Feedback even sem',
            url: '/survey/user/answer/519',
          },
          {
            end_date: '15/02/2024',
            id: '2',
            session: 'CE-CST301-CSE 2021',
            start_date: '29/01/2024',
            status: 'Completed',
            survey:
              'CE-CST301-CSE 2021 :  FORMAL LANGUAGES AND AUTOMATA THEORY',
            url: null,
          },
          {
            end_date: '20/01/2024',
            id: '3',
            session: 'CE-CSL333-CSE 2021',
            start_date: '10/01/2024',
            status: 'Completed',
            survey: 'CE-CSL333-CSE 2021 :  DATABASE MANAGEMENT SYSTEMS LAB',
            url: null,
          },
          {
            end_date: '20/01/2024',
            id: '4',
            session: 'CE-CST309-CSE 2021',
            start_date: '10/01/2024',
            status: 'Completed',
            survey: 'CE-CST309-CSE 2021 :  MANAGEMENT OF SOFTWARE SYSTEMS',
            url: null,
          },
          {
            end_date: '15/01/2024',
            id: '5',
            session: 'CE-CSL331-CSE 2021',
            start_date: '10/01/2024',
            status: 'Not Completed',
            survey:
              'CE-CSL331-CSE 2021 :  SYSTEM SOFTWARE AND MICROPROCESSORS LAB',
            url: null,
          },
          {
            end_date: '15/01/2024',
            id: '6',
            session: 'CE-CST305-CSE 2021',
            start_date: '10/01/2024',
            status: 'Completed',
            survey: 'CE-CST305-CSE 2021 :  SYSTEM SOFTWARE',
            url: null,
          },
          {
            end_date: '12/01/2024',
            id: '7',
            session: 'CE-CST303-CSE 2021',
            start_date: '05/01/2024',
            status: 'Not Completed',
            survey: 'CE-CST303-CSE 2021 :  COMPUTER NETWORKS',
            url: null,
          },
          {
            end_date: '23/01/2024',
            id: '8',
            session: 'CE-CST307-CSE 2021',
            start_date: '12/12/2023',
            status: 'Completed',
            survey:
              'CE-CST307-CSE 2021 :  MICROPROCESSORS AND MICROCONTROLLERS',
            url: null,
          },
          {
            end_date: '08/01/2024',
            id: '9',
            session: 'CE-MCN301-CSE 2021',
            start_date: '03/01/2024',
            status: 'Not Completed',
            survey: 'CE-MCN301-CSE 2021 :  DISASTER MANAGEMENT',
            url: null,
          },
          {
            end_date: '13/12/2023',
            id: '10',
            session: 'Evaluation II',
            start_date: '06/12/2023',
            status: 'Completed',
            survey: 'Evaluation II AY:23:24',
            url: null,
          },
          {
            end_date: '14/11/2023',
            id: '11',
            session: 'Evaluation I AY:23-24',
            start_date: '10/11/2023',
            status: 'Completed',
            survey: 'Evaluation I AY:23-24',
            url: null,
          },
          {
            end_date: '16/11/2023',
            id: '12',
            session: 'EVALUATION I',
            start_date: '09/11/2023',
            status: 'Not Completed',
            survey: 'EVALUATION I (AY:23-24)',
            url: null,
          },
          {
            end_date: '16/11/2023',
            id: '13',
            session: 'EVALUATION I',
            start_date: '09/11/2023',
            status: 'Not Completed',
            survey: 'EVALUATION I (AY:23-24)',
            url: null,
          },
          {
            end_date: '16/10/2023',
            id: '14',
            session: 'Faculty evaluation',
            start_date: '10/10/2023',
            status: 'Completed',
            survey: 'FACULTY EVALUATION 1',
            url: null,
          },
          {
            end_date: '14/11/2023',
            id: '15',
            session: 'Faculty evaluation',
            start_date: '09/10/2023',
            status: 'Completed',
            survey: 'Faculty Evaluation',
            url: null,
          },
          {
            end_date: '16/10/2023',
            id: '16',
            session: 'Faculty evaluation',
            start_date: '09/10/2023',
            status: 'Completed',
            survey: 'Faculty Evaluation',
            url: null,
          },
          {
            end_date: '16/10/2023',
            id: '17',
            session: 'Faculty evaluation',
            start_date: '09/10/2023',
            status: 'Completed',
            survey: 'Faculty Evaluation',
            url: null,
          },
          {
            end_date: '16/10/2023',
            id: '18',
            session: 'Faculty evaluation',
            start_date: '09/10/2023',
            status: 'Not Completed',
            survey: 'Feed back 1',
            url: null,
          },
          {
            end_date: '14/07/2023',
            id: '19',
            session: 'CE-CSL204-CSE 2021',
            start_date: '09/07/2023',
            status: 'Completed',
            survey: 'CE-CSL204-CSE 2021 :  OPERATING SYSTEMS LAB',
            url: null,
          },
          {
            end_date: '18/07/2023',
            id: '20',
            session: 'CE-CSL202-CSE 2021',
            start_date: '13/07/2023',
            status: 'Not Completed',
            survey: 'CE-CSL202-CSE 2021 :  DIGITAL LAB',
            url: null,
          },
          {
            end_date: '14/07/2023',
            id: '21',
            session: 'CE-CST204-CSE 2021',
            start_date: '12/07/2023',
            status: 'Completed',
            survey: 'CE-CST204-CSE 2021 :  DATABASE MANAGEMENT SYSTEMS',
            url: null,
          },
          {
            end_date: '10/07/2023',
            id: '22',
            session: 'CE-MCN202-CSE 2021',
            start_date: '05/07/2023',
            status: 'Completed',
            survey: 'CE-MCN202-CSE 2021 :  CONSTITUTION OF INDIA',
            url: null,
          },
          {
            end_date: '31/07/2023',
            id: '23',
            session: 'CE-CST202-CSE 2021',
            start_date: '01/07/2023',
            status: 'Completed',
            survey:
              'CE-CST202-CSE 2021 :  COMPUTER ORGANISATION AND ARCHITECTURE',
            url: null,
          },
          {
            end_date: '05/07/2023',
            id: '24',
            session: 'CE-CST206-CSE 2021',
            start_date: '26/06/2023',
            status: 'Completed',
            survey: 'CE-CST206-CSE 2021 :  OPERATING SYSTEMS',
            url: null,
          },
          {
            end_date: '26/06/2023',
            id: '25',
            session: 'CE-EST200-CSE 2021',
            start_date: '20/06/2023',
            status: 'Completed',
            survey: 'CE-EST200-CSE 2021 :  DESIGN & ENGINEERING',
            url: null,
          },
        ];
        setSurveyData(surveyData);
      } catch (error) {
        console.error('Error fetching survey info:', error);
        handleUnauthorizedAccess(error, navigation);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Layout navigation={navigation} currentPage={pages.home}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        {isLoading ? (
          <Minesweeper />
        ) : (
          <View style={styles.container}>
            <Text style={[Fonts.Heading1, {color: Colors.DarkGrey}]}>
              Survey
            </Text>
            {surveyData.map((survey, index) => (
              <View key={index} style={styles.survey}>
                <Text style={styles.surveyHeading}>
                  {survey.survey.toUpperCase()}
                </Text>
                <View style={AppStyles.FlexBox}>
                  <View style={AppStyles.FlexLeft}>
                    <Text style={styles.surveyDetails}>
                      Session: {survey.session}
                    </Text>
                    <Text
                      style={
                        (styles.surveyDetails,
                        {color: Colors.Blue, fontSize: 12})
                      }>
                      {survey.start_date} - {survey.end_date}
                    </Text>
                  </View>
                  <View style={[AppStyles.FlexRight, {flex: 0}]}>
                    {survey.url ? (
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate(pages.main, {
                            screen: pages.surveyPage,
                          })
                        }
                        style={[AppStyles.BlueButton, AppStyles.CustomButton]}>
                        <Icon
                          type="FontAwesome5"
                          name="external-link-alt"
                          size={12}
                          color={Colors.Blue}
                        />
                        <Text
                          style={[
                            Fonts.Body,
                            AppStyles.BlueText,
                            {marginLeft: 10, fontSize: 12},
                          ]}>
                          Visit Survey
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <View
                        style={{
                          flexDirection: 'row',
                          ...AppStyles.CustomButton,
                        }}>
                        {survey.status === 'Completed' ? (
                          <>
                            <Icon
                              type="FontAwesome"
                              name="check"
                              size={12}
                              color={Colors.Green}
                            />
                            <Text
                              style={[
                                Fonts.Body,
                                styles.surveyDetails,
                                {marginLeft: 10},
                              ]}>
                              {survey.status}
                            </Text>
                          </>
                        ) : (
                          <>
                            <Icon
                              type="FontAwesome"
                              name="remove"
                              size={12}
                              color={Colors.Red}
                            />
                            <Text
                              style={[
                                Fonts.Body,
                                styles.surveyDetails,
                                {marginLeft: 10},
                              ]}>
                              {survey.status}
                            </Text>
                          </>
                        )}
                      </View>
                    )}
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 25,
    paddingTop: 15,
  },
  survey: {
    padding: 30,
    marginVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.LightGrey,
  },
  surveyHeading: {
    ...Fonts.Body,
    color: Colors.DarkGrey,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  surveyDetails: {
    ...Fonts.Body,
    color: Colors.Grey,
    fontSize: 12,
    marginBottom: 5,
  },
});
