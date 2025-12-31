import React from 'react';
import WorkflowTree from './WorkflowTree';
import { useWorkflow } from '../hooks/useWorkflow';

const Canvas = () => {
    const {
        nodes,
        addNode,
        deleteNode,
        updateNodeLabel,
        saveWorkflow,
        undo,
        redo,
        canUndo,
        canRedo
    } = useWorkflow();

    return (
        <div className="canvas-container">
            <div className="toolbar">
                <button onClick={saveWorkflow} className="toolbar-btn save-btn">Save</button>
                <div className="divider"></div>
                <button onClick={undo} disabled={!canUndo} className="toolbar-btn">Undo</button>
                <button onClick={redo} disabled={!canRedo} className="toolbar-btn">Redo</button>
            </div>
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
