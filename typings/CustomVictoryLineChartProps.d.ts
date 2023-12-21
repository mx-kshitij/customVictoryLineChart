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
    data: ListValue;
    xAttr: ListAttributeValue<Date | string | Big>;
    yAttr: ListAttributeValue<Big>;
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
    isStacked: boolean;
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
    isStacked: boolean;
}
