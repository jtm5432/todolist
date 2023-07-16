interface Todo {
  id: number;
  content: string;
  complete: boolean;
}

type DebouncedFunction = (...args: any[]) => void;
interface DebouncedFunctionWithCancel extends DebouncedFunction {
  cancel: () => void;
}

export function createTodoApp(id: string) {
  let todos: Todo[] = [];
  let Backuptodos: Todo[] = []; // 원래 상태를 유지할 백업 변수
  const root = document.getElementById(id);// root DOM 

  if (!root) {
    throw new Error(`Element with id "${id}" not found`);
  }

  // DOM elements
  const input = root.querySelector('#todo-input') as HTMLInputElement;  // 할일을 입력할 인풋
  const list = root.querySelector('#todo-list') as HTMLUListElement;  // 할일 목록
  const info = root.querySelector('#todo-info') as HTMLElement;  // 할일 정보
  const totalCount = root.querySelector('#total-count') as HTMLElement;  // 전체 할일 수
  let filterType: 'all' | 'active' | 'complete' ;  // 필터링 타입

  let dragItem: HTMLElement | null;  // 드래그 중인 할일 아이템
  let active = false;  // 드래그 상태

  let currentX: number;  // 현재 마우스 X 좌표
  let currentY: number;  // 현재 마우스 Y 좌표
  let initialX: number;  // 드래그 시작시 마우스 X 좌표
  let initialY: number;  // 드래그 시작시 마우스 Y 좌표
  let xOffset = 0;  // X축 변화량
  let yOffset = 0;  // Y축 변화량

  let previewTimeout: NodeJS.Timeout | null;  // 프리뷰를 위한 타임아웃
  let mirrorItem = document.getElementById('mirror-item') as HTMLElement;  // 거울 아이템(드래그 중인 아이템의 복사본)
  let hoverItem: HTMLElement | null = null;  // 마우스가 호버 중인 아이템

  /**
   * 할일에 추가한다. 
   * @param content 추가 되는 할일
   */
  function addTodo(content: string) {
    const todo: Todo = {
      id: Date.now(),
      content,
      complete: false,
    };
    todos = content? [todo, ...todos] : [...todos];
    render('all');
  }
/**
 * 할일을 이동시킨다.
 * @param dragItemId source
 * @param targetId target
 */
  function moveTodo(dragItemId: string, targetId: string) {
    const dragIndex = todos.findIndex((todo) => todo.id === Number(dragItemId));
    const targetIndex = todos.findIndex((todo) => todo.id === Number(targetId));

    if (dragIndex > -1 && targetIndex > -1) {
      const itemToMove = todos[dragIndex];
      todos.splice(dragIndex, 1);
      todos.splice(targetIndex, 0, itemToMove);
      sortTodos();

      const dragItemElement = list.querySelector(`[data-id="${dragItemId}"]`) as HTMLElement;
        if (dragItemElement) {
            dragItemElement.style.opacity = '0.5';
        }
        
    }
  }
/**
 * id로 할일에서 삭제한다.
 * @param id 
 */
  function deleteTodo(id: number) {
    todos = todos.filter((todo) => todo.id !== id);
    render('all');
  }
/**
 * 완료 여부로 정렬해준다.
 */
  function sortTodos() {
    todos.sort((a, b) => (a.complete === b.complete ? 0 : a.complete ? 1 : -1));
    render(filterType);
  }
/**
 * 완료 여부를 변환해준다.
 * @param id 
 */
  function toggleTodo(id: number) {
    todos = todos.map((todo) => (todo.id === id ? { ...todo, complete: !todo.complete } : todo));
    sortTodos();
  }
  /**
   * todos의 값으로 list를 그린다.
   * @param filter 
   */
  function render(filter: 'all' | 'active' | 'complete') {
    // 현재 목록을 지웁니다.
    list.innerHTML = '';

    // 각 todo에 대한 새로운 li 요소를 생성하고 추가합니다.
    todos.forEach((todo) => {
      const li = document.createElement('li');
      li.dataset.id = String(todo.id);

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = todo.complete;
      checkbox.hidden = true;
   
      li.appendChild(checkbox);

      // 할일 내용을 위한 텍스트 노드
      const text = document.createTextNode(todo.content);
      li.appendChild(text);

      // 삭제를 위한 버튼
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.classList.add('DeleteTodos');
      li.appendChild(deleteButton);

      // 완료된 항목들에 대한 스타일링
      if (todo.complete) {
        li.style.textDecoration = 'line-through';
        li.style.color = 'gray';
      }
      li.hidden =
        filter === 'all'
          ? false
          : filter === 'complete' && todo.complete
          ? false
          : filter === 'complete'
          ? true
          : filter === 'active' && todo.complete
          ? true
          : false;
      li.classList.add('Todoli')
      // li 요소를 목록에 추가합니다.
      list.appendChild(li);
    });

    // 전체 개수 업데이트
    totalCount.textContent = String(todos.length);
  }
  input.addEventListener('keypress', (event) => {
    // 'Enter'키가 눌리면 todo를 추가합니다.
    if (event.key === 'Enter') {
      addTodo(input.value);
      input.value = '';
    }
  });

  list.addEventListener('click', (event) => {
    event.stopPropagation();
    const target = event.target as HTMLElement;
    console.log('click', target.tagName);
    // 클릭된 대상이 'LI' 태그이면, todo의 상태를 토글합니다.
    if (target.tagName === 'LI') {
      toggleTodo(Number(target.dataset.id));
    // 클릭된 대상이 'BUTTON' 태그이면, todo를 삭제합니다.
    } else if (target.tagName === 'BUTTON') {
      deleteTodo(Number(target.parentElement?.dataset.id));
    }
  });

  // 이벤트 리스너들
  document.addEventListener('mousedown', dragStart, false);
  document.addEventListener('mouseup', dragEnd, false);
  document.addEventListener('mousemove', drag, false);
  document.addEventListener('keydown', (e: KeyboardEvent) => {
    // ESC 키가 눌리면, todo들을 백업에서 복원합니다.
    if (e.key === 'Escape') {
      todos = Backuptodos;
      dragItem = null;
      render(filterType);
      
      // 미리보기를 숨기고, 다른 변경사항을 초기화하려면 아래 코드를 사용하실 수 있습니다.
      if (mirrorItem) mirrorItem.style.display = 'none';
    }
  });

  info.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    let filter: 'all' | 'active' | 'complete' = 'all';
    // 클릭된 대상이 'BUTTON' 태그이면, 필터를 적용하거나 완료된 todo를 삭제합니다.
    if (target.tagName === 'BUTTON') {
      if (target.id === 'delete-complete') {
        Backuptodos = todos = todos.filter((todo) => !todo.complete);
      } else {
        filter = target.id.split('-')[1] as 'all' | 'active' | 'complete';
      }
      console.log(todos);
      filterType = filter;
      // 필터를 적용한 뒤, 필터에 따라 다시 렌더링합니다.
      render(filter);
    }
  });
  /**
   * 리스트 드래그 시 미러아이템 생성, 위치 조정
   * @param e 
   */
  function dragStart(e: MouseEvent): void {
    const target = e.target as HTMLElement;
    const checkbox = target.querySelector('input[type="checkbox"]') as HTMLInputElement;
  
    // 끌릴 대상이 'LI' 태그이며 체크박스가 체크되지 않았다면
    if (target.nodeName === 'LI' && checkbox && !checkbox.checked) {
      // 현재 상태를 백업
      Backuptodos = [...todos];
      console.log('dragStart', currentX, xOffset);
      // 현재 마우스 위치 설정
      initialX = e.clientX - xOffset;
      initialY = e.clientY - yOffset;
      // 끌릴 대상 설정
      dragItem = target;
      target.style.opacity = '0.5';
      if (target) {
        active = true;

        // 미러 아이템의 내용과 스타일을 끌릴 대상과 동일하게 설정
        mirrorItem.innerHTML = target.innerHTML;
        mirrorItem.style.position = 'absolute';
        mirrorItem.style.opacity = '0.5';
        mirrorItem.style.pointerEvents = 'none';
        mirrorItem.style.zIndex = '1000';

        // 미러 아이템을 마우스 이벤트 위치에 배치
        mirrorItem.style.left = `${e.clientX}px`;
        mirrorItem.style.top = `${e.clientY}px`;

        // 미러 아이템을 보여줌
        mirrorItem.style.display = 'block';
      }
    }
  }
