async function getSelectedTabs() {
  return browser.tabs.query({
    highlighted: true,
  });
}

function setMissingOptionsToDefault(options) {
  const defaultOptions = {
    includeTitle: true,
    includeURL: true,
    titleUrlSeparator: ", ",
    tabStringSeparator: "\n",
  };
  return Object.assign({}, defaultOptions, options);
}

function tabsToText(tabs, options) {
  options = setMissingOptionsToDefault(options);
  return tabs
    .map((tab) => tabToString(tab, options))
    .join(options.tabStringSeparator);
}

function tabToString(tab, options) {
  console.log(options);
  let result = "";
  if (options.includeTitle) {
    result += tab.title;
  }
  if (options.includeTitle && options.includeURL) {
    result += options.titleUrlSeparator;
  }
  if (options.includeURL) {
    result += tab.url;
  }
  return result;
}

async function copySelectedTabs(options) {
  const tabsAsText = tabsToText(await getSelectedTabs(), options);
  navigator.clipboard.writeText(tabsAsText);
}

browser.browserAction.onClicked.addListener(copySelectedTabs);

const copyTitleAndUrlsMenuId = "copy-selected-tab-info";
browser.contextMenus.create({
  id: copyTitleAndUrlsMenuId,
  //title: browser.i18n.getMessage("contextMenuItemSelectionLogger"),
  title: "Copy the titles and URLs of selected tabs",
  contexts: ["tab"],
});

const copyUrlOnlyMenuID = "copy-url-only";
browser.contextMenus.create({
  id: copyUrlOnlyMenuID,
  //title: browser.i18n.getMessage("contextMenuItemSelectionLogger"),
  title: "Copy the URLs of the selected tabs",
  contexts: ["tab"],
});

// eslint-disable-next-line no-unused-vars
browser.contextMenus.onClicked.addListener((info, tab) => {
  switch (info.menuItemId) {
    case copyTitleAndUrlsMenuId:
      copySelectedTabs();
      break;
    case copyUrlOnlyMenuID:
      copySelectedTabs({ includeTitle: false });
      break;
  }
});
