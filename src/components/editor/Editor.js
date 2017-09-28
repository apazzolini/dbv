import React from 'react'
import AceEditor from 'react-ace'
import brace from 'brace'
import 'brace/mode/sql'
import 'brace/theme/solarized_light'
import 'brace/theme/tomorrow_night'
import 'brace/keybinding/vim'

// import main from '../../electron-main.js'
const { remote } = window.require('electron')
const main = remote.require('./electron-main.js')

let x = ''

const onAceLoad = onResult => editor => {
    brace.config.loadModule('ace/keyboard/vim', function(module) {
        const { Vim } = module.CodeMirror
        Vim.defineEx('run', 'r', async function(cm, input) {
            const r = await main.pong(Number(x))
            console.log(x, r, r[0].solution)
            onResult(r[0].solution)
        })
    })

    editor.getSession().setUseWrapMode(true)

    // -------------------------------------------------------------------------
    // These are my personal keybindings for Vim efficiency --------------------
    // -------------------------------------------------------------------------
    editor.getKeyboardHandler().defaultKeymap.unshift({
        keys: ';',
        toKeys: ':',
        type: 'keyToKey',
        user: true,
    })

    editor.getKeyboardHandler().defaultKeymap.unshift({
        keys: 'j',
        toKeys: 'gj',
        type: 'keyToKey',
        user: true,
    })

    editor.getKeyboardHandler().defaultKeymap.unshift({
        keys: 'k',
        toKeys: 'gk',
        type: 'keyToKey',
        user: true,
    })

    editor.getKeyboardHandler().defaultKeymap.unshift({
        keys: 'H',
        toKeys: '^',
        type: 'keyToKey',
        user: true,
    })

    editor.getKeyboardHandler().defaultKeymap.unshift({
        keys: 'L',
        toKeys: '$',
        type: 'keyToKey',
        user: true,
    })

    editor.getKeyboardHandler().defaultKeymap.unshift({
        keys: '<Space>',
        toKeys: '10j',
        type: 'keyToKey',
        user: true,
    })

    editor.getKeyboardHandler().defaultKeymap.unshift({
        keys: '<BS>',
        toKeys: '10k',
        type: 'keyToKey',
        user: true,
    })

    editor.getKeyboardHandler().defaultKeymap.unshift({
        keys: 'jk',
        action: 'exitInsertMode',
        type: 'action',
        user: true,
        context: 'insert',
    })
}

const onChange = (a, b, c) => {
    x = a
}

const Editor = ({ onResult }) => (
    <AceEditor
        width="100%"
        height="100%"
        mode="sql"
        keyboardHandler="vim"
        theme="solarized_light"
        onLoad={onAceLoad(onResult)}
        onChange={onChange}
        name="somename"
        editorProps={{ $blockScrolling: true }}
    />
)

export default Editor
