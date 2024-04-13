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

export default function AlertsPage({navigation}) {
  const [AlertsData, setAlertsData] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Layout navigation={navigation} currentPage={pages.alerts}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.AlertsPage}>
          <View>
            <Text style={[Fonts.Heading1, {color: Colors.DarkGrey}]}>
              Alerts
            </Text>
          </View>
          <UnderConstruction />
        </ScrollView>
      )}
    </Layout>
  );
}

const styles = StyleSheet.create({
  AlertsPage: {
    padding: 20,
  },
});
