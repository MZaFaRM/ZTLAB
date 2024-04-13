import React, {useState} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Layout from '../components/layout/layout';
import {Colors, Fonts, pages} from '../constants/constants';

import {UnderConstruction} from '../components/underConstruction';

export default function AssignmentsPage({navigation}) {
  const [AssignmentsData, setAssignmentsData] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Layout navigation={navigation} currentPage={pages.assignments}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.AssignmentsPage}>
          <View>
            <Text style={[Fonts.Heading1, {color: Colors.DarkGrey}]}>
              Assignments
            </Text>
          </View>
          <UnderConstruction />
          {/* <AssignmentsTable AssignmentsData={AssignmentsData} /> */}
        </ScrollView>
      )}
    </Layout>
  );
}

const styles = StyleSheet.create({
  AssignmentsPage: {
    padding: 20,
  },
});

// useEffect(() => {
//   setIsLoading(true);
//   getAssignmentInfo()
//     .then(response => {
//       setAssignmentsData(response.data);
//       setIsLoading(false);
//       AsyncStorage.setItem('assignments', JSON.stringify(response.data));
//     })
//     .catch(err => {
//       setIsLoading(false);
//     });
// }, []);
