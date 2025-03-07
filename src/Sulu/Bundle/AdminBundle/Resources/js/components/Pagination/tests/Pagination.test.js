// @flow
import {mount, render, shallow} from 'enzyme';
import React from 'react';
import Pagination from '../Pagination';

jest.mock('../../../utils/Translator', () => ({
    translate(key) {
        switch (key) {
            case 'sulu_admin.page':
                return 'Page';
            case 'sulu_admin.of':
                return 'of';
            case 'sulu_admin.per_page':
                return 'Items per page';
        }
    },
}));

test('Render pagination with loader', () => {
    expect(render(
        <Pagination
            currentLimit={10}
            currentPage={5}
            loading={true}
            onLimitChange={jest.fn()}
            onPageChange={jest.fn()}
            totalPages={10}
        >
            <p>Test</p>
        </Pagination>
    )).toMatchSnapshot();
});

test('Render pagination with page numbers', () => {
    expect(render(
        <Pagination
            currentLimit={10}
            currentPage={5}
            onLimitChange={jest.fn()}
            onPageChange={jest.fn()}
            totalPages={10}
        >
            <p>Test</p>
        </Pagination>
    )).toMatchSnapshot();
});

test('Render disabled next link if current page is last page', () => {
    expect(render(
        <Pagination
            currentLimit={10}
            currentPage={5}
            onLimitChange={jest.fn()}
            onPageChange={jest.fn()}
            totalPages={5}
        >
            <p>Test</p>
        </Pagination>
    )).toMatchSnapshot();
});

test('Render disabled previous link current page is first page', () => {
    expect(render(
        <Pagination
            currentLimit={10}
            currentPage={1}
            onLimitChange={jest.fn()}
            onPageChange={jest.fn()}
            totalPages={5}
        >
            <p>Test</p>
        </Pagination>
    )).toMatchSnapshot();
});

test('Should call callback with updated page when initialized with an invalid page', () => {
    const changeSpy = jest.fn();

    mount(
        <Pagination
            currentLimit={10}
            currentPage={15}
            onLimitChange={jest.fn()}
            onPageChange={changeSpy}
            totalPages={10}
        >
            <p>Test</p>
        </Pagination>
    );

    expect(changeSpy).toBeCalledWith(10);
});

test('Should call callback with updated page when changing page to invalid value', () => {
    const changeSpy = jest.fn();

    const pagination = mount(
        <Pagination
            currentLimit={10}
            currentPage={5}
            onLimitChange={jest.fn()}
            onPageChange={changeSpy}
            totalPages={10}
        >
            <p>Test</p>
        </Pagination>
    );

    pagination.setProps({currentPage: 8});
    expect(changeSpy).not.toBeCalled();

    pagination.setProps({currentPage: 15});
    expect(changeSpy).toBeCalledWith(10);
});

test('Should call callback with updated page when changing total number of pages to lower value', () => {
    const changeSpy = jest.fn();

    const pagination = mount(
        <Pagination
            currentLimit={10}
            currentPage={5}
            onLimitChange={jest.fn()}
            onPageChange={changeSpy}
            totalPages={10}
        >
            <p>Test</p>
        </Pagination>
    );

    pagination.setProps({totalPages: 7});
    expect(changeSpy).not.toBeCalled();

    pagination.setProps({totalPages: 3});
    expect(changeSpy).toBeCalledWith(3);
});

test('Click previous link should call callback', () => {
    const clickSpy = jest.fn();
    const pagination = mount(
        <Pagination
            currentLimit={10}
            currentPage={5}
            onLimitChange={jest.fn()}
            onPageChange={clickSpy}
            totalPages={10}
        >
            <p>Test</p>
        </Pagination>
    );

    pagination.find('button').at(1).simulate('click');
    expect(clickSpy).toBeCalledWith(4);
});

test('Click next link should call callback', () => {
    const clickSpy = jest.fn();
    const pagination = mount(
        <Pagination
            currentLimit={10}
            currentPage={6}
            onLimitChange={jest.fn()}
            onPageChange={clickSpy}
            totalPages={10}
        >
            <p>Test</p>
        </Pagination>
    );

    pagination.find('button').at(2).simulate('click');
    expect(clickSpy).toBeCalledWith(7);
});

test('Click previous link on first page should not call callback', () => {
    const clickSpy = jest.fn();
    const pagination = mount(
        <Pagination
            currentLimit={10}
            currentPage={1}
            onLimitChange={jest.fn()}
            onPageChange={clickSpy}
            totalPages={10}
        >
            <p>Test</p>
        </Pagination>
    );

    pagination.find('button').at(1).simulate('click');
    expect(clickSpy).not.toBeCalled();
});

