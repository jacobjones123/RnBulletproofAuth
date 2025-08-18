// export detox configuration
export default {
  testRunner: 'jest',
  specs: 'src/test-utils/e2e/tests',
  artifacts: {
    plugins: {
      log: { enabled: true },
      screenshot: {
        shouldTakeAutomaticSnapshots: true,
        keepOnlyFailedTestsArtifacts: true,
      },
    },
  },
  configurations: {
    'android.emu.release': {
      device: {
        avdName: 'Pixel_6_API_34',
        type: 'android.emulator',
      },
      app: {
        binaryPath: 'android/app/build/outputs/apk/release/app-release.apk',
        build:
          'cd android && ./gradlew assembleRelease assembleAndroidTest -DtestBuildType=release && cd ..',
        type: 'android.apk',
      },
    },
  },
};
