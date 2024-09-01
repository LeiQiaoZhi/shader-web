import React from "react";
import {VscTriangleDown, VscTriangleRight} from "react-icons/vsc";
import "./Expander.css";
import IconButton from "./IconButton";

interface ExpanderProps {
    title: string,
    headerClassName?: string,
    children: React.ReactNode,
    defaultExpanded?: boolean
}

export const Expander: React.FC<ExpanderProps> = (
    {
        title,
        children,
        headerClassName,
        defaultExpanded = false
    }
) => {
    const [expand, setExpand] = React.useState(defaultExpanded);
    return (<div style={{
        transition: 'none'
    }}>
        <div className={`expander-title ${headerClassName}`}
             onClick={
                 () => setExpand(!expand)
             }>
            <IconButton
                bg="none"
                border="none"
                color="inherit"
                padding="0"
                size="small"
            >
                {expand
                    ? <VscTriangleDown/>
                    : <VscTriangleRight/>}
            </IconButton>
            {title}
        </div>
        {expand && children}
    </div>);
}