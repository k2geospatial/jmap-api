import { Action, Store } from "redux"

export type UIComponent = void | Element | React.Component

// API
export interface JAPI {
  Extension: JAPIExtention
  Data: JAPIData
  Application: JAPIApplication
  Component: JAPIComponent
  Service: JAPIService
}

// API OPTIONS
export interface JAPIOptions {
  application?: JAPIApplicationOptions,
  server?: {
    baseUrl?: string
  }
}

// API DATA
export interface JAPIData {
  getStore(): Store<JAPIState>|undefined
  Project: JStoreGetterProject
  User: JStoreGetterUser
  Selection: JStoreGetterSelection
}

export interface JStoreGetterProject {
  getId(): string
}

export interface JStoreGetterUser {
  getLocale(): string
  getSessionId(): string
  getIdentity(): JUserIdentity
  getLogin(): string
}

export interface JStoreGetterSelection {
  getSelection(): JElementSelection
}

export interface JAPIState {
  project: JProjectState
  user: JUserState
  selection: JSelectionState
  form: any
  external?: any
}

export interface JProjectState {
  id: string
}

// API DATA -> USER
export interface JUserState {
  identity: JUserIdentity
  sessionId: string
  locale: string
}

export interface JUserIdentity {
  firstName: string
  lastName: string
  login: string
}

// API DATA -> SELECTION
export interface JSelectionState {
  current: JElementSelection
}

// API APPLICATION
export interface JAPIApplication {
  needToStart(): boolean
  getDomContainerId(): string
  getInstance(): UIComponent
  start(containerId?: string, initOptions?: JAPIApplicationOptions): void
}

export interface JAPIApplicationOptions {
  start: boolean
  containerId: string
}

// API SERVICE
export interface JAPIService {
  Language: JAPILanguageService
  Project: JProjectService
  User: JUserService
  Selection: JSelectionService
}

// API SERVICE -> LANGUAGE
export interface JAPILanguageService {
  getLocale(): string
  setLocale(locale: string): void
  translate(key: string, params?: string|string[], locale?: string): string
}

// API SERVICE -> PROJECT
export interface JProjectService {
  setId(projectId: string): void
}

// API SERVICE -> USER
export interface JUserService {
  setSessionId(token: string): void
  login(login: string, password: string): Promise<JLoginData>
  logout(): Promise<void>
}

export interface JLoginData {
  token: string
  user: JUserPublicData
}

export interface JUserPublicData {
  login: string,
  firstname: string,
  lastname: string,
  admin: boolean
}

// API SERVICE -> SELECTION
export interface JSelectionService {
  getCurrentSelection(): JElementSelection
  addSelection(selection: JElementSelection): void
  removeSelection(selection: JElementSelection): void
  clearSelection(): void
}

export interface JElementSelection {
  [ layerId: number ]: number[]
}

// API COMPONENTS
export interface JAPIComponent {
  FormFlat: JAPIComponentItem<JFormCmp, JFormProps>
}

// P for react props
export interface JAPIComponentItem<C extends UIComponent, P> {
  create(containerId: string, props?: P): C
  destroy(containerId: string): void
  getInstance(containerId: string): C
}

// API COMPONENTS -> FORM CMP
export interface JFormCmp extends React.Component<JFormProps, {}>{}
export interface JFormProps {
  formDescriptor: JFormDescriptor,
  buttonLabelSubmit?: string
  buttonLabelCancel?: string
  buttonLabelClear?: string
  hideClearButton?: boolean
  onSubmit: (values: any) => void,
  onCancel?: () => void
}

// API EXTENSION
export interface JAPIExtention {
  Document?: JDocumentService
  register(extensionModel: JExtensionModel): void
  isRegistered(extensionId: string): boolean
  getAllRegistered(): string[]
  renderMouseOver(layerId: string, elementId: string): JExtensionMouseOver[]
  hasMouseOver(): boolean // @Deprecated should not be used in JMap Web NG
}

export interface JExtensionModel {
  id: string
  initFn: (options: any) => void
  storeReducer?: (reducerState: any, action: Action) => any
  serviceToExpose?: any
  renderMouseOver?(layerId: string, elementId: string): JExtensionMouseOver
}

export interface JExtensionMouseOver {
  html: string  // static html content
  js?: string   // javascript that will be evaluated after html rendered
}

// @Deprecated will be removed when old jmap will be retired
export interface JDocumentServiceUiController {
  createDocumentIcon(layerId: string, 
    elementId: string): void
  displayElementDocuments(layerId: string, elementId: string): void
}

export interface JDocumentService {
  ui_controller: JDocumentServiceUiController // @Deprecated
  selectElement(layer: string, element: string): Promise<void>
  unselectElement(): void
  getElementDocuments(toSelectObjectId: JObjectId): Promise<JAllDocumentDescriptors>
  selectDocuments(descriptors: JAllDocumentDescriptors): void
  filter(filterValue: string | undefined): void
}

export interface JAllDocumentDescriptors {
  documents: JDocumentDescriptor[]
  hyperlinks: JHyperLinkDescriptor[]
}

export interface JDocumentDescriptor {
  identifier: number
  title: string
  description: string
  fileName: string
  creation: number // timestamp
  depositName: string
}

export interface JHyperLinkDescriptor {
  id: number
  url: string
  depositName: string
}

// MIS
export interface JObjectId {
  project: string
  layer: string
  element: string
}

// TODO
export interface JPopupService {
  popInfo(message: string): void
  popWarning(message: string): void
  popError(message: string): void
  popConfirm(message: string, confirmCallback: (() => any), cancelCallback?: (() => any)): void
}

// FORM

export interface JFormDescriptor {
  id: number
  type: JFormTypes
  name: string
  readOnly: boolean
  canInsert: boolean
  canUpdate: boolean
  canDelete: boolean
  sections: JFormSection[]
  permissions: { [ key: string ]: boolean }
  idAttributeName: string | null
}

export interface JFormSection {
  name: string
  nbCol: number
  rows: JFormRow[]
}

export interface JFormRow {
  row: number
  cells: JFormField[]
}

export type JFormField = 
    JFormFieldLabel
    | JFormFieldEmpty
    | JFormFieldInput
    | JFormFieldInputText
    | JFormFieldDate
    | JFormFieldRange
    | JFormFieldCheckBox
    | JFormFieldSelectOne
    | JFormFieldSelectBase
    | JFormFieldSelectTree

export interface JFormFieldBase {
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

export interface JFormFieldEmpty extends JFormFieldBase {
  type: JFormFieldTypes
}

export interface JFormFieldLabel extends JFormFieldBase {
  text: string
}

export interface JFormFieldInput extends JFormFieldBase {
  required: boolean
  readOnly: boolean
  defaultValue: string
  labelPrefix: string
  labelSuffix: string
  attribute: {
    name: string
    type: number
  }
  parentAttribute: string
}

export interface JFormFieldColumnSpan extends JFormFieldBase {
  id: string
}

export interface JFormFieldDate extends JFormFieldInput {
  dateFormat: string
}

export interface JFormFieldInputText extends JFormFieldInput {
  range: null | { min: number, max: number }
  multiLine: boolean
  maxNumberCharacter: number
  maskFormatter: string
}

export interface JFormFieldRange extends JFormFieldInput {
  type: JFormFieldTypes
}

export interface JFormFieldCheckBox extends JFormFieldInput {
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

export interface JFormFieldSelectOne extends JFormFieldSelectBase {
  canAddNewValue: boolean
  autoSelectUniqueValue: boolean
}

export interface JFormFieldSelectTree extends JFormFieldSelectBase {
  onlyLeafSelection: boolean
}
