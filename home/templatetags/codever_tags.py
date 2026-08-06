import re

from django import template
from django.utils.safestring import mark_safe

from wagtail.rich_text import expand_db_html

register = template.Library()

PARAGRAPH_RE = re.compile(r"<p[^>]*>(.*?)</p>", re.S)


@register.filter
def splitlines(value):
    """Divide un testo in righe non vuote, per renderle come <span> separati."""
    return [line.strip() for line in (value or "").splitlines() if line.strip()]


@register.filter
def inline_richtext(value):
    """Rende un campo rich text senza i tag <p>, per l'uso dentro un titolo.

    Più paragrafi vengono uniti con <br/>; i <br/> interni ai paragrafi
    sono mantenuti.
    """
    html = expand_db_html(value or "")
    paragraphs = PARAGRAPH_RE.findall(html)
    if paragraphs:
        html = "<br/>".join(p.strip() for p in paragraphs)
    return mark_safe(html)
