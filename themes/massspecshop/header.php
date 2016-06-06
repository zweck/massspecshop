<?php

/**

 * The Header template for our theme

 *

 * Displays all of the <head> section and everything up till <div id="main">

 *

 * @package WordPress

 * @subpackage Twenty_Twelve

 * @since Twenty Twelve 1.0

 */

?><!DOCTYPE html>

<!--[if IE 7]>

<html class="ie ie7" <?php language_attributes(); ?>>

<![endif]-->

<!--[if IE 8]>

<html class="ie ie8" <?php language_attributes(); ?>>

<![endif]-->

<!--[if !(IE 7) & !(IE 8)]><!-->

<html <?php language_attributes(); ?>>

<!--<![endif]-->

<head>

<meta charset="<?php bloginfo( 'charset' ); ?>" />

<meta name="viewport" content="width=device-width" />

<title><?php wp_title( '|', true, 'right' ); ?></title>

<link rel="profile" href="http://gmpg.org/xfn/11" />

<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />

<link href='https://fonts.googleapis.com/css?family=Merriweather:400,300italic' rel='stylesheet' type='text/css'>

<link href="<?php echo get_template_directory_uri(); ?>/overrides.css" rel='stylesheet' type='text/css'>















<?php // Loads HTML5 JavaScript file to add support for HTML5 elements in older IE versions. ?>

<!--[if lt IE 9]>

<script src="<?php echo get_template_directory_uri(); ?>/js/html5.js" type="text/javascript"></script>

<![endif]-->

<?php wp_head(); ?>

</head>



<body <?php body_class(); ?>>

<div id="page" class="hfeed site3">

	

    <div class="container">

	

    <header id="masthead" class="site-header" role="banner">

    <div class="header_part">

		<div class="col-lg-5 col-md-5 col-sm-4 col-xs-12">

			<div class="logo">

            <a href="<?php echo esc_url( home_url( '/' ) ); ?>">
            <img src="<?php echo get_template_directory_uri(); ?>/images/logo.png" alt="Logo" title="Logo" />
            </a>

            </div>

            </div>

		

 <div class="col-lg-7 col-md-7 col-sm-8 col-xs-12">

		<div class="header_menu">

        <nav id="site-navigation" class="main-navigation" role="navigation">

			<button class="menu-toggle">
			<img src="<?php echo get_template_directory_uri(); ?>/images/resp_menu1.png" alt="Logo" title="Logo" />
			<?php //_e( 'Menu', 'twentytwelve' ); ?>
            </button>

			<a class="assistive-text" href="#content" title="<?php esc_attr_e( 'Skip to content', 'twentytwelve' ); ?>"><?php _e( 'Skip to content', 'twentytwelve' ); ?></a>

			<?php wp_nav_menu( array( 'theme_location' => 'primary', 'menu_class' => 'nav-menu' ) ); ?>

		</nav>

        </div>

        <!-- #site-navigation -->

        </div>

     </div>


<?php if ( is_front_page() ) : ?>
		<?php if ( get_header_image() ) : ?>

		<a href="<?php echo esc_url( home_url( '/' ) ); ?>"><img src="<?php header_image(); ?>" class="header-image" width="<?php echo esc_attr( get_custom_header()->width ); ?>" height="<?php echo esc_attr( get_custom_header()->height ); ?>" alt="<?php echo esc_attr( get_bloginfo( 'name', 'display' ) ); ?>" /></a>

		<?php endif; ?>		<?php endif; ?>

	</header><!-- #masthead -->

    

    </div>



	<div id="main" class="wrapper">