import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Pager from '../../src/components/Pager';

describe('Pager', () => {
    test('Previous & Next not disabled', () => {
        const { getByText } = render(
            <Pager
                currentPage={1}
                totalPages={10}
            />);
        expect(getByText('Previous').className).not.toContain('disabled');
        expect(getByText('Next').className).not.toContain('disabled');
    });
    test('Previous disabled', () => {
        const { getByText } = render(
            <Pager
                currentPage={0}
                totalPages={10}
            />);
        expect(getByText('Previous').className).toContain('disabled');
        expect(getByText('Next').className).not.toContain('disabled');
    });
    test('Next disabled', () => {
        const { getByText } = render(
            <Pager
                currentPage={9}
                totalPages={10}
            />);
        expect(getByText('Next').className).toContain('disabled');
        expect(getByText('Previous').className).not.toContain('disabled');
    });
    test('Pager rendered on right of its parent', () => {
        const { container } = render(
            <Pager
                currentPage={9}
                totalPages={10}
                right
            />);
        expect(container.querySelector('.attivio-globalmastnavbar-right')).toBeTruthy();
    });
    test('Test Next Page Change', () => {
        let currentPage = 0;
        const { container, getByText } = render(
            <Pager
                onPageChange={(newPage) => {
                    currentPage = newPage;
                }}
                currentPage={currentPage}
                totalPages={5}
            />);
        fireEvent.click(getByText('Next'));
        expect(currentPage).toBe(1);
    });
    test('Test Previous Page Change', () => {
        let currentPage = 1;
        const { container, getByText } = render(
            <Pager
                onPageChange={(newPage) => {
                    currentPage = newPage;
                }}
                currentPage={currentPage}
                totalPages={5}
            />);
        fireEvent.click(getByText('Previous'));
        expect(currentPage).toBe(0);
    });
});
