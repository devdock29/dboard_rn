
/**
  
 *
 * @format
 */
import { useNavigation, useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import { Button, Text } from 'react-native-paper';
import { RFValue } from 'react-native-responsive-fontsize';

import moment from 'moment-timezone';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { adjustStatusDataRed, adjustSystemShiftDataRed, adjustTeamDataRed } from '../../../../helpers/Utils';
import { useAppSelector } from '../../../../system/redux/store/hooks';
import AppHeader from '../../../uiHelpers/AppHeader';
import DateTimeSelector from '../../../uiHelpers/DateTimeSelector';
import FullScreenLoader from '../../../uiHelpers/FullScreenLoader';


const FiltersAttendanceScreen = ({ route }) => {

  const { myAllFilters, onApply, onReset } = route.params;

  const { colors } = useTheme();
  const navigation = useNavigation();


  const RedHeartBeat = useAppSelector(state => state.app.heartBeat);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);


  const [shiftData, setShiftData] = useState([]);
  const [shiftValue, setShiftValue] = useState(null);
  const [isShiftFocus, setIsShiftFocus] = useState(false);


  const [teamData, setTeamData] = useState([]);
  const [teamValue, setTeamValue] = useState(null);
  const [isTeamFocus, setIsTeamFocus] = useState(false);

  const [statusData, setStatusData] = useState([]);
  const [statusValue, setStatusValue] = useState(null);
  const [isstatusFocus, setIsStatusFocus] = useState(false);


  useEffect(() => {

    setShiftData(adjustSystemShiftDataRed(RedHeartBeat.actualPayload));
    setTeamData(adjustTeamDataRed(RedHeartBeat.actualPayload))

    setStatusData(adjustStatusDataRed(RedHeartBeat.actualPayload));

    if (!!myAllFilters) {
      if (!!myAllFilters.startDate) {
        setStartDate(new Date(myAllFilters.startDate));
      }

      if (!!myAllFilters.endDate) {
        setEndDate(new Date(myAllFilters.endDate));
      }

      if (!!myAllFilters.shift) {
        setShiftValue(myAllFilters.shift);
      }

      if (!!myAllFilters.team) {
        setTeamValue(myAllFilters.team);
      }

      if (!!myAllFilters.status) {
        setStatusValue(myAllFilters.status);
      }

    }

  }, []);



  const validateForm = (): boolean => {

    return true;
  }



  const renderShiftItem = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
        {item.value === shiftValue && (
          <AntDesign
            style={styles.icon}
            color="black"
            name="checkcircle"
            size={20}
          />

        )}
      </View>
    );
  };

  const renderTeamItem = item => {
    return (

      <View style={[styles.item,


      ]}>
        <Text style={styles.textItem}>{item.label}</Text>
        {item.value === teamValue && (
          <AntDesign
            style={styles.icon}
            color="black"
            name="checkcircle"
            size={20}
          />

        )}
      </View>
    );
  };

  const renderStatusItem = item => {
    return (

      <View style={[styles.item,]}>
        <Text style={styles.textItem}>{item.label}</Text>
        {item.value === statusValue && (
          <AntDesign
            style={styles.icon}
            color="black"
            name="checkcircle"
            size={20}
          />

        )}
      </View>
    );
  };


  return (
    <View style={{
      flex: 1,
      backgroundColor: colors.appBackground,
    }}>

      <AppHeader
        showLeftButton={true}
        leftButtonIcon={'arrow-left'}
        onLeftItemClick={() => {
          navigation.goBack();

        }}
        showRightButton={false}
        rightButtonIcon={'bell'}
        onRightItemClick={() => {

        }}
        showDivider={true}
      />

      <View style={{
        flex: 1,
        marginTop: 20,
        // alignItems: 'center'
      }}>


        <View style={{
          flex: 1,
          alignItems: 'center',
          // backgroundColor: "#889922"
        }}>

          <Text
            variant='displaySmall'
            style={{
              color: colors.appTextPrimaryColor,
              marginBottom: RFValue(20)

            }}>Filters</Text>

          <DateTimeSelector
            value={startDate}
            placeholder='Start DateTime*'
            onChange={(newValue: any) => {
              setStartDate(newValue);
            }}
          />

          <DateTimeSelector
            value={endDate}
            placeholder='End DateTime'
            onChange={(newValue: any) => {
              setEndDate(newValue);
            }}
          />

          <View style={styles.container}>

            <Dropdown
              style={[styles.dropdown, {
                borderColor: colors.appTextPrimaryColor,
              }, isShiftFocus && { borderWidth: 3, borderColor: '#007AFF' }]}
              placeholderStyle={[styles.placeholderStyle, {
                color: colors.appTextPlaceHolderColor
              }]}
              selectedTextStyle={[styles.selectedTextStyle, {
                color: colors.appTextPrimaryColor,

              }]}


              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={shiftData}

              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isShiftFocus ? 'Shift*' : 'Shift*'}
              searchPlaceholder="Search..."
              value={shiftValue}

              onFocus={() => setIsShiftFocus(true)}
              onBlur={() => setIsShiftFocus(false)}
              onChange={item => {
                setShiftValue(item.value);
                setIsShiftFocus(false);
              }}
              renderLeftIcon={() => (
                <Icon
                  style={styles.icon}
                  color={isShiftFocus ? '#007AFF' : colors.appTextPrimaryColor}
                  name="web-clock"
                  size={20}
                />
              )}
              renderItem={renderShiftItem}
            />

            <Dropdown
              style={[styles.dropdown, {
                borderColor: colors.appTextPrimaryColor,
              }, isTeamFocus && { borderWidth: 3, borderColor: '#007AFF', marginTop: 10 }]}
              placeholderStyle={[styles.placeholderStyle, {
                color: colors.appTextPlaceHolderColor,


              }]}
              selectedTextStyle={[styles.selectedTextStyle, {
                color: colors.appTextPrimaryColor,


              }]}

              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={teamData}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isTeamFocus ? 'Team*' : 'Team*'}
              searchPlaceholder="Search..."
              value={teamValue}

              onFocus={() => setIsTeamFocus(true)}
              onBlur={() => setIsTeamFocus(false)}
              onChange={item => {
                setTeamValue(item.value);
                setIsTeamFocus(false);
              }}
              renderLeftIcon={() => (
                <Icon
                  style={styles.icon}
                  color={isTeamFocus ? '#007AFF' : colors.appTextPrimaryColor}
                  name="account-multiple-outline"

                  size={20}
                />
              )}
              renderItem={renderTeamItem}
            />

            <Dropdown
              style={[styles.dropdown, {
                borderColor: colors.appTextPrimaryColor,
              }, isTeamFocus && { borderWidth: 3, borderColor: '#007AFF', marginTop: 10 }]}
              placeholderStyle={[styles.placeholderStyle, {
                color: colors.appTextPlaceHolderColor,


              }]}
              selectedTextStyle={[styles.selectedTextStyle, {
                color: colors.appTextPrimaryColor,


              }]}

              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={statusData}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isstatusFocus ? 'Status*' : 'Status*'}
              searchPlaceholder="Search..."
              value={statusValue}

              onFocus={() => setIsStatusFocus(true)}
              onBlur={() => setIsStatusFocus(false)}
              onChange={item => {
                setStatusValue(item.value);
                setIsStatusFocus(false);
              }}
              renderLeftIcon={() => (
                <Icon
                  style={styles.icon}
                  color={isstatusFocus ? '#007AFF' : colors.appTextPrimaryColor}
                  name="list-status"

                  size={20}
                />
              )}
              renderItem={renderStatusItem}
            />

          </View>

          <Button style={{
            justifyContent: 'center',
            alignContent: 'center',
            marginTop: RFValue(30),
            width: '40%',
          }} buttonColor={colors.appButtonBGColor} textColor={colors.appButtonTextColor} mode="contained"
            onPress={() => {
              if (validateForm()) {
                if (!!onApply) {
                  if (true) {

                    var filtersObj = {};
                    if (!!startDate) {
                      filtersObj.startDate = moment(startDate).format('YYYY-MM-DD HH:mm:ss');
                    }
                    if (!!endDate) {
                      filtersObj.endDate = moment(endDate).format('YYYY-MM-DD HH:mm:ss');
                    }

                    if (!!shiftValue) {
                      filtersObj.shift = shiftValue;
                    }

                    if (!!teamValue) {
                      filtersObj.team = teamValue;
                    }

                    if (!!statusValue) {
                      filtersObj.status = statusValue;
                    }

                    onApply(filtersObj);
                  }

                }

                navigation.goBack()
              }


            }}
          >
            Apply
          </Button>

          <Button style={{
            marginTop: 10
          }}
            mode='text'
            textColor={colors.appLogout_ButtonBGColor}
            onPress={() => {
              if (validateForm()) {
                if (!!onReset) {
                  onReset();
                }

                navigation.goBack()
              }
            }}>
            Reset
          </Button>

        </View>
      </View>

      <FullScreenLoader
        loading={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  containerO: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  input: {
    width: '100%',

  },
  displayText: {
    fontSize: 9,
    color: 'blue',
  },
  labelO: {
    fontSize: 50,
    marginBottom: 10,
  },
  text1: {

  },
  container: {
    width: '90%',
  },
  dropdown: {
    height: 50,
    borderWidth: 1,
    borderRadius: 3,
    paddingHorizontal: 8,
    marginTop: RFValue(20)
  },
  icon: {
    marginHorizontal: 10,
  },

  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
    color: 'black'
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'gray'
  },
  selectedTextStyle: {
    marginLeft: 7,
    fontSize: 16,
    color: 'white'
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: 'black'
  },
});
export default FiltersAttendanceScreen;