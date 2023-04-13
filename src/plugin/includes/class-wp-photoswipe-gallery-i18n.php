<?php

/**
 * Define the internationalization functionality
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @link       https://profiles.wordpress.org/eelikivi/
 * @since      1.0.0
 *
 * @package    Wp_Photoswipe_Gallery
 * @subpackage Wp_Photoswipe_Gallery/includes
 */

/**
 * Define the internationalization functionality.
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @since      1.0.0
 * @package    Wp_Photoswipe_Gallery
 * @subpackage Wp_Photoswipe_Gallery/includes
 * @author     Eeli Kivikaarre <eelikivi@hotmail.com>
 */
class Wp_Photoswipe_Gallery_i18n {


	/**
	 * Load the plugin text domain for translation.
	 *
	 * @since    1.0.0
	 */
	public function load_plugin_textdomain() {

		load_plugin_textdomain(
			'wp-photoswipe-gallery',
			false,
			dirname( dirname( plugin_basename( __FILE__ ) ) ) . '/languages/'
		);

	}



}
