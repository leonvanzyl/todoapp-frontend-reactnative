import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import InputModal from "../components/InputModal";
import Header from "../components/Header";
import ListItems from "../components/ListItems";
import { backendUrl } from "../constants/constants";

const Main = () => {
  // IMPORTANT - The Swipe View needs a "key" attribute
  const DUMMY = [
    {
      title: "Get some snacks",
      date: "30 Nov 2021",
      key: "1",
    },
  ];

  const [todos, setTodos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [todoInputValue, setTodoInputValue] = useState();
  const [todoToBeEdited, setTodoToBeEdited] = useState(null);

  async function getItems() {
    try {
      const response = await fetch(
        `${backendUrl}item/user/61a1b9f35080ccd48dbb6f7d`
      );
      const data = await response.json();
      const newTodos = data.items.map((i) => {
        return {
          title: i.title,
          date: i.dateTime,
          key: i.id,
        };
      });

      setTodos(newTodos);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(async () => {
    getItems();
  }, [todos]);

  // Function to add a To Do
  async function handleAddTodo(todo) {
    // const newTodos = [...todos, todo];
    // setTodos(newTodos);

    const data = {
      title: todo.title,
      userId: "61a1b9f35080ccd48dbb6f7d",
    };

    const response = await fetch(`${backendUrl}item`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    getItems();
    setModalVisible(false);
  }

  // Function to edit a Todo
  const handleEditTodo = (editedTodo) => {
    const newTodos = [...todos];
    const todoIndex = todos.findIndex((todo) => todo.key === editedTodo.key);
    newTodos.splice(todoIndex, 1, editedTodo);
    setTodos(newTodos);
    setTodoToBeEdited(null);
    setModalVisible(false);
  };

  const handleTriggerEdit = (item) => {
    setTodoToBeEdited(item);
    setModalVisible(true);
    setTodoInputValue(item.title);
  };

  // Clear All Todos
  const handleClearTodos = () => {
    setTodos([]);
  };

  return (
    <>
      <Header onClearTodos={handleClearTodos} />
      <ListItems
        todos={todos}
        setTodos={setTodos}
        handleTriggerEdit={handleTriggerEdit}
      />
      <InputModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        todoInputValue={todoInputValue}
        setTodoInputValue={setTodoInputValue}
        handleAddTodo={handleAddTodo}
        todoToBeEdited={todoToBeEdited}
        setTodoToBeEdited={setTodoToBeEdited}
        handleEditTodo={handleEditTodo}
        todos={todos}
      />
    </>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
