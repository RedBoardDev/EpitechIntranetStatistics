import React from "react";
import { IconButton as IconButtonMui, Tooltip } from "@mui/material";

const IconButton = ({ onClick, selected, icon, tooltipText }) => {
    return (
        <Tooltip title={tooltipText} arrow>
            <IconButtonMui
                onClick={onClick}
                sx={{ color: selected ? "#black" : "#1F364D", marginRight: 1 }}
            >
                {icon}
            </IconButtonMui>
        </Tooltip>
    );
};

export default IconButton;