/**
 * 드래그 이벤트 종료 시 
 * @param e 
 */
  function dragEnd(e: MouseEvent): void {
    // 마우스 위치 초기화
    initialX = currentX;
    initialY = currentY;
    active = false;
    const target = e.target as HTMLElement;
    if (dragItem) {
      dragItem.style.opacity = '1'; // 흐림 효과 제거
      let dragItemId = getDataId(dragItem);
      let targetId = getDataId(e.target as HTMLElement);
      console.log('dragEnd', targetId,Backuptodos);
      if (targetId && dragItemId !== targetId) moveTodo(dragItemId, targetId);
      else if(targetId === null){
        todos = Backuptodos;
        render(filterType);
      }
    }
    if (previewTimeout) {
      clearTimeout(previewTimeout);
      previewTimeout = null;
    }
    xOffset = initialX = currentX = 0;
    yOffset = initialY = currentY = 0;
    // 미러 아이템 숨기기
    mirrorItem.style.display = 'none';
    target.style.opacity = '1'; 
  }
/**
 * 드래그 중 리스너
 * @param e 
 */
  function drag(e: MouseEvent): void {
    // 끌림 상태이면
    if (active) {
      e.preventDefault();

      // 현재 마우스 위치 계산
      currentX = e.clientX - initialX;
      currentY = e.clientY - initialY;

      xOffset = currentX;
      yOffset = currentY;

      // 미러 아이템을 현재 마우스 위치에 설정
      if (mirrorItem) {
        setTranslate(currentX, currentY, mirrorItem);

        // 2초간의 호버 효과
        if (previewTimeout) {
          clearTimeout(previewTimeout);
        }

        previewTimeout = setTimeout(() => {
          mirrorItem!.style.opacity = '0.5'; // 흐림 효과 추가
        }, 2000);
      }
      let elementUnderCursor = document.elementFromPoint(e.clientX, e.clientY);

      // 호버 아이템 설정
      if (elementUnderCursor?.nodeName === 'LI' && elementUnderCursor !== hoverItem) {
        if (hoverItem) {
          hoverItem.style.backgroundColor = ''; // 이전 호버 아이템 스타일 초기화
        }
        hoverItem = elementUnderCursor as HTMLElement;
        hoverItem.style.backgroundColor = 'lightgrey'; // 새 호버 아이템 스타일 업데이트
        if (dragItem) {
          showPreview(dragItem,hoverItem);
        }
      } else if (!elementUnderCursor || elementUnderCursor.nodeName !== 'LI') {
        // 호버 아이템 초기화
        if (hoverItem) {
          hoverItem.style.backgroundColor = ''; // 이전 호버 아이템 스타일 초기화
          hoverItem = null;
          showPreview.cancel();
        }
      }
    }
  }
