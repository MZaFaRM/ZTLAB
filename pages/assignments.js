import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {login} from '../api/auth';
import Icon from '../components/icons';
import {Colors} from '../constants/colors';
import {Fonts} from '../constants/fonts';
import Layout from '../components/layout/layout';

export default function AssignmentsPage({navigation}) {
  return (
    <>
      <Layout navigation={navigation}></Layout>
    </>
  );
}
