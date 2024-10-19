

// From Arkenfox v128, (not showing settings I removed)
// see https://github.com/arkenfox/user.js/blob/master/user.js

/*** [SECTION 0100]: STARTUP ***/
user_pref("browser.newtabpage.activity-stream.showSponsored", false);
user_pref("browser.newtabpage.activity-stream.showSponsoredTopSites", false);
user_pref("browser.newtabpage.activity-stream.default.sites", "");

/*** [SECTION 0200]: GEOLOCATION ***/
user_pref("geo.provider.ms-windows-location", false);
user_pref("geo.provider.use_corelocation", false);
user_pref("geo.provider.use_geoclue", false);

/*** [SECTION 0300]: QUIETER FOX ***/
user_pref("extensions.getAddons.showPane", false);
user_pref("extensions.htmlaboutaddons.recommendations.enabled", false);
user_pref("browser.discovery.enabled", false);
user_pref("datareporting.policy.dataSubmissionEnabled", false);
user_pref("datareporting.healthreport.uploadEnabled", false);
user_pref("toolkit.telemetry.unified", false);
user_pref("toolkit.telemetry.enabled", false);
user_pref("toolkit.telemetry.server", "data:,");
user_pref("toolkit.telemetry.archive.enabled", false);
user_pref("toolkit.telemetry.newProfilePing.enabled", false);
user_pref("toolkit.telemetry.shutdownPingSender.enabled", false);
user_pref("toolkit.telemetry.updatePing.enabled", false);
user_pref("toolkit.telemetry.bhrPing.enabled", false);
user_pref("toolkit.telemetry.firstShutdownPing.enabled", false);
user_pref("toolkit.telemetry.coverage.opt-out", true);
user_pref("toolkit.coverage.opt-out", true);
user_pref("toolkit.coverage.endpoint.base", "");
user_pref("browser.newtabpage.activity-stream.feeds.telemetry", false);
user_pref("browser.newtabpage.activity-stream.telemetry", false);
user_pref("app.shield.optoutstudies.enabled", false);
user_pref("app.normandy.enabled", false);
user_pref("app.normandy.api_url", "");
user_pref("breakpad.reportURL", "");
user_pref("browser.tabs.crashReporting.sendReport", false);
user_pref("captivedetect.canonicalURL", "");                // Warning: May cause issues on public Wi-Fi
user_pref("network.captive-portal-service.enabled", false); // Warning: May cause issues on public Wi-Fi
user_pref("network.connectivity-service.enabled", false);   // Warning: May cause issues on public Wi-Fi

/*** [SECTION 0400]: SAFE BROWSING (SB) ***/
user_pref("browser.safebrowsing.downloads.remote.enabled", false);

/*** [SECTION 0600]: BLOCK IMPLICIT OUTBOUND [not explicitly asked for - e.g. clicked on] ***/
user_pref("network.prefetch-next", false);
user_pref("network.dns.disablePrefetch", true);
user_pref("network.dns.disablePrefetchFromHTTPS", true);
user_pref("network.predictor.enabled", false);
user_pref("network.http.speculative-parallel-limit", 0);
user_pref("browser.places.speculativeConnect.enabled", false);

/*** [SECTION 0700]: DNS / DoH / PROXY / SOCKS ***/
user_pref("network.proxy.socks_remote_dns", true);
user_pref("network.file.disable_unc_paths", true);

/*** [SECTION 0800]: LOCATION BAR / SEARCH BAR / SUGGESTIONS / HISTORY / FORMS ***/
user_pref("browser.urlbar.speculativeConnect.enabled", false);
user_pref("browser.urlbar.quicksuggest.enabled", false);
user_pref("browser.urlbar.suggest.quicksuggest.nonsponsored", false);
user_pref("browser.urlbar.suggest.quicksuggest.sponsored", false);
user_pref("browser.search.suggest.enabled", false); // Warning: Usability loss of suggestions from search engine
user_pref("browser.urlbar.suggest.searches", false); // Warning: Usability loss of suggestions from search engine
user_pref("browser.urlbar.trending.featureGate", false); // Warning: Usability loss of trending searches from search engines that supports it (e.g. Google)
user_pref("browser.urlbar.addons.featureGate", false);
user_pref("browser.urlbar.mdn.featureGate", false);
user_pref("browser.urlbar.yelp.featureGate", false);
user_pref("browser.formfill.enable", false); // Warning: Usability loss of auto-fill on forms
user_pref("browser.search.separatePrivateDefault.ui.enabled", true);

/*** [SECTION 0900]: PASSWORDS ***/
user_pref("signon.autofillForms", false);
user_pref("signon.formlessCapture.enabled", false);
user_pref("network.auth.subresource-http-auth-allow", 1);

/*** [SECTION 1000]: DISK AVOIDANCE ***/
user_pref("browser.cache.disk.enable", false);
user_pref("browser.privatebrowsing.forceMediaMemoryCache", true);
user_pref("browser.sessionstore.privacy_level", 2);
user_pref("browser.shell.shortcutFavicons", false);

