import React from "react";
import classes from "./ExampleSingleStyle.module.css";
import { useTheme } from "theme-lib";

export const ExampleSingleStyle = () => {
    const { theme } = useTheme();
    return <div className={classes[theme]} />
}