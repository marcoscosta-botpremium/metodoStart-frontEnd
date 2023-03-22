export const saveBeforeUnload = () => {
    window.onbeforeunload = () => {
        // const currentDom = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace)
        // localStorage.setItem('previousStrat', Blockly.Xml.domToPrettyText(currentDom))
        return null
    }
}