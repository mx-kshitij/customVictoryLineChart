import { ReactElement, createElement } from "react";
import { StyleSheet, View, TextStyle, ViewStyle } from "react-native";
import { Style } from "@mendix/pluggable-widgets-tools";
// import { HelloWorld } from "./components/HelloWorld";
import { CustomVictoryLineChartProps, SeriesListType } from "../typings/CustomVictoryLineChartProps";
import { VictoryArea, VictoryChart, VictoryStack, VictoryTheme } from "victory-native";

export interface CustomStyle extends Style {
    container: ViewStyle;
    label: TextStyle;
}

export function CustomVictoryLineChart({
    // Get properties (widget properties)
    // style,
    seriesList,
    isStacked
}: CustomVictoryLineChartProps<CustomStyle>): ReactElement {
    if (!seriesList) {
        return <View />;
    }

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const getData = (series: SeriesListType) => {
        // Iterate over list of datapoints and generate the data array
        const dataToReturn = series.data.items?.map(item => {
            return {
                x: series.xAttr.get(item).value,
                y: series.yAttr.get(item).value?.toNumber()
            };
        });
        return dataToReturn;
    };

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const renderCharts = () => {
        // Iterate over all the series list and generate an Area/Line (TBD) chart
        const chartsToReturn = seriesList.map((series, index) => {
            return (
                <VictoryArea
                    key={index}
                    data={getData(series)}
                    style={{
                        data: { stroke: series.color.value },
                        parent: { border: "1px solid #ccc" }
                    }}
                />
            );
        });
        // If stacked, render all area/line series inside a Victory stack
        if (isStacked) {
            return <VictoryStack>{chartsToReturn}</VictoryStack>;
        } else {
            return chartsToReturn;
        }
    };

    // renders the components. All the charts are rendered by a function renderCharts inside a VictoryChart component, which itself is inside a view(container).
    return (
        <View style={styles.container}>
            <VictoryChart width={350} theme={VictoryTheme.material}>
                {renderCharts()}
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
