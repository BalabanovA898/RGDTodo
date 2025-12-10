import React, { useContext, useEffect, useRef } from "react";
import TodoInfoTreeNode from "../Classes/TodoInfoTreeNode";
import "../Styles/Components/TreeDiagram.css";

import Tree from "react-d3-tree";

import Todo from "../Classes/Todo";
import { observer } from "mobx-react-lite";
import { Context } from "..";

interface Props {
    root?: TodoInfoTreeNode;
}

export const TreeDiagram = observer((props: Props) => {
    const {store} = useContext(Context);

    return <div style={{color: "#fff"}} className="tree-diagram__container">
        {props.root && <Tree data={props.root}
            leafNodeClassName="tree__leafs"
            branchNodeClassName="tree__branch"
            rootNodeClassName="tree__root"
            renderCustomNodeElement={(e) => {
                const value = (e.nodeDatum as any).value as Todo;
                let fillColor = "#fff";
                switch (value.status) {
                    case ("WIP"):
                        fillColor = "#ffff00";
                        break;
                    case ("CANCELLED"):
                        fillColor = "brown";
                        break;
                    case ("DONE"):
                        fillColor = "lime"; 
                }
                return <React.Fragment>
                    <circle r={20} 
                    stroke={value.deadline ? new Date(value.deadline).getTime() > new Date().getTime() || value.status === "DONE" ? "none" : "#ff0000" : "none"} 
                    strokeWidth={3} fill={fillColor} paintOrder={"fill"}></circle>
                    <foreignObject width={200} height={200}> 
                        <div style={{ display: "flex", margin: "20px"}}>
                            <h3 style={{display: "block", width: "100%", fontSize:"12px"}}>{value.assigned?.some(item => item.id === store.user.id) && "(YOUR)"}{e.nodeDatum.name}</h3>
                        </div>
                    </foreignObject>
                </React.Fragment>
            }}
        ></Tree>}
    </div>
});