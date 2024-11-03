import { useEffect, useState } from 'react'
import { Editor } from './Editor.jsx'
import './App.css'
import useLocalStorage from './hooks/useLocalStorage.js'

export default function App() {
  const [html, setHtml] = useLocalStorage('html', '')
  const [css, setCss] = useLocalStorage('css', '')
  const [js, setJs] = useLocalStorage('js', '')
  const [srcDoc, setSrcDoc] = useState('')

  useEffect(() => {
    const timeout = setTimeout(() => {
    setSrcDoc(`
      <html>
        <body>${html}</body>
        <style>${css}</style>
        <script>${js}</script>
      </html>
      `)  
    }, 250)

    return () => clearTimeout(timeout)
  }, [html, css, js])

  return (
    <>
      <div className="pane top-pane">
        <Editor 
          language="xml" 
          displayName="HTML" 
          value={html}
          onChange={setHtml}
        />
        <Editor
          langauge="css"
          displayName="CSS"
          value={css}
          onChange={setCss}
        />
        <Editor
          langauge="js"
          displayName="Javascript"
          value={js}
          onChange={setJs}
        />
      </div>
      <div className="pane bottom-pane">
        <iframe
          srcDoc={srcDoc}
          title='output'
          sandbox='allow-scripts'
          style={{border: 'none'}}
          height='100%'
          width='100%'
        />
      </div>
    </>
  )
}