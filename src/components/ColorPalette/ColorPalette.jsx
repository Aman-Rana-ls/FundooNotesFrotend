import React from "react";
import "./ColorPalette.scss";

const ColorPalette = ({ onColorSelect }) => {
  return (
    <div className="color-palate-cnt">
      <div className="col1" title="Default" onClick={() => onColorSelect("#FFFFFF")}></div>
      <div className="col2" title="Coral" onClick={() => onColorSelect("#FAAFA8")}></div>
      <div className="col3" title="Peach" onClick={() => onColorSelect("#F39F76")}></div>
      <div className="col4" title="Sand" onClick={() => onColorSelect("#FFF8B8")}></div>
      <div className="col5" title="Mint" onClick={() => onColorSelect("#E2F6D3")}></div>
      <div className="col6" title="Sage" onClick={() => onColorSelect("#B4DDD3")}></div>
      <div className="col7" title="Fog" onClick={() => onColorSelect("#D4E4ED")}></div>
      <div className="col8" title="Storm" onClick={() => onColorSelect("#AECCDC")}></div>
      <div className="col9" title="Dusk" onClick={() => onColorSelect("#D3BFDB")}></div>
      <div className="col10" title="Blossom" onClick={() => onColorSelect("#F6E2DD")}></div>
      <div className="col11" title="Clay" onClick={() => onColorSelect("#E9E3D4")}></div>
      <div className="col12" title="Chalk" onClick={() => onColorSelect("#EFEFF1")}></div>
    </div>
  );
};

export default ColorPalette;