/**
 * 드래그중인 item의 위치 조정
 * @param xPos 
 * @param yPos 
 * @param el dragitem
 */
  function setTranslate(xPos: number, yPos: number, el: HTMLElement): void {
    // 해당 요소를 xPos, yPos 위치로 이동
    el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
  }
/**
 * 지연 실행을 위한 함수 디바운스
 *
 * @param func 디바운스를 적용할 함수
 * @param wait 지연 시간
 * @returns 실행을 지연시킨 디바운스 함수
 */
  function debounce(func: Function, wait: number): DebouncedFunctionWithCancel {
    let timeout: ReturnType<typeof setTimeout> | null;
  /**
   * @param args 디바운스 함수에 전달할 인수.
   */
    const functionToExecute: DebouncedFunctionWithCancel = ((...args: any[]) => {
      const later = () => {
        clearTimeout(timeout!);
        func(...args);
      };
      clearTimeout(timeout!);
      timeout = setTimeout(later, wait);
    }) as DebouncedFunctionWithCancel;

    functionToExecute.cancel = function () {
      clearTimeout(timeout!);
    };

    return functionToExecute;
  }

  let showPreview = debounce((dragItem: HTMLElement | null, hoverItem: HTMLElement | null) => {
    let dragItemId = getDataId(dragItem);
    let targetId = getDataId(hoverItem);
    if (dragItemId !== targetId) moveTodo(dragItemId, targetId);
    }, 2000);

  function getDataId(target: HTMLElement): string | null {
    // 대상의 'data-id' 속성값 가져오기
    return target.getAttribute('data-id');
  }

  return {
    addTodo,
    toggleTodo,
    deleteTodo,
    moveTodo,
  };
}
