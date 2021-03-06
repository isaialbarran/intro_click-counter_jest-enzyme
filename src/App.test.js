import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import App from './App';

Enzyme.configure({ adapter: new EnzymeAdapter() });

/*Factory function to create a ShallowWrapper for the App component.
* @function setup
* @param {object} props - Component props specific to this setup
* @param {object} state - Initial state for setup
* @return {ShallowWrapper}
* */
const setup = (props={}, state=null) => {
  const wrapper = shallow(<App {...props}/>);
  if(state) wrapper.setState(state);
  return wrapper;
};

/*Return ShallowWrapper containing node(s) with the given data-test value.
* @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search with
* @param {String} value - Value of data-test attribute for search.
* @return {ShallowWrapper}
* */
const findByTestAttr = (wrapper, value) => {
  return wrapper.find(`[data-test="${value}"]`)
};

test('renders without errors', () => {
  const wrapper = shallow(<App/>);
  const appComponent = findByTestAttr(wrapper, 'component-app');
  expect(appComponent.length).toBe(1);
});

test('renders increment button display', () => {
  const wrapper = shallow(<App/>);
  const button = findByTestAttr(wrapper, 'increment-button');
  expect(button.length).toBe(1);
});

test('renders counter display', () => {
  const wrapper = shallow(<App/>);
  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  expect(counterDisplay.length).toBe(1);
});

test('counter starts at 0', () => {
  const wrapper = setup();
  const initialCounterState = wrapper.state('counter');
  expect(initialCounterState).toBe(0);
});

test('clicking button increments counter', () => {
  const counter = 7;
  const wrapper = setup(null, { counter });

  //find button and click
  const button = findByTestAttr(wrapper, 'increment-button');
  button.simulate('click');
  wrapper.update();

  //find display and test value
  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  expect(counterDisplay.text()).toContain(counter + 1);
});

test('Clicking button decrement counter', () => {
  const counter = 7;
  const wrapper = setup(null, { counter });

  //find button and click
  const button = findByTestAttr(wrapper, 'decrement-button');
  button.simulate('click');
  wrapper.update();

  //find display and test value
  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  expect(counterDisplay.text()).toContain(counter - 1);
});