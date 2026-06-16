// LinkedIn loads its feed dynamically, so we watch for the feed container
// and replace it with a calm placeholder message.

function injectMessage() {
  const feed = document.querySelector('[data-testid="mainFeed"]');
  if (!feed) return;

  // The feed sits inside a <section>; use that as the anchor point.
  const anchor = feed.closest('section') || feed;

  // Don't add the message twice.
  if (document.getElementById('lfb-message')) return;

  const box = document.createElement('div');
  box.id = 'lfb-message';
  box.innerHTML = `
    <h2>Feed hidden 🌿</h2>
    <p>Your LinkedIn feed is blocked to help you stay focused.
       Search, messages, notifications, and profiles still work as normal.</p>
  `;

  anchor.parentElement.insertBefore(box, anchor);
}

// Run once at load, then keep watching since LinkedIn is a single-page app.
injectMessage();

const observer = new MutationObserver(() => injectMessage());
observer.observe(document.documentElement, { childList: true, subtree: true });