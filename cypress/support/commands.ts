/* eslint-disable @typescript-eslint/no-namespace */
/// <reference types="cypress" />

// ***********************************************
// This file contains custom Cypress commands
// and overloads existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Custom command to check if element is visible in viewport
Cypress.Commands.add('isInViewport', { prevSubject: true }, (subject) => {
  const rect = subject[0].getBoundingClientRect();
  
  expect(rect.top).to.be.at.least(0);
  expect(rect.left).to.be.at.least(0);
  expect(rect.bottom).to.be.lessThan(Cypress.config('viewportHeight'));
  expect(rect.right).to.be.lessThan(Cypress.config('viewportWidth'));
  
  return subject;
});

// Declare custom commands for TypeScript
declare global {
  namespace Cypress {
    interface Chainable {
      isInViewport(): Chainable<JQuery<HTMLElement>>;
    }
  }
}

export {};
