"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/wrappers/wordpress.ts
var wordpress_exports = {};
__export(wordpress_exports, {
  generateWordPressPluginPhp: () => generateWordPressPluginPhp
});
module.exports = __toCommonJS(wordpress_exports);
function generateWordPressPluginPhp() {
  return `<?php
/**
 * Plugin Name: Solvenza Cookies Compliance
 * Plugin URI: https://github.com/solvenza/cookies-compliance
 * Description: SDK de gesti\xF3n de consentimiento en Espa\xF1a (LSSI art. 22.2, AEPD 2024 y RGPD).
 * Version: 1.0.0
 * Author: Solvenza Team
 * License: MIT
 */

if (!defined('ABSPATH')) exit;

function solvenza_enqueue_consent_sdk() {
    wp_enqueue_script(
        'solvenza-cookies-compliance',
        plugin_dir_url(__FILE__) . 'consent.min.js',
        array(),
        '1.0.0',
        false
    );
}
add_action('wp_enqueue_scripts', 'solvenza_enqueue_consent_sdk', 1);

function solvenza_add_script_attributes($tag, $handle, $src) {
    if ($handle === 'solvenza-cookies-compliance') {
        $config_url = plugin_dir_url(__FILE__) . 'consent.json';
        return '<script src="' . esc_url($src) . '" data-config="' . esc_url($config_url) . '"></script>';
    }
    return $tag;
}
add_filter('script_loader_tag', 'solvenza_add_script_attributes', 10, 3);
`;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  generateWordPressPluginPhp
});
//# sourceMappingURL=wordpress.cjs.map