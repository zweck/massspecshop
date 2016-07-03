<?php

/**

 * Template Name: Parts Template

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
  <div class="container">
<div class="product_block">

<?php

$taxonomy = 'product-category';
$terms = get_terms($taxonomy); // Get all terms of a taxonomy

if ( $terms && !is_wp_error( $terms ) ) :
?>
  <ul>
      <?php foreach ( $terms as $term ) { ?>

		  <div class="product_list_item">
		  <div class="col-lg-2 col-md-2 col-sm-6 col-xs-6">

		   <div class="product-item-wrap">
			   <a href="<?php echo get_term_link($term->slug, $taxonomy); ?>">
				   <?php
					   if (function_exists('get_wp_term_image')) :
					       $meta_image = get_wp_term_image($term->term_id);
					   ?>

					   <img class="attachment-full size-full wp-post-image" src="<?php echo $meta_image; ?>" />
				   <?php endif;?>
			   </a>
			   <br><p><?php echo $term->name; ?></p>
		  </div>
		  </div></div>

      <?php } ?>
  </ul>
<?php endif;?>

<div class="clearfix"></div>

</div>

<div class="testimonial_block">
<div class="comments">
<?php echo do_shortcode("[testimonials category='parts_testimonials']"); ?>
<!--<p>&quot;Steve was extremely helpful in diagnosing our instrument problems remotely, always replying promptly and demonstrating his obvious in depth knowledge of the Waters LCT and GCT instruments in his answers. He helped us bring 2 aged instruments back to life! &quot; &ndash;</p>
<span>Dr Catherine Botting &ndash; Research Fellow, Honorary lecturer and head of the BRSC Mass Spectrometry and Proteomics facility at University of St Andrews.</span>-->
</div>

</div>
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









<!-- end about us block -->


</div><!-- end container -->

















<?php get_sidebar( 'front' ); ?>

<?php get_footer(); ?>
