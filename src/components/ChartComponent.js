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
            borderRadius: 1,
            barHeight: '16%',
            rangeBarGroupRows: true,
        }
    },
    yaxis: {
        type: 'category'
    },
    xaxis: {
        type: 'datetime',
        labels: {
            format: 'dd/MM',
        }
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
    annotations: {
        xaxis: [
            {
                x: new Date().getTime(),
                strokeDashArray: 0,
                borderColor: "#1c325c",
                opacity: 0.6,
                label: {
                    borderColor: "#1c325c",
                    style: {
                        color: "#fff",
                        background: "#1c325c"
                    },
                    text: "Today"
                }
            },
        ],
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
