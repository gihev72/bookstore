export const cardData = (data = [], action) => {
  // if (action.type === "ABC") {
  //   console.log("call reducer", action);
  //   return data;
  // } else {
  //   return 100;
  // }

  switch (action.type) {
    case "ABC":
      console.log("call abc reducer", action);
      return data;

    default:
      return data;
  }
};
