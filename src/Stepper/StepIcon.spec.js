import React from 'react';
import { assert } from 'chai';
import CheckCircle from '../internal/svg-icons/CheckCircle';
import ErrorTriangle from '../internal/svg-icons/ErrorTriangle';
import { createShallow, createMount } from '../test-utils';
import StepIcon from './StepIcon';
import StepPositionIcon from './StepPositionIcon';

describe('<StepIcon />', () => {
  let shallow;
  let mount;

  before(() => {
    shallow = createShallow({ dive: true });
    mount = createMount();
  });

  after(() => {
    mount.cleanUp();
  });

  it('renders <CheckCircle> when completed', () => {
    const wrapper = mount(<StepIcon icon={1} completed />);
    const checkCircle = wrapper.find(CheckCircle);
    assert.strictEqual(checkCircle.length, 1, 'should have an <CheckCircle />');
  });

  it('renders <ErrorTriangle> when error occured', () => {
    const wrapper = mount(<StepIcon icon={1} error />);
    const errorTriangle = wrapper.find(ErrorTriangle);
    assert.strictEqual(errorTriangle.length, 1, 'should have an <ErrorTriangle />');
  });

  it('renders <StepPositionIcon> when not completed', () => {
    const wrapper = shallow(<StepIcon icon={1} active />);
    const checkCircle = wrapper.find(StepPositionIcon);
    assert.strictEqual(checkCircle.length, 1, 'should have an <StepPositionIcon />');
    const props = checkCircle.props();
    assert.strictEqual(props.position, 1, 'should set position');
    assert.include(props.className, 'active');
  });

  it('renders the custom icon', () => {
    const wrapper = shallow(<StepIcon icon={<span className="my-icon" />} />);
    assert.strictEqual(wrapper.find('.my-icon').length, 1, 'should have the custom icon');
  });
});
