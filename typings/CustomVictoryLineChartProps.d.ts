/**
 * This file was generated from CustomVictoryLineChart.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { CSSProperties } from "react";
import { DynamicValue, ListValue, ListAttributeValue } from "mendix";
import { Big } from "big.js";

export type TypeEnum = "line" | "area";

export interface SeriesListType {
    data?: ListValue;
    xAttr?: ListAttributeValue<Date | string | Big>;
    yAttr?: ListAttributeValue<Big>;
    type: TypeEnum;
    color: DynamicValue<string>;
}

export interface SeriesListPreviewType {
    data: {} | { caption: string } | { type: string } | null;
    xAttr: string;
    yAttr: string;
    type: TypeEnum;
    color: string;
}

export interface CustomVictoryLineChartProps<Style> {
    name: string;
    style: Style[];
    seriesList: SeriesListType[];
    xShowAxis: boolean;
    xTickData?: ListValue;
    xTickAttr?: ListAttributeValue<Date | string | Big>;
    xTickFormatStr: string;
    xTickColor?: DynamicValue<string>;
    xGridColor?: DynamicValue<string>;
    xAxisLabel?: DynamicValue<string>;
    yShowAxis: boolean;
    yTickData?: ListValue;
    yTickAttr?: ListAttributeValue<Big>;
    yTickColor?: DynamicValue<string>;
    yGridColor?: DynamicValue<string>;
    yAxisLabel?: DynamicValue<string>;
    isStacked: boolean;
    fillColor: boolean;
}

export interface CustomVictoryLineChartPreviewProps {
    /**
     * @deprecated Deprecated since version 9.18.0. Please use class property instead.
     */
    className: string;
    class: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    seriesList: SeriesListPreviewType[];
    xShowAxis: boolean;
    xTickData: {} | { caption: string } | { type: string } | null;
    xTickAttr: string;
    xTickFormatStr: string;
    xTickColor: string;
    xGridColor: string;
    xAxisLabel: string;
    yShowAxis: boolean;
    yTickData: {} | { caption: string } | { type: string } | null;
    yTickAttr: string;
    yTickColor: string;
    yGridColor: string;
    yAxisLabel: string;
    isStacked: boolean;
    fillColor: boolean;
}
