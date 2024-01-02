import { ReactElement, createElement } from "react";
import { StyleSheet, View, TextStyle, ViewStyle } from "react-native";
import { Style } from "@mendix/pluggable-widgets-tools";
import { CustomVictoryLineChartProps, SeriesListType } from "../typings/CustomVictoryLineChartProps";
import { VictoryAxis, VictoryArea, VictoryChart, VictoryLine, VictoryStack, VictoryTheme } from "victory-native";
import moment from "moment";
// import Big from "big.js";
// import { ValueStatus } from "mendix";

export interface CustomStyle extends Style {
    container: ViewStyle;
    label: TextStyle;
}

export function CustomVictoryLineChart({
    // Get properties (widget properties)
    // style,
    seriesList,
    xShowAxis,
    xTickData,
    xTickAttr,
    xTickFormatStr,
    xTickColor,
    xGridColor,
    xAxisLabel,
    yShowAxis,
    yTickData,
    yTickAttr,
    yTickColor,
    yGridColor,
    yAxisLabel,
    isStacked,
    fillColor
}: CustomVictoryLineChartProps<CustomStyle>): ReactElement {
    // const [dataToRender, setDataToRender] = useState<any>([]);

    // const dataLoaded = () => {
    //     let loaded = false;
    //     seriesList.forEach(series => {
    //         loaded =
    //             series.inputType === "list"
    //                 ? series.data?.status === ValueStatus.Available
    //                 : series.jsonAttr?.status === ValueStatus.Available;
    //     });
    //     return loaded;
    // };

    if (!seriesList) {
        return <View />;
    }

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const getData = (series: SeriesListType) => {
        // if (series.inputType === "list") {
        // Iterate over list of datapoints and generate the data array
        const dataToReturn = series.data?.items?.map(item => {
            let xVal;
            if (series.xAttr?.type === "Decimal" || series.xAttr?.type === "Integer" || series.xAttr?.type === "Long") {
                // @ts-ignore
                xVal = series.xAttr?.get(item).value?.toNumber();
            } else {
                xVal = series.xAttr?.get(item).value;
            }
            return {
                x: xVal,
                y: series.yAttr?.get(item).value?.toNumber()
            };
        });
        return dataToReturn;
        // } else {
        //     if (series.jsonAttr?.value) {
        //         const dataToReturn = JSON.parse(series.jsonAttr.value);
        //         return dataToReturn;
        //     } else {
        //         return null;
        //     }
        // }
    };

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const renderCharts = () => {
        // Iterate over all the series list and generate an Area/Line (TBD) chart
        const chartsToReturn = seriesList.map((series, index) => {
            if (series.type === "area") {
                return (
                    <VictoryArea
                        key={index}
                        data={getData(series)}
                        style={{
                            data: { stroke: series.color.value, fill: fillColor ? series.color.value : "transparent" },
                            parent: { border: "1px solid #ccc" }
                        }}
                        // x={series.inputType === "json" ? series.xNode : "x"}
                        // y={series.inputType === "json" ? series.yNode : "y"}
                    />
                );
            } else {
                return (
                    <VictoryLine
                        key={index}
                        data={getData(series)}
                        style={{
                            data: { stroke: series.color.value, fill: fillColor ? series.color.value : "transparent" },
                            parent: { border: "1px solid #ccc" }
                        }}
                        // x={series.inputType === "json" ? series.xNode : "x"}
                        // y={series.inputType === "json" ? series.yNode : "y"}
                    />
                );
            }
        });

        // If stacked, render all area/line series inside a Victory stack
        if (isStacked) {
            return <VictoryStack>{chartsToReturn}</VictoryStack>;
        } else {
            return chartsToReturn;
        }
    };

    const getXTickValues = () => {
        return xTickData?.items?.map(item => {
            return xTickAttr?.get(item).value;
        });
    };

    const getYTickValues = () => {
        return yTickData?.items?.map(item => {
            return yTickAttr?.get(item).value;
        });
    };

    const tickFormatter = () => {
        if (xTickAttr?.type === "DateTime") {
            return (value: Date) => {
                // eslint-disable-next-line no-unused-expressions
                return `${moment(value).format(xTickFormatStr)}`;
            };
        } else {
            return (value: any) => value;
        }
    };

    const xAxisStyle = () => {
        if (xShowAxis) {
            const tickColor = xTickColor ? xTickColor.value : "black";
            const gridColor = xGridColor ? xGridColor.value : "#ccc";
            return {
                tickLabels: { fill: tickColor },
                grid: { stroke: gridColor },
                axisLabel: { fontSize: 16, fill: "white", padding: 30 }
            };
        } else {
            return {
                axis: { stroke: "transparent" },
                ticks: { stroke: "transparent" },
                tickLabels: { fill: "transparent" },
                grid: { stroke: "transparent" },
                axisLabel: { fontSize: 16, fill: "white", padding: 30 }
            };
        }
    };

    const yAxisStyle = () => {
        if (yShowAxis) {
            const tickColor = yTickColor ? yTickColor.value : "black";
            const gridColor = yGridColor ? yGridColor.value : "#ccc";
            return {
                tickLabels: { fill: tickColor },
                grid: { stroke: gridColor },
                axisLabel: { fontSize: 16, fill: "white", padding: 30 }
            };
        } else {
            return {
                axis: { stroke: "transparent" },
                ticks: { stroke: "transparent" },
                tickLabels: { fill: "transparent" },
                grid: { stroke: "transparent" },
                axisLabel: { fontSize: 16, fill: "white", padding: 30 }
            };
        }
    };

    const renderXAxis = () => {
        if (xTickData && xTickData.status === "available") {
            return (
                <VictoryAxis
                    tickValues={getXTickValues()}
                    tickFormat={tickFormatter()}
                    style={xAxisStyle()}
                    label={xAxisLabel ? xAxisLabel.value : ""}
                />
            );
        } else {
            return <VictoryAxis style={xAxisStyle()} label={xAxisLabel ? xAxisLabel.value : ""} />;
        }
    };

    const renderYAxis = () => {
        if (xTickData && xTickData.status === "available") {
            return (
                <VictoryAxis
                    dependentAxis
                    tickValues={getYTickValues()}
                    style={yAxisStyle()}
                    label={yAxisLabel ? yAxisLabel.value : ""}
                />
            );
        } else {
            return <VictoryAxis dependentAxis style={yAxisStyle()} label={yAxisLabel ? yAxisLabel.value : ""} />;
        }
    };

    // renders the components. All the charts are rendered by a function renderCharts inside a VictoryChart component, which itself is inside a view(container).
    return (
        <View style={styles.container}>
            <VictoryChart width={350} theme={VictoryTheme.material}>
                {renderCharts()}
                {renderXAxis()}
                {renderYAxis()}
            </VictoryChart>
        </View>
    );
}

// Base styling. To be moved out of this file for clean up
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5fcff"
    }
});
