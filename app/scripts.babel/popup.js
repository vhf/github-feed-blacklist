'use strict';

const form = document.getElementById('add');

const update = () => chrome.runtime.sendMessage({ update: true }, () => {});

const triggers = [
  {
    className: 'star',
    name: 'star',
  },
  {
    className: 'fork',
    name: 'fork',
  },
  {
    className: 'issue_open',
    name: 'new issue/PR',
  },
  {
    className: 'issue_com',
    name: 'issue/PR comment',
  },
  {
    className: 'issue_close',
    name: 'closed issue/PR',
  },
  {
    className: 'commit',
    name: 'commit',
  },
  {
    className: 'wiki',
    name: 'wiki edit',
  },
];

const newEl = (repo) => {
  let outputHtml = `<li><span title="Delete" class="delete"></span><span class="repo"><span class="repoName">${repo}</span>
                    <span class="menu"><ul>`;

  triggers.forEach((trigger) => {
    let state = 'checked="checked"';
    if (localStorage.getItem(`${repo}/${trigger.className}`) === 'false') {
      state = '';
    }
    outputHtml += `<li><input type="checkbox" ${state} class="${trigger.className} toggle"> ${trigger.name} notifications</li>`;
  });
  return outputHtml + '</ul></span></span></li>';
};

const toggleEvent = (event) => {
  const target = event.target;
  const repo = target.parentNode.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('repoName')[0].innerText;
  const classes = target.classList;
  let type;

  if (classes.contains('star')) {
    type = 'star';
  } else if (classes.contains('fork')) {
    type = 'fork';
  } else if (classes.contains('issue_open')) {
    type = 'issue_open';
  } else if (classes.contains('issue_com')) {
    type = 'issue_com';
  } else if (classes.contains('issue_close')) {
    type = 'issue_close';
  } else if (classes.contains('commit')) {
    type = 'commit';
  } else if (classes.contains('wiki')) {
    type = 'wiki';
  }

  if (!target.checked) {
    localStorage.setItem(`${repo}/${type}`, 'false');
  } else {
    localStorage.setItem(`${repo}/${type}`, 'true');
  }
  update();
};

const deleteEvent = (event) => {
  event.preventDefault();
  const target = event.target;
  const repoSpan = target.parentNode.getElementsByClassName('repo')[0];
  const repo = repo.getElementsByClassName('.repoName')[0].innerText;
  const li = repoSpan.parentNode;
  triggers.forEach((trigger) => {
    localStorage.removeItem(`${repo}/${trigger.className}`);
  });
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
  input.value = '';

  const repos = localStorage.getItem('repos') || {};
  if (repos.hasOwnProperty(repo)) {
    return false;
  }

  triggers.forEach((trigger) => {
    localStorage.setItem(`${repo}/${trigger.className}`, 'true');
  });
  renderList();
});

renderList();
