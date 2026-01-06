import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Todos from './todo';

describe('Todos Component', () => {
  test('renders todo app title', () => {
    render(<Todos />);
    const titleElement = screen.getByTestId('todo-title');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent('Todo App');
  });

  test('renders input field and add button', () => {
    render(<Todos />);
    const inputElement = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-todo-button');
    
    expect(inputElement).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
  });

  test('adds a new todo when clicking add button', async () => {
    const user = userEvent.setup();
    render(<Todos />);
    
    const inputElement = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-todo-button');
    
    await user.type(inputElement, 'Test Todo');
    await user.click(addButton);
    
    expect(screen.getByText('Test Todo')).toBeInTheDocument();
  });

  test('adds a new todo when pressing Enter key', async () => {
    const user = userEvent.setup();
    render(<Todos />);
    
    const inputElement = screen.getByTestId('todo-input');
    
    await user.type(inputElement, 'Enter Todo{Enter}');
    
    expect(screen.getByText('Enter Todo')).toBeInTheDocument();
  });

  test('toggles todo completion', async () => {
    const user = userEvent.setup();
    render(<Todos />);
    
    const inputElement = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-todo-button');
    
    await user.type(inputElement, 'Complete Me');
    await user.click(addButton);
    
    const todoItem = screen.getByText('Complete Me').closest('li');
    const checkbox = screen.getByTestId(/todo-checkbox-/);
    
    expect(checkbox).not.toBeChecked();
    
    await user.click(checkbox);
    
    expect(checkbox).toBeChecked();
    expect(todoItem).toHaveClass('completed');
  });

  test('deletes a todo', async () => {
    const user = userEvent.setup();
    render(<Todos />);
    
    const inputElement = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-todo-button');
    
    await user.type(inputElement, 'Delete Me');
    await user.click(addButton);
    
    expect(screen.getByText('Delete Me')).toBeInTheDocument();
    
    const deleteButton = screen.getByTestId(/delete-todo-button-/);
    await user.click(deleteButton);
    
    expect(screen.queryByText('Delete Me')).not.toBeInTheDocument();
  });

  test('filters todos by active', async () => {
    const user = userEvent.setup();
    render(<Todos />);
    
    const inputElement = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-todo-button');
    
    // Add two todos
    await user.type(inputElement, 'Active Todo');
    await user.click(addButton);
    
    await user.type(inputElement, 'Completed Todo');
    await user.click(addButton);
    
    // Complete one todo
    const checkboxes = screen.getAllByTestId(/todo-checkbox-/);
    await user.click(checkboxes[1]);
    
    // Filter by active
    const activeFilter = screen.getByTestId('filter-active');
    await user.click(activeFilter);
    
    expect(screen.getByText('Active Todo')).toBeInTheDocument();
    expect(screen.queryByText('Completed Todo')).not.toBeInTheDocument();
  });

  test('displays empty message when no todos', () => {
    render(<Todos />);
    const emptyMessage = screen.getByTestId('todo-empty-message');
    expect(emptyMessage).toBeInTheDocument();
    expect(emptyMessage).toHaveTextContent('No todos yet. Add one above!');
  });
});

