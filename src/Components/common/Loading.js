import React from "react";

export const Loading = () =>{
    return(<div className="content">
    <div className="col-12 loader">
      <span className="fa fa-spinner fa-pulse fa-3x da-fw text-primary"></span>
      <p><strong> Loading... </strong></p>
    </div>
  </div>)
}