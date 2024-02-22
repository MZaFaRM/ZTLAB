import React from 'react';
import {View} from 'react-native';
import CustomDropdown from './components/menuDropdown';
import AppStyle from '../../styles';

export default function Menu() {
  // prettier-ignore
  const dropdownItems = [
    {
      title: 'Academic Hub',
      icon: 'graduation',
      type: 'SimpleLineIcons',
      options: [
        {icon: 'book-open', title: 'Series exam', type: 'FontAwesome5'},
        {icon: 'book-search-outline', title: 'Results', type: 'MaterialCommunityIcons'},
        {icon: 'calendar-times', title: 'Exam Schedule', type: 'FontAwesome5'},
        {icon: 'bookshelf', title: 'Subjects', type: 'MaterialCommunityIcons'},
        {icon: 'chalkboard-teacher', title: 'Teachers', type: 'FontAwesome5'},
        {icon: 'check-circle', title: 'Program Outcomes', type: 'Feather'},
      ],
    },
    {
      title: 'Learning Center',
      icon: 'briefcase',
      type: 'SimpleLineIcons',
      options: [
        {icon: 'videocam', title: 'Online Class', type: 'Ionicons'},
        {icon: 'notification', title: 'Circulars', type: 'AntDesign'},
        {icon: 'help-buoy', title: 'Tutorials', type: 'Ionicons'},
        {icon: 'lab-flask', title: 'Laboratory', type: 'Entypo'},
        {icon: 'activity', title: 'Activity', type: 'Feather'},
        {icon: 'certificate-outline', title: 'Certificate', type: 'MaterialCommunityIcons'},
        {icon: 'hand-left-outline', title: 'Request', type: 'Ionicons'},
      ],
    },
    {
      title: 'Assessment and Resources',
      icon: 'note',
      type: 'SimpleLineIcons',
      options: [
        {icon: 'clipboard-question', title: 'Question Bank', type: 'FontAwesome6'},
        {icon: 'pen-fancy', title: 'Exam or Quiz', type: 'FontAwesome5'},
        {icon: 'pen-alt', title: 'Module Test', type: 'FontAwesome5'},
        {icon: 'stream', title: 'Study Materials', type: 'FontAwesome5'},
        {icon: 'file-video', title: 'Video Lectures', type: 'FontAwesome6'},
        {icon: 'folder-home-outline', title: 'Homeworks', type: 'MaterialCommunityIcons'},
        {icon: 'comment-quote-outline', title: 'Remarks', type: 'MaterialCommunityIcons'},
        {icon: 'star', title: 'Placement', type: 'AntDesign'},
      ],
    },
    {
      title: 'Administrative',
      icon: 'settings',
      type: 'SimpleLineIcons',
      options: [
        {icon: 'money-check-dollar', title: 'Dues', type: 'FontAwesome6'},
        {icon: 'file-signature', title: 'Sem Registration', type: 'FontAwesome5'},
        {icon: 'home-export-outline', title: 'Leave', type: 'MaterialCommunityIcons'},
        {icon: 'comment-eye-outline', title: 'Grievance', type: 'MaterialCommunityIcons'},
        {icon: 'users', title: 'Survey', type: 'Feather'},
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
          isFirst={index === 0}
        />
      ))}
    </View>
  );
}
