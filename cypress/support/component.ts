/* eslint-disable @typescript-eslint/no-namespace */
// ***********************************************************
// This file is processed and loaded automatically before component test files.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

// Import global styles
import '../../src/index.css';

// Alternatively you can use CommonJS syntax:
// require('./commands')

import { mount } from 'cypress/react';

// Augment the Cypress namespace to include type definitions for
// your custom command.
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
    }
  }
}

Cypress.Commands.add('mount', mount);
