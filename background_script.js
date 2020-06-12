async function getSelectedTabs() {
  return browser.tabs.query({
    highlighted: true,
  });
}

function tabsToText(tabs) {
  return tabs.map((tab) => `${tab.title}, ${tab.url}`).join("\n");
}

async function copySelectedTabs(event) {
  const tabsAsText = tabsToText(await getSelectedTabs());
  navigator.clipboard.writeText(tabsAsText);
}

browser.browserAction.onClicked.addListener(copySelectedTabs);

browser.contextMenus.create({
  id: "copy-selected-tab-info",
  //title: browser.i18n.getMessage("contextMenuItemSelectionLogger"),
  title: "Copy title and url of selected tabs to clipboard",
  contexts: ["tab"],
});

browser.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "copy-selected-tab-info") {
    copySelectedTabs();
  }
});
