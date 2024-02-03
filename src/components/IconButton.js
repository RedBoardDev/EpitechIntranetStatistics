import React from "react";
import { IconButton as IconButtonMui, Tooltip } from "@mui/material";

const IconButton = ({ onClick, selected, icon, tooltipText }) => {
    return (
        <Tooltip title={tooltipText} arrow>
            <IconButtonMui
                onClick={onClick}
                sx={{ color: selected ? "#black" : "#1F364D", marginRight: 1 }}
            >
                {React.cloneElement(icon, { style: { fontSize: 40 } })}
            </IconButtonMui>
        </Tooltip>
    );
};

export default IconButton;
