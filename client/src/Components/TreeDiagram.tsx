import React, { useEffect, useRef } from "react";
import TodoInfoTreeNode from "../Classes/TodoInfoTreeNode";
import "../Styles/Components/TreeDiagram.css";

import Tree from "react-d3-tree";

import * as d3 from "d3";
import Todo from "../Classes/Todo";

interface Props {
    root?: TodoInfoTreeNode;
}

export const TreeDiagram = (props: Props) => {
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
                    stroke={value.deadline > Date.now() || value.status === "DONE" ? "none" : "#ff0000"} 
                    strokeWidth={3} fill={fillColor} paintOrder={"fill"}></circle>
                    <foreignObject width={200} height={200}> 
                        <div style={{ display: "flex", margin: "20px"}}>
                            <h3 style={{display: "block", width: "100%", fontSize:"12px"}}>{e.nodeDatum.name}</h3>
                        </div>
                    </foreignObject>
                </React.Fragment>
            }}
            onNodeClick={e => console.log(e)}
        ></Tree>}
    </div>
}