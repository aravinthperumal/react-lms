import { fireEvent, renderWithProviders, screen } from 'utils/test-utils';

import { Dropdown } from './Dropdown';
import { KeyValue } from './types';

const options: KeyValue[] = [
    { label: 'option1', value: 'option1' },
    { label: 'option2', value: 'option2' },
];

describe('Dropdown Component', () => {
    const onChangeMock = jest.fn();

    const setup = () => {
        renderWithProviders(<Dropdown name="dropdown" options={options} value="1" onChange={jest.fn()} />);
    };
    it('renders the dropdown with options', () => {
        setup();
        expect(screen.getByText('Select an option')).toBeInTheDocument();
        options.forEach((option) => {
            expect(screen.getByText(option.label)).toBeInTheDocument();
        });
    });

    it('select dropdown in the document', async () => {
        setup();
        const select = screen.getByRole('combobox');

        expect(select).toBeInTheDocument();
    });

    it('does not call onChange when no valid option is selected', () => {
        setup();
        fireEvent.change(screen.getByRole('combobox'), { target: { value: '' } });

        expect(onChangeMock).not.toHaveBeenCalled();
    });
});
