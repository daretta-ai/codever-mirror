from django.db import models
from modelcluster.fields import ParentalKey

from wagtail.admin.panels import FieldPanel, InlinePanel, MultiFieldPanel
from wagtail.fields import RichTextField
from wagtail.models import Orderable, Page

RICH_TEXT_FEATURES = ["bold", "italic", "link"]


class HomePage(Page):
    """La landing page di codever.it: ogni sezione è editabile dall'admin."""

    # ---------- Hero ----------
    hero_badge_text = models.CharField(
        "Badge", max_length=40, default="Welcome"
    )
    hero_title_strong = models.CharField(
        "Titolo (riga in evidenza)", max_length=120, default="Is not only magic."
    )
    hero_title_soft = models.CharField(
        "Titolo (riga attenuata)", max_length=120, default="It’s engineering."
    )
    hero_subtitle = models.TextField(
        "Sottotitolo",
        default="We design AI-enabled systems that stay controllable,\nstable and scalable over time.",
        help_text="Le interruzioni di riga vengono mantenute.",
    )
    hero_cta_text = models.CharField(
        "Testo bottone", max_length=60, default="Explore our systems"
    )

    # ---------- Statement ----------
    statement = RichTextField(
        "Statement",
        features=RICH_TEXT_FEATURES,
        default=(
            "<p>Codever designs and governs <i>complex digital systems</i>, "
            "where AI meets engineering discipline and long‑term reliability.</p>"
        ),
        help_text="Il testo in corsivo viene evidenziato in viola.",
    )

    # ---------- Paragrafo con bagliore ----------
    glow_text = RichTextField(
        "Testo",
        features=RICH_TEXT_FEATURES,
        default=(
            "<p>We help companies evolve critical platforms, data flows and digital "
            "products by integrating AI in a controlled, deliberate way.<br/>"
            "No shortcuts, no black boxes. Every architectural choice is made to "
            "ensure stability, scalability and full technical governance over time.</p>"
        ),
    )

    # ---------- Servizi ----------
    services_title_strong = models.CharField(
        "Titolo (riga in evidenza)", max_length=120, default="Engineering excellence"
    )
    services_title_soft = models.CharField(
        "Titolo (riga attenuata)", max_length=120, default="behind the products"
    )
    services_intro = models.TextField(
        "Introduzione",
        default=(
            "I nostri prodotti nascono da competenze ingegneristiche\n"
            "profonde e da un approccio strutturato alla complessità."
        ),
    )

    # ---------- AI products ----------
    products_title_strong = models.CharField(
        "Titolo (riga in evidenza)", max_length=120, default="AI products,"
    )
    products_title_soft = models.CharField(
        "Titolo (riga attenuata)", max_length=120, default="built for real systems"
    )
    products_intro = models.TextField(
        "Introduzione",
        default=(
            "Prodotti e piattaforme progettati per integrarsi in ecosistemi\n"
            "complessi, rimanendo governabili nel tempo."
        ),
    )

    # ---------- Styling Suite ----------
    styling_title_strong = models.TextField(
        "Titolo (righe in evidenza)",
        default="Styling Suite On\n& Generative AI",
        help_text="Una riga del titolo per ogni riga di testo.",
    )
    styling_title_soft = models.CharField(
        "Titolo (riga attenuata)", max_length=120, default="for Fashion"
    )
    styling_sub = models.TextField(
        "Sottotitolo",
        default=(
            "Esperienze AI avanzate pensate per ambienti retail reali, dove "
            "performance, qualità visiva e integrazione contano più "
            "dell’effetto wow."
        ),
    )
    styling_focus_heading = models.CharField(
        "Titolo elenco focus", max_length=40, default="Focus"
    )
    styling_focus_items = models.TextField(
        "Voci focus",
        default=(
            "Virtual Try‑On\n"
            "Generazione controllata di asset\n"
            "Integrazione con sistemi retail esistenti"
        ),
        help_text="Una voce per riga.",
    )
    styling_portrait = models.ForeignKey(
        "wagtailimages.Image",
        verbose_name="Ritratto",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="+",
    )
    styling_portrait_alt = models.CharField(
        "Testo alternativo ritratto",
        max_length=200,
        default="Fashion portrait generated with the Styling Suite",
    )

    # ---------- Chiusura / contatti ----------
    closing_heading = RichTextField(
        "Titolo",
        features=RICH_TEXT_FEATURES,
        default=(
            "<p>Engineering<br/>complex systems<br/>with <i>controlled<br/>"
            "innovation</i>.</p>"
        ),
        help_text="Il testo in corsivo viene evidenziato in viola.",
    )
    lets_talk_heading = models.CharField(
        "Titolo blocco contatto", max_length=60, default="Let’s talk"
    )
    contact_text = models.CharField(
        "Testo di contatto", max_length=120, default="Talk to our technical team"
    )
    contact_email = models.EmailField("Email", default="hello@codever.it")
    linkedin_url = models.URLField(
        "URL LinkedIn", default="https://www.linkedin.com/company/codever"
    )

    content_panels = Page.content_panels + [
        MultiFieldPanel(
            [
                FieldPanel("hero_badge_text"),
                FieldPanel("hero_title_strong"),
                FieldPanel("hero_title_soft"),
                FieldPanel("hero_subtitle"),
                FieldPanel("hero_cta_text"),
            ],
            heading="Hero",
        ),
        FieldPanel("statement", heading="Statement"),
        FieldPanel("glow_text", heading="Paragrafo con bagliore"),
        MultiFieldPanel(
            [
                FieldPanel("services_title_strong"),
                FieldPanel("services_title_soft"),
                FieldPanel("services_intro"),
                InlinePanel("service_cards", label="Card servizio"),
            ],
            heading="Servizi",
        ),
        MultiFieldPanel(
            [
                FieldPanel("products_title_strong"),
                FieldPanel("products_title_soft"),
                FieldPanel("products_intro"),
                InlinePanel(
                    "product_shots",
                    label="Foto prodotto",
                    max_num=5,
                    help_text="Massimo 5 foto: le posizioni sul layout seguono l'ordine.",
                ),
            ],
            heading="AI products",
        ),
        MultiFieldPanel(
            [
                FieldPanel("styling_title_strong"),
                FieldPanel("styling_title_soft"),
                FieldPanel("styling_sub"),
                FieldPanel("styling_focus_heading"),
                FieldPanel("styling_focus_items"),
                FieldPanel("styling_portrait"),
                FieldPanel("styling_portrait_alt"),
            ],
            heading="Styling Suite",
        ),
        MultiFieldPanel(
            [
                FieldPanel("closing_heading"),
                InlinePanel("closing_info_blocks", label="Blocco informativo"),
                FieldPanel("lets_talk_heading"),
                FieldPanel("contact_text"),
                FieldPanel("contact_email"),
                FieldPanel("linkedin_url"),
            ],
            heading="Chiusura e contatti",
        ),
    ]


