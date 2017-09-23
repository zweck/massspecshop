<?php
/**
 * The Template for displaying all single posts
 *
 * @package WordPress
 * @subpackage Twenty_Twelve
 * @since Twenty Twelve 1.0
 */

get_header(); ?>

<style>
.firstclass {
background-color:red;
height:50px;
width:100px;
border:0px;
}

.secondclass {
background-color:#719A87 !important;
color:white !important;

}

</style>
<!--<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js"></script>
<script type="text/javascript" charset="utf-8">


    $(document).ready(function(){
        $('#form-submit').click(function() {
       $(this).removeClass("firstclass");
                 $(this).val("Success !");
                $(this).addClass("secondclass");

	})
    });
</script>-->
<div class="container">
	<div id="primary" class="site-content1">
		<div id="content" role="main">

			<?php while ( have_posts() ) : the_post(); ?>

				<?php get_template_part( 'content', 'instrument' ); ?>

				<!--<nav class="nav-single">
					<h3 class="assistive-text"><?php _e( 'Post navigation', 'twentytwelve' ); ?></h3>
					<span class="nav-previous"><?php previous_post_link( '%link', '<span class="meta-nav">' . _x( '&larr;', 'Previous post link', 'twentytwelve' ) . '</span> %title' ); ?></span>
					<span class="nav-next"><?php next_post_link( '%link', '%title <span class="meta-nav">' . _x( '&rarr;', 'Next post link', 'twentytwelve' ) . '</span>' ); ?></span>
				</nav>--><!-- .nav-single -->

				<?php //comments_template( '', true ); ?>

			<?php endwhile; // end of the loop. ?>

		</div><!-- #content -->
	</div><!-- #primary -->
</div><!-- end container -->

<?php //get_sidebar(); ?>
<?php get_footer(); ?>
