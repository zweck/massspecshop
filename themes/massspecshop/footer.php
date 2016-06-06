<?php
/**
 * The template for displaying the footer
 *
 * Contains footer content and the closing of the #main and #page div elements.
 *
 * @package WordPress
 * @subpackage Twenty_Twelve
 * @since Twenty Twelve 1.0
 */
?>
	</div><!-- #main .wrapper -->
	<footer>
	<div class="footer_area">
		<div class="container">
<div class="row ft_1">
<div class="col-lg-4 col-md-4 col-sm-6 col-xs-4">
		<?php dynamic_sidebar( 'footer1_menu' ); ?>
        <!--<ul>
		<li><a href="#">Contact Us</a></li>
		<li><a href="#">Services</a></li>
		<li><a href="#">Instruments</a></li>
		</ul>-->
</div>
<div class="col-lg-4 col-md-4 col-sm-6 col-xs-4">
		<?php dynamic_sidebar( 'footer2_menu' ); ?>
        <!--<ul>
		<li><a href="parts">Parts</a></li>
		<li><a href="about-us">About Us</a></li>
		</ul>-->
</div>
<div class="col-lg-4 col-md-4 col-sm-6 col-xs-4"></div>
</div>

<div class="row ft_2">
<div class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
	<ul>
		<li><a href="#">Privacy Policy</a></li>
		<li><a href="#">Legal information</a></li>
		<li>All Rights Reserved</li>
	</ul>
</div>
<div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
<!--<div class="ft_company">
<a target="_blank" href="http://www.websitedesignfirm.co.uk/services/wordpress-website-design/">WordPress Website Design</a>  by <a href="http://www.websitedesignfirm.co.uk/" target="_blank">Website Design Company</a></div>-->
</div>
</div>

		</div>
	</div>

</footer>
	<!-- #colophon -->
</div><!-- #page -->

<?php wp_footer(); ?>
</body>
</html>