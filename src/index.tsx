import '@logseq/libs'

import { createRoot } from 'react-dom/client'
import { Zotero } from './features/main'
import { GlossaryObj } from './features/main/interfaces'
import { handlePopup } from './handle-popup'
import { isValidSettings } from './services/check-settings'
import { createTemplateGlossary } from './services/create-template-glossary'
import { getZotItems, testZotConnection } from './services/get-zot-items'
import { mapItems } from './services/map-items'
import { handleSettings } from './settings'

import indexCSS from './features/main/index.css?inline'
import tableCSS from './components/table.css?inline'

const glossaryObj: GlossaryObj = {
  accessDate: '<% accessDate %>',
  attachments: '<% attachments %>',
  citeKey: '<% citeKey %>',
  collections: '<% collections %>',
  authors: '<% creators %>',
  date: '<% date %>',
  dateAdded: '<% dateAdded %>',
  dateModified: '<% dateModified %>',
  DOI: '<% DOI %>',
  ISBN: '<% ISBN %>',
  ISSN: '<% ISSN %>',
  issue: '<% issue %>',
  itemType: '<% itemType %>',
  journalAbbreviation: '<% journalAbbreviation %>',
  key: '<% key %>',
  language: '<% language %>',
  libraryCatalog: '<% libraryCatalog %>',
  pages: '<% pages %>',
  parentItem: '<% parentItem %>',
  publicationTitle: '<% publicationTitle %>',
  relations: '<% relations %>',
  shortTitle: '<% shortTitle %>',
  tags: '<% tags %>',
  title: '<% title %>',
  url: '<% url %>',
  version: '<% version %>',
  volume: '<% volume %>',
};

const main = async () => {
  console.log('logseq-zoterolocal-plugin loaded')

  // Used to handle any popups
  handlePopup()

  // Get initial items
  const response = await testZotConnection()
  handleSettings(response.message, response.code)

  const validSettings = isValidSettings()
  if (!validSettings) return

  const el = document.getElementById('app')
  if (!el) return
  const root = createRoot(el)

  logseq.Editor.registerSlashCommand('Launch Zotero plugin', async (e) => {
    const response = await getZotItems()
    if (!response) return

    const items = await mapItems(response)
    if (!items[0]) return

    root.render(<Zotero items={items} uuid={e.uuid} />)
    logseq.showMainUI()
  })

  // Insert glossary as blocks for user to choose
  logseq.Editor.registerSlashCommand('Insert Zotero template', async (e) => {
    await logseq.Editor.updateBlock(
      e.uuid,
      `Zotero Template
    template:: Zotero Template
    template-including-parent:: false`,
    )

    await createTemplateGlossary(glossaryObj, e.uuid)
  })

  async function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  logseq.provideStyle(indexCSS);
  logseq.provideStyle(tableCSS);

  const popup = async (e: any) => {
    const response = await getZotItems()
    if (!response) return

    const items = await mapItems(response)
    if (!items[0]) return

    logseq.provideUI({
      key: 'popup', 
      template: '<span></span>',
      style: {
        top: "0",
        left: "0",
      }
    }); 
    await sleep(0);
    const outer = parent.document.getElementById("logseq-zoterolocal-plugin--popup");
    if (outer === null) { console.log('outer is null'); return; }
    const container = outer.querySelector<HTMLDivElement>('.ls-ui-float-content');
    if (container === null) { console.log('container is null'); return; }
    const root = createRoot(container!);
    root.render(<Zotero items={items} uuid={e.uuid} />)
  }

  logseq.Editor.registerSlashCommand('TEST: ui', popup)
}

logseq.ready(main).catch(console.error)
