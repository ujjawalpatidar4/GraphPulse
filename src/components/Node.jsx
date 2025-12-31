import React, { useState } from 'react';
import { NodeTypes } from '../utils/nodeTypes';

const Node = ({ node, onAdd, onDelete, onUpdate, isRoot }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [label, setLabel] = useState(node.label);

    const handleBlur = () => {
        setIsEditing(false);
        onUpdate(node.id, label);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleBlur();
        }
    };

    const getNodeColor = () => {
        switch (node.type) {
            case NodeTypes.START: return 'var(--start-node-bg)';
            case NodeTypes.ACTION: return 'var(--action-node-bg)';
            case NodeTypes.BRANCH: return 'var(--branch-node-bg)';
            case NodeTypes.END: return 'var(--end-node-bg)';
            default: return '#fff';
        }
    };

    return (
        <div className="node-wrapper">
            <div
                className={`node ${node.type}`}
            >
                <div className="node-content">
                    <div className="node-header" style={{ background: getNodeColor() }}>
                        <span className="node-type-label">{node.type.toUpperCase()}</span>
                        {!isRoot && (
                            <button className="delete-btn" onClick={() => onDelete(node.id)}>×</button>
                        )}
                    </div>

                    <div className="node-body">
                        {isEditing ? (
                            <input
                                autoFocus
                                value={label}
                                onChange={(e) => setLabel(e.target.value)}
                                onBlur={handleBlur}
                                onKeyDown={handleKeyDown}
                                className="node-input"
                            />
                        ) : (
                            <span onClick={() => setIsEditing(true)} className="node-label">
                                {node.label}
                            </span>
                        )}
                    </div>
                </div>

            </div>

            {node.type !== NodeTypes.END && (
                <div className="add-controls">
                    <div className="add-trigger">+</div>
                    <div className="add-menu">
                        <button onClick={() => onAdd(node.id, NodeTypes.ACTION)}>+ Action</button>
                        <button onClick={() => onAdd(node.id, NodeTypes.BRANCH)}>+ Branch</button>
                        <button onClick={() => onAdd(node.id, NodeTypes.END)}>+ End</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Node;
