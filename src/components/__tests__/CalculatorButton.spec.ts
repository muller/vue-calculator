import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CalculatorButton from '../CalculatorButton.vue'

describe('CalculatorButton', () => {
  it('renders label', () => {
    const wrapper = mount(CalculatorButton, {
      props: {
        active: false,
        disabled: false,
        label: 'some label'
      }
    })
    expect(wrapper.find('.bg-gray-500').text()).toBe('some label')
  })
  it('highlights when active', () => {
    const wrapper = mount(CalculatorButton, {
      props: {
        active: true,
        disabled: false,
        label: '1'
      }
    })
    expect(wrapper.find('.bg-violet-700').exists()).toBe(true)
  })
  it('propagates label on click', async () => {
    const wrapper = mount(CalculatorButton, {
      props: {
        active: false,
        disabled: false,
        label: 'label 123'
      }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('keyPress')?.[0][0]).toBe('label 123')
  })
  it('does nothing when disabled', async () => {
    const wrapper = mount(CalculatorButton, {
      props: {
        active: false,
        disabled: true,
        label: '1'
      }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('keyPress')).toBeUndefined()
  })
})
