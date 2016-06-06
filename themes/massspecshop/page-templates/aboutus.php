<?php
/**
 * Template Name: Aboutus Template
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
<div class="mob_heading"><h2><?php the_field('aboutus_heading_for_mobile');?></h2></div>
<div class="heading_content underline">
	<h1><?php the_field('desktop_heading');?>
    </h1>
</div>
<div class="mob_heading_content">
	<h1><?php the_field('mobile_heading');?>
    </h1>
</div>

<div class="client_block">
<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
<div class="mob_left">
<h5><?php the_field('client1_name');?><!--First Middle Lastname --></h5>
<div class="cl_text_img">
<p><img src="<?php the_field('client1_image');?>" alt="Client" title="Client"/>
<?php the_field('client1_description1');?>
</p>
</div>
</div>
</div>

<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
<div class="mob_right">
<h5><?php the_field('client2_name');?></h5>
<div class="cl_text_img">
<p><img src="<?php the_field('client2_image');?>" alt="Client" title="Client" />
<?php the_field('client2_description2');?>
</p>
</div>
</div>
</div>

</div>

<div class="contus"><a href="#">Contact Us</a></div>

<div class="client_info">
<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
<?php the_field('client_address1');?>
</div>

<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
<?php the_field('client_address2');?>

</div>

</div>

<!-- end client all block -->
<div class="testimonial_block">
<div class="heading2"><h3><?php the_field('testimonials_heading');?></h3></div>

<div class="comments">
<?php echo do_shortcode("[testimonials category='all_testimonials']"); ?>
<!--<p>&quot;Steve was extremely helpful in diagnosing our instrument problems remotely, always replying promptly and demonstrating his obvious in depth knowledge of the Waters LCT and GCT instruments in his answers. He helped us bring 2 aged instruments back to life! &quot; &ndash;</p>
<span>Dr Catherine Botting &ndash; Research Fellow, Honorary lecturer and head of the BRSC Mass Spectrometry and Proteomics facility at University of St Andrews.</span>-->
</div>


</div>

<!-- end about us block -->

</div><!-- end container -->








<?php get_sidebar( 'front' ); ?>
<?php get_footer(); ?>