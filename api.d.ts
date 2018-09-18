/**
 * NAMESPACES
 */

declare namespace JMAP_API {
  namespace Data {
    const Store: any
  }
  namespace Config {
    function getBaseUrl(): string
  }
  namespace Extensions {
    function register(options: IExtensionInitData): void
  }
}

/**
 * INTERFACES
 */

declare interface IExtensionInitData {
  id: string
  initFn: (options: any) => void
  storeReducer?: (reducerState: any, action: Action) => any
  serviceToExpose?: any
  renderMouseOver?(layerId: string, elementId: string): string
}

declare interface Action {
  [ key: string ]: any
  type: string
}
