// EXTENSION DECLARATIONS

declare namespace JMAP_API {
  namespace Extensions {
    namespace Document { // specific to this extension
      function selectElements(selectedElements: IObjectId[]): Promise<IDocumentDescriptor[]>
      function filter(filterValue: string): void
      function loadIcon(layerId: string, elementId: string): void
    }
  }
}

declare interface IObjectId {
  layer: number
  element: number
}

declare interface IDocumentDescriptor {
  id: string
  title: string
  description: string
  objectIds: IObjectId[]
}
