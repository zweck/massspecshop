<?php

/**

 * Template Name: Home Template

 *

 * Description: A page template that provides a key component of WordPress as a CMS

 * by meeting the need for a carefully crafted introductory page. The front page template

 * in Twenty Twelve consists of a page content area for adding text, images, video --

 * anything you'd like -- followed by front-page-only widgets in one or two columns.

 *

 * @package WordPress

 * @subpackage Twenty_Twelve

 * @since Twenty Twelve 1.0

 */



get_header(); ?>



	<!--<div id="primary" class="site-content">

		<div id="content" role="main">



			<?php //while ( have_posts() ) : the_post(); ?>

				<?php //if ( has_post_thumbnail() ) : ?>

					<div class="entry-page-image">

						<?php //the_post_thumbnail(); ?>

					</div><!-- .entry-page-image --

				<?php //endif; ?>



				<?php //get_template_part( 'content', 'page' ); ?>



			<?php //endwhile; // end of the loop. ?>



		</div><!-- #content --

	</div><!-- #primary -->



<div class="container">

<div class="heading_content underline">

	<h1>
    <?php the_field('heading_content_main');?>
    <!--We specialise in the expert refurbishment, maintenance and installation of mass spectrometers--></h1>

</div>

<div class="services_menu">

<ul>

<li><a href="/service">Service</a></li>

<li><a href="/instruments">Instruments</a></li>

<li><a href="/parts">Parts</a></li>

<li><a href="/about-us">About Us</a></li>

</ul>

<div class="contus"><a href="#">Contact Us</a></div>

</div>



<div class="heading2"><h2><?php the_field('services_heading2');?><!--Our Services--></h2></div>

<div class="service_block">

<div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">

<div class="sv">

	<img src="<?php the_field('services_block1_image_block1');?>" alt="product1" title="product1" />

	<h5><?php the_field('block1_heading');?>
    <!--Service and repair --></h5>

	<p><?php the_field('block1_content');?>
    <!--Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse faucibus est ut tortor pellentesque, eu sagittis turpis consequat. --></p>

</div>



</div>

<div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">

<div class="sv">

	<img src="<?php the_field('services_block2_image_block2');?>" alt="product2" title="product2" />

	<h5><?php the_field('block2_heading');?><!--Technical support --></h5>

	<p><?php the_field('block1_content');?>
    <!--Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse faucibus est ut tortor pellentesque, eu sagittis turpis consequat.--></p>

</div>



</div>

<div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">

<div class="sv">

	<img src="<?php the_field('services_block3_image_block3');?>" alt="product3" title="product3" />

	<h5><?php the_field('block3_heading');?><!--Installation --></h5>

	<p><?php the_field('block3_content');?><!--Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse faucibus est ut tortor pellentesque, eu sagittis turpis consequat. --></p>

</div>
</div>

<div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">

<div class="sv">

	<img src="<?php the_field('services_block4_image_block4');?>" alt="product4" title="product4" />

	<h5><?php the_field('block4_heading');?><!--Instrument moving services --></h5>

	<p><?php the_field('block4_content');?>
    <!--Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse faucibus est ut tortor pellentesque, eu sagittis turpis consequat. --></p>

</div>



</div>

</div><!-- end service block -->



</div><!-- end container -->

















<?php get_sidebar( 'front' ); ?>

<?php get_footer(); ?>
