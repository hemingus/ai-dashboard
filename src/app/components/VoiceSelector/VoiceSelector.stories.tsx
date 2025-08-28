import type { Meta, StoryObj } from "@storybook/react";
import VoiceSelector from "./VoiceSelector";
import { VoiceProvider } from "../../context/VoiceContext";
import "../../globals.css"

// Mock voices for stories
const mockVoices = [
  { name: "Alice", lang: "en-US" } as SpeechSynthesisVoice,
  { name: "Bob", lang: "en-GB" } as SpeechSynthesisVoice,
  { name: "Clara", lang: "es-ES" } as SpeechSynthesisVoice,
];

const meta: Meta<typeof VoiceSelector> = {
  title: "Components/VoiceSelector",
  component: VoiceSelector,
};

export default meta;

type Story = StoryObj<typeof VoiceSelector>;

// Default story: voices available, first one selected
export const Default: Story = {
  render: () => (
    <VoiceProvider disableSpeechSynthesis initialVoices={mockVoices}>
      <VoiceSelector />
    </VoiceProvider>
  ),
};

// Custom selected voice
export const CustomSelectedVoice: Story = {
  render: () => (
    <VoiceProvider
      disableSpeechSynthesis
      initialVoices={mockVoices}
      initialSelectedVoice="Bob"
    >
      <VoiceSelector />
    </VoiceProvider>
  ),
};

// No voices available
export const NoVoices: Story = {
  render: () => (
    <VoiceProvider disableSpeechSynthesis initialVoices={[]}>
      <VoiceSelector />
    </VoiceProvider>
  ),
};

