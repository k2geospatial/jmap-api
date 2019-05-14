// Here the JMAP API namespace definition
// It will enable to call the API like that in your code :
// Ex: JMAP_API.Services.User.logout()
// This is the API contract, if changed it has impact on customers

declare namespace JMAP_API {
  // JMAP_API.Service : expose API services
  namespace Service {
    namespace Language {
      function getLocale(): string // EN (default), FR, ES, or PT
      function translate(key: string, params?: string | string[], locale?: string): string
    }
    namespace Project {
      function setId(projectId: string): void
    }
    namespace User {
      function setSessionId(sessionId: string): void
      function login(login: string, password: string): Promise<JLoginData>
      function logout(): Promise<void>
    }
    namespace Selection {
      function getSelection(): JElementSelection
      function addSelection(selection: JElementSelection): void
      function removeSelection(selection: JElementSelection): void
      function clearSelection(): void
      function setSelection(association: JElementSelectionWithAttribute[]): Promise<any[]>
      function zoomToSelection(elements: any): void
      function initializeElementAttributesPanel(selectedElements: any[]) : void
    }
    namespace Statistics {
      function addProjectOpened(layerIds: number[]): Promise<void>
      function addLayerViewed(layerId: number): Promise<void>
      function addContextViewed(contextId: number): Promise<void>
    }
  }

  // JMAP_API.Data : Provide redux store used by api, and also getters to easy access data
  namespace Data {
    function getStore(): any | undefined
    namespace Project {
      function getId(): string
    }
    namespace User {
      function getLocale(): string
      function getSessionId(): string
      function getIdentity(): JUserIdentity
      function getLogin(): string
    }
    namespace Selection {
      function getSelection(): JElementSelection
    }
  }

  // JMAP_API.Component : provide a way to start ui components by your own in the DOM container of your choice
  namespace Component {
    // JMAP_API.Component.FormFlat : form without sections, rows and column. Only field aligned vertically
    const FormFlat: JAPIComponent<JFormCmp, JFormProps>
  }

  // JMAP_API.Application : JMap application instance management (not started by default)
  namespace Application {
    function needToStart(): boolean
    function getContainerId(): string
    function getInstance(): React.Component<any, React.ComponentState> | Element | void
    function start(containerId?: string, initOptions?: JAPIApplicationOptions): void
  }

  // JMAP_API.Extension : provide an api to register dynamically an extension
  namespace Extension {
    function register(extensionModel: JExtensionModel): void
    function isRegistered(extensionId: string): boolean // ex : JMAP_API.Extension.isRegistered('Document')
    function getAllRegistered(): string[]
    function renderMouseOver(layerId: string, elementId: string): JExtensionMouseOver[]
    function hasMouseOver(): boolean

    // JMAP_API.Extension.Document : @Optional
    namespace Document {
      const ui_controller: any // @Deprecated

      function setMode(newMode: JDocumentMode): void

      function selectMapElement(layer: string, element: string): Promise<void>
      function unSelectMapElement(): void
      function getElementDocuments(toSelectObjectId: JObjectId): Promise<JAllDocumentDescriptors>

      function getAndSetDeposits(): Promise<JDepositDescriptor[]>
      function setDeposits(deposits: JDepositDescriptor[]): void

      function setSelectionDocuments(descriptors: JAllDocumentDescriptors): void
      function filterSelectionResult(filterValue: string | undefined): void

      function setSearchBasicDeposit(depositId: number): void
      function setSearchBasicTextInput(filter: string): void
      function setSearchBasicOptionRegion(selected: boolean): void
      function setSearchBasicOptionElementSelected(selected: boolean): void
      function resetSearchBasic(textInput?: string): void
      function filterSearchBasicResult(filterValue: string | undefined): void
      function clearSearchBasicResult(): void
      function launchSearchBasic(): Promise<JDocumentDescriptor[]>

      function getAndSetSearchAdvancedDepositForms(depositId: number): Promise<JFormDescriptor[]>
      function selectSearchAdvancedDepositForm(formId: number): void
      function setSearchAdvancedDeposit(depositId: number): void
      function setSearchAdvancedOptionRegion(selected: boolean): void
      function setSearchAdvancedOptionElementSelected(selected: boolean): void
      function filterSearchAdvancedResult(filterValue: string | undefined): void
      function clearSearchAdvancedResult(): void
      function launchSearchAdvanced(valuesByAttributeName: { [attributeName: string]: any }): void
    }
  }
}

declare interface Window {
  JMAP_API_OPTIONS?: any // TODO JAPIOptions
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: any
}

interface JAllDocumentDescriptors {
  documents: JDocumentDescriptor[]
  hyperlinks: JHyperLinkDescriptor[]
}

interface JHyperLinkDescriptor {
  id: number
  url: string
  depositName: string
  depositId: number
  linkDescription: string
  linkImageLocation: string
  linkTitle: string
  linkFavicon: string
}

interface JDocumentDescriptor {
  identifier: number
  title: string
  description: string
  fileName: string
  creation: number // timestamp
  depositName: string
  depositId: number
  hasDownloadPermission: boolean
  documentAssociations: JElementSelectionWithAttribute[]
  metadataList: JDocumentMetadata[]
}

interface JDocumentMetadata {
  name: string
  values: (string | number)[]
}

interface JDepositDescriptor {
  id: number
  name: string
  description: string
}

