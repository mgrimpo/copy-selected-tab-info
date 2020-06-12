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
