import React from 'react';
import WorkflowTree from './WorkflowTree';
import { useWorkflow } from '../hooks/useWorkflow';

const Canvas = () => {
    const { nodes, addNode, deleteNode, updateNodeLabel } = useWorkflow();

    return (
        <div className="canvas-container">
            <div className="canvas-content">
                <WorkflowTree
                    nodes={nodes}
                    nodeId="start-node"
                    onAdd={addNode}
                    onDelete={deleteNode}
                    onUpdate={updateNodeLabel}
                />
            </div>
        </div>
    );
};

export default Canvas;
