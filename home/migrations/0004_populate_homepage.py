"""Popola la homepage con i contenuti della landing statica originale.

I campi scalari hanno già i valori di default definiti sul modello: qui si
importano le immagini in libreria e si creano gli elementi inline (card
servizio, foto prodotto, blocchi contatto).
"""

import os

from django.conf import settings
from django.core.files import File
from django.db import migrations

ASSETS_DIR = os.path.join(settings.BASE_DIR, "static", "assets")

SERVICE_CARDS = [
    {
        "title": "Analisi tecnica\ne architetturale",
        "icon": ("icon-analysis.png", "Icona — Analisi tecnica"),
        "footer_text": "Backend · data architecture · cloud · sistemi legacy · evoluzione controllata",
    },
    {
        "title": "Sviluppo software\navanzato",
        "icon": ("icon-development.png", "Icona — Sviluppo software"),
        "footer_text": "Frontend (Vue, React) · sistemi modulari · qualità del codice · scalabilità",
    },
    {
        "title": "Integrazione AI\nin sistemi esistenti",
        "icon": ("icon-integration.png", "Icona — Integrazione AI"),
        "footer_text": "AI nei workflow · RAG · automazione controllata · sistemi enterprise",
    },
]

PRODUCT_SHOTS = [
    ("product-outfit.png", "Total look", "Total look on a mannequin"),
    ("product-knit.webp", "Turtleneck knit top", "Turtleneck knit top"),
    ("product-trousers.webp", "Tailored trousers", "Tailored trousers"),
    ("product-jacket.webp", "Leather bomber jacket", "Leather bomber jacket look"),
    ("product-loafer.webp", "Leather loafer", "Leather loafer"),
]

CLOSING_INFO_BLOCKS = [
    ("Codever", "Software Engineering & AI Integration"),
    ("Focus", "Complex systems · Architecture · AI governance"),
]

SEO_TITLE = "Codever — Is not only magic. It’s engineering."
SEARCH_DESCRIPTION = (
    "Codever designs and governs complex digital systems, where AI meets "
    "engineering discipline and long-term reliability."
)


def import_image(apps, filename, title, collection):
    from django.core.files.storage import default_storage

    from PIL import Image as PILImage

    Image = apps.get_model("wagtailimages.Image")
    path = os.path.join(ASSETS_DIR, filename)
    with PILImage.open(path) as im:
        width, height = im.size
    # Il modello storico non ha get_upload_to (richiesto dall'upload_to del
    # campo file), quindi il file viene salvato direttamente nello storage.
    with open(path, "rb") as f:
        stored_name = default_storage.save(
            os.path.join("original_images", filename), File(f)
        )
    return Image.objects.create(
        title=title,
        file=stored_name,
        width=width,
        height=height,
        file_size=os.path.getsize(path),
        collection=collection,
    )


def populate_homepage(apps, schema_editor):
    HomePage = apps.get_model("home.HomePage")
    ServiceCard = apps.get_model("home.ServiceCard")
    ProductShot = apps.get_model("home.ProductShot")
    ClosingInfoBlock = apps.get_model("home.ClosingInfoBlock")
    Collection = apps.get_model("wagtailcore.Collection")

    homepage = HomePage.objects.filter(slug="home", depth=2).first()
    if homepage is None:
        return

    root_collection = Collection.objects.filter(depth=1).first()

    homepage.seo_title = SEO_TITLE
    homepage.search_description = SEARCH_DESCRIPTION
    homepage.styling_portrait = import_image(
        apps,
        "styling-portrait.webp",
        "Ritratto Styling Suite",
        root_collection,
    )
    homepage.save(
        update_fields=["seo_title", "search_description", "styling_portrait"]
    )

    for order, card in enumerate(SERVICE_CARDS):
        icon_filename, icon_title = card["icon"]
        ServiceCard.objects.create(
            page=homepage,
            sort_order=order,
            title=card["title"],
            icon=import_image(apps, icon_filename, icon_title, root_collection),
            footer_text=card["footer_text"],
        )

    for order, (filename, title, alt_text) in enumerate(PRODUCT_SHOTS):
        ProductShot.objects.create(
            page=homepage,
            sort_order=order,
            image=import_image(apps, filename, title, root_collection),
            alt_text=alt_text,
        )

    for order, (heading, body) in enumerate(CLOSING_INFO_BLOCKS):
        ClosingInfoBlock.objects.create(
            page=homepage,
            sort_order=order,
            heading=heading,
            body=body,
        )


def unpopulate_homepage(apps, schema_editor):
    HomePage = apps.get_model("home.HomePage")

    homepage = HomePage.objects.filter(slug="home", depth=2).first()
    if homepage is None:
        return

    homepage.service_cards.all().delete()
    homepage.product_shots.all().delete()
    homepage.closing_info_blocks.all().delete()
    homepage.styling_portrait = None
    homepage.seo_title = ""
    homepage.search_description = ""
    homepage.save(
        update_fields=["seo_title", "search_description", "styling_portrait"]
    )


class Migration(migrations.Migration):

    dependencies = [
        ("home", "0003_homepage_closing_heading_homepage_contact_email_and_more"),
        ("wagtailimages", "0001_initial"),
    ]

    operations = [
        migrations.RunPython(populate_homepage, unpopulate_homepage),
    ]
