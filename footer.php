<?php
    
    get_template_part( 'templates_part/contact' );
    if ( is_front_page() ) {
        get_template_part( 'templates_part/lightbox' );
    }

?>

        </main>
        <footer class="footer">
            <ul class="footer__nav noPadding uppercase">
                <li class="footer__nav--link"><a href="./mentions-legales">Mentions Légales</a></li>
                <li class="footer__nav--link"><a href="https://wordpress.com/fr/support/votre-site-et-le-rgpd/">Vie Privée</a></li>
                <li class="footer__nav--link">Tous Droits Réservés</li>
            </ul>
            <?php wp_footer(); ?>
        </footer>
    </body>
</html>