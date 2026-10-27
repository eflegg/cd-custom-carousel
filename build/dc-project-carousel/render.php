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



<!-- a first attempt -->

<div class="carousel-wrapper">



	<div
		class="carousel"
		role="group"
		aria-label="List of projects"
		aria-roledescription="carousel">
		<div aria-label="Choose slide to display" role="group" class="carousel__navdots ">
			<!-- <button type="button" aria-label="1 of 4" aria-disabled="true"></button>
			<button type="button" aria-label="2 of 4" aria-disabled="false"></button>
			<button type="button" aria-label="3 of 4" aria-disabled="false"></button>
			<button type="button" aria-label="4 of 4" aria-disabled="false"></button> -->
		</div>

		<div
			class="carousel__slides"
			aria-atomic="false"
			aria-live="off">


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
						<div class="carousel__slide card"
							role="group"

							aria-roledescription="slide">
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
	</div>
</div>