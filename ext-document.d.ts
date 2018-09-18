// EXTENSION DECLARATIONS

declare namespace JMAP_API {
  namespace Extensions {
    namespace Document { // specific to this extension
      function selectElements(selectedElements: ObjectId[]): void
      function filter(filterValue: string | undefined): void
      function createDocumentIcon(layerId: string, elementId: string): void
      function displayElementDocuments(layerId: string, elementId: string): void
    }
  }
}

declare interface ObjectId {
  project: number
  layer: number
  element: number
}

declare interface DocumentDescriptor {
  id: string
  title: string
  description: string
  objectIds: ObjectId[]
}

