import { Tooltip as ToolTipMUI } from '@mui/material';
import React from 'react';

const CustomToolTip = ({ title, placement, children }) => {
    return (
        <div>
            <ToolTipMUI
                title={title}
                placement={placement}
                slotProps={{
                    popper: {
                        modifiers: [
                            {
                                name: 'offset',
                                options: {
                                    offset: [0, -10],
                                },
                            },
                        ],
                    },
                }}
            >
                {children}
            </ToolTipMUI>
        </div>
    );
};

export default CustomToolTip;
