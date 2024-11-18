import React, { useState, useEffect } from 'react';
import { View, Button, Text } from 'react-native';
import { Audio } from 'expo-av'; // Only using expo-av for audio recording
import * as FileSystem from 'expo-file-system';

export default function App() {
  const [recording, setRecording] = useState(null);
  const [recordedUri, setRecordedUri] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    requestMicrophonePermissions();
  }, []);

  // Request microphone permissions directly using Audio
  const requestMicrophonePermissions = async () => {
    const { status } = await Audio.requestPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access microphone is required!');
    }
  };

  // Start recording audio
  const startRecording = async () => {
    try {
      console.log('Starting recording..');
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await recording.startAsync();
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  // Stop recording audio
  const stopRecording = async () => {
    console.log('Stopping recording..');
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    console.log('Recording stopped and stored at', uri);
    setRecordedUri(uri);
  };

  // Send recorded audio to Hugging Face Whisper API
  const queryWhisperAPI = async (fileUri) => {
    const formData = new FormData();
    formData.append('file', {
      uri: fileUri,
      name: 'audio.wav', // or whatever format you're using
      type: 'audio/wav', // match the type of your recorded audio
    });

    try {
      const response = await fetch(
        'https://api-inference.huggingface.co/models/openai/whisper-large-v2',
        {
          method: 'POST',
          headers: {
            Authorization: 'Bearer hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', // Replace with your Hugging Face token
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        }
      );

      const data = await response.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Button
        title={recording ? 'Stop Recording' : 'Start Recording'}
        onPress={recording ? stopRecording : startRecording}
      />

      {recordedUri && (
        <Button
          title="Send to Whisper"
          onPress={() => queryWhisperAPI(recordedUri)}
        />
      )}

      {result && <Text>{result}</Text>}
    </View>
  );
}
