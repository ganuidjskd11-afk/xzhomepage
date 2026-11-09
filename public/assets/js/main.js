/* 个人主页交互：主题切换、移动端菜单、滚动入场、导航高亮 */
(function () {
  'use strict';

  var root = document.documentElement;
  var THEME_KEY = 'homepage-theme';

  /* ---------- 深浅色主题 ---------- */
  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#111a18' : '#f8fbf9');
  }

  var saved = null;
  try { saved = localStorage.getItem(THEME_KEY); } catch (e) { /* 隐私模式下忽略 */ }
  var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(saved || (prefersDark ? 'dark' : 'light'));

  var themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      try { localStorage.setItem(THEME_KEY, next); } catch (e) { /* 忽略 */ }
    });
  }

  /* ---------- 移动端菜单 ---------- */
  var menuToggle = document.getElementById('menuToggle');
  var nav = document.getElementById('nav');
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(open));
      menuToggle.setAttribute('aria-label', open ? '关闭菜单' : '打开菜单');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('.nav-link')) {
        nav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', '打开菜单');
      }
    });
  }

  /* ---------- 顶部导航阴影 ---------- */
  var header = document.getElementById('siteHeader');
  function onScroll() {
    if (header) header.classList.toggle('scrolled', window.scrollY > 12);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- 滚动入场 ---------- */
  var revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealItems.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealItems.forEach(function (el) { el.classList.add('in-view'); });
  }

  /* ---------- 当前区块高亮 ---------- */
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav-link'));
  var sections = links.map(function (link) {
    return document.querySelector(link.getAttribute('href'));
  }).filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (link) {
          link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-35% 0px -55% 0px' });
    sections.forEach(function (section) { navObserver.observe(section); });
  }

  /* ---------- 页脚年份 ---------- */
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
