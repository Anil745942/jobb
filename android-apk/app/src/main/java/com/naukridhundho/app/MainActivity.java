package com.naukridhundho.app;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Intent;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.webkit.CookieManager;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceError;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.ProgressBar;
import android.widget.Toast;

public class MainActivity extends Activity {

    private WebView webView;
    private ProgressBar progressBar;
    private static final String SITE_URL = "https://naukri-dhundho.onrender.com";

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Fullscreen immersive
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        getWindow().setFlags(
            WindowManager.LayoutParams.FLAG_FULLSCREEN,
            WindowManager.LayoutParams.FLAG_FULLSCREEN
        );

        // Set status bar color for Android 5.0+
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            getWindow().setStatusBarColor(0xFF0A0A0F);
        }

        setContentView(R.layout.activity_main);

        webView = findViewById(R.id.webView);
        progressBar = findViewById(R.id.progressBar);

        // ═══ CRITICAL: WebView Settings for Full Compatibility ═══
        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);                // localStorage support
        settings.setDatabaseEnabled(true);                  // Web SQL / IndexedDB
        settings.setAllowFileAccess(true);                  // file:// access
        settings.setAllowContentAccess(true);               // content:// access
        settings.setLoadWithOverviewMode(true);
        settings.setUseWideViewPort(true);
        settings.setSupportZoom(false);
        settings.setBuiltInZoomControls(false);
        settings.setDisplayZoomControls(false);
        settings.setCacheMode(WebSettings.LOAD_DEFAULT);
        settings.setMediaPlaybackRequiresUserGesture(false); // Auto-play audio (TTS)
        settings.setJavaScriptCanOpenWindowsAutomatically(true);
        settings.setAllowUniversalAccessFromFileURLs(true);  // Cross-origin in WebView
        settings.setAllowFileAccessFromFileURLs(true);

        // Mixed content (HTTP inside HTTPS) — required for some ad scripts
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            settings.setMixedContentMode(WebSettings.MIXED_CONTENT_ALWAYS_ALLOW);
        }

        // User Agent — append app identifier so website JS can detect APK mode
        String ua = settings.getUserAgentString();
        settings.setUserAgentString(ua + " NaukriDhundhoApp/2.0");

        // Enable cookies
        CookieManager cookieManager = CookieManager.getInstance();
        cookieManager.setAcceptCookie(true);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            cookieManager.setAcceptThirdPartyCookies(webView, true);
        }

        // ═══ WebViewClient — Handle navigation & errors gracefully ═══
        webView.setWebViewClient(new WebViewClient() {

            @Override
            public void onPageStarted(WebView view, String url, Bitmap favicon) {
                super.onPageStarted(view, url, favicon);
                progressBar.setVisibility(View.VISIBLE);
            }

            @Override
            public void onPageFinished(WebView view, String url) {
                super.onPageFinished(view, url);
                progressBar.setVisibility(View.GONE);
            }

            @Override
            public void onReceivedError(WebView view, WebResourceRequest request, WebResourceError error) {
                super.onReceivedError(view, request, error);
                // Only handle main frame errors, not sub-resource (ad) errors
                if (request.isForMainFrame()) {
                    // Load a simple offline error page
                    view.loadData(
                        "<html><body style='background:#0a0a0f;color:#f4f4f5;font-family:sans-serif;" +
                        "display:flex;align-items:center;justify-content:center;height:100vh;text-align:center'>" +
                        "<div><h2>⚠️ Connection Error</h2>" +
                        "<p style='color:#a78bfa'>Internet connection check karo aur retry karo</p>" +
                        "<button onclick='location.reload()' style='margin-top:20px;padding:12px 32px;" +
                        "background:#7c3aed;color:white;border:none;border-radius:12px;font-size:16px;" +
                        "cursor:pointer'>🔄 Retry</button></div></body></html>",
                        "text/html", "UTF-8"
                    );
                }
            }

            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                String url = request.getUrl().toString();

                // Keep naukri-dhundho URLs inside the WebView
                if (url.contains("naukri-dhundho.onrender.com")) {
                    return false; // Load in WebView
                }

                // WhatsApp links → open in WhatsApp app
                if (url.contains("wa.me") || url.contains("whatsapp.com")) {
                    try {
                        startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse(url)));
                    } catch (Exception e) {
                        Toast.makeText(MainActivity.this, "WhatsApp not installed", Toast.LENGTH_SHORT).show();
                    }
                    return true;
                }

                // Phone calls
                if (url.startsWith("tel:")) {
                    startActivity(new Intent(Intent.ACTION_DIAL, Uri.parse(url)));
                    return true;
                }

                // Email
                if (url.startsWith("mailto:")) {
                    startActivity(new Intent(Intent.ACTION_SENDTO, Uri.parse(url)));
                    return true;
                }

                // Ad network URLs and other external links — open in external browser
                // This prevents ad redirects from hijacking the WebView
                if (!url.contains("naukri-dhundho")) {
                    try {
                        startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse(url)));
                    } catch (Exception ignored) {}
                    return true;
                }

                return false;
            }
        });

        // ═══ WebChromeClient — Progress bar ═══
        webView.setWebChromeClient(new WebChromeClient() {
            @Override
            public void onProgressChanged(WebView view, int newProgress) {
                progressBar.setProgress(newProgress);
                if (newProgress >= 100) {
                    progressBar.setVisibility(View.GONE);
                }
            }
        });

        // ═══ LOAD THE WEBSITE ═══
        webView.loadUrl(SITE_URL);
    }

    @Override
    public void onBackPressed() {
        if (webView.canGoBack()) {
            webView.goBack();
        } else {
            super.onBackPressed();
        }
    }

    @Override
    protected void onResume() {
        super.onResume();
        webView.onResume();
    }

    @Override
    protected void onPause() {
        super.onPause();
        webView.onPause();
    }

    @Override
    protected void onDestroy() {
        if (webView != null) {
            webView.destroy();
        }
        super.onDestroy();
    }
}
