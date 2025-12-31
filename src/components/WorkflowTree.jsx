import React from 'react';
import Node from './Node';
import { NodeTypes } from '../utils/nodeTypes';

const WorkflowTree = ({ nodes, nodeId, onAdd, onDelete, onUpdate }) => {
    const node = nodes[nodeId];
    if (!node) return null;

    const children = node.children || [];
    const isBranch = node.type === NodeTypes.BRANCH;

    return (
        <div className="tree-node">
            <Node
                node={node}
                onAdd={onAdd}
                onDelete={onDelete}
                onUpdate={onUpdate}
                isRoot={node.id === 'start-node'}
            />

            {children.length > 0 && (
                <>
                    <div className={`connector-line ${isBranch ? 'branch-connector' : ''}`} />

                    <div className={`children-container ${isBranch ? 'branch-children' : ''}`}>
                        {children.map((childId) => (
                            <div key={childId} className="child-wrapper">
                                {isBranch && <div className="branch-line-top" />}
                                <WorkflowTree
                                    nodes={nodes}
                                    nodeId={childId}
                                    onAdd={onAdd}
                                    onDelete={onDelete}
                                    onUpdate={onUpdate}
                                />
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default WorkflowTree;
