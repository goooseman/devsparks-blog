import React from "react";
import classes from "./ExampleStringInterpolation.module.css";
import { useTheme } from "theme-lib";

export const ExampleStringInterpolation = () => {
    const { theme } = useTheme();
    return <div className={`${classes[theme]} ${classes.foo}`} />
}