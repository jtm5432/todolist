// Import the necessary dependencies
const { render } = require('./tolist.ts');

// Mock the necessary DOM elements
const list = document.createElement('ul');
const totalCount = document.createElement('span');

// Test the render function
describe('render', () => {
  beforeEach(() => {
    list.innerHTML = '';
    totalCount.textContent = '';
  });

  test('should render todos correctly for "all" filter', () => {
    const todos = [
      { id: 1, content: 'Todo 1', complete: false },
      { id: 2, content: 'Todo 2', complete: true },
      { id: 3, content: 'Todo 3', complete: false },
    ];

    render('all', todos, list, totalCount);

    // Assert the rendered list content
    expect(list.innerHTML).toContain('<li data-id="1">');
    expect(list.innerHTML).toContain('<li data-id="2">');
    expect(list.innerHTML).toContain('<li data-id="3">');

    // Assert the rendered total count
    expect(totalCount.textContent).toBe('3');
  });

  // Add more test cases for other filter options (e.g., "active", "complete")
});
