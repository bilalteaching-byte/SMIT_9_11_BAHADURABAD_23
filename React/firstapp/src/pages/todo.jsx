import { useState } from "react";
import Text from "../components/text";
import Input from "../components/input";
import Button from "../components/button";
import { btnStyles, fontFamilies, fontSizes, fontWeights } from "../constant/theme";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegCheckCircle } from "react-icons/fa";

function Todos() {
  const [todos, setTodos] = useState([
    {
      title: "WakeUp for Fajr",
      isDone: false,
    },
    {
      title: "Have Breakfast",
      isDone: false,
    },
  ]);
  const [todoInp, setTodoInp] = useState("");

  const addTodo = () => {
    if (todoInp == "") return alert("Add Value");
    let obj = { title: todoInp, isDone: false };
    setTodos([obj, ...todos]);
    setTodoInp("")
  };

  const markDone = (ind) => {
    let arr = [...todos]
    arr[ind].isDone = !arr[ind].isDone
    setTodos(arr)
  }

  const deleteTodo = (ind) => {
    let arr = [...todos]
    arr.splice(ind, 1)
    setTodos(arr)
  }

  return (
    <div>
      <Text title={"Todo Application"} />
      <div>
        <Input
          placeholder="Todo"
          onChange={(e) => setTodoInp(e.target.value)}
          value={todoInp}
        />
        <Button title={"Add"} onClick={addTodo} />
      </div>

      <div>
        {todos.map((data, ind) => {
          console.log("ind", ind, "data=>", data)
          return (
            <div key={ind} style={{ display: "flex", alignItems: "center" }}>
              <Text
                title={ind + 1 + ")"}
                size={fontSizes.lg}
                weight={fontWeights.bold}
                family={fontFamilies.mono}

              />
              <Text
                title={data.title}
                size={fontSizes.lg}
                weight={fontWeights.bold}
                family={fontFamilies.mono}
                textDecorationLine={data.isDone ? "line-through" : "none"}
              />
              <div>
                <Button onClick={() => markDone(ind)}
                  title={<FaRegCheckCircle />}
                  style={{
                    backgroundColor: "white",
                    borderWidth: 0,
                    color: data.isDone ? "green" : "black"
                  }}
                />
                <span style={{ cursor: "pointer" }} onClick={() => deleteTodo(ind)}>
                  <AiOutlineDelete />
                </span>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Todos;
