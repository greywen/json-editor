function removeDefaultContextMenu(editor) {
    const removableIds = [
        'editor.action.quickOutline',
        'editor.action.changeAll',
        'editor.action.quickCommand',
        'editor.action.clipboardCutAction',
        'editor.action.clipboardCopyAction',
        'editor.action.clipboardPasteAction',
    ];
    const contextmenu = editor.getContribution(
        'editor.contrib.contextmenu'
    );
    const realMethod = contextmenu._getMenuActions;
    contextmenu._getMenuActions = function () {
        const items = realMethod.apply(contextmenu, arguments);
        return items.filter(function (item) {
            return !removableIds.includes(item.id);
        });
    };
}

function addCompressContextMenu(editor) {
    editor.addAction({
        id: 'custom-action-compress',
        label: 'Compress Document',
        keybindings: [
            monaco.KeyMod.Shift | monaco.KeyMod.Alt | monaco.KeyCode.KeyC,
            monaco.KeyMod.chord(
                monaco.KeyMod.Shift | monaco.KeyMod.Alt | monaco.KeyCode.KeyC
            ),
        ],
        precondition: null,
        keybindingContext: null,
        contextMenuGroupId: '1_modification',
        contextMenuOrder: 2,
        run: function (editor) {
            try {
                const content = editor.getValue();
                if (content.trim()) {
                    const compressedContent = JSON.stringify(JSON.parse(content));
                    editor.setValue(compressedContent);
                }
            } catch {
                console.error('Unable to compress invalid JSON.');
            }
        },
    });
}

function addDiffContextMenu(editor) {
    editor.addAction({
        id: 'custom-action-diff',
        label: 'Diff Document',
        keybindings: [
            monaco.KeyMod.Shift | monaco.KeyMod.Alt | monaco.KeyCode.KeyD,
            monaco.KeyMod.chord(
                monaco.KeyMod.Shift | monaco.KeyMod.Alt | monaco.KeyCode.KeyD
            ),
        ],
        precondition: null,
        keybindingContext: null,
        contextMenuGroupId: '1_modification',
        contextMenuOrder: 3,
        run: function () {
            location.href = 'diff.html';
        },
    });
}