import { useState, useCallback } from 'react';
import { NodeTypes, createInitialState, createNode } from '../utils/nodeTypes';

export const useWorkflow = () => {
    const [nodes, setNodes] = useState(createInitialState());
    const [history, setHistory] = useState({ past: [], future: [] });


    const pushToHistory = useCallback((currentNodes) => {
        setHistory(prev => ({
            past: [...prev.past, currentNodes],
            future: []
        }));
    }, []);

    const undo = useCallback(() => {
        setHistory(prev => {
            if (prev.past.length === 0) return prev;

            const newPast = [...prev.past];
            const previousState = newPast.pop();

            setNodes(previousState);

            return {
                past: newPast,
                future: [nodes, ...prev.future]
            };
        });
    }, [nodes]);

    const redo = useCallback(() => {
        setHistory(prev => {
            if (prev.future.length === 0) return prev;

            const newFuture = [...prev.future];
            const nextState = newFuture.shift();

            setNodes(nextState);

            return {
                past: [...prev.past, nodes],
                future: newFuture
            };
        });
    }, [nodes]);

    const saveWorkflow = useCallback(() => {
        console.log("Saving Workflow Data:", JSON.stringify(nodes, null, 2));
        alert("Workflow saved to console!");
    }, [nodes]);

    const addNode = useCallback((parentId, type, label = 'New Node') => {
        const newNode = createNode(type, label);

        pushToHistory(nodes);

        setNodes((prev) => {
            const parent = prev[parentId];
            if (!parent) return prev;

            const newNodes = { ...prev };
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
    }, [nodes, pushToHistory]);

    const updateNodeLabel = useCallback((nodeId, newLabel) => {
        pushToHistory(nodes);

        setNodes((prev) => {
            return {
                ...prev,
                [nodeId]: { ...prev[nodeId], label: newLabel },
            };
        });
    }, [nodes, pushToHistory]);

    const deleteNode = useCallback((nodeId) => {
        if (nodeId === 'start-node') return;

        pushToHistory(nodes);

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
    }, [nodes, pushToHistory]);

    return {
        nodes,
        addNode,
        updateNodeLabel,
        deleteNode,
        saveWorkflow,
        undo,
        redo,
        canUndo: history.past.length > 0,
        canRedo: history.future.length > 0
    };
};
