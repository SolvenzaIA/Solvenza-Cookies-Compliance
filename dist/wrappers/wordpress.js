import "../chunk-DDAAVRWG.js";

// src/wrappers/wordpress.ts
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
export {
  generateWordPressPluginPhp
};
//# sourceMappingURL=wordpress.js.map