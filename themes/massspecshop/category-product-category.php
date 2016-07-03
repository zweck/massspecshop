<?php
/**
 * The template for displaying Archive pages
 *
 * Used to display archive-type pages if nothing more specific matches a query.
 * For example, puts together date-based pages if no date.php file exists.
 *
 * If you'd like to further customize these archive views, you may create a
 * new template file for each specific one. For example, Twenty Twelve already
 * has tag.php for Tag archives, category.php for Category archives, and
 * author.php for Author archives.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package WordPress
 * @subpackage Twenty_Twelve
 * @since Twenty Twelve 1.0
 */

get_header(); ?>

		<?php if ( have_posts() ) : ?>


				<div class="container">
					<div class="mob_heading"><h2><?php //the_field('parts_heading_for_mobile');?>Parts</h2></div>
					<div class="product_block">
						<?php while ( have_posts() ) : the_post(); ?>
							<div class="product_list_item">
								<div class="col-lg-2 col-md-2 col-sm-6 col-xs-6">

									<div class="product-item-wrap"><a href="<?php the_permalink(); ?>"><?php the_post_thumbnail('full');?></a>

										<br><p><?php the_title(); ?></p>
										<span><?php the_field('parts_price');?></span>
									</div>
								</div>
							</div>
						<?php endwhile; ?>
					</div>
					</div>
				</div>


		<?php
			wp_reset_postdata();
			wp_reset_query();
		?>

		<?php else : ?>
			<?php get_template_part( 'content', 'none' ); ?>
		<?php endif; ?>


<?php get_sidebar( 'front' ); ?>
<?php get_footer(); ?>
