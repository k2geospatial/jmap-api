/**
 * NAMESPACE
 */

declare namespace JMAP_API {
  namespace Data {
    const Store: any
  }
  namespace Config {
    function getBaseUrl(): string
  }
  namespace Extensions {
    function register(options: JAPIExtension): void
  }
}

/**
 * OBJECT
 */

declare interface Window {
  JMAP_API_OPTIONS?: JAPIOptions
}

/**
 * INTERFACE
 */

interface JAPIOptions {
  application?: {
    start: boolean
    containerId: string
  },
  server?: {
    baseUrl?: string
  }
}

// JMAP API extension model
declare interface JAPIExtension {
  id: string
  initFn: (options: any) => void
  storeReducer?: (reducerState: any, action: Action) => any
  serviceToExpose?: any
  renderMouseOver?(layerId: string, elementId: string): ExtensionMouseOver
}

declare interface ExtensionMouseOver {
  html: string
  js?: string   // javascript that will be evaluated after html rendered
}

// Redux action
declare interface Action {
  [ key: string ]: any
  type: string
}
