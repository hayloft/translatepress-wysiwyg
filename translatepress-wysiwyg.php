<?php

/*
Plugin Name: TranslatePress - WYSIWYG
Plugin URI: https://www.hayloft-it.ch
Version: 1.0
Author: Hayloft-IT GmbH
Author URI: https://www.hayloft-it.ch
Text Domain: translatepress-wysiwyg
Description: Cache für bessere Performance von WordPress.
*/

add_filter('trp-styles-for-editor', function($styles) {
    $styles[] = 'translatepress-wysiwyg';

    return $styles;
});

add_action('trp_translation_manager_footer', function () {
    wp_enqueue_script('translatepress-trumbowyg', plugins_url('trumbowyg.min.js', __FILE__), []);
    wp_enqueue_script('translatepress-wysiwyg', plugins_url('editor.js', __FILE__), []);
    wp_enqueue_style('translatepress-wysiwyg', plugins_url('ui/trumbowyg.min.css', __FILE__), [], false);
    wp_add_inline_style('translatepress-wysiwyg', <<< CSS
.trumbowyg-editor { padding: 3px; }
.trp-textarea { box-sizing: border-box; }
.trumbowyg-box { min-height: 0; border-radius: 3px; }
.trumbowyg-box p { margin: 0; padding: 0; }
.trumbowyg-button-pane { min-height: 24px; }
.trumbowyg-button-pane button { width: 24px; height: 24px; padding: 1px !important; }
.trumbowyg-box svg { width: 14px; }
.trumbowyg-button-pane .trumbowyg-button-group::after { height: 24px; }
.trp-translation-input-parent { padding-right: 0; }
CSS);
});
