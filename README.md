# Requirements
To use it you, obviously, need to have nodejs installed..

# How to use it?
- Run `npm install`
- Create a `logs` folder under the project (if you want some log in case of failure)
- In `config.json` change the hard coded path for the `target_dir`
  - Note that you can add other directories
- In `config.json` add the video extensions to handle under `video_extensions`
- Run `node main.js` each time you feel like it

# Test
- Run `npm install`
- Run `npm test`
