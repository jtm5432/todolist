let dragItem: HTMLElement | null;
let active = false;
let currentX: number;
let currentY: number;
let initialX: number;
let initialY: number;
let xOffset = 0;
let yOffset = 0;
let previewTimeout: NodeJS.Timeout | null;
let mirrorItem = document.getElementById('mirror-item') as HTMLElement;  // Get your existing mirror item
let hoverItem: HTMLElement | null = null;  
type DebouncedFunction = (...args: any[]) => void;
interface DebouncedFunctionWithCancel extends DebouncedFunction {
  cancel: () => void;
}


// Handlers
export function dragStart(e: MouseEvent): void {
   
  const target = e.target as HTMLElement;
  const checkbox = target.querySelector('input[type="checkbox"]') as HTMLInputElement;

  if (target.nodeName==='LI' && checkbox && !checkbox.checked) {
    console.log('dragStart',currentX,xOffset )
    // Replace the class with the class of your todo items
    initialX = e.clientX - xOffset;
    initialY = e.clientY - yOffset;

    if (target) {
        active = true;

        // Set mirror item content and styles to match the target
        mirrorItem.innerHTML = target.innerHTML;
        mirrorItem.style.position = "absolute";
        mirrorItem.style.opacity = "0.5";
        mirrorItem.style.pointerEvents = "none";
        mirrorItem.style.zIndex = "1000";
  
        // Position mirror item at the mouse event position
        mirrorItem.style.left = `${e.clientX}px`;
        mirrorItem.style.top = `${e.clientY}px`;
  
        // Show the mirror item
        mirrorItem.style.display = "block";
    }
  }
}


export function dragEnd(e: MouseEvent): void {
    initialX = currentX;
    initialY = currentY;
    active = false;
  
    if (dragItem) {
      dragItem.style.opacity = '1';  // remove blur effect
    }
    if (previewTimeout) {
      clearTimeout(previewTimeout);
      previewTimeout = null;
    }
    xOffset = initialX = currentX = 0;
    yOffset = initialY = currentY = 0;
    // Hide the mirror item
    mirrorItem.style.display = "none";
  
  }

  export function drag(e: MouseEvent): void {
    if (active) {
      //console.log('dragging',e.target)
      e.preventDefault();
  
      currentX = e.clientX - initialX;
      currentY = e.clientY - initialY;
  
      xOffset = currentX;
      yOffset = currentY;
  
      if (mirrorItem) {
        setTranslate(currentX, currentY, mirrorItem);
  
        // 2-second hover effect
        if (previewTimeout) {
          clearTimeout(previewTimeout);
        }
  
        previewTimeout = setTimeout(() => {
            mirrorItem!.style.opacity = '0.5';  // add blur effect
        }, 2000);
      }
      let elementUnderCursor = document.elementFromPoint(e.clientX, e.clientY);

      if (elementUnderCursor?.nodeName === 'LI' && elementUnderCursor !== hoverItem) {
        if (hoverItem) {
          hoverItem.style.backgroundColor = "";  // reset the styles of the previous hover item
        }
        hoverItem = elementUnderCursor as HTMLElement;
        hoverItem.style.backgroundColor = "lightgrey";  // update the styles of the new hover item
        showPreview();

        restoreHoverItemStyle();
      } else if (!elementUnderCursor || elementUnderCursor.nodeName !== 'LI') {
        if (hoverItem) {
          hoverItem.style.backgroundColor = "";  // reset the styles of the previous hover item
          hoverItem = null;
          showPreview.cancel();
        }
      }
    }
  }
  
  function setTranslate(xPos: number, yPos: number, el: HTMLElement): void {
    el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
  }
  let restoreHoverItemStyle = debounce(() => {
    if (hoverItem) {
      hoverItem.style.backgroundColor = "";  // reset the styles of the previous hover item
      hoverItem = null;
    }
  }, 500);  // delay of 500ms
  function debounce(func: Function, wait: number): DebouncedFunctionWithCancel {
    let timeout: ReturnType<typeof setTimeout> | null;
    
    const functionToExecute: DebouncedFunctionWithCancel = ((...args: any[]) => {
      const later = () => {
        clearTimeout(timeout!);
        func(...args);
      };
      clearTimeout(timeout!);
      timeout = setTimeout(later, wait);
    }) as DebouncedFunctionWithCancel;
  
    functionToExecute.cancel = function() {
      clearTimeout(timeout!);
    }
  
    return functionToExecute;
  }

let showPreview = debounce(() => {
   
    if (mirrorItem) mirrorItem.style.filter = "blur(5px)";
}, 2000);