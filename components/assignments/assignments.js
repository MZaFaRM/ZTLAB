import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
} from 'react-native-table-component';
import Icon from '../icons';
import {Colors} from '../../constants/colors';
import AppStyles from '../../styles';
import {Fonts} from '../../constants/fonts';

export function AssignmentsTable({AssignmentsData}) {
  return (
    <View style={styles.TableBox}>
      <View style={styles.container}>
        <Table borderStyle={styles.TableStyle}>
          <Row
            data={CONTENT.tableHead}
            flexArr={[5, 1, 1, 1]}
            style={styles.head}
            textStyle={styles.text}
          />
          <TableWrapper style={[styles.wrapper]}>
            <Rows
              data={CONTENT.tableData(AssignmentsData)}
              flexArr={[5, 1, 1, 1]}
              style={styles.row}
              textStyle={[styles.text]}
            />
          </TableWrapper>
        </Table>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  TableBox: {
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 10,
    marginBottom: 40,
  },
  container: {
    flex: 1,
  },
  head: {
    height: 45,
    backgroundColor: Colors.LightBlue,
  },
  wrapper: {
    flexDirection: 'row',
  },
  title: {
    flex: 1,
    backgroundColor: '#2ecc71',
  },
  row: {
    height: 40,
  },
  text: {
    textAlign: 'center',
  },
  TableStyle: {
    borderWidth: 2,
    borderColor: Colors.LightGrey,
    borderRadius: 20,
  },
  IconBox: {
    width: 24,
    aspectRatio: 1,
    borderRadius: 5,
    backgroundColor: Colors.White,
  },
  SubjectColumnText: {
    marginLeft: 10,
  },
  SubjectColumn: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '80%',
    marginLeft: 10,
    
  },
  OtherColumns: {
    fontWeight: 'bold',
    color: Colors.DarkGrey,
    alignSelf: 'center',
  },
  SubjectRow: {
    marginLeft: 10,
    color: Colors.DarkGrey,
    alignSelf: 'flex-start',
  },
});

const SubjectItem = ({value}) => (
  <Text style={[Fonts.Button, styles.SubjectRow, {fontSize: 10}]}>{value}</Text>
);

const StateIcon = state => {
  if (state === false) {
    return (
      <Icon
        type="Ionicons"
        name="close-circle"
        style={{alignSelf: 'center'}}
        color={Colors.Red}
        size={13}
      />
    );
  } else if (state === true) {
    return (
      <Icon
        type="Ionicons"
        name="checkmark-circle-sharp"
        style={{alignSelf: 'center'}}
        color={Colors.Green}
        size={13}
      />
    );
  } else {
    return (
      <Icon
        type="Ionicons"
        name="ellipse"
        style={{alignSelf: 'center'}}
        color={Colors.LightGrey}
        size={13}
      />
    );
  }
};

const CONTENT = {
  tableHead: [
    <View style={[AppStyles.FlexBox, styles.SubjectColumn]}>
      <View style={[AppStyles.BlueButton, styles.IconBox]}>
        <Icon
          type="FontAwesome6"
          name="list-ul"
          size={14}
          color={Colors.Blue}
        />
      </View>
      <Text
        style={[
          styles.SubjectColumnText,
          {fontWeight: 'bold', color: Colors.DarkGrey},
        ]}>
        Subject
      </Text>
    </View>,
    <Text style={styles.OtherColumns}>I</Text>,
    <Text style={styles.OtherColumns}>II</Text>,
    <Text style={styles.OtherColumns}>III</Text>,
  ],
  tableData: AssignmentsData =>
    AssignmentsData.map(row => [
      <View style={styles.SubjectColumn}>
        <SubjectItem value={row.name} />
      </View>,
      <StateIcon state={row.assignments[0]} />,
      <StateIcon state={row.assignments[1]} />,
      <StateIcon state={row.assignments[2]} />,
    ]),
};
