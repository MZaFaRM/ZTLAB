import React from 'react';
import {View} from 'react-native';
import CustomDropdown from './menuDropdown';
import AppStyle from '../../constants/styles';
import {pages} from '../../constants/constants';

export default function Menu() {
  // prettier-ignore
  const dropdownItems = [
    {
      title: 'Academic Hub',
      icon: 'graduation',
      type: 'SimpleLineIcons',
      options: [
        {icon: 'book-open', title: 'Series exam', type: 'FontAwesome5', page: ''},
        {icon: 'book-search-outline', title: 'Results', type: 'MaterialCommunityIcons', page: ''},
        {icon: 'calendar-times', title: 'Exam Schedule', type: 'FontAwesome5', page: ''},
        {icon: 'bookshelf', title: 'Subjects', type: 'MaterialCommunityIcons', page: ''},
        {icon: 'chalkboard-teacher', title: 'Teachers', type: 'FontAwesome5', page: ''},
        {icon: 'check-circle', title: 'Program Outcomes', type: 'Feather', page: ''},
      ],
    },
    {
      title: 'Learning Center',
      icon: 'briefcase',
      type: 'SimpleLineIcons',
      options: [
        {icon: 'videocam', title: 'Online Class', type: 'Ionicons', page: ''},
        {icon: 'notification', title: 'Circulars', type: 'AntDesign', page: ''},
        {icon: 'help-buoy', title: 'Tutorials', type: 'Ionicons', page: ''},
        {icon: 'lab-flask', title: 'Laboratory', type: 'Entypo', page: ''},
        {icon: 'activity', title: 'Activity', type: 'Feather', page: ''},
        {icon: 'certificate-outline', title: 'Certificate', type: 'MaterialCommunityIcons', page: ''},
        {icon: 'hand-left-outline', title: 'Request', type: 'Ionicons', page: ''},
      ],
    },
    {
      title: 'Assessment and Resources',
      icon: 'note',
      type: 'SimpleLineIcons',
      options: [
        {icon: 'clipboard-question', title: 'Question Bank', type: 'FontAwesome6', page: ''},
        {icon: 'pen-fancy', title: 'Exam or Quiz', type: 'FontAwesome5', page: ''},
        {icon: 'pen-alt', title: 'Module Test', type: 'FontAwesome5', page: ''},
        {icon: 'stream', title: 'Study Materials', type: 'FontAwesome5', page: ''},
        {icon: 'file-video', title: 'Video Lectures', type: 'FontAwesome6', page: ''},
        {icon: 'folder-home-outline', title: 'Homeworks', type: 'MaterialCommunityIcons', page: ''},
        {icon: 'comment-quote-outline', title: 'Remarks', type: 'MaterialCommunityIcons', page: ''},
        {icon: 'star', title: 'Placement', type: 'AntDesign', page: ''},
      ],
    },
    {
      title: 'Administrative',
      icon: 'settings',
      type: 'SimpleLineIcons',
      options: [
        {icon: 'money-check-dollar', title: 'Dues', type: 'FontAwesome6', page: ''},
        {icon: 'file-signature', title: 'Sem Registration', type: 'FontAwesome5', page: ''},
        {icon: 'home-export-outline', title: 'Leave', type: 'MaterialCommunityIcons', page: ''},
        {icon: 'comment-eye-outline', title: 'Grievance', type: 'MaterialCommunityIcons', page: ''},
        {icon: 'users', title: 'Survey', type: 'Feather', page: pages.surveyPage},
      ],
    },
  ];

  return (
    <View style={[AppStyle.Box, {padding: 0}]}>
      {dropdownItems.map((item, index) => (
        <CustomDropdown
          key={index}
          title={item.title}
          icon={item.icon}
          options={item.options}
          type={item.type}
          isLast={index === dropdownItems.length - 1}
        />
      ))}
    </View>
  );
}
