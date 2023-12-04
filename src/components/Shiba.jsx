import React, { useState } from "react";

const Shiba = () => {
    const [isDragging, setIsDragging] = useState(false);
    const [offsetX, setOffsetX] = useState(500);
    const [offsetY, setOffsetY] = useState(0);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setOffsetX(e.clientX - e.target.getBoundingClientRect().left);
        setOffsetY(e.clientY - e.target.getBoundingClientRect().top);
        e.target.style.cursor = "grabbing";
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;

        const newX = e.clientX - offsetX;
        const newY = e.clientY - offsetY;

        e.target.style.left = `${newX}px`;
        e.target.style.top = `${newY}px`;
    };

    const handleMouseUp = (e) => {
        setIsDragging(false);
        e.target.style.cursor = "grab";
    };
    return (
        <img
            src="https://media.tenor.com/wCasdZjxCsoAAAAi/husky-and-shiba-%E4%BA%8C%E5%93%88%E8%90%8C%E6%9F%B4%E5%BE%AE%E4%BF%A1%E8%A1%A8%E6%83%85.gif"
            style={{
                cursor: "grab",
                position: "absolute",
                bottom:"0",
                right:"0",
                width: "240px",
                height: "222px",
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            draggable={false}
        />
    );
};

export default Shiba;