/*** [SECTION 1200]: HTTPS (SSL/TLS / OCSP / CERTS / HPKP) ***/
user_pref("security.ssl.require_safe_negotiation", true); // Warning: Might break some sites (>99.7% ok)
user_pref("security.tls.enable_0rtt_data", false);
user_pref("security.cert_pinning.enforcement_level", 2); // Warning: Might break for some AV's that do MITM
user_pref("security.remote_settings.crlite_filters.enabled", true);
user_pref("security.pki.crlite_mode", 2);
user_pref("dom.security.https_only_mode", true); // Warning: Usability loss where user must click through a warning page for HTTP sites
user_pref("security.ssl.treat_unsafe_negotiation_as_broken", true);
user_pref("browser.xul.error_pages.expert_bad_cert", true);

/*** [SECTION 1600]: REFERERS ***/
user_pref("network.http.referer.XOriginTrimmingPolicy", 2);

/*** [SECTION 1700]: CONTAINERS ***/
user_pref("privacy.userContext.ui.enabled", true);

/*** [SECTION 2000]: PLUGINS / MEDIA / WEBRTC ***/
user_pref("media.peerconnection.ice.proxy_only_if_behind_proxy", true);
user_pref("media.peerconnection.ice.default_address_only", true);

/*** [SECTION 2400]: DOM (DOCUMENT OBJECT MODEL) ***/
user_pref("dom.disable_window_move_resize", true);

/*** [SECTION 2600]: MISCELLANEOUS ***/
user_pref("browser.download.start_downloads_in_tmp_dir", true);
user_pref("browser.uitour.enabled", false);
user_pref("permissions.manager.defaultsUrl", "");
user_pref("webchannel.allowObject.urlWhitelist", "");
user_pref("network.IDN_show_punycode", true);
user_pref("pdfjs.enableScripting", false);
user_pref("browser.tabs.searchclipboardfor.middleclick", false);
user_pref("browser.download.useDownloadDir", false);
user_pref("browser.download.alwaysOpenPanel", false);
user_pref("browser.download.manager.addToRecentDocs", false);
user_pref("browser.download.always_ask_before_handling_new_types", true);
user_pref("extensions.enabledScopes", 5); // Warning: Might break add-ons?
user_pref("extensions.postDownloadThirdPartyPrompt", false);

/*** [SECTION 2700]: ETP (ENHANCED TRACKING PROTECTION) ***/
user_pref("browser.contentblocking.category", "strict"); // Warning: Might break some sites, but can have per-site exceptions

/*** [SECTION 2800]: SHUTDOWN & SANITIZING ***/

/*** [SECTION 4000]: FPP (fingerprintingProtection) ***/

/*** [SECTION 4500]: OPTIONAL RFP (resistFingerprinting) ***/
user_pref("browser.link.open_newwindow.restriction", 0);

/*** [SECTION 9000]: NON-PROJECT RELATED ***/
user_pref("browser.newtabpage.activity-stream.asrouter.userprefs.cfr.addons", false);
user_pref("browser.newtabpage.activity-stream.asrouter.userprefs.cfr.features", false);
user_pref("browser.urlbar.showSearchTerms.enabled", false);

// Overrides for Arkenfox
user_pref("media.memory_cache_max_size", 1048576); // Larger RAM cache since disk cache is disabled
//user_pref("toolkit.winRegisterApplicationRestart", false);
user_pref("security.OCSP.enabled", 0); // Revocation with non-pinned OSCP is fundamentally broken so better to not cause privacy issues. CRLlite replaces it anyway
//user_pref("security.OCSP.require", true);
//user_pref("dom.security.https_only_mode_send_http_background_request", false);
//user_pref("privacy.userContext.enabled", true);
//user_pref("privacy.sanitize.sanitizeOnShutdown", true); //see SECTION 2800 in Arkenfox for more settings if you want this enabled


// Extra settings
user_pref("extensions.pocket.enabled", false); // Disable Pocket
user_pref("signon.rememberSignons", false); // Don’t ask to remember passwords
user_pref("browser.urlbar.groupLabels.enabled", false); //from Betterfox
user_pref("browser.urlbar.update2.engineAliasRefresh", true); //from Betterfox
user_pref("editor.truncate_user_pastes", false); //from Betterfox
user_pref("privacy.history.custom", true); //from Betterfox
// PREF: allow embedded tweets, Instagram and Reddit posts, and TikTok embeds
user_pref("urlclassifier.trackingSkipURLs", "*.reddit.com, *.twitter.com, *.twimg.com, *.tiktok.com"); //from Betterfox
user_pref("urlclassifier.features.socialtracking.skipURLs", "*.instagram.com, *.twitter.com, *.twimg.com"); //from Betterfox

user_pref("dom.disable_window_flip", true); // From CIS Benchmark
