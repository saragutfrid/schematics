export interface Schema {
  /**
   * The path at which to create the component file, relative to the current workspace.
   * Default is a folder with the same name as the component in the project root.
   */
  path?: string;

  /**
   * The name of the project.
   */
  project: string;

  /**
   * The name of the component.
   */
  name: string;

  /**
   * Specifies if the style will contain `:host { display: block; }`.
   */
  displayBlock?: boolean;

  /**
   * Include styles inline in the component.ts file. Only CSS styles can be included inline.
   * By default, an external styles file is created and referenced in the component.ts file.
   */
  inlineStyle?: boolean;

  /**
   * Include template inline in the component.ts file.
   * By default, an external template file is created and referenced in the component.ts file.
   */
  inlineTemplate?: boolean;

  /**
   * Whether the generated component is standalone.
   */
  standalone?: boolean;

  /**
   * The view encapsulation strategy to use in the new component.
   */
  viewEncapsulation?: 'Emulated' | 'None' | 'ShadowDom';

  /**
   * The change detection strategy to use in the new component.
   */
  changeDetection?: 'Default' | 'OnPush';

  /**
   * The prefix to apply to the generated component selector.
   */
  prefix?: string;

  /**
   * The file extension or preprocessor to use for style files, or 'none' to skip generating the style file.
   */
  style?: 'css' | 'scss' | 'sass' | 'less' | 'none';

  /**
   * Adds a developer-defined type to the filename, in the format "name.type.ts".
   */
  type?: string;

  /**
   * Do not create "spec.ts" test files for the new component.
   */
  skipTests?: boolean;

  /**
   * Create the new files at the top level of the current project.
   */
  flat?: boolean;

  /**
   * Do not import this component into the owning NgModule.
   */
  skipImport?: boolean;

  /**
   * The HTML selector to use for this component.
   */
  selector?: string;

  /**
   * Specifies if the component should have a selector or not.
   */
  skipSelector?: boolean;

  /**
   * The declaring NgModule.
   */
  module?: string;

  /**
   * The declaring NgModule exports this component.
   */
  export?: boolean;
}
export enum Style {
  Css = 'css',
  Scss = 'scss',
  Sass = 'sass',
  Less = 'less',
  None = 'none'
}