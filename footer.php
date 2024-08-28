        </main>
        <footer class="footer uppercase">
            <a class="footer__link hover-bold" href="./mentions-legales">Mentions Légales</a>
            <a class="footer__link hover-bold" href="https://wordpress.com/fr/support/votre-site-et-le-rgpd/">Vie Privée</a>
            <p class="footer__text margin-0">Tous Droits Réservés</p>
            <?php wp_footer(); ?>
        </footer>
        <?php
            get_template_part( 'templates_part/contact', 'form' );
            if ( is_front_page() || is_single() ) {
                get_template_part( 'templates_part/lightbox' );
            }
        ?>
    </body>
</html>