# gh-feed-filter

**gh-feed-filter** is a Chrome extension to filter GitHub's homepage feed.

### Disclaimer

- This software is in beta. It works but it's not very pretty.
- I have not published it on the Chrome Webstore yet. I'll do it once it's "production" ready.
- To install, grap [the zip](/blob/master/package/gh-feed-filter-0.0.2.zip), unzip-it somewhere, navigate to [`chrome://extensions`](chrome://extensions) and use the `Load unpacked extension...` button.
- I didn't want to handle the setup and boilerplate so I took the first thing I found and used it. It's a yeoman generator, it works nicely but all dependencies are outdated.
- PR most welcome. (Especially if you'd like to draw an icon or enhance the popup CSS!)

### What does it do

- It adds an icon next to the other extensions' icons.
- Clicking it lets you add the names of the repo you'd like to filter.
- Once you added some repos, the empty star means it'll get filtered out, you can toggle this behaviour by clicking on the icon.
- Same goes with the funny fork symbol.

### Next steps

- An icon.
- Some CSS.
- More "features":
  + Remove a single repo from the filter list
  + Filter more things
- Update the dependencies.
- Other ideas?
