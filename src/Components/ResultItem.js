import React from 'react';

function ResultItem(props) {
  return ( 

    <div className="flex row justify-between w-auto">
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