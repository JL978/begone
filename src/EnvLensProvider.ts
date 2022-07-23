import {
    CancellationToken,
    CodeLens,
    CodeLensProvider,
    TextDocument,
    TextEditor,
} from 'vscode'

export default class EnvLensProvider implements CodeLensProvider {
    activeEditor: TextEditor | undefined

    async provideCodeLenses(
        document: TextDocument,
        token: CancellationToken
    ): Promise<CodeLens[]> {
        const lens: CodeLens[] = []
        for (let i = 0; i < document.lineCount; i++) {
            const line = document.lineAt(i)
            if (line.isEmptyOrWhitespace) continue
            if (!line.text.includes('=')) continue
            const toggleLens = new CodeLens(line.range, {
                command: 'begone.toggleLine',
                title: 'Toggle',
                arguments: [i],
            })
            const pasteLens = new CodeLens(line.range, {
                command: 'begone.pasteLine',
                title: 'Paste',
                arguments: [i],
            })
            if (line.lineNumber === document.lineCount - 1) {
                const insertLineLens = new CodeLens(line.range, {
                    command: 'begone.insertLine',
                    title: 'Paste',
                    arguments: [i],
                })
                lens.push(insertLineLens)
            }

            lens.push(toggleLens)
            lens.push(pasteLens)
        }
        return lens
    }

    constructor() {}

    setActiveTextEditor(editor: TextEditor | undefined) {
        this.activeEditor = editor
    }
}
