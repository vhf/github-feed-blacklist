'use strict';

const form = document.getElementById('add');

const newEl = (repo) => {
  // on means "hiding is on"
  let star = 'on';
  let starAction = 'Show star notifications';
  if (localStorage.getItem(repo + '/star') === 'false') {
    star = '';
    starAction = 'Hide star notifications';
  }
  let fork = 'on';
  let forkAction = 'Show fork notifications';
  if (localStorage.getItem(repo + '/fork') === 'false') {
    fork = '';
    forkAction = 'Hide fork notifications';
  }
  return `<li><span class="repo">${repo}</span>
              <span title="${starAction}" class="${star} star toggle"></span>
              <span title="${forkAction}" class="${fork} fork toggle"></span></li>`;
};

const clickEvent = (event) => {
  event.preventDefault();
  const target = event.target;
  const repo = target.parentNode.getElementsByClassName('repo')[0].innerText;
  const classes = target.classList;
  let type;

  if (classes.contains('star')) {
    type = 'star';
  } else if (classes.contains('fork')) {
    type = 'fork';
  }

  if (classes.contains('on')) {
    window.localStorage.setItem(`${repo}/${type}`, 'false');
    classes.remove('on');
  } else {
    classes.add('on');
    localStorage.setItem(`${repo}/${type}`, 'true');
  }
};

const renderList = () => {
  const list = document.getElementById('repos');
  const repos = [];
  const html = [];

  for (let i = 0; i < localStorage.length; i++) {
    const repo = localStorage.key(i).split('/').slice(0, 2).join('/');
    if (repos.indexOf(repo) === -1) {
      repos.push(repo);
      html.push(newEl(repo));
    }
  }
  list.innerHTML = html.join('');
  Array.prototype.map.call(document.querySelectorAll('.toggle'), el => {
      el.removeEventListener('click', clickEvent);
      el.addEventListener('click', clickEvent);
    }
  );
};

document.getElementById('clear').addEventListener('click', () => {
  localStorage.clear();
  renderList();
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const input = document.getElementById('input');
  const repo = input.value;

  const repos = localStorage.getItem('repos') || {};
  if (repos.hasOwnProperty(repo)) {
    return false;
  }

  localStorage.setItem(repo + '/star', 'true');
  localStorage.setItem(repo + '/fork', 'true');
  renderList();
});

renderList();
