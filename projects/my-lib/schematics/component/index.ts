import {
  // applyTemplates,
  SchematicsException,
  Rule, Tree, 
  // SchematicContext, 
  chain,
  externalSchematic, 
  // apply, url, 
  //template, 
  // mergeWith, move,
  SchematicContext
} from '@angular-devkit/schematics';


import { /*strings,*/ normalize } from '@angular-devkit/core';
import { Schema as ComponentOptions } from './schema';




import { virtualFs, workspaces } from '@angular-devkit/core';

// import { Schema as MyServiceSchema } from './schema';

function createHost(tree: Tree): workspaces.WorkspaceHost {
  return {
    async readFile(path: string): Promise<string> {
      const data = tree.read(path);
      if (!data) {
        throw new SchematicsException('File not found.');
      }
      return virtualFs.fileBufferToString(data);
    },
    async writeFile(path: string, data: string): Promise<void> {
      return tree.overwrite(path, data);
    },
    async isDirectory(path: string): Promise<boolean> {
      return !tree.exists(path) && tree.getDir(path).subfiles.length > 0;
    },
    async isFile(path: string): Promise<boolean> {
      return tree.exists(path);
    },
  };
}

export function myComponent(options: ComponentOptions): Rule {
  return async (tree: Tree) => {
    const host = createHost(tree);
    const { workspace } = await workspaces.readWorkspace('/', host);


    const project = (options.project != null) ? workspace.projects.get(options.project) : null;
    if (!project) {
      throw new SchematicsException(`Invalid project name: ${options.project}`);
    }

    const projectType = project.extensions.projectType === 'application' ? 'app' : 'lib';

    if (options.path === undefined) {
      options.path = `${project.sourceRoot}/${projectType}`;
    }

        const angularComponentRule = externalSchematic('@schematics/angular', 'component', {
      ...options
    });

  /*  const customTemplates = apply(url('./files'), [
      applyTemplates({
        ...strings,
        'if-flat': (s: string) => (options.flat ? '' : s),
        ...options
      }),
      move(normalize(options.path as string))
    ]);*/

    return chain([
      angularComponentRule, replaceContentInTemplate(options)
    ]);
  };
}

function replaceContentInTemplate(options: ComponentOptions): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    // Path to the generated component's template file
    const templatePath = normalize(`${options.path}/${options.name}/${options.name}.component.html`);

    // Path to the custom content template
    const customContentPath = normalize('files/__custom_content__.html');

    // Check if both the generated template and custom content template exist
    if (tree.exists(templatePath) && tree.exists(customContentPath)) {
      // Read the generated component's template content
      const templateBuffer = tree.read(templatePath);
      const customContentBuffer = tree.read(customContentPath);

      if (templateBuffer && customContentBuffer) {
        const existingContent = templateBuffer.toString();
        const customContent = customContentBuffer.toString();

        // Replace the default generated content with custom content
        const modifiedContent = existingContent.replace('<p>my-custom-component works!</p>', customContent);

        // Write the modified content back to the component's template
        tree.overwrite(templatePath, modifiedContent);
      }
    }

    return tree;
  };
}




// export function myComponent(_options: ComponentOptions): Rule {
//   return async (tree: Tree, _context: SchematicContext) => {
//     // Example of using the tree to read a file
//     /*const filePath = '/src/app/app.module.ts';
//     if (tree.exists(filePath)) {
//       const content = tree.read(filePath);
//       if (content) {
//         console.log('File content:', content.toString());
//       }
//     }*/
//       tree= tree;
//     // Chain your rules as before
//     // const angularComponentRule = externalSchematic('@schematics/angular', 'component', {
//     //   ..._options
//     // });

//     const customTemplates = apply(url('./files'), [
//       applyTemplates({
//         ...strings,
//         ..._options
//       }),
//       move(normalize(_options.path as string))
//     ]);

//     return chain([/*angularComponentRule, */mergeWith(customTemplates)]);

//   };
// }
