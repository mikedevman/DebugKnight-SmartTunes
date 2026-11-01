/* Shared controls for song lists. The server owns page bounds and totals. */
window.SongPagination = class SongPagination {
  constructor(container, onPage) {
    this.container = container;
    this.onPage = onPage;
    this.meta = { page: 1, total_pages: 1, total: 0, from: 0, to: 0 };
    if (!container) throw new Error('The song pagination container is missing.');
    this.container.classList.add('song-pagination');
    this.update(this.meta);
  }

  update(meta) {
    this.meta = meta;
    this.container.replaceChildren();
    const summary = document.createElement('p');
    summary.setAttribute('role', 'status');
    summary.textContent = `Showing ${meta.from}\u2013${meta.to} of ${meta.total} songs`;
    this.container.appendChild(summary);
    if (meta.total_pages <= 1) return;

    const nav = document.createElement('nav');
    nav.setAttribute('aria-label', 'Song pages');
    const addButton = (label, page, disabled = false) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = label;
      button.disabled = disabled;
      if (typeof label === 'number') {
        button.setAttribute('aria-label', `Page ${page}`);
        if (page === meta.page) button.setAttribute('aria-current', 'page');
      }
      button.addEventListener('click', () => this.onPage(page));
      nav.appendChild(button);
    };
    addButton('Previous', meta.page - 1, meta.page === 1);
    const pages = [...new Set([1, ...Array.from(
      { length: Math.min(meta.total_pages, meta.page + 1) - Math.max(1, meta.page - 1) + 1 },
      (_, i) => Math.max(1, meta.page - 1) + i
    ), meta.total_pages])];
    let previous = 0;
    pages.forEach(page => {
      if (previous && page - previous > 1) {
        const gap = document.createElement('span');
        gap.textContent = '\u2026';
        gap.setAttribute('aria-hidden', 'true');
        nav.appendChild(gap);
      }
      addButton(page, page, page === meta.page);
      previous = page;
    });
    addButton('Next', meta.page + 1, meta.page === meta.total_pages);
    this.container.appendChild(nav);
  }

  loading() {
    this.container.querySelectorAll('button').forEach(button => { button.disabled = true; });
    const status = this.container.querySelector('[role="status"]');
    if (status) status.textContent = 'Loading songs...';
  }

  error() {
    this.update(this.meta);
    this.container.querySelector('[role="status"]').textContent = 'Unable to load songs. Please try again.';
    const retry = document.createElement('button');
    retry.type = 'button';
    retry.textContent = 'Retry';
    retry.addEventListener('click', () => this.onPage(this.meta.page));
    this.container.appendChild(retry);
  }
};
