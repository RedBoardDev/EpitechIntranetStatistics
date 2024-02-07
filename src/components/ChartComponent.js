import React from "react";
import Chart from "react-apexcharts";

const options = {
    chart: {
        height: '100%',
        type: 'rangeBar',
        zoom: {
            enabled: true,
        },
        toolbar: {
            show: false,
        },
    },
    plotOptions: {
        bar: {
            horizontal: true,
        }
    },
    xaxis: {
        type: 'datetime'
    },
    fill: {
        type: 'solid',
        opacity: 0.6
    },
    legend: {
        show: false
    },
};

function ChartComponent({ data = {} }) {

    return (
        <div style={{
            height: '100%',
            width: '100%',
        }}>
            <Chart
                type="rangeBar"
                height={'100%'}
                width={'100%'}
                options={options}
                series={data}
            />
        </div>
    );
}


export default ChartComponent;