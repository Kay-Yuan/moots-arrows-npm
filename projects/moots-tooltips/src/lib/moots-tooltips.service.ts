import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import {
  autoUpdate,
  computePosition,
  offset,
  Placement,
  shift,
} from '@floating-ui/dom';
import { ArrowsService } from './arrows.service';
import { DIRECTION, IArrow } from 'arrows-svg';

interface TooltipData {
  parent: HTMLElement;
  text: HTMLElement;
  arrow: IArrow;
}

interface ArrowsDirection {
  start: string;
  end: string;
}

@Injectable({
  providedIn: 'root',
})
export class MootsTooltipsService {
  private renderer: Renderer2;

  private tooltips = new Set<TooltipData>();

  private arrowsDirection = new Map<Placement, ArrowsDirection>();

  constructor(
    private rendererFactory: RendererFactory2,
    private arrowService: ArrowsService
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
    this.arrowsDirection.set('top-end', {
      start: DIRECTION.RIGHT,
      end: DIRECTION.TOP,
    });
    this.arrowsDirection.set('top-start', {
      start: DIRECTION.LEFT,
      end: DIRECTION.TOP,
    });
    this.arrowsDirection.set('top', {
      start: DIRECTION.BOTTOM,
      end: DIRECTION.TOP,
    });
    this.arrowsDirection.set('bottom-end', {
      start: DIRECTION.RIGHT,
      end: DIRECTION.BOTTOM,
    });
    this.arrowsDirection.set('bottom-start', {
      start: DIRECTION.LEFT,
      end: DIRECTION.BOTTOM,
    });
    this.arrowsDirection.set('bottom', {
      start: DIRECTION.TOP,
      end: DIRECTION.BOTTOM,
    });
    this.arrowsDirection.set('left-start', {
      start: DIRECTION.RIGHT,
      end: DIRECTION.BOTTOM,
    });
    this.arrowsDirection.set('left-end', {
      start: DIRECTION.RIGHT,
      end: DIRECTION.TOP,
    });
    this.arrowsDirection.set('left', {
      start: DIRECTION.RIGHT,
      end: DIRECTION.LEFT,
    });
    this.arrowsDirection.set('right-end', {
      start: DIRECTION.LEFT,
      end: DIRECTION.TOP,
    });
    this.arrowsDirection.set('right-start', {
      start: DIRECTION.LEFT,
      end: DIRECTION.BOTTOM,
    });
    this.arrowsDirection.set('right', {
      start: DIRECTION.LEFT,
      end: DIRECTION.RIGHT,
    });
  }

  addTooltip(
    parentId: string,
    targetId: string,
    text: string,
    textPlacement: Placement = 'top'
  ) {
    const parentNode: HTMLElement | null = document.querySelector(
      `#${parentId}`
    );
    const targetNode: HTMLElement | null = document.querySelector(
      `#${targetId}`
    );

    const tooltip: HTMLElement = this.renderer.createElement('div');
    this.renderer.addClass(tooltip, 'tooltip');
    tooltip.textContent = text;

    if (!parentNode || !targetNode) {
      console.log('Parent or target node not found');
      throw new Error('Parent or target node not found');
    }

    setTimeout(() => {
      autoUpdate(
        targetNode,
        tooltip,
        () => {
          computePosition(targetNode, tooltip, {
            placement: textPlacement,
            middleware: [
              offset(({ rects, placement }) => ({
                mainAxis:
                  placement === 'bottom'
                    ? rects.floating.width
                    : rects.reference.width,
                alignmentAxis:
                  placement === 'right'
                    ? rects.reference.width
                    : rects.floating.width,
              })),
              shift(),
            ],
          }).then(({ x, y }) => {
            Object.assign(tooltip.style, {
              left: `${x}px`,
              top: `${y}px`,
            });
          });
        },
        {
          elementResize: false,
        }
      );
      this.renderer.appendChild(parentNode, tooltip);

      setTimeout(() => {
        const arrowD = this.arrowsDirection.get(textPlacement);
        if (!arrowD) {
          console.log('Arrow direction not found');
          throw new Error('Arrow direction not found');
        }

        const arrowT = this.arrowService.addArrow(
          tooltip,
          targetNode,
          arrowD.start,
          arrowD.end
        );

        this.renderer.appendChild(parentNode, arrowT.node);
        this.tooltips.add({
          parent: parentNode,
          text: tooltip,
          arrow: arrowT,
        });
      }, 20);
    }, 150);
  }

  clearAll() {
    this.tooltips.forEach((toolTip) => {
      this.renderer.removeChild(toolTip.parent, toolTip.text);
      toolTip.arrow.clear();
    });
    this.tooltips.clear();
  }
}

// export const TOOLTIPS_SERVICE = new InjectionToken('MootsTooltipsService');
