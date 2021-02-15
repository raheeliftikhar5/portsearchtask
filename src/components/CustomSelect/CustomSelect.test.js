import { render, screen, cleanup, fireEvent, waitForElement } from '@testing-library/react';
import CustomSelect from './CustomSelect';

afterEach(cleanup);

const options = [
  {
    "label": "Option 1",
    "value": "option-1",
  },
  {
    "label": "Option 2",
    "value": "option-2",
  },
];

const handleOptionChange = jest.fn();

test('renders custom select with options', async () => {
  const { container } = render(
    <CustomSelect
      placeholder="Select Option"
      onChange={handleOptionChange}
      options={options} />
  );
  
  const placeholder = screen.getByText('Select Option');
  expect(placeholder).toBeInTheDocument();

  const selectorEle = container.querySelector('.custom-select__control');
  fireEvent.keyDown(selectorEle, { key: 'ArrowDown' });
  await screen.findByText('Option 1');
  
  const optionsEle = container.querySelectorAll('.custom-select__option');
  expect(optionsEle.length).toBe(options.length);
});

test('trigger onChange on selecting an option', async () => {
  const { container } = render(
    <CustomSelect
      placeholder="Select Option"
      onChange={handleOptionChange}
      options={options} />
  );
  
  const placeholder = screen.getByText('Select Option');
  expect(placeholder).toBeInTheDocument();

  const selectorEle = container.querySelector('.custom-select__control');
  fireEvent.keyDown(selectorEle, { key: 'ArrowDown' });
  await screen.findByText('Option 1');
  
  const optionsEle = container.querySelectorAll('.custom-select__option');
  expect(optionsEle.length).toBe(options.length);

  fireEvent.click(screen.getByText('Option 1'));
  expect(handleOptionChange).toHaveBeenCalledTimes(1);
  expect(handleOptionChange).toHaveBeenCalledWith(
    { label: 'Option 1', value: 'option-1' },
    { action: 'select-option', name: undefined, option: undefined },
  );
});
