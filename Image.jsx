import React from "react";

const Image = ({ src, alt, width = "auto", height = "auto" }) => {
    return <img src={src} alt={alt} style={{ width, height }} />;
};

export default Image;
