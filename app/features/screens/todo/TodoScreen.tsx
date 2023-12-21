import { ScrollView, Text, View, Checkbox, Box, Button } from "native-base";
import * as React from "react";
import { todoStore } from "./todoStore";
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "@/components/form";

export default function TodoScreen() {
  const { todos, addTodo, removeTodo } = todoStore();
  const method = useForm({});
  const [value, setValue] = React.useState<string>("");
  function submitAddTodo() {
    addTodo(value);
    setValue("");
  }

  return (
    <FormProvider {...method}>
      <ScrollView>
        <View justifyContent={"center"} alignItems={"center"} paddingX={"10"} w={"full"}>
          <Text fontSize={"4xl"}>Todo list</Text>
          <Box display={"flex"} flexDirection={"row"} paddingX={"1"}>
            <Input
              name="todo"
              id="todo_id"
              placeholder="..."
              maxLength={10}
              keyboardType="default"
              onChangeText={(text) => setValue(text)}
              value={value}
            />
            <Button onPress={submitAddTodo}>Add Todo</Button>
          </Box>
        </View>
        <View justifyContent={"space-evenly"} alignItems={"baseline"} p={5}>
          {todos.map((todo, index) => (
            <React.Fragment key={todo.id}>
              <Box display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>
                <Text fontSize={"2xl"}>
                  ID: {index + 1} : {todo.title}
                </Text>
                <Checkbox mt={"1.5"} value={todo.id.toString()} name={todo.title} id={`todo_${todo.id}`}>
                  Check
                </Checkbox>
                <Button onPress={() => removeTodo(todo.id)}>Remove</Button>
              </Box>
            </React.Fragment>
          ))}
        </View>
      </ScrollView>
    </FormProvider>
  );
}

// const styles = StyleSheet.create({})
