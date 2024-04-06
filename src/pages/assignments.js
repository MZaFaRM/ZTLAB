import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {login} from '../api/auth';
import Icon from '../components/icons';
import {Colors} from '../constants/constants';
import {Fonts} from '../constants/constants';
import Layout from '../components/layout/layout';
import {pages} from '../constants/constants';
import {AssignmentsTable} from '../components/assignments/assignments';
import {getAssignmentInfo} from '../api/info';

import AsyncStorage from '@react-native-async-storage/async-storage';


export default function AssignmentsPage({navigation}) {
  const [AssignmentsData, setAssignmentsData] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getAssignmentInfo()
      .then(response => {
        setAssignmentsData(response.data);
        setIsLoading(false);
        AsyncStorage.setItem('assignments', JSON.stringify(response.data));
      })
      .catch(err => {
        setIsLoading(false);
      });
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Layout navigation={navigation} currentPage={pages.assignments}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.AssignmentsPage}>
            <View>
              <Text style={[Fonts.Heading1, {color: Colors.DarkGrey}]}>
                Assignments
              </Text>
            </View>
            <AssignmentsTable AssignmentsData={AssignmentsData} />
          </ScrollView>
        </Layout>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  AssignmentsPage: {
    padding: 20,
  },
});
