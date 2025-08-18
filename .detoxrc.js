/** @type {Detox.DetoxConfig} */
module.exports = {
  testRunner: {
    args: {
      config: 'e2e.jest.config.js',
      _: ['src/test-utils/e2e/tests'],
    },
    jest: {
      setupTimeout: 120000,
    },
  },

  apps: {
    'ios.debug': {
      type: 'ios.app',
      binaryPath:
        'ios/build/Build/Products/Debug-iphonesimulator/RnBulletproofAuth.app',
      build:
        'xcodebuild -workspace ios/RnBulletproofAuth.xcworkspace -scheme RnBulletproofAuth -configuration Debug -sdk iphonesimulator -derivedDataPath ios/build',
    },
    'ios.release': {
      type: 'ios.app',
      binaryPath:
        'ios/build/Build/Products/Release-iphonesimulator/RnBulletproofAuth.app',
      build:
        'RCT_NEW_ARCH_ENABLED=0 xcodebuild -workspace ios/RnBulletproofAuth.xcworkspace -scheme RnBulletproofAuth -configuration Release -sdk iphonesimulator -derivedDataPath ios/build',
    },
  },

  devices: {
    simulator: {
      type: 'ios.simulator',
      device: { type: 'iPhone 15' },
    },
  },

  configurations: {
    'ios.sim.debug': { device: 'simulator', app: 'ios.debug' },
    'ios.sim.release': { device: 'simulator', app: 'ios.release' },
  },
};
