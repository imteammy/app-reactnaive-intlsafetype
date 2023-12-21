import * as React from "react";
import { Button, Center, Input, ScrollView, Text, View } from "native-base";
import { SafeAreaView } from "react-native";
import { decrement, increment, set, reset, useAppDispatch, useAppSelector } from "src/redux";
import _ from "lodash";

export default function Index() {
  const { count } = useAppSelector((state) => state.counter);
  const dispatch = useAppDispatch();
  const [timerId, setTimerId] = React.useState<NodeJS.Timeout | null>(null); // Update state type
  const [countState, setCountState] = React.useState(0);
  const incrementClick = () => dispatch(increment());
  const decrementClick = () => dispatch(decrement(2));
  const resetClick = () => dispatch(reset());
  const setClick = () => dispatch(set(countState));

  const timerIncrement = () => {
    const timer = setInterval(() => {
      dispatch(increment());
    }, 20);
    setTimerId(timer);
    return () => clearInterval(timer);
  };

  const stopTimer = () => {
    if (timerId !== null) {
      clearInterval(timerId);
    }
    setTimerId(null);
  };
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Center>
            <Text fontSize={"5xl"}>{count.toLocaleString()}</Text>
          </Center>
          <Button onPress={incrementClick} onLongPress={timerIncrement} onPressOut={stopTimer}>
            Increment
          </Button>
          <Button onPress={stopTimer}>Stop Increment</Button>
          <Input
            maxLength={4}
            onChangeText={(e) => {
              if (e === "") {
                setCountState(0);
              }
              if (_.isInteger(Number(e))) {
                setCountState(Number(e));
              }
            }}
            value={countState.toString()}
          />
          <Button onPress={decrementClick}>Decrement</Button>
          <Button onPress={resetClick}>Reset</Button>
          <Button onPress={setClick}>Set</Button>
          <Button onPress={stopTimer}>Stop</Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
