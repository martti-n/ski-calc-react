import React from "react";
import ResultItem from './ResultItem'

function Results(props) {
  let content = null;

  if (props.resultItems) {
    content = props.resultItems.map((result, key) => (
      <div key={key} className="m-m-0.3">
        <ResultItem result={result} />
      </div>
    ));
  }

  return (
    <div className="flex flex-col w-20">
      {content}
    </div>
  );
}

export default Results;
