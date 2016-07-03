<?php



/**



 * The default template for displaying content



 *



 * Used for both single and index/archive/search.



 *



 * @package WordPress



 * @subpackage Twenty_Twelve



 * @since Twenty Twelve 1.0



 */



?>
<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
  <?php if ( is_sticky() && is_home() && ! is_paged() ) : ?>

  <div class="featured-post">
    <?php _e( 'Featured post', 'twentytwelve' ); ?>
  </div>
  <?php endif; ?>
  <header class="entry-header">
    <?php // if ( ! post_password_required() && ! is_attachment() ) :



				//the_post_thumbnail();



			// endif; ?>
    <div>
      <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
        <!-- gallery slider -->
        <?php if ( is_single() ) : ?>
        <span class="prod_title">
        <?php the_title(); ?>
        </span>
        <?php else : ?>
        <h1 style="float:left;width:48%;display:inline-block;font-weight:bold;font-size:21px;" > <a href="<?php the_permalink(); ?>" rel="bookmark">
          <?php the_title(); ?>
          </a> </h1>
        <?php endif; // is_single() ?>
        <span style="" class="prod_amt" ><?php  the_field('parts_price');?><!--&pound;000000 --></span>
        <div class="clearfix"></div>
        <div class="slider">
          <div class="flexslider">
            <ul class="slides">
				<?php
				$image = get_field('product_photo_1');
				if( !empty($image) ): ?>
					<li data-thumb="<?php echo $image['url'];?>"> <img src="<?php echo $image['url'];?>" /> </li>
				<?php endif; ?>

				<?php
				$image = get_field('product_photo_2');
				if( !empty($image) ): ?>
					<li data-thumb="<?php echo $image['url'];?>"> <img src="<?php echo $image['url'];?>" /> </li>
				<?php endif; ?>

				<?php
				$image = get_field('product_photo_3');
				if( !empty($image) ): ?>
					<li data-thumb="<?php echo $image['url'];?>"> <img src="<?php echo $image['url'];?>" /> </li>
				<?php endif; ?>

				<?php
				$image = get_field('product_photo_4');
				if( !empty($image) ): ?>
					<li data-thumb="<?php echo $image['url'];?>"> <img src="<?php echo $image['url'];?>" /> </li>
				<?php endif; ?>

				<?php
				$image = get_field('product_photo_5');
				if( !empty($image) ): ?>
					<li data-thumb="<?php echo $image['url'];?>"> <img src="<?php echo $image['url'];?>" /> </li>
				<?php endif; ?>            </ul>
          </div>
        </div>
        <!-- gallery slider end -->
        <div class="links_area mob"> <a class="btn btn-block btn-green">Enquire</a> </div>
      </div>
      <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12">
        <div class="pd_details">
          <h5><?php  the_field('product_name');?><!--Details--></h5>
          <p><?php  the_field('product_details');?><!--Faucibus est ut tortor pellentesque, eu sagittis turpis consequat habitant morbi tristique senectus et netus et malesuada Pellentesque fames ac turpis egestas.Suspendisse. Pellentesque habitant morbi tristique faucibus est ut tortor pellentesque, eu sagittis turpis consequat habitant morbi tristique senectus et netus et malesuada Pellentesque fames ac turpis egestas. Suspendisse. Pellentesque habitant morbi tristique faucibus est ut tortor pellentesque, eu sagittis turpis consequat habitant morbi tristique senectus et netus et malesuada Pellentesque fames ac turpis egestas. Suspendisse. Pellentesque habitant morbi tristique faucibus est ut tortor pellentesque, eu sagittis turpis consequat habitant morbi tristique senectus et netus et malesuada Pellentesque fames ac turpis egestas. Suspendisse. Pellentesque habitant morbi tristique faucibus est ut tortor pellentesque, eu sagittis turpis consequat habitant morbi tristique senectus et netus et malesuada Pellentesque fames ac turpis egestas. Suspendisse. Pellentesque habitant morbi tristique.--></p>
        </div>
        <div class="links_area">
          <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12"> <a class="btn btn-block btn-green desktop">Enquire</a> </div>
          <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12"> <a class="btn btn-block btn-grey ">Download data PDF</a> </div>
        </div>
      </div>
    </div>
    <div class=" clearfix"></div>
    <div class="enq_form"> <?php echo do_shortcode('[contact-form-7 id="51" title="Enquiry"]'); ?> </div>
    <?php if ( comments_open() ) : ?>
    <div class="comments-link">
      <?php comments_popup_link( '<span class="leave-reply">' . __( 'Leave a reply', 'twentytwelve' ) . '</span>', __( '1 Reply', 'twentytwelve' ), __( '% Replies', 'twentytwelve' ) ); ?>
    </div>
    <!-- .comments-link -->
    <?php endif; // comments_open() ?>
  </header>
  <!-- .entry-header -->
  <?php if ( is_search() ) : // Only display Excerpts for Search ?>
  <div class="entry-summary">
    <?php the_excerpt(); ?>
  </div>
  <!-- .entry-summary -->
  <?php else : ?>
  <div class="entry-content">
    <?php the_content( __( 'Continue reading <span class="meta-nav">&rarr;</span>', 'twentytwelve' ) ); ?>
    <?php //wp_link_pages( array( 'before' => '<div class="page-links">' . __( 'Pages:', 'twentytwelve' ), 'after' => '</div>' ) ); ?>
  </div>
  <!-- .entry-content -->
  <?php endif; ?>
  <footer class="entry-meta">
    <?php twentytwelve_entry_meta(); ?>
    <?php edit_post_link( __( 'Edit', 'twentytwelve' ), '<span class="edit-link">', '</span>' ); ?>
    <?php if ( is_singular() && get_the_author_meta( 'description' ) && is_multi_author() ) : // If a user has filled out their description and this is a multi-author blog, show a bio on their entries. ?>
    <div class="author-info">
      <div class="author-avatar">
        <?php



						/** This filter is documented in author.php */



						$author_bio_avatar_size = apply_filters( 'twentytwelve_author_bio_avatar_size', 68 );



						echo get_avatar( get_the_author_meta( 'user_email' ), $author_bio_avatar_size );



						?>
      </div>
      <!-- .author-avatar -->
      <div class="author-description">
        <h2><?php printf( __( 'About %s', 'twentytwelve' ), get_the_author() ); ?></h2>
        <p>
          <?php the_author_meta( 'description' ); ?>
        </p>
        <div class="author-link"> <a href="<?php echo esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ); ?>" rel="author"> <?php printf( __( 'View all posts by %s <span class="meta-nav">&rarr;</span>', 'twentytwelve' ), get_the_author() ); ?> </a> </div>
        <!-- .author-link	-->
      </div>
      <!-- .author-description -->
    </div>
    <!-- .author-info -->
    <?php endif; ?>
  </footer>
  <!-- .entry-meta -->
</article>
<!-- #post -->
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
<script src="<?php echo get_template_directory_uri(); ?>/js/jquery.flexslider.js"></script>
<script src="<?php echo get_template_directory_uri(); ?>/js/jquery.easing.js"></script>
<script src="<?php echo get_template_directory_uri(); ?>/js/jquery.mousewheel.js"></script>
<!--<script src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>-->
<script>

 $(document).on('spam.wpcf7', function () {

    console.log('submit.wpcf7 was triggered!');

});



$(document).on('invalid.wpcf7', function () {

    console.log('invalid.wpcf7 was triggered!');

});



$(document).on('mailsent.wpcf7', function () {

     $('#form-submit').removeClass("firstclass");

                 $('#form-submit').val("Success !");

                $('#form-submit').addClass("secondclass");

});





$(document).on('mailfailed.wpcf7', function () {

    console.log('mailfailed.wpcf7 was triggered!');

});





 $(document).ready(function(){







$(window).load(function() {



  $('.flexslider').flexslider({



    animation: "slide",



    controlNav: "thumbnails"



  });



});



});



</script>
