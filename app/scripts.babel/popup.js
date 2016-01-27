'use strict';

const form = document.getElementById('add');

const update = () => chrome.runtime.sendMessage({ update: true }, (response) => {});

const newEl = (repo) => {
  // on means "hiding is on"
  let star = 'on';
  let starAction = 'Show';
  if (localStorage.getItem(repo + '/star') === 'false') {
    star = '';
    starAction = 'Hide';
  }
  let fork = 'on';
  let forkAction = 'Show';
  if (localStorage.getItem(repo + '/fork') === 'false') {
    fork = '';
    forkAction = 'Hide';
  }
  return `<li><span title="Delete" class="delete"></span>
              <span class="repo">${repo}</span>
              <span title="${starAction} star notifications" class="${star} star toggle"></span>
              <span title="${forkAction} fork notifications" class="${fork} fork toggle"></span></li>`;
};

const toggleEvent = (event) => {
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
  update();
};

const deleteEvent = (event) => {
  event.preventDefault();
  const target = event.target;
  const repoSpan = target.parentNode.getElementsByClassName('repo')[0];
  const repo = repoSpan.innerText;
  const li = repoSpan.parentNode;
  localStorage.removeItem(`${repo}/star`);
  localStorage.removeItem(`${repo}/fork`);
  li.parentNode.removeChild(li);
  update();
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
      el.removeEventListener('click', toggleEvent);
      el.addEventListener('click', toggleEvent);
    }
  );
  Array.prototype.map.call(document.querySelectorAll('.delete'), el => {
      el.removeEventListener('click', deleteEvent);
      el.addEventListener('click', deleteEvent);
    }
  );
  update();
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
