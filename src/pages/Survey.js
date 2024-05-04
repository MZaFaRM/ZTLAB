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
        const response = await getSurvey();
        setSurveyData(response.data);
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
    padding: 25,
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
