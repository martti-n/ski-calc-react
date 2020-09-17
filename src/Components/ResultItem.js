import React from 'react';

function ResultItem(props) {
  return (

    <div className="flex row justify-between w-auto p-1 bg-blue-200 hover:bg-blue-300 cursor-pointer">
      <span>
        {props.result.skiLength}
      </span>
      <span>
        {props.result.weight}
      </span>
    </div>
  );
}

export default ResultItem;