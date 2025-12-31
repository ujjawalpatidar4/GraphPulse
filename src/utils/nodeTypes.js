export const NodeTypes = {
    START: 'start',
    ACTION: 'action',
    BRANCH: 'branch',
    END: 'end',
};

export const createInitialState = () => ({
    'start-node': {
        id: 'start-node',
        type: NodeTypes.START,
        label: 'Start',
        children: [],
    },
});

export const createNode = (type, label) => ({
    id: crypto.randomUUID(),
    type,
    label,
    children: [],
});
