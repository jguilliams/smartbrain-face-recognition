import React from "react";
import "./ImageLinkForm.css";

const ImageLinkForm = ({ onInputChange, onBtnSubmit }) => {
  return (
    <div>
      <p className="f3 fw5 light-gray">
        {
          "Hello, friend! This Magic Brain can detect faces in your pictures. Give it a try."
        }
      </p>
      <div className="center">
        <div className="form center pa4 br3 shadow-5">
          <input
            className="f4 pa2 w-70 center"
            type="text"
            onChange={onInputChange}
          />
          <button
            className="w-30 grow f4 link ph3 pv2 dib fw3 black bg-light-silver"
            onClick={onBtnSubmit}
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
