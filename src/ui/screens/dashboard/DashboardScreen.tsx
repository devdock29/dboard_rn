
import { useNavigation, useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  RefreshControl,
  View
} from 'react-native';
import { Text } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { CALL_STATE } from '../../../helpers/enum';
import { ScreenNames } from '../../../system/navigation/ScreenNames';
import { APIHeartBeat } from '../../../system/networking/AppAPICalls ';
import { heartbeatIdle } from '../../../system/redux/slice/appSlice ';
import { useAppSelector } from '../../../system/redux/store/hooks';
import AppHeader from '../../uiHelpers/AppHeader';
import CellComponent from '../../uiHelpers/CellComponent';
import FullScreenLoader from '../../uiHelpers/FullScreenLoader';
// import { tokens } from 'react-native-paper/lib/typescript/styles/themes/v3/tokens';


const DashboardScreen = ({ route }) => {
  const navigation = useNavigation();
  const { colors } = useTheme();

  const [permissions, setPermissions] = useState([]);

  const data = [
    { id: 1, title: 'Attendance', icons: 'account-clock', code: 'ATTENDANCE' },
    { id: 2, title: 'News', icons: 'newspaper', code: 'NEWS' },
    { id: 3, title: 'Report', icons: 'file-chart', code: 'REPORTS' },
    { id: 4, title: 'Finance', icons: 'finance', code: 'FINANCES' },
    { id: 1, title: 'Team Attendance', icons: 'account-supervisor', code: 'TEAM_ATTENDANCE' },
  ];

  const [filteredData, setFilteredData] = useState([]);
  const RedHeartBeat = useAppSelector(state => state.app.heartBeat);
  const RedAuthUser = useAppSelector(state => state.auth.authUser);
  const dispatch = useDispatch();


  useEffect(() => {

    dispatch(APIHeartBeat(RedAuthUser.accessToken));

    const filteredWorkflows = data.filter((obj) => permissions.some((permObj) => permObj.code === obj.code));

    setFilteredData(filteredWorkflows);
  }, []);

  useEffect(() => {

    if (
      RedHeartBeat.state !== CALL_STATE.IDLE &&
      RedHeartBeat.state !== CALL_STATE.FETCHING
    ) {

      dispatch(heartbeatIdle());
      if (RedHeartBeat.state === CALL_STATE.SUCCESS) {

        setPermissions(RedHeartBeat.actualPayload.data.permission);
      } else if (RedHeartBeat.state === CALL_STATE.ERROR) {
        Alert.alert('Error', RedHeartBeat.error);
      }

    }
  }, [RedHeartBeat.state])


  useEffect(() => {

    const filteredWorkflows = data.filter((obj) => permissions.some((permObj) => permObj.code === obj.code));
    setFilteredData(filteredWorkflows);
  }, [permissions])

  return (
    <View
      style={{
        backgroundColor: colors.appBackground,
        // backgroundColor: "#889922",
        flex: 1

      }}

    >


      {/* <Button onPress={() => {

navigation.openDrawer();
    }}>Click me</Button> */}

      <AppHeader
        showLeftButton={true}
        leftButtonIcon={'menu'}
        onLeftItemClick={() => {

          navigation.openDrawer();
          // props.navigation.openDrawer();
        }}
        showRightButton={true}
        rightButtonIcon={'bell'}
        onRightItemClick={() => {
          navigation.navigate(ScreenNames.NotificationScreen)



        }}
        showDivider={true}
      />
      <View
        style={{
          flex: 1,
          // backgroundColor:'#787833'
        }}

      >
        <Text
          variant='bodyLarge'
          style={{
            color: colors.appTextPrimaryColor,
            marginTop: 30,
            width: '100%',
            textAlign: 'center'
          }
          }>
          {
            'Welcome ' + ((!!RedHeartBeat?.actualPayload?.data && !!RedHeartBeat?.actualPayload?.data?.user_data) ? (RedHeartBeat?.actualPayload?.data?.user_data[0]?.name) : ('--'))
          }
        </Text>



        <FlatList

          style={{
            width: '100%',
            height: '100%',

            // backgroundColor:'black'
            //  margin: 30
          }}
          contentContainerStyle={{
            // alignItems: 'center'
            // alignItems: 'center'

          }}

          data={filteredData} // Your data source
          numColumns={2}


          renderItem={({ item, index }) => {
            return (

              <CellComponent
                item={item}
                index={index}
                myUserID={0}
                onClick={() => {

                  if (item.code === "ATTENDANCE") {
                    navigation.navigate(ScreenNames.MainAttendanceScreen);
                  } else if (item.code === "TEAM_ATTENDANCE") {
                    navigation.navigate(ScreenNames.MainTeamAttendanceScreen);
                  } else if (item.code === "NEWS") {
                    navigation.navigate(ScreenNames.NewsScreen);
                  }
                  else if (item.code === "REPORTS") {
                    navigation.navigate(ScreenNames.ReportScreen);
                  }
                  else if (item.code === "FINANCES") {
                    navigation.navigate(ScreenNames.FinanceScreen);
                  } else {
                    Alert.alert("Error", "Invalid Code Provided!");
                  }
                }}
              />
            )
          }}
          keyExtractor={(item, index) => index.toString()} // Unique key for each item
          refreshControl={
            <RefreshControl
              tintColor={colors.appTextPrimaryColor}
              title={'Refreshing...'}
              titleColor={colors.appTextPrimaryColor}
              refreshing={RedHeartBeat.state === CALL_STATE.FETCHING}
              onRefresh={() => {
                dispatch(APIHeartBeat(RedAuthUser.accessToken));
              }}
            />
          }

        ></FlatList>
      </View>

      <FullScreenLoader
        loading={RedHeartBeat.state === CALL_STATE.FETCHING}
      />
    </View>

  )
}

export default DashboardScreen;
