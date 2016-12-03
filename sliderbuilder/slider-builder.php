<?php
	/*
	Plugin Name: Slider Builder
	*/

	if(isset($_POST['salvar_banner'])){
		cadastra_banner($_POST['topico_imagens'],$_POST['topico_imagens_mobile'], $_POST['topico_nome']);
	}
   
	define('SITE_URL', get_site_url());

	if(is_admin() && isset($_GET['page']) && $_GET['page']=="topico"){
		wp_enqueue_script('topico_banner_plugin', SITE_URL.'/wp-content/plugins/sliderbuilder/script.js', ['jquery']);
		wp_enqueue_style('topico__banner_style', SITE_URL.'/wp-content/plugins/sliderbuilder/style.css');
		
		wp_enqueue_style('bootstrap', SITE_URL.'/wp-content/plugins/sliderbuilder/css/bootstrap.min.css');
		wp_enqueue_script('bootstrapjs', SITE_URL.'/wp-content/plugins/sliderbuilder/js/bootstrap.min.js', ['jquery']);
	}

	wp_enqueue_style('bxslider', SITE_URL.'/wp-content/plugins/sliderbuilder/css/jquery.bxslider.css');
	wp_enqueue_script('bxslider', SITE_URL.'/wp-content/plugins/sliderbuilder/js/jquery.bxslider.min.js', ['jquery']);


	defined( 'ABSPATH' ) or die( 'No script kiddies please!' );
	add_action( 'admin_menu', 'topico_init' );


	//INVOCA O WP IMAGE UPLOADER
	function enqueue_media_uploader(){
	    wp_enqueue_media();
	}

	add_action("admin_enqueue_scripts", "enqueue_media_uploader");


	function topico_start(){

		?>

			<div class="wrapper" style="max-width: 900px;">

				<div class="navbar">
					<ul>
						<!-- <li><a href="?page=topico&action=add">Criar Banner</a></li> -->
						<li><a href="?page=topico&action=edit">Criar Banner</a></li>
						<!-- <li><a href="?page=topico_reviews&mode=clientes&action=show">Clientes Cadastrados</a></li> -->
					</ul>
				</div>

				<?php if(isset($_GET['action']) && $_GET['action']=="add"): ?>
					
					<h2>Banner versão Desktop</h2>

					<button onclick="open_media_uploader_image()">Upload</button>

					<hr>

					<h2>Banner versão Mobile (mesma ordem do desktop)</h2>

					<button onclick="open_media_uploader_image_mobile()">Upload</button>


					<hr>

					<form method="post" action="">
						<input type="text" placeholder="Nome do Slider" name="topico_nome"> <br>
						<input type="hidden" name="topico_imagens" id="topico_imagens">
						<input type="hidden" name="topico_imagens_mobile" id="topico_imagens_mobile">
						<input type="submit" name="salvar_banner" value="Salvar">
					</form>
					
					<h2>Preview Desktop</h2>
					<div class="topico-banners-preview"></div>

					<h2>Preview Mobile</h2>
					<div class="topico-banners-preview-mobile"></div>

				<?php endif; ?>



				<?php if(isset($_GET['action']) && $_GET['action']=="edit"): ?>

					
					<form method="post" action="">
						<input type="text" placeholder="Nome do Slider" class="form-control" name="topico_nome"> <br>
						<span><b>Shortcode: </b> [topico_banner nome="<span class="short"></span>"]</span> <br><br>
						<input type="hidden" name="topico_imagens" id="topico_imagens">
						<input type="hidden" name="topico_imagens_mobile" id="topico_imagens_mobile">
						<input type="submit" class="btn btn-primary" name="salvar_banner" value="Salvar">
					</form>
					
					<hr>

					<button class="btn btn-default" onclick="open_media_uploader_image()">Add Imagem</button>
					<div class="topico-banners-preview"></div>

					<button id="previewSlider">
						Prever
					</button>

					<h4>Preview</h4>


					<div class="banner-live-preview">
						<ul class="bxslider">
							
						</ul>
					</div>
					

					<hr>

<!-- 					<h4>Banner versão Mobile (mesma ordem do desktop)</h4>

<button onclick="open_media_uploader_image_mobile()">Upload</button>
<div class="topico-banners-previews-mobile"></div> -->

					
<!-- 					<h4>Preview Mobile</h4>

<div class="banner-live-mobile-preview">
	<div id="banner-carousel-mobile" class="carousel slide" data-ride="carousel">
			
	  <div class="carousel-inner" role="listbox">
	    
	  </div>

		
	  <a class="left carousel-control" href="#banner-carousel-mobile" role="button" data-slide="prev">
	    <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
	    <span class="sr-only">Previous</span>
	  </a>
	  <a class="right carousel-control" href="#banner-carousel-mobile" role="button" data-slide="next">
	    <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
	    <span class="sr-only">Next</span>
	  </a>
	</div>
</div>
 -->

				<?php endif; ?>

			</div>
			
		<?php
	}

	function topico_init() {
		global $_wp_last_object_menu;

		db_init();
		
		add_menu_page( 
			 'Slider Builder'
			,'Slider Builder'
			,'manage_options'
			,'topico'
			,'topico_start'
			,'dashicons-format-gallery'
			,$_wp_last_object_menu++
		);
	}

	function topico_banner($atts){

			$atts = shortcode_atts(
				array(
					'nome' => 'default',
				),
				$atts
			);

			global $wpdb;
			$results = $wpdb->get_results( 'SELECT * FROM wp_topico WHERE name = "'.$atts['nome'].'"');
/*
			var_dump($results);*/

			$slides = explode(',',$results[0]->images);
/*
			var_dump($slides); die();*/

		?>

		<ul class="bxslider">


		<?php
			foreach ($slides as $s) {

						echo '<li>
							      <img src="'.SITE_URL."/".$s.'" alt="">
							   </li>';	
				}
		?>   

		</ul>

		<script>
		jQuery(document).ready(function(){
			jQuery('.bxslider').bxSlider();
		});
		</script>

		<?php	
}

add_shortcode( 'topico_banner', 'topico_banner' );

	function db_init(){
		global $wpdb;

		$charset_collate = $wpdb->get_charset_collate();

		$table_name = $wpdb->prefix."topico";

		$sql = "CREATE TABLE $table_name (
		  id mediumint(9) NOT NULL AUTO_INCREMENT,
		  name tinytext NOT NULL,
		  images text NOT NULL,
		  imagesmobile text,
		  PRIMARY KEY  (id)
		) $charset_collate;";

		require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
		dbDelta( $sql );
	}

	function cadastra_banner($images, $imagesmobile, $name){

		global $wpdb;

		$table_name = $wpdb->prefix . 'topico';

		$wpdb->insert(
			$table_name, 
			array( 
				'name' => $name, 
				'images' => $images,
				'imagesmobile' => $imagesmobile
			) 
		);

	}

	function takebanners(){
		global $wpdb;
		$results = $wpdb->get_results( 'SELECT * FROM wp_topico', OBJECT );

		?>
		<label for="banners">
			Banners
			<select name="banners" id="">
		<?php
			foreach ($results as $r) {
		?>
			<option value="<?php echo $r->id; ?>"><?php echo $r->name; ?></option>

		<?php
			}
		?>
			</select>
		</label>
		<?php
	}


function custom_shortcode( $atts ){


}