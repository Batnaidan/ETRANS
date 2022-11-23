const article = document.querySelector("article");

// `document.querySelector` may return null if the selector doesn't match anything.
if (article) {
  const text = article.textContent;
  const wordMatchRegExp = /[^\s]+/g; // Regular expression
  const words = text.matchAll(wordMatchRegExp);
  // matchAll returns an iterator, convert to array to get word count
  const wordCount = [...words].length;
  const readingTime = Math.round(wordCount / 200);
  const badge = document.createElement("p");
  // Use the same styling as the publish information in an article's header
  badge.classList.add("color-secondary-text", "type--caption");
  badge.textContent = `⏱️ ${readingTime} min read`;

  // Support for API reference docs
  const heading = article.querySelector("h1");
  // Support for article docs with date
  const date = article.querySelector("time")?.parentNode;

  (date ?? heading).insertAdjacentElement("afterend", badge);
}

class ElementService {
  getElementByXpath = (path) => {
    return document.evaluate(
      path,
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    ).singleNodeValue;
  };

  getElementsByQuery = (query) => {
    return document.querySelectorAll(query);
  };

  removeAllByQuery = (query) => {
    const selectedElements = this.getElementsByQuery(query);

    selectedElements.forEach((element) => {
      element.remove();
    });
  };

  removeByQuery = (query) => {
    const selectedElement = document.querySelector(query);

    if (selectedElement) {
      selectedElement.remove();
    }
  };

  removeElement = (element) => {
    if (element) {
      element.remove();
    }
  };

  removeNextElement = (element) => {
    const nextElement = element.nextElementSibling;

    if (nextElement) {
      nextElement.remove();
    }
  };
}

const elementService = new ElementService();

elementService.removeNextElement(
  elementService.getElementsByQuery(".idsep")[1]
);
elementService.removeElement(elementService.getElementsByQuery(".idsep")[1]);
elementService.removeAllByQuery(".iframe-responsive");
