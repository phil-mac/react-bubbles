import React, { useState, useEffect } from "react";

import {axiosWithAuth} from '../axiosWithAuth'; 
import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  useEffect(() => {
    axiosWithAuth()
    .get(`http://localhost:5005/api/colors`)
    .then(res => {
      console.log(res.data);
      setColorList(res.data);
    })
    .catch(err => {
      console.log(err);
    })
  },[])

  return (
    <>
      {/* <h1>Bubbles!</h1> */}
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
