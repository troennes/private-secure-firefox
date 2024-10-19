<p align="center"><b>Privacy and security baseline for Firefox</b></p>

## Quick start

This will apply recommended privacy and security settings for Firefox

```powershell
powershell.exe -ExecutionPolicy Unrestricted -File .\Install.ps1
```

## What is this?

This is a handpicked collection of privacy and security settings for Mozilla Firefox on Windows that tries to strike a good balance between privacy, security and usability. It is mainly based on [Arkenfox](https://github.com/arkenfox/user.js) and [Betterfox](https://github.com/yokoffing/BetterFox).

The goal is to provide a script that installs everything you need, requires no manual tweaks and just works afterwards.

## How to use

Open Powershell with administrative privileges and run the install script:

```powershell
.\Install.ps1
```
Use optional arguments if needed:

```powershell
-ProfilePath    Optionally supply the Firefox profile to use manually
-FirefoxPath    Optionally supply the Firefox installation path manually
-BackupPath     Optionally supply where the profiles backup is stored
-SkipBackup     Use this option to skip backing up user profiles before installing
```

## FAQ

### Why use this instead of Arkenfox or Betterfox?

While both Arkenfox and Betterfox are great, they are geared towards advanced users. If you are an advanced user willing to read the Arkenfox wiki and determine your own trade-offs between privacy, security and usability, please use Arkenfox instead of this.

- Both Arkenfox and Betterfox has more manual steps than this baseline. 
- Unlike Arkenfox and Betterfox, this baseline auto-installs and configures the uBlock Origin extension
- This baseline has less breakage than default Arkenfox


### How can I use this on Linux or Mac?

Currently, only Windows is supported. You can still manually install it by:

1. Copy "user.js" to the current Firefox profile. Go to "about:profiles" in Firefox and place the file in the Root Directory of the Default Profile
2. Copy the "policies.json" file to the directory shown in [Customizing Firefox Using policies.json](https://support.mozilla.org/en-US/kb/customizing-firefox-using-policiesjson)

The final step is to manually configure uBlock Origin filter lists to your liking.

### I want to change some of the settings

Everything is customizable. Mostly you would want to modify the user.js file by adding your changes at the bottom of the file. Some common examples:

- Re-enable the built-in password manager: `user_pref("signon.rememberSignons", true);`
- Re-enable autofill: `user_pref("browser.formfill.enable", true);`
- Re-enable search suggestions: 

```js
user_pref("browser.search.suggest.enabled", true);
user_pref("browser.urlbar.suggest.searches", true);
```

## Contributing

Don't be afraid to contribute! For now, create an issue if you see room for improvement, and we'll take it from there.

## Credits

- [Arkenfox](https://github.com/arkenfox/user.js)
- [Betterfox](https://github.com/yokoffing/BetterFox)