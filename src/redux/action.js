export const addTodo = (data) => {
  console.log("action called");
  return {
    type: "ABC",
    data,
  };
};
