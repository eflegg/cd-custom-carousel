<?php

/**
 * PHP file to use when rendering the block type on the server to show on the front end.
 *
 * The following variables are exposed to the file:
 *     $attributes (array): The block attributes.
 *     $content (string): The block default content.
 *     $block (WP_Block): The block instance.
 *
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
?>



<!-- this container stays screen width -->
<div class="container-custom">


	<div class="carousel-container" id="carousel-container">
		<div class="navigation-btns">
			<div class="nav-btn prev" id="prev"></div>
			<div class="nav-btn next" id="next"></div>
		</div>
		<!-- this container overflowers the carousel container -->
		<!-- <div class="carousel-track_outer"> -->


		<div class="carousel-track" id="track">

			<?php
			$current_id = get_the_ID(); // Gets the ID of the current page/post
			// 1. Define query arguments for the custom post type
			$args = array(
				'post_type'      => 'projects', // Replace with your CPT slug
				'posts_per_page' => 5,                      // Number of posts to show
				'post_status'    => 'publish',
				'post__not_in'   => array($current_id), // Excludes the current post ID
			);

			// 2. Execute the custom query
			$cpt_query = new WP_Query($args);

			// 3. Start the loop
			if ($cpt_query->have_posts()) : ?>
				<?php while ($cpt_query->have_posts()) : $cpt_query->the_post(); ?>

					<?php if (has_post_thumbnail()) : ?>
						<!-- Card Container -->
						<div class="card">
							<a href="<?php the_permalink(); ?>" class="cpt-link">

								<!-- Featured Image Wrapper -->
								<div class="project-image-wrapper">
									<?php the_post_thumbnail('large', array('class' => 'project-image_custom')); ?>

									<!-- Overlay Title (Positioned on top) -->
									<div class="project-overlay">
										<h3 class="project-title"><?php the_title(); ?>
											<div class="underline"></div>
										</h3>
									</div>
								</div>

							</a>
						</div>
					<?php endif; ?>

				<?php endwhile; ?>







				<?php
				// 4. Reset global post data back to the main query
				wp_reset_postdata();
				?>
			<?php else : ?>
				<p><?php _e('No posts found.'); ?></p>
			<?php endif; ?>




		</div>
		<!-- </div> -->
	</div>
	<!-- Dynamic Pagination Dots Container -->
	<div class="pagination-dots"></div>
</div>