class ServiceCard(Orderable):
    page = ParentalKey(
        HomePage, on_delete=models.CASCADE, related_name="service_cards"
    )
    title = models.TextField(
        "Titolo", help_text="Le interruzioni di riga vengono mantenute."
    )
    icon = models.ForeignKey(
        "wagtailimages.Image",
        verbose_name="Icona",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="+",
    )
    footer_text = models.CharField("Testo a piè di card", max_length=200)

    panels = [
        FieldPanel("title"),
        FieldPanel("icon"),
        FieldPanel("footer_text"),
    ]


class ProductShot(Orderable):
    page = ParentalKey(
        HomePage, on_delete=models.CASCADE, related_name="product_shots"
    )
    image = models.ForeignKey(
        "wagtailimages.Image",
        verbose_name="Immagine",
        on_delete=models.CASCADE,
        related_name="+",
    )
    alt_text = models.CharField("Testo alternativo", max_length=200, blank=True)

    panels = [
        FieldPanel("image"),
        FieldPanel("alt_text"),
    ]


class ClosingInfoBlock(Orderable):
    page = ParentalKey(
        HomePage, on_delete=models.CASCADE, related_name="closing_info_blocks"
    )
    heading = models.CharField("Titolo", max_length=60)
    body = models.TextField(
        "Testo", help_text="Le interruzioni di riga vengono mantenute."
    )

    panels = [
        FieldPanel("heading"),
        FieldPanel("body"),
    ]
