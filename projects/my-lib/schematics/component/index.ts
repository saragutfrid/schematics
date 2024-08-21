import {
  Rule, Tree, SchematicContext, chain,
  externalSchematic, apply, url, template, mergeWith, move
} from '@angular-devkit/schematics';
import { strings, normalize } from '@angular-devkit/core';
import { Schema as ComponentOptions } from './schema';

export function myComponent(_options: ComponentOptions): Rule {
  return async (tree: Tree, _context: SchematicContext) => {
    // Example of using the tree to read a file
    const filePath = '/src/app/app.module.ts';
    if (tree.exists(filePath)) {
      const content = tree.read(filePath);
      if (content) {
        console.log('File content:', content.toString());
      }
    }

    // Chain your rules as before
    const angularComponentRule = externalSchematic('@schematics/angular', 'component', {
      name: _options.name,
      path: _options.path,
      project: _options.project,
      style: _options.style,
      skipTests: _options.skipTests,
      inlineStyle: _options.inlineStyle,
      inlineTemplate: _options.inlineTemplate,
    });

    const customTemplates = apply(url('./files'), [
      template({
        ..._options,
        ...strings,
      }),
      move(normalize(_options.path as string)),
    ]);

    return chain([angularComponentRule, mergeWith(customTemplates)]);
  };
}
