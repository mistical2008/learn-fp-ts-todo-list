import { expect } from '@storybook/jest'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { userEvent, within } from '@storybook/testing-library'

import { Button } from './Button'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Example/Button',
    component: Button,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        backgroundColor: { control: 'color' },
        onClick: { action: true },
    },
} as ComponentMeta<typeof Button>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />

export const Primary = Template.bind({})
Primary.play = async ({
    args,
    canvasElement,
}: {
    args: any
    canvasElement: HTMLElement
}) => {
    const canvas = within(canvasElement)
    /* eslint-disable @typescript-eslint/await-thenable */
    await userEvent.click(canvas.getByRole('button'))
    await expect(args.onClick).toHaveBeenCalled()
}
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
    primary: true,
    label: 'Button',
}

export const Secondary = Template.bind({})
Secondary.play = async ({
    args,
    canvasElement,
}: {
    args: any
    canvasElement: HTMLElement
}) => {
    const canvas = within(canvasElement)
    /* eslint-disable @typescript-eslint/await-thenable */
    await userEvent.click(canvas.getByRole('button'))
    await expect(args.onClick).toHaveBeenCalled()
}
Secondary.args = {
    label: 'Button',
}

export const Large = Template.bind({})
Large.play = async ({
    args,
    canvasElement,
}: {
    args: any
    canvasElement: HTMLElement
}) => {
    const canvas = within(canvasElement)
    /* eslint-disable @typescript-eslint/await-thenable */
    await userEvent.click(canvas.getByRole('button'))
    await expect(args.onClick).toHaveBeenCalled()
}
Large.args = {
    size: 'large',
    label: 'Button',
}

export const Small = Template.bind({})
Small.play = async ({
    args,
    canvasElement,
}: {
    args: any
    canvasElement: HTMLElement
}) => {
    const canvas = within(canvasElement)
    /* eslint-disable @typescript-eslint/await-thenable */
    await userEvent.click(canvas.getByRole('button'))
    /* eslint-disable */
    await expect(args.onClick).toHaveBeenCalled()
}
Small.args = {
    size: 'small',
    label: 'Button',
}
