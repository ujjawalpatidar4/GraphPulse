import { useState, useCallback } from 'react';
import { NodeTypes, createInitialState, createNode } from '../utils/nodeTypes';

export const useWorkflow = () => {
    const [nodes, setNodes] = useState(createInitialState());

    const addNode = useCallback((parentId, type, label = 'New Node') => {
        const newNode = createNode(type, label);

        setNodes((prev) => {
            const parent = prev[parentId];
            if (!parent) return prev;

            const newNodes = { ...prev };  // Add
            newNodes[newNode.id] = newNode;

            if (parent.type === NodeTypes.BRANCH) {
                newNodes[parentId] = {
                    ...parent,
                    children: [...parent.children, newNode.id],
                };
            } else {
                const existingChildId = parent.children[0];

                newNodes[parentId] = {
                    ...parent,
                    children: [newNode.id],
                };

                if (existingChildId) {
                    newNodes[newNode.id].children = [existingChildId];
                }
            }

            return newNodes;
        });
    }, []);

    const updateNodeLabel = useCallback((nodeId, newLabel) => {
        setNodes((prev) => ({
            ...prev,
            [nodeId]: { ...prev[nodeId], label: newLabel },
        }));
    }, []);

    const deleteNode = useCallback((nodeId) => {
        if (nodeId === 'start-node') return;

        setNodes((prev) => {
            const parentEntry = Object.entries(prev).find(([_, node]) =>
                node.children.includes(nodeId)
            );

            if (!parentEntry) return prev;

            const [parentId, parentNode] = parentEntry;
            const nodeToDelete = prev[nodeId];
            const newNodes = { ...prev };
            delete newNodes[nodeId];

            let childrenToReconnect = nodeToDelete.children;

            if (childrenToReconnect.length > 0) {
                if (parentNode.type === NodeTypes.BRANCH) {

                    newNodes[parentId] = {
                        ...parentNode,
                        children: parentNode.children
                            .filter(id => id !== nodeId)
                            .concat(childrenToReconnect)
                    };
                } else {

                    const firstChild = childrenToReconnect[0];
                    newNodes[parentId] = {
                        ...parentNode,
                        children: firstChild ? [firstChild] : []
                    };

                }
            } else {
                newNodes[parentId] = {
                    ...parentNode,
                    children: parentNode.children.filter(id => id !== nodeId)
                };
            }

            return newNodes;
        });
    }, []);

    return {
        nodes,
        addNode,
        updateNodeLabel,
        deleteNode,
    };
};
