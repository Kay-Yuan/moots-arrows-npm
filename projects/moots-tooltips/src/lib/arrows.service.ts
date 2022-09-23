import { Injectable } from '@angular/core';
import arrowCreate, { DIRECTION, HEAD } from 'arrows-svg';
import { IArrow } from './arrows-type';

type TranslationArray = { a: number; b: number; c: number; d: number };
@Injectable({
  providedIn: 'root',
})
export class ArrowsService {
  private translationArray = new Map<string, TranslationArray>();

  constructor() {
    this.translationArray.set(`${DIRECTION.RIGHT}-${DIRECTION.TOP}`, {
      a: 0,
      b: 0,
      c: 0,
      d: -1,
    });
    this.translationArray.set(`${DIRECTION.LEFT}-${DIRECTION.TOP}`, {
      a: 0,
      b: 0,
      c: 0,
      d: -1,
    });
    this.translationArray.set(`${DIRECTION.TOP}-${DIRECTION.BOTTOM}`, {
      a: 0,
      b: 0,
      c: 0,
      d: 1,
    });
    this.translationArray.set(`${DIRECTION.RIGHT}-${DIRECTION.BOTTOM}`, {
      a: 0,
      b: 0,
      c: 0,
      d: 1,
    });
    this.translationArray.set(`${DIRECTION.LEFT}-${DIRECTION.BOTTOM}`, {
      a: 0,
      b: 0,
      c: 0,
      d: 1,
    });
    this.translationArray.set(`${DIRECTION.RIGHT}-${DIRECTION.LEFT}`, {
      a: 0,
      b: 0,
      c: -1,
      d: 0,
    });
    this.translationArray.set(`${DIRECTION.LEFT}-${DIRECTION.RIGHT}`, {
      a: 0,
      b: 0,
      c: 1,
      d: 0,
    });
    this.translationArray.set(`${DIRECTION.BOTTOM}-${DIRECTION.TOP}`, {
      a: 0,
      b: 0,
      c: 0,
      d: -1,
    });
  }

  addArrow(
    fromNode: HTMLElement,
    toNode: HTMLElement,
    arrowStart: string,
    arrowEnd: string
  ): IArrow {
    const translation = this.translationArray.get(`${arrowStart}-${arrowEnd}`);

    if (!translation) {
      throw new Error('Invalid arrow direction');
    }

    return arrowCreate({
      className: 'arrow-test',
      from: {
        direction: arrowStart,
        node: fromNode,
        translation: [translation.a, translation.b],
      },
      to: {
        direction: arrowEnd,
        node: toNode,
        translation: [translation.c, translation.d],
      },
      head: {
        func: HEAD.NORMAL,
        size: 13, // custom options that will be passed to head function
        // distance: 1,
      },
      updateDelay: 0,
    });
  }
}
