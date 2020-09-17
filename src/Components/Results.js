import { List, ListItem, ListItemText } from "@material-ui/core";
import React from "react";

function Results(props) {
  let content = null;

  if (props.resultItems) {
    content = props.resultItems.map((result, key) => (
      <ListItem  key={key}>
        <ListItemText className="mr-3">
          {result.skiLength}
        </ListItemText>
        <ListItemText className="ml-3">
          {result.weight}
        </ListItemText>
      </ListItem>
    ));
  }

  return (
    <div className="flex flex-col w-auto">
      <List>{content}</List>
    </div>
  );
}

export default Results;