interface JExtensionMouseOver {
  html: string  // static html content
  js?: string   // javascript that will be evaluated after html rendered
}

interface JObjectId {
  project: string
  layer: string
  element: string
}

interface JElementSelection {
  [layerId: number]: number[]
}

interface JElementSelectionWithAttribute {
  attributeName: string
  layerName: string
  elementIds: string[]
}

interface JUserIdentity {
  firstName: string
  lastName: string
  login: string
}

interface JLoginData {
  token: string
  user: JUserPublicData
}

interface JUserPublicData {
  login: string,
  firstname: string,
  lastname: string,
  admin: boolean
}

interface JAPIApplicationOptions {
  start: boolean
  containerId: string
}

interface JAPIComponent<C extends React.Component, P> {
  create(containerId: string, options?: P): C
  destroy(containerId: string): void
  getInstance(containerId: string): C
}

interface JFormCmp extends React.Component<JFormProps, {}> { }
interface JFormProps {
  idPrefix: string
  formDescriptor: JFormDescriptor,
  buttonLabelSubmit?: string
  buttonLabelCancel?: string
  buttonLabelClear?: string
  hideClearButton?: boolean
  onSubmit: (values: any) => void,
  onCancel?: () => void
  onClear?: () => void
}

interface JFormDescriptor {
  id: number
  type: JFormTypes
  name: string
  readOnly: boolean
  canInsert: boolean
  canUpdate: boolean
  canDelete: boolean
  sections: JFormSection[]
  permissions: { [key: string]: boolean }
  idAttributeName: string | null
}

interface JFormSection {
  name: string
  nbCol: number
  rows: JFormRow[]
}

interface JFormRow {
  row: number
  cells: JFormField[]
}

type JFormField =
  JFormFieldLabel
  | JFormFieldEmpty
  | JFormFieldInput
  | JFormFieldInputText
  | JFormFieldDate
  | JFormFieldRange
  | JFormFieldCheckBox
  | JFormFieldSelectOne
  | JFormFieldSelectBase
  | JFormFieldSelectTree

interface JFormFieldBase {
  uuid?: string
  type: JFormFieldTypes
  tooltip: string
  display: {
    width: number
    row: number
    colSpan: number
    col: number
    align: JFormFieldAlignments
  }
}

interface JFormFieldEmpty extends JFormFieldBase {
  type: JFormFieldTypes
}

interface JFormFieldLabel extends JFormFieldBase {
  text: string
}

interface JFormFieldColumnSpan extends JFormFieldBase {
  id: string
}

interface JFormFieldInput extends JFormFieldBase {
  required: boolean
  readOnly: boolean
  defaultValue: string
  labelPrefix: string
  labelSuffix: string
  attribute: JFormFieldAttribute
  parentAttribute: string
}

interface JFormFieldAttribute {
  name: string
  type: number
}

interface JFormFieldDate extends JFormFieldInput {
  dateFormat: string
}

interface JFormFieldInputText extends JFormFieldInput {
  range: null | { min: number, max: number }
  multiLine: boolean
  maxNumberCharacter: number
  maskFormatter: string
}

interface JFormFieldRange extends JFormFieldInput {
  type: JFormFieldTypes
}

interface JFormFieldCheckBox extends JFormFieldInput {
  checkedValue: string
  uncheckedValue: string
}

interface JFormFieldTreeEntry {
  parentValue: string
  label: string
  value: string
}

interface JFormFieldSelectBase extends JFormFieldInput {
  selectEntries: JFormFieldTreeEntry[]
}

interface JFormFieldSelectOne extends JFormFieldSelectBase {
  canAddNewValue: boolean
  autoSelectUniqueValue: boolean
}

interface JFormFieldSelectTree extends JFormFieldSelectBase {
  onlyLeafSelection: boolean
}

type JFormTypes =
  "DEPRECATED_FORM"
  | "LAYER_ATTRIBUTES_FORM"
  | "LAYER_ATTRIBUTES_SUB_FORM"
  | "EXTERNAL_ATTRIBUTES_FORM"
  | "EXTERNAL_ATTRIBUTES_SUB_FORM"

type JFormFieldTypes =
  "TYPE_EMPTY"
  | "TYPE_COLUMN_SPAN"
  | "TYPE_LABEL"
  | "TYPE_INPUT_TEXT"
  | "TYPE_INPUT_RANGE"
  | "TYPE_SELECT_ONE"
  | "TYPE_SELECT_MANY"
  | "TYPE_INPUT_DATE"
  | "TYPE_SELECT_BOOLEAN"
  | "TYPE_GROUP_PANEL"
  | "TYPE_DOCUMENT"
  | "TYPE_TREE"
  | "TYPE_TABLE"

type JFormFieldAlignments =
  "LEFT"
  | "CENTER"
  | "RIGHT"

interface JUserState {
  identity: JUserIdentity
  token: string
  locale: string
}

interface JUserIdentity {
  firstName: string
  lastName: string
  login: string
}

interface JExtensionModel {
  id: string
  initFn: (options: any) => void
  storeReducer?: (reducerState: any, action: any) => any
  serviceToExpose?: any
  renderMouseOver?(layerId: string, elementId: string): JExtensionMouseOver
}

type JDocumentMode = "MENU" | "SELECTION" | "SEARCH_BASIC" | "SEARCH_ADVANCED"
