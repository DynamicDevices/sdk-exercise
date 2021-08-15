function PaceSettings(props) {
  return (
    <Page>
      <Section
        title={<Text bold align="center">Pace Settings</Text>}>
        <TextInput
          label="Min Pace"
          settingsKey="minPace"
          type="number"
        />
        <TextInput
          label="Max Pace"
          settingsKey="maxPace"
          type="number"
        />
      </Section>
    </Page>
  );
}

registerSettingsPage(PaceSettings);
