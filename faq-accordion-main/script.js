const accordionToggleButtons = document.querySelectorAll(
  ".accordion__item__summary__toggle"
);

const accordion = document.querySelector(".accordion");
const accordionItems = document.querySelectorAll(".accordion__item");

let openAccordionItemIds = [];

accordionToggleButtons.forEach((button) => {
  const accordionId = button.getAttribute("data-accordion-id");
  const accordionItem = accordion.querySelector(
    `.accordion__item[data-accordion-id="${accordionId}"]`
  );
  const accordionDetail = accordionItem.querySelector(
    ".accordion__item__detail"
  );
  button.addEventListener("click", () => {
    const isOpen = accordionItem.getAttribute("data-open") === "true";
    closeAllAcordionItems();
    if (!isOpen) {
      openAccordionItemIds.push(accordionId);
      accordionItem.setAttribute("data-open", "true");
      requestAnimationFrame(() => {
        accordionDetail.style.height = accordionDetail.scrollHeight + "px";
      });
    }
  });
});

function closeAllAcordionItems() {
  accordionItems.forEach((accordion) => {
    accordion.setAttribute("data-open", "false");
    const accordionDetail = accordion.querySelector(".accordion__item__detail");
    if (accordionDetail) {
      accordionDetail.style.height = "0px";
    }
  });
  openAccordionItemIds = [];
}
