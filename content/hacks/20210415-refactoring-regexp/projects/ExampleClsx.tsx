import React from "react";
import classes from "./ExampleClsx.module.css";
import { useTheme } from "theme-lib";
import clsx from "clsx";

export const ExampleClsx = () => {
    const { theme } = useTheme();
    return <div className={clsx(classes[theme], classes.foo)} />
}