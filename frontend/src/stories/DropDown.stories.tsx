import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { DropDownInput } from 'components/uikit/inputs/dropdown/DropDownInput';
import { defaultExclude } from '../../.storybook/preview';
import { sleep } from './utils';
const StoryComponent = DropDownInput;

export default {
  title: 'Example/DropDown',
  component: StoryComponent,
  args: {
    options: ['qwe', 'zxc', 'asd'],
    required: true,
  } as Partial<React.ComponentProps<typeof StoryComponent>>,
  parameters: {
    controls: {
      exclude: [
        ...defaultExclude,
        'onValueChanged',
      ] as (keyof React.ComponentProps<typeof StoryComponent>)[],
    },
  },
} as ComponentMeta<typeof StoryComponent>;

const Template: ComponentStory<typeof StoryComponent> = (
  args: React.ComponentProps<typeof StoryComponent>,
) => {
  const [value, setValue] = useState(args.value ?? '');
  return (
    <StoryComponent
      {...args}
      value={value}
      onValueChanged={(value, e) => {
        if (args.onValueChanged) {
          const result = args.onValueChanged(value, e);
          if (result) setValue(value as any);
        } else {
          setValue(value as any);
        }
      }}
    />
  );
};

export const Default = Template.bind({});

export const CancelIfAsdIsSelected = Template.bind({});
CancelIfAsdIsSelected.args = {
  value: 'qwe',
  disableAutomaticResetAfterOnValueChanged: true,
  onValueChanged(newSelectedOption, event) {
    if (newSelectedOption === 'asd') event.cancel();
    else return true;
  },
} as React.ComponentProps<typeof StoryComponent>;

export const CancelAnySelectedValueAutomatically = Template.bind({});
CancelAnySelectedValueAutomatically.args = {
  value: 'qwe',
  onValueChanged(newSelectedOption, event) {
    // we do not change the Value in state, so it's not changed in `props`, so it should be canceled automatically
  },
} as React.ComponentProps<typeof StoryComponent>;

export const CancelAnySelectedValueAutomaticallyIn500ms = Template.bind({});
CancelAnySelectedValueAutomaticallyIn500ms.args = {
  value: 'qwe',
  async onValueChanged(newSelectedOption, event) {
    // we do not change the Value in state, so it's not changed in `props`, so it should be canceled automatically
    await sleep(500);
  },
} as React.ComponentProps<typeof StoryComponent>;

let i = 0;
export const CancelIfAsdIsSelected_AcceptTheSecondTime = Template.bind({});
CancelIfAsdIsSelected_AcceptTheSecondTime.args = {
  value: 'qwe',
  disableAutomaticResetAfterOnValueChanged: true,
  onValueChanged(newSelectedOption, event) {
    if (newSelectedOption === 'asd' && i % 2 === 0) {
      i = i + 1;
      event.cancel();
    } else return true;
  },
} as React.ComponentProps<typeof StoryComponent>;
