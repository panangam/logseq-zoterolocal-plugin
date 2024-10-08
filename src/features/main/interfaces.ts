export interface ZotItem {
  key: string
  version: number
  library: {
    type: string
    id: number
    name: string
    links: {
      self: {
        href: string
        type: string
      }
      alternate: {
        href: string
        type: string
      }
    }
  }
  links: {
    self: {
      href: string
      type: string
    }
    alternate: {
      href: string
      type: string
    }
    attachment?: {
      href: string
      type: string
      attachmentType: string
      attachmentSize: number
    }
    up?: {
      href: string
      type: string
    }
    enclosure?: {
      href: string
      type: string
      title: string
      length: number
    }
  }
  meta: {
    creatorSummary: string
    parsedDate: string
    numChildren: number
  }
  data: {
    key: string
    version: number
    itemType: string
    title: string
    date: string
    language: string
    shortTitle?: string
    libraryCatalog: string
    url: string
    accessDate: string
    volume?: string
    pages?: string
    publicationTitle: string
    DOI: string
    issue?: string
    journalAbbreviation?: string
    ISBN?: string
    ISSN?: string
    creators: CreatorItem[]
    tags: any[]
    collections: any[]
    relations: any
    dateAdded: string
    dateModified: string
    parentItem?: string
    extra: string
    attachment?: AttachmentItem
    citeKey: string
    inGraph: boolean
  }
}

export interface AttachmentItem {
  href: string
  length: number
  title: string
  type: string
}

export interface CreatorItem {
  firstName: string
  lastName: string
  creatorType: string
}

export interface ZotData {
  accessDate: string
  attachment?: AttachmentItem
  citeKey: string
  collections: any[]
  creators: CreatorItem[]
  date: string
  dateAdded: string
  dateModified: string
  DOI: string
  inGraph: boolean
  ISSN?: string
  ISBN?: string
  issue?: string
  itemType: string
  journalAbbreviation?: string
  key: string
  language: string
  libraryCatalog: string
  pages?: string
  parentItem?: string
  publicationTitle: string
  relations: any
  shortTitle?: string
  tags: string[]
  title: string
  url: string
  version: number
  volume?: string
}

export interface GlossaryObj {
  accessDate: string
  attachment: string
  citeKey: string
  collections: string
  authors: string
  date: string
  dateAdded: string
  dateModified: string
  DOI: string
  ISSN: string
  ISBN: string
  issue: string
  itemType: string
  journalAbbreviation: string
  key: string
  language: string
  libraryCatalog: string
  pages: string
  parentItem: string
  publicationTitle: string
  relations: string
  shortTitle: string
  tags: string
  title: string
  url: string
  version: string
  volume: string
}
