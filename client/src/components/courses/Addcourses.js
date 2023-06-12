import React from "react";
import { useSelector } from 'react-redux'

import { sendtutordata } from "../../app/features/tutorReducer";

function Addcourses() {
  const getalldata = useSelector(sendtutordata);
  console.log(getalldata);
  return <div>hello {getalldata.username}</div>;
}

export default Addcourses;
