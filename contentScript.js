setInterval(function() {
  chrome.runtime.sendMessage({type: "getPreference"}, function(response) {
    const url = window.location.href;
    if (url.includes('/status/') && !url.includes('/photo/')) {
      hideVerifiedTweets(true);
    } else if (url === 'https://twitter.com/home' && response.runOnHome === true) {
      hideVerifiedTweets(false);
    }
  });
}, 500);

function collectionHas(a, b) {
  return Array.from(a).includes(b);
}

function findParentBySelector(elm, selector) {
  const all = document.querySelectorAll(selector);
  let cur = elm.parentNode;
  while (cur && !collectionHas(all, cur)) {
    cur = cur.parentNode;
  }
  return cur;
}

function hideVerifiedTweets(statusUrl) {
  const selector = '[data-testid="cellInnerDiv"]';
  let verifiedTweets = document.querySelectorAll(
    ".r-1cvl2hr.r-4qtqp9.r-yyyyoo.r-1xvli5t.r-9cviqr.r-f9ja8p.r-og9te1.r-bnwqim.r-1plcrui.r-lrvibr"
  );

  if (statusUrl) {
    // Remove the first verified tweet from the list
    verifiedTweets = Array.from(verifiedTweets).filter((tweet, index) => {
      return index > 0;
    });
  }

  verifiedTweets.forEach((tweet) => {
    try {
      const parent = findParentBySelector(tweet, selector);
      if (parent) {
        parent.style.display = "none";
      }
    } catch (e) {
      console.log(e);
    }
  });
}