test('Click next link on last page should not call callback', () => {
    const clickSpy = jest.fn();
    const pagination = mount(
        <Pagination
            currentLimit={10}
            currentPage={10}
            onLimitChange={jest.fn()}
            onPageChange={clickSpy}
            totalPages={10}
        >
            <p>Test</p>
        </Pagination>
    );

    pagination.find('button').at(2).simulate('click');
    expect(clickSpy).not.toBeCalled();
});

test('Change limit should call callback', () => {
    const changeSpy = jest.fn();
    const pagination = mount(
        <Pagination
            currentLimit={10}
            currentPage={6}
            onLimitChange={changeSpy}
            onPageChange={jest.fn()}
            totalPages={10}
        >
            <p>Test</p>
        </Pagination>
    );

    pagination.find('SingleSelect').prop('onChange')(20);
    expect(changeSpy).toBeCalledWith(20);
});

test('Change limit to current limit should not call callback', () => {
    const changeSpy = jest.fn();
    const pagination = mount(
        <Pagination
            currentLimit={10}
            currentPage={6}
            onLimitChange={changeSpy}
            onPageChange={jest.fn()}
            totalPages={10}
        >
            <p>Test</p>
        </Pagination>
    );

    pagination.find('SingleSelect').prop('onChange')(10);
    expect(changeSpy).not.toBeCalled();
});

test('Change callback should be called on blur when input was changed', () => {
    const changeSpy = jest.fn();
    const pagination = mount(
        <Pagination
            currentLimit={10}
            currentPage={6}
            onLimitChange={jest.fn()}
            onPageChange={changeSpy}
            totalPages={10}
        >
            <p>Test</p>
        </Pagination>
    );

    pagination.find('Input').prop('onBlur')();
    expect(changeSpy).not.toBeCalled();

    pagination.find('Input').prop('onChange')(3);
    expect(changeSpy).not.toBeCalled();

    pagination.find('Input').prop('onBlur')();
    expect(changeSpy).toBeCalledWith(3);
});

test('Change callback should be called on enter when input was changed', () => {
    const changeSpy = jest.fn();
    const pagination = mount(
        <Pagination
            currentLimit={10}
            currentPage={6}
            onLimitChange={jest.fn()}
            onPageChange={changeSpy}
            totalPages={10}
        >
            <p>Test</p>
        </Pagination>
    );

    pagination.find('Input').prop('onKeyPress')('Enter');
    expect(changeSpy).not.toBeCalled();

    pagination.find('Input').prop('onChange')(3);
    expect(changeSpy).not.toBeCalled();

    pagination.find('Input').prop('onKeyPress')('Enter');
    expect(changeSpy).toBeCalledWith(3);
});

test('Change callback should be called with 1 if input value is lower than 1', () => {
    const changeSpy = jest.fn();
    const pagination = mount(
        <Pagination
            currentLimit={10}
            currentPage={6}
            onLimitChange={jest.fn()}
            onPageChange={changeSpy}
            totalPages={10}
        >
            <p>Test</p>
        </Pagination>
    );

    pagination.find('Input').prop('onChange')(0);
    pagination.find('Input').prop('onBlur')();
    expect(changeSpy).toBeCalledWith(1);
});

test('Change callback should be called with value of totalPages if input value is higher than total pages', () => {
    const changeSpy = jest.fn();
    const pagination = shallow(
        <Pagination
            currentLimit={10}
            currentPage={6}
            onLimitChange={jest.fn()}
            onPageChange={changeSpy}
            totalPages={10}
        >
            <p>Test</p>
        </Pagination>
    );

    pagination.find('Input').prop('onChange')(12);
    pagination.find('Input').prop('onBlur')();
    expect(changeSpy).toBeCalledWith(10);
});

test('Change callback should not be called if input value is equal to currentPage', () => {
    const changeSpy = jest.fn();
    const pagination = mount(
        <Pagination
            currentLimit={10}
            currentPage={6}
            onLimitChange={jest.fn()}
            onPageChange={changeSpy}
            totalPages={10}
        >
            <p>Test</p>
        </Pagination>
    );

    pagination.find('Input').prop('onChange')(6);
    pagination.find('Input').prop('onBlur')();
    expect(changeSpy).not.toBeCalled();
});
