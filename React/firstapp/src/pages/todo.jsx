import { useState } from "react";
import Text from "../components/text";
import Input from "../components/input";
import Button from "../components/button";
import { fontFamilies, fontSizes, fontWeights } from "../constant/theme";

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
              />
              <div>
                <Button title={"Is it Done"} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Todos;
