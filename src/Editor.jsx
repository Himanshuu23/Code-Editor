import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/css/css'
import { Controlled as ControlledEditor } from 'react-codemirror2'
import './App.css'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCompressAlt, faExpandAlt } from '@fortawesome/free-solid-svg-icons'

export function Editor(props) {
    const {
        language,
        displayName,
        value,
        onChange
    } = props

    const [open, setOpen] = useState(true)

    function handleChange(editor, data, value) {
        onChange(value)
    }

    return (
        <div className={`editor-container ${open? '' : 'collapsed'}`}>
            <div className="editor-title">
                {displayName}
                <button className='expand-collapse-btn' type='button' onClick={() => setOpen(prevOpen => !prevOpen)}><FontAwesomeIcon icon={open? faCompressAlt : faExpandAlt}/></button>
            </div>
            <ControlledEditor
                onBeforeChange={handleChange}
                value={value}
                className='codemirror-wrapper'
                options={{
                    lineWrapping: true,
                    lint: true,
                    mode: language,
                    theme: 'material',
                    lineNumbers: true
                }}
            />
        </div>
    )
}