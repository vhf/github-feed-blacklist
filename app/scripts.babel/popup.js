'use strict';

const form = document.getElementById('add');

const newEl = (repo) => {
  let star = 'on';
  if (localStorage.getItem(repo + '/star')) {
    star = '';
  }
  let fork = 'on';
  if (localStorage.getItem(repo + '/fork')) {
    fork = '';
  }
  return `<li><span class="repo">${repo}</span> <span class="${star} star toggle"></span> <span class="${fork} fork toggle"></span></li>`;
};

const clickEvent = (event) => {
  event.preventDefault();
  const target = event.target;
  const repo = target.parentNode.getElementsByClassName('repo')[0].innerText;
  const classes = target.classList;

  if (classes.contains('on')) {
    classes.remove('on');
  } else {
    classes.add('on');
  }

  localStorage.setItem(repo + '/star', classes.contains('star'));
  localStorage.setItem(repo + '/fork', classes.contains('fork'));
};

const renderList = () => {
  const list = document.getElementById('repos');
  const repos = [];
  const html = [];

  for (let i = 0; i < localStorage.length; i += 2) {
    const repo = localStorage.key(i).split('/').slice(0, 2).join('/');
    if (repos.indexOf(repo) === -1) {
      repos.push(repo);
      html.push(newEl(repo));
    }
  }
  list.innerHTML = html.join('');
  Array.prototype.map.call(document.querySelectorAll('.toggle'), el =>
    el.addEventListener('click', clickEvent)
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

  localStorage.setItem(repo + '/star', true);
  localStorage.setItem(repo + '/fork', true);
  renderList();
});

renderList();
