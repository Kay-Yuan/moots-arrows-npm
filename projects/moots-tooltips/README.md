# MootsTooltips

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.1.0 and used for Ionic project.

## usage

Using with the Ionic lifescycle hooks.

## example

in the 'ion-page.ts' file:

```
import { Component } from '@angular/core';
import { TooltipService } from 'moots-tooltips';   // -> import the package

@Component({...})
export class Tab2Page {
  constructor(private tooltipService: TooltipService) {}   // -> inject the service

  ionViewDidEnter() {
    this.tooltipService.addTooltip(
      'tab2-content',   // parent id
      'tab2-span',      // target id
      'hello world!',   // text content
      'top-start'       // tooltip position
    );  // -> add tooltips
  }

  ionViewDidLeave() {
    this.tooltipService.clearAll(); // -> clear all the tooltips
  }
}
```