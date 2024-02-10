import React from "react";
import Chart from "react-apexcharts";

const defaultOptions = {
    colors: ['#FFA500', '#FF6347', '#228B22', '#9370DB', '#4B0082'],
    chart: {
        height: '100%',
        type: 'rangeBar',
        zoom: {
            enabled: false,
        },
        toolbar: {
            show: false,
        },
        animations: {
            enabled: true,
            easing: 'easeinout',
            speed: 600,
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
        opacity: 0.9
    },
    legend: {
        show: false
    },
    grid: {
        borderColor: '#C2C2C2',
        strokeDashArray: 2,
        xaxis: {
            lines: {
                show: true
            }
        },
        yaxis: {
            lines: {
                show: true
            }
        }
    },
};

const fullscreenOptions = {
    legend: {
        horizontalAlign: 'right',
        onItemClick: {
            toggleDataSeries: true
        },
        onItemHover: {
            highlightDataSeries: true
        },
    },
    chart: {
        toolbar: {
            show: true,
            offsetX: 0,
            offsetY: 0,
            tools: {
                download: true,
                selection: false,
                zoom: false,
                zoomin: false,
                zoomout: false,
                pan: false,
                reset: false,
            },
            autoSelected: 'download'
        },
    }
};

function ChartComponent({ data = {}, fullscreen = false }) {
    const options = fullscreen ? { ...defaultOptions, ...fullscreenOptions } : defaultOptions;

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
