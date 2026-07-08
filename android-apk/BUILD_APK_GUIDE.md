# 🚀 Naukri Dhundho APK Build Guide

## Method 1: AppsGeyser (Easiest — No coding needed)

1. Go to **https://appsgeyser.com/create/website-to-app/**
2. Enter URL: `https://naukri-dhundho.onrender.com`
3. App Name: `Naukri Dhundho`
4. Upload `logo.png` as app icon
5. **IMPORTANT SETTINGS** (click Advanced/Settings):
   - ✅ Enable JavaScript
   - ✅ Enable DOM Storage  
   - ✅ Enable Mixed Content
   - ✅ Enable Geolocation
   - ✅ Allow Third Party Cookies
   - ✅ Enable File Access
   - Set orientation: Portrait
6. Click **Create App** → Download APK

## Method 2: GoNative.io (Professional quality)

1. Go to **https://gonative.io/**
2. Enter URL: `https://naukri-dhundho.onrender.com`
3. Configure:
   - App Name: Naukri Dhundho
   - Icon: Upload logo.png
   - Enable: JavaScript, DOM Storage, Mixed Content
   - Enable: Third party cookies
   - Disable: Splash screen (or customize it)
4. Download APK

## Method 3: Android Studio (If you install it)

1. Install Android Studio from https://developer.android.com/studio
2. Open the `android-apk` folder as a project
3. Copy `logo.png` to `app/src/main/res/mipmap-xxxhdpi/ic_launcher.png`
4. Click Build → Build APK
5. APK will be in `app/build/outputs/apk/debug/`

## ⚠️ Why the old APK was showing 500 error:

The WebView in the old APK was missing these critical settings:
- `setDomStorageEnabled(true)` — localStorage was blocked
- `setMixedContentMode(MIXED_CONTENT_ALWAYS_ALLOW)` — ad scripts blocked
- `setAllowUniversalAccessFromFileURLs(true)` — cross-origin blocked
- `setMediaPlaybackRequiresUserGesture(false)` — voice/TTS blocked
- `usesCleartextTraffic="true"` in manifest — HTTP ad URLs blocked
- `network_security_config.xml` — ad domains not whitelisted

All these are fixed in the new Android project files.
